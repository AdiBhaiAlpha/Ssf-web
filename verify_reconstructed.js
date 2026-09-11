const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('reconstructed_bundle.js', 'utf8');

try {
  new vm.Script(code);
  console.log('reconstructed_bundle.js is 100% syntactically VALID!');
} catch (err) {
  console.error('Syntax error:', err);
}
