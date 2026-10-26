async page => {
  const root='http://127.0.0.1:8766/';
  const output='_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/evidence/';
  const results=[];
  for(const file of ['key-admin-verification.html','key-admin-support.html']) {
    for(const width of [320,390,768,1440]) {
      await page.setViewportSize({width,height:width>1000?1000:844});
      await page.goto(root+file+'?review='+Date.now());
      await page.evaluate(()=>document.fonts.ready);
      const metrics=await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth>innerWidth,
        brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length,
        fontLoaded:document.fonts.check('16px "Plus Jakarta Sans"'),
        unlabelled:[...document.querySelectorAll('input:not([type=hidden]),select,textarea')].filter(i=>!i.labels?.length&&!i.getAttribute('aria-label')&&!i.getAttribute('aria-labelledby')).map(i=>i.id),
        visibleFieldSizing:[...document.querySelectorAll('input:not([type=hidden]):not([type=radio]):not([type=checkbox]),select,textarea')].filter(i=>i.getBoundingClientRect().width).every(i=>i.getBoundingClientRect().height>=44&&parseFloat(getComputedStyle(i).fontSize)>=16),
        enabledCommands:[...document.querySelectorAll('button')].filter(i=>!i.disabled).map(i=>i.textContent.trim()),
        scripts:document.scripts.length
      }));
      if(metrics.overflow||metrics.brokenImages||!metrics.fontLoaded||metrics.unlabelled.length||!metrics.visibleFieldSizing||metrics.enabledCommands.length||metrics.scripts) throw new Error(JSON.stringify({file,width,...metrics}));
      results.push({file,width,...metrics});
      if(width===390||width===1440) {
        await page.screenshot({path:output+file.replace('.html','')+'-'+width+'.png',fullPage:true});
        await page.screenshot({path:output+file.replace('.html','')+'-'+(width===390?'phone':'desktop')+'-viewport.png'});
      }
    }
    const details=page.locator('details');
    for(let index=0;index<await details.count();index++) {
      const item=details.nth(index);
      if(await item.isVisible()) {
        const wasOpen=await item.getAttribute('open')!==null;
        await item.locator(':scope > summary').click();
        if((await item.getAttribute('open')!==null)===wasOpen) throw new Error('Disclosure failed: '+file);
      }
    }
    const field=page.locator('textarea:visible').first();
    if(await field.count()) {
      await field.fill('Example review note for layout testing only.');
      if(!(await field.inputValue()).includes('layout testing')) throw new Error('Text editing failed');
      await field.focus();
      if(await field.evaluate(el=>getComputedStyle(el).outlineStyle)==='none') throw new Error('Invisible focus');
    }
  }
  await page.goto(root+'key-admin-support.html?review='+Date.now());
  await page.locator('#reply-internal').check();
  if(!(await page.locator('.audience-internal').isVisible())||await page.locator('.audience-customer').isVisible()) throw new Error('Internal audience not isolated');
  if(await page.locator('#reply-state').isVisible()) throw new Error('Internal note must not change support status');
  if(!(await page.getByRole('button',{name:'Save internal note',exact:true}).isDisabled())) throw new Error('Internal-note command enabled');
  await page.locator('#reply-public').check();
  if(!(await page.locator('#reply-state').isVisible())) throw new Error('Public reply status unavailable');
  await page.setViewportSize({width:390,height:844});
  await page.locator('.mobile-admin summary').focus();
  await page.keyboard.press('Enter');
  if(!(await page.locator('.mobile-admin').getByRole('link',{name:'Property reviews',exact:true}).isVisible())) throw new Error('Mobile navigation failed');
  return {viewports:results,disclosures:true,nativeEditing:true,focus:true,audienceSeparation:true,mobileKeyboardNavigation:true,noCommandsSent:true};
}
