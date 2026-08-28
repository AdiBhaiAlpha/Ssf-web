const fs = require('fs');
const zlib = require('zlib');

const raw = fs.readFileSync('assets/index-DkKEx6Oj.js.bak');
console.log('Searching for zlib headers in raw...');

for (let i = 500000; i < 600000; i++) {
  if (raw[i] === 0x78 && (raw[i+1] === 0x9c || raw[i+1] === 0x01 || raw[i+1] === 0xda || raw[i+1] === 0x5e)) {
    console.log('Testing inflate at offset:', i);
    try {
      const decomp = zlib.inflateSync(raw.slice(i));
      console.log('SUCCESS! Decompressed length:', decomp.length);
      fs.writeFileSync('restored_tail.js', decomp);
      console.log('Restored tail start:', decomp.slice(0, 200).toString('utf8'));
      console.log('Restored tail end:', decomp.slice(-200).toString('utf8'));
      break;
    } catch(e) {
      console.log('Offset', i, 'failed:', e.message);
    }
  }
}
