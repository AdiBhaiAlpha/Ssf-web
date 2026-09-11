const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

const p = 1977761;
console.log('--- VQ.drawLayers (1977761) slice ---');
console.log(bundle.slice(p, p + 4000));
