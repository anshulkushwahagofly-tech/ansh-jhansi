const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('</script>', 'setTimeout(()=>{if(document.querySelector(".canvas-container") && window.updateOverlay){window.updateOverlay(0);}}, 5000);\n</script>');
fs.writeFileSync('index.html', html);
