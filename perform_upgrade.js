const fs = require('fs');

console.log('--- Applying Full Editor & Font Upgrade to Reconstructed Bundle ---');

const baseBundle = fs.readFileSync('reconstructed_bundle.js', 'utf8');
const vqReplacement = fs.readFileSync('vq_replacement.js', 'utf8');
const gqReplacement = fs.readFileSync('gq_replacement.js', 'utf8');

console.log('Base bundle length:', baseBundle.length);

// 1. Locate VQ range
const vqStart = baseBundle.indexOf('class VQ{');
const opStart = baseBundle.indexOf('class op{', vqStart);

if (vqStart === -1 || opStart === -1) {
  console.error('Could not find VQ or op in base bundle!');
  process.exit(1);
}

console.log('Replacing VQ from', vqStart, 'to', opStart);
let step1 = baseBundle.slice(0, vqStart) + vqReplacement + '\n' + baseBundle.slice(opStart);

// 2. Locate GQ range in step1
const gqStart = step1.indexOf('function GQ({item:n,onClose:e}){');
const wqStart = step1.indexOf('function WQ({item:n,db:e,onClose:t,onRefresh:s', gqStart);

if (gqStart === -1 || wqStart === -1) {
  console.error('Could not find GQ or WQ in step1 bundle!');
  process.exit(1);
}

console.log('Replacing GQ from', gqStart, 'to', wqStart);
let finalBundle = step1.slice(0, gqStart) + gqReplacement + '\n' + step1.slice(wqStart);

// Write to final bundle location
fs.writeFileSync('assets/index-DkKEx6Oj.js', finalBundle, 'utf8');
console.log('Successfully written assets/index-DkKEx6Oj.js! Final length:', finalBundle.length);

// Backup clean reconstructed base as well
fs.writeFileSync('assets/index-DkKEx6Oj.clean-base.js', baseBundle, 'utf8');
