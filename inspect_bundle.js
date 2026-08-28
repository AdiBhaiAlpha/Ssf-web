const fs = require('fs');

const code = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');
console.log('Current index-DkKEx6Oj.js size:', code.length);

const vqMatch = code.indexOf('class VQ');
const gqMatch = code.indexOf('function GQ');
const opMatch = code.indexOf('class op');
const wqMatch = code.indexOf('function WQ');

console.log('VQ index:', vqMatch);
console.log('GQ index:', gqMatch);
console.log('op index:', opMatch);
console.log('WQ index:', wqMatch);
