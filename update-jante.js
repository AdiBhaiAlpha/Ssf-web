const fs = require('fs');

const original = fs.readFileSync('public/jante-chai.js', 'utf8');

// Replace the renderView section
let updated = original.replace(
  /let oldRoot = document\.getElementById\('jante-chai-app-root'\);[\s\S]*?if \(!oldRoot\) \{[\s\S]*?\}[\s\S]*?if \(activeTab === 'home'\) \{/,
  `let oldRoot = document.getElementById('jante-chai-app-root');
    
    // Only show preview when we know we're on the home page.
    // If oldRoot is missing, it means React hasn't rendered the home page, so we do nothing.
    if (oldRoot && activeTab === 'home') {`
);

fs.writeFileSync('public/jante-chai.js', updated);
console.log('Successfully updated jante-chai.js renderView logic');
