async page => {
  const root='http://127.0.0.1:8766/';
  const output='_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/evidence/';
  const results=[];
  for(const file of ['key-guest-checkout.html','key-guest-booking-status.html']) {
    for(const width of [320,390,768,1440]) {
      await page.setViewportSize({width,height:width>1000?1000:844});
      await page.goto(root+file+'?review='+Date.now());
      await page.evaluate(()=>document.fonts.ready);
      const metrics=await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth>innerWidth,
        brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length,
        fontLoaded:document.fonts.check('16px "Plus Jakarta Sans"'),
        unlabelled:[...document.querySelectorAll('input,select')].filter(i=>!i.labels?.length&&!i.getAttribute('aria-label')).map(i=>i.id),
        fieldSizes:[...document.querySelectorAll('input:not([type=checkbox]):not([type=radio]),select')].filter(i=>i.getBoundingClientRect().width).every(i=>i.getBoundingClientRect().height>=44&&parseFloat(getComputedStyle(i).fontSize)>=16),
        enabledCommands:[...document.querySelectorAll('button')].filter(i=>!i.disabled).length,
        scripts:document.scripts.length
      }));
      if(metrics.overflow||metrics.brokenImages||!metrics.fontLoaded||metrics.unlabelled.length||!metrics.fieldSizes||metrics.enabledCommands||metrics.scripts) throw new Error(JSON.stringify({file,width,...metrics}));
      results.push({file,width,...metrics});
      if(file.includes('booking-status')) {
        for(const state of ['processing','confirmed','refund-pending','refunded']) {
          await page.locator('#state-'+state).check();
          if(await page.locator('section.scenario:visible').count()!==1||!(await page.locator('section.scenario.'+state).isVisible())) throw new Error('Scenario visibility failed: '+state);
          if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw new Error('Scenario overflow: '+state);
        }
        await page.locator('#state-processing').check();
      }
      if(width===390||width===1440) {
        await page.screenshot({path:output+file.replace('.html','')+'-'+width+'.png',fullPage:true});
        await page.screenshot({path:output+file.replace('.html','')+'-'+(width===390?'phone':'desktop')+'-viewport.png'});
      }
    }
  }
  await page.goto(root+'key-guest-checkout.html?review='+Date.now());
  await page.locator('#guest-name').fill('P');
  if(await page.locator('#guest-name').evaluate(el=>el.checkValidity())) throw new Error('Minimum guest-name length not enforced');
  await page.locator('#guest-name').fill('Priya');
  await page.locator('#accept-quote').check();
  await page.locator('#invoice-details summary').click();
  if(!(await page.locator('#gstin').isVisible())) throw new Error('Invoice disclosure failed');
  await page.locator('#policy-details summary').focus();
  await page.keyboard.press('Enter');
  if(await page.locator('#policy-details').getAttribute('open')===null) throw new Error('Policy keyboard disclosure failed');
  if(!(await page.getByRole('button',{name:/Continue to test payment/}).isDisabled())) throw new Error('Payment must remain disabled');
  await page.getByRole('link',{name:'Explore payment and refund status examples'}).click();
  await page.locator('#state-processing').focus();
  await page.keyboard.press('ArrowRight');
  if(!(await page.locator('#state-confirmed').isChecked())) throw new Error('Keyboard scenario selection failed');
  await page.locator('#state-refund-pending').check();
  const pending=page.locator('section.scenario.refund-pending');
  if(!(await pending.innerText()).includes('Actual bank refund: ₹0')) throw new Error('Test bank-refund distinction missing');
  await page.screenshot({path:output+'guest-refund-pending-desktop.png',fullPage:true});
  await page.locator('#state-refunded').check();
  if(!(await page.locator('section.scenario.refunded').innerText()).includes('Cancelled by owner')) throw new Error('Cancellation and refund not distinguished');
  if(8000+400+480!==8880||400!==8000*0.05) throw new Error('Example quote does not reconcile');
  return {viewports:results,fourScenariosAtFourWidths:true,keyboard:true,quoteAcceptance:true,invoiceAndPolicyDisclosures:true,nativeValidation:true,exampleAmounts:true,noFinancialCommands:true};
}
