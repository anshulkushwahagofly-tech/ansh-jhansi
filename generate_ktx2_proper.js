const fs = require('fs');
const { createDefaultContainer, write, VK_FORMAT_R8G8B8A8_UNORM } = require('ktx-parse');

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
    const pixels = new Uint8Array(dim * dim * dim * 4);
    let offset = 0;
    
    // Bounds mapping
    for(let z=0; z<dim; z++) {
        for(let y=0; y<dim; y++) {
            for(let x=0; x<dim; x++) {
                let px = (x / (dim-1)) * 2 - 1;
                let py = (y / (dim-1)) * 2 - 1;
                let pz = (z / (dim-1)) * 2 - 1;

                py = -py;

                let d = sdfFunc(px, py, pz);

                let eps = 0.01;
                let dx = sdfFunc(px+eps, py, pz) - sdfFunc(px-eps, py, pz);
                let dy = sdfFunc(px, py+eps, pz) - sdfFunc(px, py-eps, pz);
                let dz = sdfFunc(px, py, pz+eps) - sdfFunc(px, py, pz-eps);
                let grad = normalize([dx, dy, dz]);

                let r = Math.max(0, Math.min(255, Math.floor((grad[0]*0.5+0.5)*255)));
                let g = Math.max(0, Math.min(255, Math.floor((grad[1]*0.5+0.5)*255)));
                let b = Math.max(0, Math.min(255, Math.floor((grad[2]*0.5+0.5)*255)));

                let aFloat = d / 4.0 + 0.5;
                let a = Math.max(0, Math.min(255, Math.floor(aFloat*255)));

                pixels[offset++] = r;
                pixels[offset++] = g;
                pixels[offset++] = b;
                pixels[offset++] = a;
            }
        }
    }

    const container = createDefaultContainer();
    container.vkFormat = VK_FORMAT_R8G8B8A8_UNORM;
    container.typeSize = 1;
    container.pixelWidth = dim;
    container.pixelHeight = dim;
    container.pixelDepth = dim;
    container.layerCount = 0;
    container.faceCount = 1;
    container.levelCount = 1;
    container.supercompressionScheme = 0; // None

    container.levels = [{
        levelData: pixels,
        uncompressedByteLength: pixels.byteLength
    }];

    // Minimal valid DFD for RGBA
    container.dataFormatDescriptor = [{
        vendorId: 0,
        descriptorType: 0,
        versionNumber: 2,
        descriptorBlockSize: 24,
        colorModel: 1, // KHR_DF_MODEL_RGBSDA
        colorPrimaries: 1, // BT709
        transferFunction: 2, // SRGB
        flags: 0,
        texelBlockDimension: [0, 0, 0, 0],
        bytesPlane: [4, 0, 0, 0, 0, 0, 0, 0],
        samples: [
            { bitOffset: 0, bitLength: 7, channelType: 0, samplePosition: [0,0,0,0], sampleLower: 0, sampleUpper: 255 },
            { bitOffset: 8, bitLength: 7, channelType: 1, samplePosition: [0,0,0,0], sampleLower: 0, sampleUpper: 255 },
            { bitOffset: 16, bitLength: 7, channelType: 2, samplePosition: [0,0,0,0], sampleLower: 0, sampleUpper: 255 },
            { bitOffset: 24, bitLength: 7, channelType: 3, samplePosition: [0,0,0,0], sampleLower: 0, sampleUpper: 255 }
        ]
    }];

    const ktx2Data = write(container);
    fs.writeFileSync(filename, Buffer.from(ktx2Data));
    console.log("Wrote " + filename);
}

generateKTX2('assets/images/volumes/f_64.ktx2', sdfF);
generateKTX2('assets/images/volumes/i_64.ktx2', sdfI);
generateKTX2('assets/images/volumes/s_64.ktx2', sdfS);
