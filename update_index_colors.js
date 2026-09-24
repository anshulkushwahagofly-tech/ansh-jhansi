const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Strip out the old overlay HTML
html = html.replace(/<div id="social-overlay-container"[\s\S]*?<\/div>\n<\/div>/, '');

// Strip out the old script block
html = html.replace(/<script>\s*window\.updateOverlay[\s\S]*?<\/script>/, '');

// Insert the new script block
const newScript = `
<script>
    window.appMesh = null;
    window.updateOverlay = function(index, mesh) {
        if(mesh) window.appMesh = mesh;
        const targetMesh = mesh || window.appMesh;
        
        if (targetMesh && targetMesh.material && targetMesh.material.uniforms) {
            const colors = [
                { L: '#a0d8f1', D: '#0077b5' }, // 0: LinkedIn (Ice Blue)
                { L: '#ffb3ba', D: '#d62976' }, // 1: Instagram (Light Pink / Insta Pink)
                { L: '#fff9aa', D: '#fffc00' }, // 2: Snapchat (Light Yellow)
                { L: '#a8c7fa', D: '#1877F2' }  // 3: Facebook (Light Blue)
            ];
            const c = colors[index];
            if(c) {
                targetMesh.material.uniforms.uColorLight.value.set(c.L);
                targetMesh.material.uniforms.uColorDark.value.set(c.D);
                targetMesh.material.uniforms.uColorFast.value.set('#ffffff');
            }
        }
    };
    
    // Initial color set after load
    setTimeout(()=>{
        if(window.updateOverlay){ window.updateOverlay(0); }
    }, 5000);
</script>
`;

html = html.replace('</body>', newScript + '\n</body>');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated index.html with color logic");
