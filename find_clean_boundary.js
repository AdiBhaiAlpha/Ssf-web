const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

// Scan backwards from 950000 to find where normal printable characters end
let goodIndex = 950000;
for (let i = 950000; i >= 0; i--) {
  const code = bundle.charCodeAt(i);
  // normal ascii or bengali range (0x0980 - 0x09ff) or basic latin
  if ((code >= 32 && code <= 126) || code === 10 || code === 13 || code === 9 || (code >= 0x0980 && code <= 0x09ff)) {
    // printable
  } else {
    goodIndex = i;
  }
}
console.log('Last non-printable character found at index:', goodIndex);
console.log('Code around goodIndex - 100 to goodIndex + 100:');
console.log(bundle.slice(Math.max(0, goodIndex - 100), goodIndex + 100));
