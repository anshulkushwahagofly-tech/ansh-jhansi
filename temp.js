const fs = require('fs');
let t = fs.readFileSync('assets/App3D-f554a111_v2.js', 'utf8');
t = t.replace(/vdb:"peachesbody_64"/g, 'vdb:"i_64"');
fs.writeFileSync('assets/App3D-f554a111_v2.js', t, 'utf8');
