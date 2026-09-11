const fs = require('fs');

const gq = fs.readFileSync('current_gq_code.js', 'utf8');

// Let's search for "selectedTemplate" in gq
let pos = 0;
while (true) {
  const p = gq.indexOf('selectedTemplate', pos);
  if (p === -1) break;
  console.log('Pos:', p, gq.slice(Math.max(0, p - 30), Math.min(gq.length, p + 100)));
  pos = p + 16;
}
