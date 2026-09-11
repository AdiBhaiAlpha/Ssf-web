const fs = require('fs');

let vq = fs.readFileSync('extracted_vq_full.js', 'utf8');

// Find getOff in VQ
const p = vq.indexOf('const getOff');
console.log('getOff in VQ:');
console.log(vq.slice(p, p + 250));
