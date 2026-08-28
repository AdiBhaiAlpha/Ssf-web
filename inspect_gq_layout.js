const fs = require('fs');

const gq = fs.readFileSync('current_gq_code.js', 'utf8');

console.log('GQ character length:', gq.length);
console.log('--- FIRST 2000 chars of GQ ---');
console.log(gq.slice(0, 2000));

console.log('--- RETURN statement / Layout structure of GQ ---');
const returnPos = gq.indexOf('return i.jsxs(') !== -1 ? gq.indexOf('return i.jsxs(') : gq.indexOf('return i.jsx(');
console.log('Return pos:', returnPos);
if (returnPos !== -1) {
  console.log(gq.slice(returnPos, returnPos + 3500));
}
