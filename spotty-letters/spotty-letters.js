class SpottyLetters {
  static get inputProperties() {
    return ['--spot-color', '--spot-size', '--spot-bg-color'];
  }

  paint(ctx, size, properties) {
    const spotColor = properties.get('--spot-color').toString() || 'black';
    const spotBgColor = properties.get('--spot-bg-color').toString() || 'white';
    const spotSize = parseFloat(properties.get('--spot-size').toString()) || 5;

    ctx.fillStyle = spotBgColor;
    ctx.fillRect(0, 0, size.width, size.height);
    ctx.fillStyle = spotColor;

    const numColumns = Math.floor(size.width / (spotSize * 2));
    const numRows = Math.floor(size.height / (spotSize * 2));
    const xOffset = (size.width - numColumns * spotSize * 2) / 2;
    const yOffset = (size.height - numRows * spotSize * 2) / 2;

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        const x = xOffset + col * spotSize * 2 + spotSize;
        const y = yOffset + row * spotSize * 2 + spotSize;
        ctx.beginPath();
        ctx.arc(x, y, this.clamp(Math.random() * spotSize, spotSize / 2, spotSize), 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }

  clamp(value, min,max) {
    return Math.min(Math.max(value, min), max);
  }
}

registerPaint('spotty-letters', SpottyLetters);
