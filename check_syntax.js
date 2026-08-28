const fs = require('fs');
const acorn = require('acorn');

const code = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

try {
  acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('Valid ES module syntax!');
} catch (err) {
  console.error('Acorn syntax error at pos:', err.pos, 'loc:', err.loc, 'message:', err.message);
  console.log('Snippet around error:');
  console.log(code.slice(Math.max(0, err.pos - 150), Math.min(code.length, err.pos + 150)));
}
