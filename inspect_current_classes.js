const fs = require('fs');

const current = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');
console.log('Current length:', current.length);

const vqPos = current.indexOf('class VQ');
console.log('VQ position:', vqPos);

// Check if we can find other classes
console.log('indexOf class P5:', current.indexOf('class P5'));
console.log('indexOf class op:', current.indexOf('class op'));
console.log('indexOf class tf:', current.indexOf('class tf'));
console.log('indexOf class ef:', current.indexOf('class ef'));
console.log('indexOf class i1:', current.indexOf('class i1'));
console.log('indexOf class zS:', current.indexOf('const zS=') !== -1 || current.indexOf('var zS=') !== -1 || current.indexOf('zS=[') !== -1);
