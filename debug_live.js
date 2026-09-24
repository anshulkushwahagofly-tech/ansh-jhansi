const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    
    async function checkSite(url, out) {
        console.log('\n--- Checking ' + url + ' ---');
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(url, { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 10000));
        await page.screenshot({ path: out });
        await page.close();
    }

    await checkSite('https://igloo-clone-gamma.vercel.app/', 'vercel_live.png');
    
    await browser.close();
})();
