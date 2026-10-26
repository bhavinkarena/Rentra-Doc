async page => {
  const root='http://127.0.0.1:8766/';
  const output='_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/evidence/';
  const expected={
    proportional:{'guest-due':5000,'owner-total':9500,'rentra-total':500,'owner-increase':4750,'reassignment':0,'remaining-recovery':7500,'gross-fee':0},
    owner:{'guest-due':5000,'owner-total':10000,'rentra-total':0,'owner-increase':5250,'reassignment':250,'remaining-recovery':8000,'gross-fee':500}
  };
  const results=[];
  for(const width of [320,390,768,1440]) {
    await page.setViewportSize({width,height:width>1000?1000:844});
    await page.goto(root+'key-admin-refund-decision.html?review='+Date.now());
    await page.evaluate(()=>document.fonts.ready);
    for(const mode of ['proportional','owner']) {
      await page.locator('#allocation-'+mode).check();
      const metrics=await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth>innerWidth,
        brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length,
        fontLoaded:document.fonts.check('16px "Plus Jakarta Sans"'),
        unlabelled:[...document.querySelectorAll('input,select,textarea')].filter(i=>!i.labels?.length&&!i.getAttribute('aria-label')&&!i.getAttribute('aria-labelledby')).map(i=>i.id),
        fieldsSized:[...document.querySelectorAll('input:not([type=radio]):not([type=checkbox]),textarea,select')].filter(i=>i.getBoundingClientRect().width).every(i=>i.getBoundingClientRect().height>=44&&parseFloat(getComputedStyle(i).fontSize)>=16),
        enabledCommands:[...document.querySelectorAll('button')].filter(i=>!i.disabled).length,
        scripts:document.scripts.length
      }));
      if(metrics.overflow||metrics.brokenImages||!metrics.fontLoaded||metrics.unlabelled.length||!metrics.fieldsSized||metrics.enabledCommands||metrics.scripts) throw new Error(JSON.stringify({width,mode,...metrics}));
      for(const [key,amount] of Object.entries(expected[mode])) {
        const values=await page.locator('[data-amount="'+key+'"]:visible').allTextContents();
        if(!values.length||values.some(value=>Number(value.replace(/[^0-9.-]/g,''))!==amount)) throw new Error('Incorrect visible '+mode+' '+key+': '+JSON.stringify(values));
      }
      results.push({width,mode,...metrics,amounts:true});
      if(width===390||width===1440) {
        await page.evaluate(()=>window.scrollTo(0,0));
        await page.screenshot({path:output+'admin-refund-'+mode+'-'+width+'.png',fullPage:true});
        await page.screenshot({path:output+'admin-refund-'+mode+'-'+(width===390?'phone':'desktop')+'-viewport.png'});
      }
    }
  }
  await page.locator('#award-reason').fill('Example reason retained for the reviewed responsibility decision.');
  await page.locator('#award-reason').focus();
  if(await page.locator('#award-reason').evaluate(el=>getComputedStyle(el).outlineStyle)==='none') throw new Error('Reason focus missing');
  await page.locator('#allocation-proportional').check();
  await page.locator('#allocation-proportional').focus();
  await page.keyboard.press('ArrowRight');
  if(!(await page.locator('#allocation-owner').isChecked())) throw new Error('Allocation keyboard switch failed');
  for(const item of await page.locator('details').all()) {
    if(await item.isVisible()) {
      const open=await item.getAttribute('open')!==null;
      await item.locator(':scope > summary').click();
      if((await item.getAttribute('open')!==null)===open) throw new Error('Disclosure failed');
    }
  }
  // Assert the approved historical allocation example, independently of displayed strings.
  const paid=10000,priorRefund=5000,inFlight=0,recovered=2000,oldOwner=4750;
  if(paid-priorRefund-inFlight!==5000||oldOwner+250!==priorRefund||oldOwner-recovered!==2750) throw new Error('Prior facts do not reconcile');
  for(const mode of Object.values(expected)) {
    if(mode['owner-total']+mode['rentra-total']!==paid||mode['owner-total']-oldOwner!==mode['owner-increase']||mode['owner-total']-recovered!==mode['remaining-recovery']||500-mode['rentra-total']!==mode['gross-fee']) throw new Error('Responsibility/recovery example does not reconcile');
  }
  if(expected.owner['owner-increase']!==5000+250||expected.owner['owner-total']-9500!==500) throw new Error('Retrospective reassignment or above-proceeds explanation incorrect');
  return {viewports:results,keyboard:true,reasonEditing:true,disclosures:true,historicalFixtureMath:true,noFinancialCommands:true};
}
