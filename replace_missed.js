const fs = require('fs');

let t = fs.readFileSync('assets/App3D-f554a111_v2.js', 'utf8');

// Rights replace
t = t.replace(/rights:`Igloo, Inc\.\nAll Rights Reserved\.`/, 'rights:`Anshul Kushwaha\nJhansi, UP.`');

// Pudgy Penguins replace
t = t.replace(/content:`Pudgy Penguins[\s\S]*?experienced\.`/, 'content:`A professional website is the foundation of every successful online business. Every site I build is modern, fast-loading, and mobile-friendly — designed to convert visitors into customers.\\n\\nCustom Dev, WooCommerce, Landing Pages, Speed Optimization, Security, Responsive, SEO-Friendly.`');

// Overpass replace
t = t.replace(/content:`OverpassIP[\s\S]*?broader market\.`/, 'content:`I deploy advanced SEO strategies that help businesses rank higher and attract quality organic traffic without paying per click. Real, lasting results.\\n\\nKeyword Research, On-Page SEO, Technical SEO, Local SEO, Audit, Link Building, GSC.`');

// Abstract replace
t = t.replace(/content:`Introducing Abstract[\s\S]*?flourish\.`/, 'content:`I create targeted campaigns that put your business in front of exactly the right audience at the right moment — maximizing ROI on every rupee spent.\\n\\nSearch Ads, Display Ads, YouTube Ads, Remarketing, Local Ads, Conversion Tracking.`');

fs.writeFileSync('assets/App3D-f554a111_v2.js', t, 'utf8');
console.log("Re-ran replacements with regex");
