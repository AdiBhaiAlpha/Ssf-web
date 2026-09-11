// press_release_renderer.js
// Global Bridge for Press Release rendering, printing, and high-res export

import { exportPressReleaseToPNG, printPressRelease, pressReleaseToPlainText, DEFAULT_PRESS_RELEASE } from './press_release_creator.js';

if (typeof window !== 'undefined') {
  window.PressReleaseRenderer = {
    exportToPNG: exportPressReleaseToPNG,
    print: printPressRelease,
    toPlainText: pressReleaseToPlainText,
    getDefaultData: () => ({ ...DEFAULT_PRESS_RELEASE })
  };
}
