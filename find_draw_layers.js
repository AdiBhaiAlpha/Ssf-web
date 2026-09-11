const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

let pos = 0;
while (true) {
  const p = bundle.indexOf('drawLayers', pos);
  if (p === -1) break;
  console.log('drawLayers found at:', p, bundle.slice(Math.max(0, p - 30), Math.min(bundle.length, p + 100)));
  pos = p + 10;
}
