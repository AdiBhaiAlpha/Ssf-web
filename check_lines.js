const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

// Let's test lines binary search
const lines = code.split('\n');
console.log('Total lines in bundle:', lines.length);

for (let i = 0; i < lines.length; i++) {
  try {
    new vm.Script(lines[i]);
  } catch (err) {
    if (err.message.includes('Unexpected') || err.message.includes('Invalid')) {
      console.log(`Line ${i + 1} has standalone error:`, err.message);
      console.log('Line snippet:', lines[i].slice(0, 100));
    }
  }
}
