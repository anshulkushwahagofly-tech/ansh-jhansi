const fs = require('fs');
let t = fs.readFileSync('assets/App3D-f554a111_v2.js', 'utf8');

t = t.replace(/vdb:"i_64"/g, 'vdb:"peachesbody_64"');
t = t.replace(/vdb:"s_64"/g, 'vdb:"peachesbody_64"');
t = t.replace(/vdb:"f_64"/g, 'vdb:"peachesbody_64"');

fs.writeFileSync('assets/App3D-f554a111_v2.js', t, 'utf8');
console.log("Reverted to safe volumes");
