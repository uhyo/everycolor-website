abstract class CheckerboardPainter {
  protected abstract sBase: number;
  protected abstract lBase: number;

  private cache = new Map<string, string>();
  paint(
    ctx: CanvasRenderingContext2D,
    geom: {
      width: number;
      height: number;
    },
    properties: unknown
  ) {
    const size = 8;
    for (let y = 0; y < geom.height / size; y++) {
      for (let x = 0; x < geom.width / size; x++) {
        let col = this.cache.get(`${x}-${y}`);
        if (!col) {
          const h = Math.floor(Math.random() * 360);
          const s = this.sBase + Math.floor(Math.random() * 20);
          const l = this.lBase + Math.floor(Math.random() * 20);
          col = `hsl(${h},${s}%,${l}%)`;
          this.cache.set(`${x}-${y}`, col);
        }
        ctx.beginPath();
        ctx.fillStyle = col;
        ctx.rect(x * size, y * size, size, size);
        ctx.fill();
      }
    }
  }
}

class TextPainter extends CheckerboardPainter {
  sBase = 30;
  lBase = 25;
}

class DarkPainter extends CheckerboardPainter {
  sBase = 30;
  lBase = 15;
}

class LightPainter extends CheckerboardPainter {
  sBase = 20;
  lBase = 75;
}

// Register our class under a specific name
if ((globalThis as any).registerPaint) {
  (globalThis as any).registerPaint("textChecks", TextPainter);
  (globalThis as any).registerPaint("darkChecks", DarkPainter);
  (globalThis as any).registerPaint("lightChecks", LightPainter);
}

export {};
