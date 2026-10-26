"""Run the real migration verifier against disposable sibling checkouts."""
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
from tempfile import TemporaryDirectory
import unittest


class MigrationVerifierTests(unittest.TestCase):
    def setUp(self):
        temporary = TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.workspace = Path(temporary.name)
        self.docs = self.workspace / 'Rentra-Doc'
        self.write('Rentra-Doc/scripts/.keep')
        self.verifier = self.docs / 'scripts/verify-migration.py'
        shutil.copyfile(Path(__file__).with_name('verify-migration.py'), self.verifier)
        for path in [
            'Rentra/docs/performance-baseline.json',
            'rentra-backend/docs/entertainment-performance-baseline.json',
            'rentra-backend/docs/entertainment-performance.json',
            'rentra-backend/docs/entertainment-farmhouse-comparison.json',
            'rentra-backend/docs/rollback/0052-0054_entertainment.down.sql',
            'Rentra/app/(marketing)/page.js',
        ]:
            self.write(path)
        self.write('Rentra-Doc/_bmad/custom/config.toml',
                   '[modules.bmm]\nproject_knowledge = "{project-root}"\n')
        for agent in ['.agents', '.claude']:
            self.write(f'Rentra-Doc/{agent}/skills/bmad-build/SKILL.md')
        for history in ['briefs/brief-Rentra-2026-10-24', 'prds/prd-Rentra-2026-10-25',
                        'ux-designs/ux-Rentra-2026-10-25']:
            self.write(f'Rentra-Doc/_bmad-output/planning-artifacts/{history}/.memlog.md')
        self.inventory = {'normalized_text_extensions': ['.md'], 'files': [],
                          'relocated_links': [], 'existing_missing_links': []}

    def write(self, path, text=''):
        target = self.workspace / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(text.encode('utf-8'))

    def document(self, text):
        self.write('Rentra-Doc/frontend/sample.md', text)
        self.inventory['files'] = [{'source': 'Rentra/docs/sample.md',
                                   'target': 'frontend/sample.md',
                                   'after_sha256': hashlib.sha256(text.replace('\r\n', '\n').encode()).hexdigest()}]

    def verify(self, success=True, message=None):
        self.write('Rentra-Doc/scripts/migration-inventory.json', json.dumps(self.inventory))
        result = subprocess.run([sys.executable, str(self.verifier)], cwd=self.workspace,
                                capture_output=True, text=True, encoding='utf-8')
        self.assertEqual(result.returncode, 0 if success else 1, result.stdout + result.stderr)
        if message:
            self.assertIn(message, result.stdout)

    def test_valid_relocated_links(self):
        target = '../../Rentra/app/(marketing)/page.js'
        self.document(f'[route]({target})\n<a href="{target}">route</a>\n')
        self.inventory['relocated_links'] = [{'file': 'frontend/sample.md',
                                              'target': '../Rentra/app/(marketing)/page.js'}]
        self.verify()

    def test_missing_target_rejected_by_parser(self):
        for link in ['[missing](missing.md)', '<img src="missing.png">',
                     '<a href="missing.html">missing</a>']:
            with self.subTest(link=link):
                self.document(link)
                self.verify(False, 'New local link failure: frontend/sample.md')

    def test_css_missing_target_rejected(self):
        self.write('Rentra-Doc/frontend/mock.css', 'body { background: url(missing.png); }')
        self.verify(False, 'New local link failure: frontend/mock.css -> missing.png')

    def test_historical_gap_allowed(self):
        self.document('[historical](missing.md)\n')
        self.inventory['existing_missing_links'] = [{'file': 'frontend/sample.md',
                                                    'reference': 'missing.md'}]
        self.verify()

    def test_lf_crlf_hash_equivalence(self):
        self.document('first\nsecond\n')
        self.verify()
        self.write('Rentra-Doc/frontend/sample.md', 'first\r\nsecond\r\n')
        self.verify()

    def test_private_env_rejected(self):
        self.write('Rentra-Doc/.env', 'SESSION_SECRET=placeholder\n')
        self.verify(False, 'Excluded personal file: .env')

    def test_content_change_rejected(self):
        self.document('original\n')
        self.write('Rentra-Doc/frontend/sample.md', 'changed\n')
        self.verify(False, 'Content changed since migration inventory: frontend/sample.md')

    def test_sanitized_env_example_allowed(self):
        self.write('Rentra-Doc/.env.example', 'SESSION_SECRET=replace-me\n')
        self.verify()

    def test_env_example_credential_rejected(self):
        self.write('Rentra-Doc/.env.example', 'AWS_ACCESS_KEY_ID=' + 'AK' + 'IA' + 'A' * 16)
        self.verify(False, 'Possible credential: .env.example')


if __name__ == '__main__':
    unittest.main()
