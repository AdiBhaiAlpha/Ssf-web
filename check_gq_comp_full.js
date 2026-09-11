const fs = require('fs');

const gqComp = fs.readFileSync('gq_component.js', 'utf8');
console.log('gq_component.js size:', gqComp.length);

const wqPos = gqComp.indexOf('function WQ');
console.log('WQ pos in gq_component.js:', wqPos);

console.log('Code after WQ length:', gqComp.length - wqPos);
console.log('End of gq_component.js:', gqComp.slice(-200));
