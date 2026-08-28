const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

const p = 1977761;
const vqSlice = bundle.slice(p, p + 25000);

// Check all getOff calls in VQ
const offMatches = vqSlice.match(/getOff\("[^"]+"\)/g);
console.log('getOff calls in VQ:', [...new Set(offMatches)]);

// Check all registerCoord calls in VQ
const coordMatches = vqSlice.match(/registerCoord\("[^"]+"/g);
console.log('registerCoord calls in VQ:', [...new Set(coordMatches)]);
