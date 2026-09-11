const fs = require('fs');

const gq = fs.readFileSync('current_gq_code.js', 'utf8');

// Find all occurrences of template or templates
const lines = gq.split('\n');
console.log('GQ line count:', lines.length);

// Let's find template lists or array
const regex = /\[\s*\{\s*id:\s*1\s*,/g;
let m;
while ((m = regex.exec(gq)) !== null) {
  console.log('Found template list at pos:', m.index);
  console.log(gq.slice(m.index, m.index + 2000));
}
