const fs = require('fs');

const vq = fs.readFileSync('extracted_vq_full.js', 'utf8');

// Check offsets helper in VQ
const offPos = vq.indexOf('const getOff');
console.log('getOff implementation:');
console.log(vq.slice(offPos, offPos + 300));

// Check registerCoord implementation
const coordPos = vq.indexOf('const registerCoord');
console.log('registerCoord implementation:');
console.log(vq.slice(coordPos, coordPos + 500));
