"""Offline, dependency-free preservation and routing checks. Run from any directory."""
from pathlib import Path
import hashlib
import json
import re
import sys
import tomllib

root = Path(__file__).resolve().parents[1]
workspace = root.parent
inventory = json.loads((root / 'scripts/migration-inventory.json').read_text(encoding='utf-8'))
errors = []
def content_hash(path):
    # Deliberate migration snapshot: normalize text line endings, not later edits.
    data = path.read_bytes()
    if path.suffix.lower() in inventory['normalized_text_extensions']:
        data = data.replace(b'\r\n', b'\n')
    return hashlib.sha256(data).hexdigest()

def check(ok, message):
    if not ok:
        errors.append(message)

for item in inventory['files']:
    target = root / item['target']
    check(target.is_file(), f"Missing migrated file: {item['target']}")
    if target.is_file():
        # The execution spec is updated by the build/review workflow itself.
        if not item['target'].endswith('/spec-shared-documentation-handoff.md'):
            check(content_hash(target) == item['after_sha256'],
                  f"Content changed since migration inventory: {item['target']}")
    if item['source'].startswith(('Rentra/docs/', 'rentra-backend/docs/', '_bmad-output/')):
        check(not (workspace / item['source']).exists(), f"Duplicate canonical document: {item['source']}")

for link in inventory['relocated_links']:
    check((root / link['target']).exists(), f"Newly missing relocated target: {link['file']} -> {link['target']}")

# Also inspect current content, including the newly authored handoff and indexes.
references = re.compile(r'''(?<=\]\()<?((?:[^\s<>()]|\([^()]*\))+)>?|(?:href|src)\s*=\s*["']([^"']+)["']|url\(\s*["']?([^\s\)"']+)|(?m:^\s*-\s+)(\.\./[^\s]+)''')
historical = {(item['file'], item['reference'].replace('file:///Users/bhavinkarena/Desktop/Freelance/Rentra-Project/', '../../../'))
              for item in inventory['existing_missing_links']}
for folder in ['frontend', 'backend', '_bmad-output']:
    files = list((root / folder).rglob('*'))
    if folder == 'frontend':
        files += [root / name for name in ['README.md', 'HANDOFF.md', 'AGENTS.md', 'CLAUDE.md']]
    for p in files:
        if not p.is_file() or p.suffix not in ['.md', '.html', '.css']:
            continue
        for match in references.finditer(p.read_text(encoding='utf-8')):
            ref = next(value for value in match.groups() if value is not None)
            path = ref.split('#')[0].split('?')[0]
            if not path or path.startswith(('/', '#')) or re.match(r'^[\w+-]+:', path) or '{' in path:
                continue
            known_missing = (p.relative_to(root).as_posix(), ref) in historical
            check((p.parent / path).exists() or known_missing,
                  f'New local link failure: {p.relative_to(root).as_posix()} -> {ref}')

for name in ['Rentra/docs/performance-baseline.json',
             'rentra-backend/docs/entertainment-performance-baseline.json',
             'rentra-backend/docs/entertainment-performance.json',
             'rentra-backend/docs/entertainment-farmhouse-comparison.json',
             'rentra-backend/docs/rollback/0052-0054_entertainment.down.sql']:
    check((workspace / name).is_file(), f'Missing local operational input/output: {name}')

config = tomllib.loads((root / '_bmad/custom/config.toml').read_text(encoding='utf-8'))
check(config['modules']['bmm']['project_knowledge'] == '{project-root}', 'Shared knowledge routing is incorrect')
legacy = tomllib.loads((workspace / '_bmad/custom/config.toml').read_text(encoding='utf-8')) if (workspace / '_bmad/custom/config.toml').exists() else None
if legacy:
    check(legacy.get('core', {}).get('output_folder') == '{project-root}/Rentra-Doc/_bmad-output', 'Legacy output routing is incorrect')
for agent in ['.agents', '.claude']:
    check((root / agent / 'skills/bmad-build/SKILL.md').is_file(), f'Missing {agent} team skills')
for history in ['briefs/brief-Rentra-2026-10-24', 'prds/prd-Rentra-2026-10-25', 'ux-designs/ux-Rentra-2026-10-25']:
    check((root / '_bmad-output/planning-artifacts' / history / '.memlog.md').is_file(), f'Missing decision history: {history}')

# Scan only shareable source candidates, never ignored local render caches or .git.
secret = re.compile(r'-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{30,}|sk-(?:proj-)?[A-Za-z0-9_-]{40,}')
for p in root.rglob('*'):
    relative = p.relative_to(root)
    if not p.is_file() or any(part in ['.git', 'render', '__pycache__'] for part in relative.parts):
        continue
    check(not (p.name.endswith(('.user.toml', '.pyc')) or '.browser' in relative.parts
               or p.name in ['settings.local.json', 'database-schema-live.json', '.env']
               or (p.name.startswith('.env.') and p.name != '.env.example')), f'Excluded personal file: {relative.as_posix()}')
    # A permitted .env.example must stay sanitized; patterns cannot replace review.
    if p.name == '.env.example' or p.suffix.lower() in ['.md', '.toml', '.yaml', '.yml', '.json', '.js', '.py', '.html', '.csv']:
        check(not secret.search(p.read_text(encoding='utf-8', errors='replace')), f'Possible credential: {relative.as_posix()}')

if errors:
    print('\n'.join(errors))
    sys.exit(1)
print(f"PASS: {len(inventory['files'])} migrated files; {len(inventory['relocated_links'])} relocated link targets; routing, retained inputs, decision histories and credential-pattern checks.")
print(f"Historical missing references: {len(inventory['existing_missing_links'])} occurrences recorded in scripts/migration-inventory.json; these were absent before relocation.")
