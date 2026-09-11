const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

const vqMatch = bundle.match(/class\s+VQ\s*\{/);
if (vqMatch) {
  console.log('class VQ match pos:', vqMatch.index);
  const opMatch = bundle.indexOf('class op', vqMatch.index);
  console.log('class op pos after VQ:', opMatch);
  const vqCode = bundle.slice(vqMatch.index, opMatch);
  fs.writeFileSync('extracted_vq_full.js', vqCode, 'utf8');
  console.log('Saved extracted_vq_full.js, length:', vqCode.length);
} else {
  console.log('No class VQ match');
}
