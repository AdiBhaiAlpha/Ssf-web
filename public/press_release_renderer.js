// press_release_renderer.js
// Global Bridge for Press Release rendering, printing, and high-res export

(function() {
  var DEFAULT_PRESS_RELEASE = {
    headline: '',
    body: '',
    date: '',
    committee: '',
    signature: '',
    orgName: '',
    districtName: '',
    logoUrl: ''
  };

  function stub() {
    return Promise.reject(new Error('press_release_creator.js is not available. Please ensure the file exists.'));
  }

  function toPlainText(data) {
    if (!data) return '';
    return (data.headline ? data.headline + '\n\n' : '') + (data.body || '');
  }

  function getDefaultData() {
    return Object.assign({}, DEFAULT_PRESS_RELEASE);
  }

  // Try dynamic import, fall back to stubs if missing
  try {
    import('./press_release_creator.js').then(function(mod) {
      window.PressReleaseRenderer = {
        exportToPNG: mod.exportPressReleaseToPNG || stub,
        print: mod.printPressRelease || function() { window.print(); },
        toPlainText: mod.pressReleaseToPlainText || toPlainText,
        getDefaultData: function() { return Object.assign({}, mod.DEFAULT_PRESS_RELEASE || DEFAULT_PRESS_RELEASE); }
      };
      console.log('[PressRelease] Renderer loaded from press_release_creator.js');
    }).catch(function(err) {
      console.warn('[PressRelease] press_release_creator.js not found, using stubs:', err.message);
      window.PressReleaseRenderer = {
        exportToPNG: stub,
        print: function() { window.print(); },
        toPlainText: toPlainText,
        getDefaultData: getDefaultData
      };
    });
  } catch(e) {
    // Fallback for environments where dynamic import is not supported
    window.PressReleaseRenderer = {
      exportToPNG: stub,
      print: function() { window.print(); },
      toPlainText: toPlainText,
      getDefaultData: getDefaultData
    };
  }
})();
