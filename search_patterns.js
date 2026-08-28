const fs = require('fs');

const bak = fs.readFileSync('assets/index-DkKEx6Oj.js.bak', 'utf8');

// Let's search for photocard or exportPhotoCard or renderPhotoCard
console.log('photocard occurrences:', (bak.match(/photocard/gi) || []).length);
console.log('renderPhotoCard occurrences:', (bak.match(/renderPhotoCard/g) || []).length);
console.log('drawLayers occurrences:', (bak.match(/drawLayers/g) || []).length);
console.log('drawBackground occurrences:', (bak.match(/drawBackground/g) || []).length);
console.log('selectedTemplate occurrences:', (bak.match(/selectedTemplate/g) || []).length);
console.log('onClose occurrences:', (bak.match(/onClose/g) || []).length);

const match = bak.match(/[a-zA-Z0-9_$]+(?=\.renderPhotoCard)/g);
console.log('Classes calling renderPhotoCard:', match);
