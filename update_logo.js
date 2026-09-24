const fs = require('fs');

// 1. Hide the 3D logo in App3D
let t = fs.readFileSync('assets/App3D-f554a111_v2.js', 'utf8');
t = t.replace('this.mesh.scale.set(e,t,1),this.mesh.position.set(this.scene.meshMarginLeft,-this.scene.meshMarginTop,0)',
'this.mesh.scale.set(0,0,0),this.mesh.position.set(this.scene.meshMarginLeft,-this.scene.meshMarginTop,0)');
fs.writeFileSync('assets/App3D-f554a111_v2.js', t, 'utf8');
console.log("Hid 3D logo");

// 2. Add Anshuu logo and keywords to index.html
let html = fs.readFileSync('index.html', 'utf8');

// Add SEO keywords in head
const keywords = `<meta name="keywords" content="Anshul Kushwaha, WordPress Developer, SEO Expert, Google Ads Specialist, Social Media Marketer, Digital Marketing Jhansi, Web Development, WooCommerce, Local SEO, PPC Campaigns, Freelance Developer UP, Best SEO Expert India, Anshuu">`;
html = html.replace('</head>', keywords + '\n</head>');

// Add Anshuu logo to body
const customLogo = `<div id="anshuu-logo" style="position:fixed; top:40px; left:40px; z-index:9999; color:white; font-family: monospace, sans-serif; font-size:2rem; font-weight:bold; letter-spacing:4px; pointer-events:none; text-shadow: 0 0 10px rgba(255,255,255,0.5);">ANSHUU</div>`;
html = html.replace('<body>', '<body>\n' + customLogo);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated index.html");
