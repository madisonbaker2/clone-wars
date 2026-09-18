(function () {
  function drawBackground(ctx, width, height, time) {
    ctx.save();
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#ff8c69');
    sky.addColorStop(0.55, '#ffd166');
    sky.addColorStop(1, '#f58f6f');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#fff1a8';
    ctx.beginPath();
    ctx.arc(width * 0.72, height * 0.23, 46, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 239, 184, 0.55)';
    const cloudShift = (time * 8) % (width + 100);
    for (const cloud of [[70, 125, 36], [240, 85, 28], [335, 175, 42]]) {
      const x = ((cloud[0] - cloudShift + width + 120) % (width + 120)) - 60;
      ctx.beginPath();
      ctx.arc(x, cloud[1], cloud[2] * 0.45, 0, Math.PI * 2);
      ctx.arc(x + cloud[2] * 0.45, cloud[1] - 8, cloud[2] * 0.6, 0, Math.PI * 2);
      ctx.arc(x + cloud[2], cloud[1], cloud[2] * 0.42, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#b85c70';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.62);
    ctx.lineTo(width * 0.18, height * 0.47);
    ctx.lineTo(width * 0.38, height * 0.62);
    ctx.lineTo(width * 0.62, height * 0.44);
    ctx.lineTo(width, height * 0.62);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#74445f';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.72);
    ctx.lineTo(width * 0.25, height * 0.57);
    ctx.lineTo(width * 0.48, height * 0.72);
    ctx.lineTo(width * 0.77, height * 0.55);
    ctx.lineTo(width, height * 0.7);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  function drawGround(ctx, width, height, groundHeight, offset) {
    const top = height - groundHeight;
    ctx.fillStyle = '#2f6f5e';
    ctx.fillRect(0, top, width, groundHeight);
    ctx.fillStyle = '#83b64c';
    ctx.fillRect(0, top, width, 10);
    ctx.strokeStyle = '#183b3b';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, top + 1.5, width, groundHeight - 1.5);
    ctx.fillStyle = '#4d8f45';
    const tile = 34;
    const shift = -(offset % tile);
    for (let x = shift - tile; x < width + tile; x += tile) {
      ctx.fillRect(x, top + 24, tile * 0.55, 7);
      ctx.fillRect(x + 12, top + 47, tile * 0.7, 7);
    }
  }
  function drawBird(ctx, x, y, size, velocity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.max(-0.35, Math.min(0.5, velocity / 900)));
    const half = size / 2;
    ctx.fillStyle = '#f5f7fb';
    ctx.strokeStyle = '#183b3b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-half * 0.92, half * 0.1);
    ctx.quadraticCurveTo(-half * 0.35, -half * 0.65, half * 0.25, -half * 0.32);
    ctx.quadraticCurveTo(half * 0.8, -half * 0.05, half * 0.9, half * 0.28);
    ctx.quadraticCurveTo(half * 0.35, half * 0.5, -half * 0.15, half * 0.34);
    ctx.quadraticCurveTo(-half * 0.65, half * 0.62, -half * 0.92, half * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#f28c28';
    ctx.beginPath();
    ctx.moveTo(half * 0.68, -half * 0.1);
    ctx.lineTo(half * 1.08, half * 0.08);
    ctx.lineTo(half * 0.65, half * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#183b3b';
    ctx.beginPath();
    ctx.arc(half * 0.38, -half * 0.18, Math.max(2, size * 0.06), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  function drawPipe(ctx, x, gapTop, gapBottom, pipeWidth, height) {
    ctx.fillStyle = '#2f6f5e';
    ctx.fillRect(x, 0, pipeWidth, gapTop);
    ctx.fillRect(x, gapBottom, pipeWidth, height - gapBottom);
    ctx.strokeStyle = '#183b3b';
    ctx.lineWidth = 3;
    ctx.strokeRect(x + 1.5, 1.5, pipeWidth - 3, gapTop - 3);
    ctx.strokeRect(x + 1.5, gapBottom + 1.5, pipeWidth - 3, height - gapBottom - 3);
    ctx.fillStyle = '#4d8f45';
    ctx.fillRect(x + pipeWidth * 0.23, 0, pipeWidth * 0.54, Math.min(18, gapTop));
    ctx.fillRect(x + pipeWidth * 0.23, gapBottom, pipeWidth * 0.54, Math.min(18, height - gapBottom));
  }
  window.SPRITES = { drawBackground, drawGround, drawBird, drawPipe };
})();
