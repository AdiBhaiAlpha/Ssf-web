
// press_release_renderer.js

window.PressReleaseRenderer = {
  async render(canvas, data) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Could not obtain 2D canvas context");

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set font (simple fallback for now, needs loading)
    ctx.fillStyle = '#171717';

    // Draw content
    let y = 60;
    ctx.font = 'bold 30px "Tiro Bangla", serif';
    ctx.fillText(data.title, 50, y);
    y += 40;
    
    if (data.subtitle) {
      ctx.font = '24px "Tiro Bangla", serif';
      ctx.fillText(data.subtitle, 50, y);
      y += 40;
    }

    ctx.font = '16px "Tiro Bangla", serif';
    ctx.fillText(`${data.date} | ${data.location}`, 50, y);
    y += 50;
    
    // Draw body (basic wrapping)
    ctx.font = '20px "Tiro Bangla", serif';
    const words = data.body.split(' ');
    let line = '';
    const maxWidth = canvas.width - 100;
    for (let word of words) {
      let testLine = line + word + ' ';
      let metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth) {
        ctx.fillText(line, 50, y);
        line = word + ' ';
        y += 30;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 50, y);
    
    y += 60;
    ctx.fillText(data.sigName, 50, y);
    y += 30;
    ctx.fillText(data.sigTitle, 50, y);
  }
};
