const fs = require('fs');
const zlib = require('zlib');

const bak = fs.readFileSync('assets/index-DkKEx6Oj.js.bak');

// Scan for gzip magic number 0x1f, 0x8b
for (let i = 0; i < bak.length - 1; i++) {
  if (bak[i] === 0x1f && bak[i+1] === 0x8b) {
    console.log('Found gzip magic number at offset:', i);
    try {
      const decompressed = zlib.gunzipSync(bak.slice(i));
      console.log('Decompressed successfully! Length:', decompressed.length);
      fs.writeFileSync('decompressed_bundle.js', decompressed);
    } catch(e) {
      console.log('Gzip at offset', i, 'failed:', e.message);
    }
  }
}
