const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

// Let's search for template arrays, photo card editor, WQ, GQ, templates list, etc.
const templatesMatch = [];
const regex = /photoCardTemplates|cardTemplates|allTemplates|TEMPLATE_|TEMPLATES/gi;
let match;
while ((match = regex.exec(bundle)) !== null) {
  templatesMatch.push({ term: match[0], index: match.index });
}
console.log('Matches for template identifiers:', templatesMatch.length);
templatesMatch.forEach(m => console.log(m.term, m.index, bundle.slice(m.index - 50, m.index + 150)));
