const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    
    async function checkSite(url) {
        console.log('\n--- Checking ' + url + ' ---');
        const page = await browser.newPage();
        
        page.on('response', response => {
            if (!response.ok()) {
                console.log('BAD RESPONSE:', response.url(), response.status());
            }
        });
        
        await page.goto(url, { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 5000));
        await page.close();
    }

    await checkSite('https://igloo-clone-gamma.vercel.app/');
    
    await browser.close();
})();
