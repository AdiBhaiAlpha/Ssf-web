const fs = require('fs');

// Check if assets/index-DkKEx6Oj.js contains any references to BorbilaPhotoCardV2 and where they are
const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

console.log('Bundle length:', bundle.length);

const occurrences = [];
let idx = -1;
while ((idx = bundle.indexOf('BorbilaPhotoCardV2', idx + 1)) !== -1) {
  const context = bundle.slice(Math.max(0, idx - 50), Math.min(bundle.length, idx + 100));
  occurrences.push({ index: idx, context });
}

console.log(`Found ${occurrences.length} references in final bundle:`);
occurrences.forEach((occ, i) => {
  console.log(`[${i}] Index ${occ.index}: ${occ.context.replace(/\n/g, ' ')}`);
});
