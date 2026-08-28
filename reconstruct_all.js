const fs = require('fs');
const zlib = require('zlib');

const raw = fs.readFileSync('assets/index-DkKEx6Oj.js.bak');
console.log('Total raw length:', raw.length);

let offset = 0;
// First part is plaintext
const firstChunk = raw.slice(0, 523856);
console.log('First plaintext chunk length:', firstChunk.length);

const chunks = [firstChunk];

let currentPos = 523856;
while (currentPos < raw.length) {
  let found = false;
  for (let i = currentPos; i < raw.length - 1; i++) {
    if (raw[i] === 0x78 && (raw[i+1] === 0x9c || raw[i+1] === 0x01 || raw[i+1] === 0xda || raw[i+1] === 0x5e)) {
      try {
        const decomp = zlib.inflateSync(raw.slice(i));
        console.log(`Decompressed chunk at ${i}, length: ${decomp.length}`);
        chunks.push(decomp);
        // Find how many bytes were consumed by checking zlib or scanning
        found = true;
        // Search next zlib stream from i + 10
        currentPos = i + 100;
        break;
      } catch(e) {
        // continue
      }
    }
  }
  if (!found) {
    console.log('No more zlib streams found after', currentPos);
    break;
  }
}

const fullReconstructed = Buffer.concat(chunks);
console.log('Reconstructed total length:', fullReconstructed.length);
fs.writeFileSync('reconstructed_bundle.js', fullReconstructed);
