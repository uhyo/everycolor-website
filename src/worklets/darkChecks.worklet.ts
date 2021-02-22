class CheckerboardPainter {
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
          const s = 30 + Math.floor(Math.random() * 20);
          const l = 25 + Math.floor(Math.random() * 20);
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

// Register our class under a specific name
if ((globalThis as any).registerPaint) {
  (globalThis as any).registerPaint("darkChecks", CheckerboardPainter);
}
