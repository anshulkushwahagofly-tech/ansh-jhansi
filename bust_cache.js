const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const htmlFile = path.join(__dirname, 'index.html');

let jsFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));

let renameMap = {};
for (let f of jsFiles) {
    if (!f.includes('_v2')) {
        let newName = f.replace('.js', '_v2.js');
        renameMap[f] = newName;
        fs.renameSync(path.join(assetsDir, f), path.join(assetsDir, newName));
    }
}

function updateFile(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;
        for (let [oldName, newName] of Object.entries(renameMap)) {
            if (content.includes(oldName)) {
                content = content.split(oldName).join(newName);
                changed = true;
            }
        }
        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}

// Update all new js files
let newJsFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));
for (let f of newJsFiles) {
    updateFile(path.join(assetsDir, f));
}

// Update index.html
updateFile(htmlFile);

console.log("Renamed and updated references successfully.");
