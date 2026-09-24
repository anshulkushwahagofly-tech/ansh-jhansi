const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
let jsFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));

for (let f of jsFiles) {
    let p = path.join(assetsDir, f);
    let t = fs.readFileSync(p, 'utf8');
    if (t.includes('absolutePath:"."')) {
        console.log('Fixed q.absolutePath in', f);
        t = t.replace('absolutePath:"."', 'absolutePath:(window.location.origin+window.location.pathname).replace(/\\/$/,"")');
        fs.writeFileSync(p, t, 'utf8');
    }
    if (t.includes('absolutePath: "."')) {
        console.log('Fixed q.absolutePath in', f);
        t = t.replace('absolutePath: "."', 'absolutePath:(window.location.origin+window.location.pathname).replace(/\\/$/,"")');
        fs.writeFileSync(p, t, 'utf8');
    }
}
