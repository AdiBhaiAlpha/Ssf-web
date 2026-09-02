const fs = require('fs');
const bundle = fs.readFileSync('bundle_with_28_templates.js', 'utf8');

function findOccurrences(str, contextLength = 200) {
  let idx = -1;
  const results = [];
  while ((idx = bundle.indexOf(str, idx + 1)) !== -1) {
    const start = Math.max(0, idx - contextLength);
    const end = Math.min(bundle.length, idx + str.length + contextLength);
    results.push({
      index: idx,
      context: bundle.slice(start, end)
    });
  }
  return results;
}

console.log('=== PhotoCardModalHost ===');
const occurrences = findOccurrences('PhotoCardModalHost', 100);
occurrences.forEach((occ, i) => {
  console.log(`[${i}] Index: ${occ.index}`);
  console.log(occ.context);
  console.log('-'.repeat(40));
});

console.log('=== Borbila ===');
const borbilaOcc = findOccurrences('Borbila', 100);
console.log(`Found ${borbilaOcc.length} occurrences`);

console.log('=== Photo Card Maker ===');
const pcmOcc = findOccurrences('Photo Card Maker', 100);
console.log(`Found ${pcmOcc.length} occurrences`);
