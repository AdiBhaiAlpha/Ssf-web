const fs = require('fs');
let content = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

const target = 'case"qa":return i.jsx("div",{id:"qa-react-root",className:"min-h-[70vh] w-full max-w-7xl mx-auto"})';
const replacement = 'case"qa":setTimeout(()=>window.JC_setTab&&window.JC_setTab("qa-list"), 50);return i.jsx("div",{id:"qa-react-root",className:"min-h-[70vh] w-full max-w-7xl mx-auto"})';

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('assets/index-DkKEx6Oj.js', content, 'utf8');
  console.log('Successfully patched React QA tab routing!');
} else {
  console.log('Target not found!');
}
