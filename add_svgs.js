const fs = require('fs');

const overlayHTML = `
<div id="social-overlay-container" style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:9999; pointer-events:none; opacity:0; transition: opacity 0.3s ease;">
    <div id="svg-0" style="display:none; color:white;">
        <!-- LinkedIn -->
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    </div>
    <div id="svg-1" style="display:none; color:white;">
        <!-- Instagram -->
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    </div>
    <div id="svg-2" style="display:none; color:yellow;">
        <!-- Snapchat -->
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M23.003 16.924c-1.396.177-3.115-.147-3.666-.353-.16-.062-.255.084-.183.21.36.634.618 1.487.618 2.378 0 1.62-1.363 2.148-2.658 2.613-1.121.4-2.483.896-2.483 1.954 0 .093-.056.274-.271.274h-4.717c-.215 0-.271-.18-.271-.274 0-1.058-1.362-1.553-2.484-1.954-1.295-.465-2.657-.993-2.657-2.613 0-.891.258-1.745.617-2.378.072-.126-.023-.272-.183-.21-.551.206-2.27.53-3.666.353-.404-.051-.318-.553.116-.761 1.776-.849 2.502-2.148 2.673-3.09.043-.228-.087-.417-.308-.417h-.988c-.538 0-1.011-.311-1.229-.806-.113-.257-.023-.523.238-.696 1.782-1.189 2.383-3.522 2.457-4.499.043-.574.195-1.744.755-2.735 1.094-1.94 3.033-2.923 5.378-2.923 2.344 0 4.283.984 5.377 2.923.56 1.001.713 2.16.755 2.735.074.977.675 3.31 2.457 4.499.262.173.351.439.238.696-.217.495-.691.806-1.229.806h-.988c-.221 0-.351.189-.308.417.171.942.897 2.241 2.674 3.09.434.208.52.71.115.761z"/></svg>
    </div>
    <div id="svg-3" style="display:none; color:#1877F2;">
        <!-- Facebook -->
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    </div>
</div>

<script>
    window.updateOverlay = function(index) {
        const container = document.getElementById('social-overlay-container');
        // Hide all
        for(let i=0; i<4; i++) {
            const el = document.getElementById('svg-' + i);
            if(el) el.style.display = 'none';
        }
        // Show current
        const current = document.getElementById('svg-' + index);
        if(current) {
            current.style.display = 'block';
            container.style.opacity = '1';
        }
        
        // Auto-hide after a few seconds if you want, but since they are scrolling through links, we can leave it visible,
        // or hide it when they stop interacting. The Igloo text stays on screen.
        clearTimeout(window.overlayTimeout);
        window.overlayTimeout = setTimeout(() => {
            container.style.opacity = '0.3';
        }, 3000);
    };
    
    // Check initial state periodically until App3D is ready
    setInterval(() => {
        if(document.querySelector('.canvas-container') && !window.overlayInit) {
            window.overlayInit = true;
            setTimeout(() => { window.updateOverlay(0); }, 5000); // Trigger after 5s load
        }
    }, 1000);
</script>
`;

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('</body>', overlayHTML + '\n</body>');
fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated index.html with SVGs");
