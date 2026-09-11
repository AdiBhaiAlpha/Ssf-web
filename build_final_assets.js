const fs = require('fs');

console.log('--- Building Final assets/index-DkKEx6Oj.js from bundle_with_28_templates.js ---');

const baseBundle = fs.readFileSync('bundle_with_28_templates.js', 'utf8');
const vqReplacement = fs.readFileSync('vq_replacement.js', 'utf8');
const gqReplacement = fs.readFileSync('gq_replacement.js', 'utf8');

console.log('Base clean bundle length:', baseBundle.length);

// 1. Locate VQ range in bundle_with_28_templates.js
const vqStart = baseBundle.indexOf('class VQ {');
const opStart = baseBundle.indexOf('class op{', vqStart);

if (vqStart === -1 || opStart === -1) {
  console.error('Could not find class VQ or class op in base bundle!');
  process.exit(1);
}

console.log('Replacing VQ from', vqStart, 'to', opStart);
let step1 = baseBundle.slice(0, vqStart) + vqReplacement + '\n' + baseBundle.slice(opStart);

// 2. Locate GQ range in step1
const gqStart = step1.indexOf('function GQ({');
const wqStart = step1.indexOf('function WQ({', gqStart);

if (gqStart === -1 || wqStart === -1) {
  console.error('Could not find GQ or WQ in step1 bundle!');
  process.exit(1);
}

console.log('Replacing GQ from', gqStart, 'to', wqStart);
const borbilaV2 = fs.readFileSync('borbila_v2_component.js', 'utf8');
const modalHost = fs.readFileSync('photocard_modal_host.js', 'utf8');
let finalBundle = step1.slice(0, gqStart) + gqReplacement + '\n' + borbilaV2 + '\n' + modalHost + '\n' + step1.slice(wqStart);

fs.writeFileSync('assets/index-DkKEx6Oj.js', finalBundle, 'utf8');
console.log('Successfully written assets/index-DkKEx6Oj.js! Final length:', finalBundle.length);
