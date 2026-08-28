const fs = require('fs');

const bundle = fs.readFileSync('reconstructed_bundle.js', 'utf8');
const opPos = bundle.indexOf('class op{');
console.log('class op pos:', opPos);
console.log(bundle.slice(opPos, opPos + 1500));
