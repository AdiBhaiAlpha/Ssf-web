const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

const vqStart = bundle.indexOf('class VQ{');
const p5Start = bundle.indexOf('class P5{', vqStart);
const opStart = bundle.indexOf('class op{', vqStart);
const vqEnd = (p5Start !== -1 && p5Start > vqStart) ? p5Start : opStart;

console.log('VQ length:', vqEnd - vqStart);
const vqCode = bundle.slice(vqStart, vqEnd);
fs.writeFileSync('current_vq_code.js', vqCode, 'utf8');

// Check what template keys/tags VQ handles in drawLayers
console.log('drawLayers template tags:');
const tags = ['BREAKING', 'MAGAZINE', 'MINIMAL', 'SOCIAL_SQ', 'FB_FEED', 'IG_FEED', 'BANNER', 'COSMIC', 'OFFICIAL_CRM', 'STATEMENT', 'EDITORIAL', 'CORPORATE', 'GOVT_NOTICE', 'POLITICAL', 'EVENT_COV', 'AWARENESS', 'STUDENT_ACT', 'LIBRARY', 'RESEARCH', 'ANNOUNCEMENT', 'INSIGHTS', 'SQ_HALF_SPLIT', 'SQ_SPLIT_RED', 'SQ_SPLIT_MAROON', 'SQ_SPLIT_CHARCOAL', 'SQ_SPLIT_WHITE', 'SQ_SPLIT_ZINC', 'SQ_SPLIT_NAVY', 'SQ_SPLIT_GREEN'];

tags.forEach(t => {
  console.log(t, vqCode.includes(t));
});
