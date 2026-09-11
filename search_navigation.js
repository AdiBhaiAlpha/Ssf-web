const fs = require('fs');

const bundle = fs.readFileSync('bundle_with_28_templates.js', 'utf8');

function searchAll(term) {
  let idx = -1;
  const results = [];
  while ((idx = bundle.indexOf(term, idx + 1)) !== -1) {
    const context = bundle.slice(Math.max(0, idx - 150), Math.min(bundle.length, idx + term.length + 150));
    results.push({ idx, context });
  }
  return results;
}

const terms = ['"photocard"', "'photocard'", 'ফটোকার্ড', 'তিনটি', 'three-dot', 'menu'];
terms.forEach(term => {
  const occs = searchAll(term);
  console.log(`=== Matches for: ${term} (Count: ${occs.length}) ===`);
  occs.slice(0, 10).forEach((occ, i) => {
    console.log(`[${i}] Index ${occ.idx}:\n${occ.context.replace(/\n/g, ' ')}\n`);
  });
});
