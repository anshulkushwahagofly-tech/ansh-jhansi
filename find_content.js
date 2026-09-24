const fs = require('fs');
const t = fs.readFileSync('assets/App3D-f554a111_v2.js', 'utf8');
let idx = t.indexOf('PORTFOLIO_CO_03 Abstract');
if(idx !== -1) {
    fs.writeFileSync('config_block2.txt', t.substring(idx, idx + 2000));
}
