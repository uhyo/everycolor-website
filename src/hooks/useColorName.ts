import { fromRGB } from "everycolor";
import { useMemo } from "react";

export function useColorName(rgb: string) {
  return useMemo(() => {
    const match = rgb.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (!match) {
      return undefined;
    }
    const [, rs, gs, bs] = match;
    const r = parseInt(rs, 16);
    const g = parseInt(gs, 16);
    const b = parseInt(bs, 16);
    return {
      rgb,
      r,
      g,
      b,
      name: fromRGB(r, g, b),
    };
  }, [rgb]);
}
