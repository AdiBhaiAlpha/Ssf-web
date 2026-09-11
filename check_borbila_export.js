const fs = require('fs');

const borbila = fs.readFileSync('borbila_v2_component.js', 'utf8');

function findContext(phrase, before = 150, after = 150) {
  let idx = -1;
  const results = [];
  while ((idx = borbila.indexOf(phrase, idx + 1)) !== -1) {
    results.push({
      idx,
      text: borbila.slice(Math.max(0, idx - before), Math.min(borbila.length, idx + phrase.length + after))
    });
  }
  return results;
}

const terms = ['toDataURL', 'getContext', 'Font', 'Image', 'Error'];
terms.forEach(term => {
  const occs = findContext(term);
  console.log(`=== Matches for "${term}" (Count: ${occs.length}) ===`);
  occs.slice(0, 5).forEach((occ, i) => {
    console.log(`[${i}] Index ${occ.idx}:\n${occ.text.replace(/\n/g, ' ')}\n`);
  });
});
