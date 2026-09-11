const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');
const vqPos = bundle.indexOf('class VQ');
console.log('VQ position:', vqPos);
console.log('Snippet before VQ:', bundle.slice(vqPos - 200, vqPos));
