const fs = require('fs');
let t = fs.readFileSync('assets/App3D-f554a111_v2.js', 'utf8');

const targetStr = 'e===-1?this.parent.currentLink=this.parent.currentLink===0?this.parent.vdbs.length-1:this.parent.currentLink-1:this.parent.currentLink=(this.parent.currentLink+1)%this.parent.vdbs.length,';
const newStr = targetStr + 'window.updateOverlay&&window.updateOverlay(this.parent.currentLink),';

t = t.replace(targetStr, newStr);
fs.writeFileSync('assets/App3D-f554a111_v2.js', t, 'utf8');
console.log("Injected window.updateOverlay hook");
