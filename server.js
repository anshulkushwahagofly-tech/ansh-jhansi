const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
    '.wasm': 'application/wasm',
    '.drc': 'application/octet-stream',
    '.ktx2': 'application/octet-stream'
};

http.createServer(function (request, response) {
    console.log('request ', request.url);
    let filePath = '.' + request.url;
    if (filePath === './') filePath = './index.html';
    
    // Remove query strings
    filePath = filePath.split('?')[0];

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){ console.log('404 Not Found: ', filePath);
                response.writeHead(404);
                response.end('404');
            }
            else {
                response.writeHead(500);
                response.end('500');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
