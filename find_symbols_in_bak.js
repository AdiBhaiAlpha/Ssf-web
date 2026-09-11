const fs = require('fs');

const bak = fs.readFileSync('assets/index-DkKEx6Oj.js.bak', 'utf8');

function findMatches(pattern) {
  const matches = [];
  let pos = 0;
  while ((pos = bak.indexOf(pattern, pos)) !== -1) {
    matches.push(pos);
    pos += pattern.length;
  }
  return matches;
}

console.log('class VQ:', findMatches('class VQ'));
console.log('class P5:', findMatches('class P5'));
console.log('class op:', findMatches('class op'));
console.log('function GQ:', findMatches('function GQ'));
console.log('function WQ:', findMatches('function WQ'));

if (findMatches('class VQ').length > 0) {
  const vqPos = findMatches('class VQ')[0];
  console.log('VQ snippet:', bak.slice(vqPos, vqPos + 100));
}

if (findMatches('function GQ').length > 0) {
  const gqPos = findMatches('function GQ')[0];
  console.log('GQ snippet:', bak.slice(gqPos, gqPos + 100));
}
