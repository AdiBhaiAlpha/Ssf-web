const fs = require('fs');

const vq = fs.readFileSync('extracted_vq_full.js', 'utf8');

// Let's search for all drawing sections and registerCoord calls in all 5 blocks
const lines = vq.split('\n');
console.log('Total VQ lines:', lines.length);

lines.forEach((line, idx) => {
  if (line.includes('registerCoord') || line.includes('drawImage') || line.includes('fillText') || line.includes('getOff')) {
    console.log(`Line ${idx + 1}: ${line.trim().slice(0, 100)}`);
  }
});
