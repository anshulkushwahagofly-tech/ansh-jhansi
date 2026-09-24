const fs = require('fs');
let t = fs.readFileSync('assets/App3D-f554a111_v2.js', 'utf8');

// Replace Oe(this,"absolutePath",".")
t = t.split('Oe(this,"absolutePath",".")').join('Oe(this,"absolutePath",(window.location.origin+window.location.pathname).replace(/\\/$/,""))');

// Replace this.absolutePath=`${"."}`
t = t.split('this.absolutePath=`${"."}`').join('this.absolutePath=`${(window.location.origin+window.location.pathname).replace(/\\/$/,"")}`');

fs.writeFileSync('assets/App3D-f554a111_v2.js', t, 'utf8');
console.log("Fixed absolutePath");
