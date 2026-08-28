const fs = require('fs');
const vm = require('vm');

const vq = fs.readFileSync('vq_replacement.js', 'utf8');
try {
  new vm.Script(vq);
  console.log('VQ replacement is valid!');
} catch (e) {
  console.error('VQ error:', e);
}

const gq = fs.readFileSync('gq_replacement.js', 'utf8');
try {
  new vm.Script(gq);
  console.log('GQ replacement is valid!');
} catch (e) {
  console.error('GQ error:', e);
}
