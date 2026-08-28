const fs = require('fs');

const gq = fs.readFileSync('current_gq_code.js', 'utf8');

// Find offsets in GQ
let pos = 0;
while (true) {
  const p = gq.indexOf('offsets', pos);
  if (p === -1) break;
  console.log('GQ offsets at pos:', p, gq.slice(Math.max(0, p - 30), Math.min(gq.length, p + 120)));
  pos = p + 7;
}
