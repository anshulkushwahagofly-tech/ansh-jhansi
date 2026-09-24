const fs = require('fs');
const path = require('path');
const assetsDir = path.join(__dirname, 'assets');
let jsFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));
for (let f of jsFiles) {
    let t = fs.readFileSync(path.join(assetsDir, f), 'utf8');
    let regex = /.{0,20}absolutePath:.{0,100}/g;
    let match = t.match(regex);
    if (match) {
        console.log("In " + f + ":");
        console.log(match);
    }
}
