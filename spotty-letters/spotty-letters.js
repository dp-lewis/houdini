class SpottyLetters {
  seed = 6

  static get inputProperties() {
    return ['--spot-color', '--spot-size', '--spot-bg-color', '--spot-seed'];
  }

  paint(ctx, size, properties) {
    const spotColor = properties.get('--spot-color').toString() || 'black';
    const spotBgColor = properties.get('--spot-bg-color').toString() || 'white';
    const spotSize = parseFloat(properties.get('--spot-size').toString()) || 5;
    this.seed = parseFloat(properties.get('--spot-seed').toString()) || 6;


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
        ctx.arc(x, y, this.clamp(this.seededRandom() * spotSize, spotSize / 2, spotSize), 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }

  clamp(value, min,max) {
    return Math.min(Math.max(value, min), max);
  }
 
  seededRandom() {
      const max = 1;
      const min = 0;
   
      this.seed = (this.seed * 9301 + 49297) % 233280;
      const rnd = this.seed / 233280;
   
      return min + rnd * (max - min);
  }
}

registerPaint('spotty-letters', SpottyLetters);
