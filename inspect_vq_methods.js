const fs = require('fs');

const vq = fs.readFileSync('extracted_vq_full.js', 'utf8');

console.log('VQ methods:');
const methods = vq.match(/static\s+([a-zA-Z0-9_]+)\s*\(/g);
console.log(methods);

console.log('Template blocks in VQ:');
const tmplBlocks = vq.match(/\/\/\s*---\s*TEMPLATE[\s\S]*?(?=\/\/\s*---\s*TEMPLATE|$)/g);
if (tmplBlocks) {
  tmplBlocks.forEach((b, i) => {
    console.log(`Block ${i + 1}:`, b.slice(0, 80));
  });
}
