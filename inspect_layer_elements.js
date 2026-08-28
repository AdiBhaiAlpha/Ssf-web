const fs = require('fs');

const gq = fs.readFileSync('current_gq_code.js', 'utf8');

const p = gq.indexOf('layerElements');
console.log('layerElements definition:');
console.log(gq.slice(p, p + 1200));
