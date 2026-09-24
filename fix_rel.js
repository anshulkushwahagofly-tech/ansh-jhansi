const fs = require('fs');
let t = fs.readFileSync('assets/App3D-f554a111_v2.js', 'utf8');

let findStr = 'this.absolutePath=`${"."}${this.relativePath';
let replaceStr = 'this.absolutePath=`${(window.location.origin+window.location.pathname).replace(/\\/$/,"")}${this.relativePath';

if(t.includes(findStr)) {
    t = t.replace(findStr, replaceStr);
    fs.writeFileSync('assets/App3D-f554a111_v2.js', t, 'utf8');
    console.log("Fixed setRelativePath!");
} else {
    console.log("NOT FOUND!");
}
