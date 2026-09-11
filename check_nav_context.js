const fs = require('fs');

const bundle = fs.readFileSync('bundle_with_28_templates.js', 'utf8');

const targetIdx = 841411;
const start = Math.max(0, targetIdx - 300);
const end = Math.min(bundle.length, targetIdx + 300);

console.log('=== Navigation Array Context ===');
console.log(bundle.slice(start, end));
