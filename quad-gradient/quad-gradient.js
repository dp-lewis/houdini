/*
Inspired by the work of Juho Vepsäläinen in the following post: https://stackoverflow.com/questions/27581007/html5-canvas-gradient-in-4-corners/27584354#27584354

*/

class QuadGradient {

    static get inputProperties() {
      return ['--gradient-color-1', '--gradient-color-2', '--gradient-color-3', '--gradient-color-4'];
    }
  
    paint(ctx, geom, properties) {    
      const topLeft = this.rgbToArray(properties.get('--gradient-color-1').toString());  
      const topRight = this.rgbToArray(properties.get('--gradient-color-2').toString());  
      const bottomLeft = this.rgbToArray(properties.get('--gradient-color-3').toString());  
      const bottomRight = this.rgbToArray(properties.get('--gradient-color-4').toString());  

      this.quadGradient(ctx, geom, {
        topLeft: topLeft,
        topRight: topRight,
        bottomLeft: bottomLeft,
        bottomRight: bottomRight
      });

    }

    quadGradient(ctx, geom, corners) { 
        const w = geom.width;
        const h = geom.height;
        let gradient, startColor, endColor, fac;


        for(let i = 0; i < h; i++) {
            gradient = ctx.createLinearGradient(0, i, w, i);
            fac = i / (h - 1);
    
            startColor = this.arrayToRGBA(
                this.lerp(corners.topLeft, corners.bottomLeft, fac)
            );
            endColor = this.arrayToRGBA(
                this.lerp(corners.topRight, corners.bottomRight, fac)
            );
          
            gradient.addColorStop(0, startColor);
            gradient.addColorStop(1, endColor);
          
            ctx.fillStyle = gradient;
            ctx.fillRect(0, i, w, i);
        }
    }

    rgbToArray(rgbString) {
        // Extract the numeric values from the rgb string using a regular expression
        const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      
        if (!match) {
          throw new Error("Invalid RGB format");
        }
      
        // Convert the extracted string values to numbers and normalize them to the range [0, 1]
        const r = parseInt(match[1], 10) / 255;
        const g = parseInt(match[2], 10) / 255;
        const b = parseInt(match[3], 10) / 255;
      
        // Return the normalized values as an array
        return [r, g, b, 1];
    }

    arrayToRGBA(arr) {
        const ret = arr.map(function(v) {
            // map to [0, 255] and clamp
            return Math.max(Math.min(Math.round(v * 255), 255), 0);
        });
    
        // alpha should retain its value
        ret[3] = arr[3];
      
        return 'rgba(' + ret.join(',') + ')';
    }
    
    lerp(a, b, fac) {
        return a.map(function(v, i) {
            return v * (1 - fac) + b[i] * fac;
        });
    }
}

  registerPaint('quad-gradient', QuadGradient);
  