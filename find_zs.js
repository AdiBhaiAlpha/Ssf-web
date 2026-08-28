const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

// Find where zS is declared
const zsMatches = [];
let pos = 0;
while (true) {
  const p = bundle.indexOf('zS', pos);
  if (p === -1) break;
  zsMatches.push(p);
  pos = p + 2;
}

console.log('zS matches count:', zsMatches.length);
zsMatches.forEach(p => {
  console.log(p, bundle.slice(Math.max(0, p - 30), Math.min(bundle.length, p + 120)));
});
