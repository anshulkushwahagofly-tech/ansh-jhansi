const fs = require('fs');
let t = fs.readFileSync('assets/App3D-f554a111_v2.js', 'utf8');

t = t.replace(/rights:`Igloo, Inc\.\r?\nAll Rights Reserved\.`/, 'rights:`Anshul Kushwaha\\nJhansi, UP.`');

fs.writeFileSync('assets/App3D-f554a111_v2.js', t, 'utf8');
