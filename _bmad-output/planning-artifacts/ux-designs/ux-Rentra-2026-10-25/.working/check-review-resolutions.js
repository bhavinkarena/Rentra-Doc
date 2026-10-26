async page => {
  const root='http://127.0.0.1:8767/';
  const results=[];
  for(const width of [320,390,768,1440]) {
    await page.setViewportSize({width,height:width>1000?1000:844});
    await page.goto(root+'mockups/key-guest-checkout.html?resolution='+Date.now());
    await page.evaluate(()=>document.fonts.ready);
    const guest=page.getByRole('textbox',{name:'Lead guest name · Room 1 · Twin room',exact:true});
    if(await guest.count()!==1) throw new Error('Lead guest name not exposed in accessible field label');
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw new Error('Checkout overflow after label clarification');
    await page.goto(root+'mockups/key-admin-support.html?resolution='+Date.now());
    if(!(await page.locator('#case-priority').inputValue()).startsWith('Urgent')) throw new Error('Access-denial example not urgent');
    await page.locator('#reply-internal').check();
    if(await page.locator('#reply-state').isVisible()) throw new Error('Internal note exposes status command');
    if(await page.locator('button:enabled').count()) throw new Error('Preview command enabled');
    results.push({width,leadGuestLabel:true,checkoutOverflow:false,accessDenialUrgent:true,internalNoteSeparated:true,commandsDisabled:true});
  }
  await page.goto(root+'mockups/key-admin-refund-decision.html?resolution='+Date.now());
  if((await page.locator('body').innerText()).includes('not an existing delivered financial workflow or an approved visual result')) throw new Error('Stale visual approval statement');
  await page.goto(root+'validation-report.html?resolution='+Date.now());
  await page.setViewportSize({width:390,height:844});
  const phoneOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  if(phoneOverflow) throw new Error('Validation report phone overflow');
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:'_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/evidence/validation-report-desktop.png',fullPage:true});
  return {resolvedFindings:results,refundVisualApprovalConsistent:true,validationReportPhoneOverflow:false};
}
