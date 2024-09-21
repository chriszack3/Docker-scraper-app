import {chromium} from 'playwright';

(async () => { 
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com');
    console.log(await page.title());
    console.log('done')
    await browser.close();
})()

// import {chromium} from 'playwright';

// console.log('Hello, therwe world!');
// console.log(chromium);