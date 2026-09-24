const fs = require('fs');

function sdBox(px, py, pz, bx, by, bz) {
    let dx = Math.abs(px) - bx;
    let dy = Math.abs(py) - by;
    let dz = Math.abs(pz) - bz;
    return Math.sqrt(Math.max(dx,0)**2 + Math.max(dy,0)**2 + Math.max(dz,0)**2) + Math.min(Math.max(dx, dy, dz), 0.0);
}

function sdfF(px, py, pz) {
    let d1 = sdBox(px+0.15, py, pz, 0.15, 0.6, 0.15); // stem
    let d2 = sdBox(px+0.15, py-0.45, pz, 0.4, 0.15, 0.15); // top bar
    let d3 = sdBox(px+0.05, py, pz, 0.3, 0.15, 0.15); // mid bar
    return Math.min(d1, d2, d3);
}

function sdfI(px, py, pz) {
    let d1 = sdBox(px, py, pz, 0.15, 0.45, 0.15); // stem
    let d2 = sdBox(px, py-0.5, pz, 0.4, 0.15, 0.15); // top bar
    let d3 = sdBox(px, py+0.5, pz, 0.4, 0.15, 0.15); // bot bar
    return Math.min(d1, d2, d3);
}

function sdfS(px, py, pz) {
    let d1 = sdBox(px, py-0.5, pz, 0.4, 0.15, 0.15); // top
    let d2 = sdBox(px, py+0.5, pz, 0.4, 0.15, 0.15); // bot
    let d3 = sdBox(px, py, pz, 0.4, 0.15, 0.15); // mid
    let d4 = sdBox(px-0.25, py-0.25, pz, 0.15, 0.25, 0.15); // top-left
    let d5 = sdBox(px+0.25, py+0.25, pz, 0.15, 0.25, 0.15); // bot-right
    return Math.min(d1, d2, d3, d4, d5);
}

function normalize(v) {
    let len = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
    if(len === 0) return [0,1,0];
    return [v[0]/len, v[1]/len, v[2]/len];
}

function generateKTX2(filename, sdfFunc) {
    const dim = 64;
    const pixels = Buffer.alloc(dim * dim * dim * 4);
    let offset = 0;
    for(let z=0; z<dim; z++) {
        for(let y=0; y<dim; y++) {
            for(let x=0; x<dim; x++) {
                // Map to -1..1
                let px = (x / (dim-1)) * 2 - 1;
                let py = (y / (dim-1)) * 2 - 1;
                let pz = (z / (dim-1)) * 2 - 1;

                py = -py; // flip Y maybe?

                let d = sdfFunc(px, py, pz);

                // gradient
                let eps = 0.01;
                let dx = sdfFunc(px+eps, py, pz) - sdfFunc(px-eps, py, pz);
                let dy = sdfFunc(px, py+eps, pz) - sdfFunc(px, py-eps, pz);
                let dz = sdfFunc(px, py, pz+eps) - sdfFunc(px, py, pz-eps);
                let grad = normalize([dx, dy, dz]);

                // rgb
                let r = Math.max(0, Math.min(255, Math.floor((grad[0]*0.5+0.5)*255)));
                let g = Math.max(0, Math.min(255, Math.floor((grad[1]*0.5+0.5)*255)));
                let b = Math.max(0, Math.min(255, Math.floor((grad[2]*0.5+0.5)*255)));

                // a
                // d = (a * 2.0 - 1.0) * 2.0 => a = (d/2 + 1) / 2 = d/4 + 0.5
                let aFloat = d / 4.0 + 0.5;
                let a = Math.max(0, Math.min(255, Math.floor(aFloat*255)));

                pixels[offset++] = r;
                pixels[offset++] = g;
                pixels[offset++] = b;
                pixels[offset++] = a;
            }
        }
    }

    // Build uncompressed KTX2 header
    // Total header + index = 104 bytes
    // DFD = 92 bytes
    // KVD = 0 bytes (we can skip KVD if kvdByteLength=0, but let's copy x_64 kvd if needed. Actually, three.js KTX2Loader ignores KVD usually).
    // Let's just copy the exact header from x_64.ktx2, set supercompressionScheme=0, and append uncompressed pixels!
    
    const x64 = fs.readFileSync('assets/images/volumes/x_64.ktx2');
    
    // Create new buffer
    const dfdOffset = 104;
    const dfdLength = 92;
    const kvdLength = x64.readUInt32LE(56);
    
    const metaSize = dfdOffset + dfdLength + kvdLength;
    const out = Buffer.alloc(metaSize + pixels.length);
    
    x64.copy(out, 0, 0, metaSize);
    
    // Modify header
    out.writeUInt32LE(0, 40); // supercompressionScheme = 0
    
    // Modify level index (offset 80)
    // byteOffset, byteLength, uncompressedByteLength
    out.writeBigUInt64LE(BigInt(metaSize), 80);
    out.writeBigUInt64LE(BigInt(pixels.length), 88);
    out.writeBigUInt64LE(BigInt(pixels.length), 96);
    
    // Write pixels
    pixels.copy(out, metaSize);
    
    fs.writeFileSync(filename, out);
    console.log("Wrote " + filename);
}

generateKTX2('assets/images/volumes/f_64.ktx2', sdfF);
generateKTX2('assets/images/volumes/i_64.ktx2', sdfI);
generateKTX2('assets/images/volumes/s_64.ktx2', sdfS);
