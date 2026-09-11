const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

// Find GQ function in bundle
const gqPos = bundle.indexOf('function GQ(');
console.log('GQ position:', gqPos);

// Search for `const templates` inside GQ
const gqSlice = bundle.slice(gqPos, gqPos + 10000);
const tmplMatch = gqSlice.match(/const\s+templates\s*=\s*\[[\s\S]*?\];/);
if (tmplMatch) {
  console.log('Found templates inside GQ:');
  console.log(tmplMatch[0]);
} else {
  console.log('Templates not found in first 10000 chars of GQ. Let us search further.');
  const allTmpl = bundle.slice(gqPos, gqPos + 40000).match(/templates\s*=\s*\[[\s\S]*?\];/);
  if (allTmpl) {
    console.log('Found templates inside GQ (expanded):');
    console.log(allTmpl[0].slice(0, 3000));
  }
}
