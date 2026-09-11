const fs = require('fs');

const borbila = fs.readFileSync('borbila_v2_component.js', 'utf8');

console.log('Borbila file size:', borbila.length);

const reactHookPatterns = ['useState', 'useEffect', 'useRef', 'useCallback', 'useMemo'];
reactHookPatterns.forEach(hook => {
  let idx = -1;
  const matches = [];
  while ((idx = borbila.indexOf(hook, idx + 1)) !== -1) {
    const start = Math.max(0, idx - 15);
    const end = Math.min(borbila.length, idx + hook.length + 15);
    matches.push(borbila.slice(start, end).replace(/\n/g, ' '));
  }
  console.log(`Hook ${hook}: found ${matches.length} matches, samples:`, matches.slice(0, 3));
});

const jsxPatterns = ['jsx', 'jsxs'];
jsxPatterns.forEach(jsx => {
  let idx = -1;
  const matches = [];
  while ((idx = borbila.indexOf(jsx, idx + 1)) !== -1) {
    const start = Math.max(0, idx - 15);
    const end = Math.min(borbila.length, idx + jsx.length + 15);
    matches.push(borbila.slice(start, end).replace(/\n/g, ' '));
  }
  console.log(`JSX ${jsx}: found ${matches.length} matches, samples:`, matches.slice(0, 3));
});

// Let's also check for specific external library names like F1, i1, op, html2canvas, can, etc.
const externalLibs = ['F1', 'i1', 'op', 'zS', 'u', 'i', 'Q'];
externalLibs.forEach(lib => {
  let idx = -1;
  const matches = [];
  while ((idx = borbila.indexOf(lib, idx + 1)) !== -1) {
    // Only match as whole word or with specific suffixes
    const charBefore = idx > 0 ? borbila[idx - 1] : '';
    const charAfter = idx + lib.length < borbila.length ? borbila[idx + lib.length] : '';
    if (!/[a-zA-Z0-9_$]/.test(charBefore) && !/[a-zA-Z0-9_$]/.test(charAfter)) {
      const start = Math.max(0, idx - 20);
      const end = Math.min(borbila.length, idx + lib.length + 20);
      matches.push(borbila.slice(start, end).replace(/\n/g, ' '));
    }
  }
  console.log(`Lib/Var ${lib}: found ${matches.length} whole-word matches, samples:`, matches.slice(0, 3));
});
