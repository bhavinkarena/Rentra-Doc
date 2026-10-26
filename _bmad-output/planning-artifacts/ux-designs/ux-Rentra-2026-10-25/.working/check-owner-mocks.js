async page => {
  const root = 'http://127.0.0.1:8766/';
  const output = '_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/evidence/';
  const results=[];
  for (const file of ['key-owner-rooms.html','key-owner-rates.html']) {
    for (const width of [320,390,768,1440]) {
      await page.setViewportSize({width,height:width>1000?1000:844});
      await page.goto(root+file);
      await page.evaluate(()=>document.fonts.ready);
      const metrics=await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth>innerWidth,
        brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length,
        fontLoaded:document.fonts.check('16px "Plus Jakarta Sans"'),
        unlabelled:[...document.querySelectorAll('input,select')].filter(i=>!i.labels?.length&&!i.getAttribute('aria-label')).map(i=>i.id),
        fieldSizes:[...document.querySelectorAll('input,select')].filter(i=>i.getBoundingClientRect().width).every(i=>i.getBoundingClientRect().height>=44&&parseFloat(getComputedStyle(i).fontSize)>=16)
      }));
      if(metrics.overflow||metrics.brokenImages||!metrics.fontLoaded||metrics.unlabelled.length||!metrics.fieldSizes) throw new Error(JSON.stringify({file,width,...metrics}));
      if(!(await page.getByRole('button',{name:'Save and continue',exact:true}).isDisabled())) throw new Error('Mock must not pretend to save');
      results.push({file,width,...metrics});
      if(width===390||width===1440) {
        await page.screenshot({path:output+file.replace('.html','')+'-'+width+'.png',fullPage:true});
        await page.screenshot({path:output+file.replace('.html','')+'-'+(width===390?'phone':'desktop')+'-viewport.png'});
      }
    }
  }
  await page.goto(root+'key-owner-rooms.html');
  await page.locator('#room-name').fill('Garden twin room');
  if(await page.locator('#room-name').inputValue()!=='Garden twin room') throw new Error('Room editing failed');
  await page.locator('#room-count').fill('0');
  if(await page.locator('#room-count').evaluate(el=>el.checkValidity())) throw new Error('Minimum room count not enforced');
  await page.locator('#optional-room summary').click();
  if(!(await page.locator('#optional-room input').first().isVisible())) throw new Error('Optional fields not exposed');
  await page.setViewportSize({width:390,height:844});
  await page.locator('.mobile-steps summary').click();
  await page.locator('.mobile-steps').getByRole('link',{name:'Rates',exact:true}).click();
  if(!page.url().endsWith('key-owner-rates.html')) throw new Error('Step navigation failed');
  await page.locator('#meal-plan-options summary').click();
  if(!(await page.locator('#meal-supplement').isVisible())) throw new Error('Derived-plan fields not exposed');
  await page.locator('#date-rates summary').click();
  if(!(await page.getByRole('button',{name:'Open property calendar'}).isDisabled())) throw new Error('Mock must not simulate calendar writes');
  await page.locator('#weekday-rate').focus();
  const focus=await page.locator('#weekday-rate').evaluate(el=>getComputedStyle(el).outlineStyle);
  if(focus==='none') throw new Error('Input focus is invisible');
  return {viewports:results,nativeEditing:true,minValidation:true,disclosures:true,stepNavigation:true,focus:true,savingDisabled:true};
}
