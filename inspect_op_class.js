const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

const opPos = bundle.indexOf('class op{');
console.log('opPos:', opPos);
if (opPos !== -1) {
  console.log(bundle.slice(opPos, opPos + 3500));
}
