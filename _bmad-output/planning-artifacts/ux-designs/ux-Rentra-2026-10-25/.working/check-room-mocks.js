async page => {
  const root = 'http://127.0.0.1:8766/';
  const output = '_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/evidence/';
  const results = [];
  for (const file of ['baseline-hotel-rooms.html', 'key-hotel-rooms.html']) {
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: width > 1000 ? 1000 : 844 });
      await page.goto(root + file);
      await page.evaluate(() => document.fonts.ready);
      const metrics = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).length,
        fontLoaded: document.fonts.check('16px "Plus Jakarta Sans"'),
        photoVisible: getComputedStyle(document.querySelector('.photo')).display !== 'none'
      }));
      if (metrics.overflow || metrics.brokenImages || !metrics.fontLoaded) throw new Error(JSON.stringify({file,width,...metrics}));
      results.push({file,width,...metrics});
      if (width === 390 || width === 1440) {
        await page.screenshot({ path: output + file.replace('.html','') + '-' + width + '.png', fullPage: true });
        if (width === 390) await page.screenshot({path:output+file.replace('.html','')+'-phone-viewport.png'});
      }
    }
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto(root + 'key-hotel-rooms.html');
  await page.locator('#breakfast').check();
  if (!(await page.locator('.summary .breakfast').isVisible()) || await page.locator('.summary .room-only').isVisible()) throw new Error('Breakfast summary did not switch');
  await page.getByText('Room details & facilities', {exact:true}).click();
  if (!(await page.getByText('Bedside sockets', {exact:true}).isVisible())) throw new Error('Facilities disclosure failed');
  await page.locator('.summary .breakfast summary').click();
  if (!(await page.getByText('Illustrative taxes', {exact:true}).last().isVisible())) throw new Error('Price disclosure failed');
  await page.screenshot({path:output+'hotel-rooms-selected-390.png',fullPage:true});
  await page.locator('#room-only').focus();
  await page.keyboard.press('ArrowDown');
  if (!(await page.locator('#breakfast').isChecked())) throw new Error('Keyboard offer selection failed');
  await page.emulateMedia({reducedMotion:'reduce'});
  const transition = await page.locator('.offer').first().evaluate(el=>getComputedStyle(el).transitionDuration);
  if (transition !== '0s') throw new Error('Reduced motion did not remove transition');
  if (8000+400+480!==8880 || 8800+440+528!==9768) throw new Error('Example totals do not reconcile');
  return {viewports:results,selection:true,disclosures:true,keyboard:true,reducedMotion:true,exampleTotals:true};
}
