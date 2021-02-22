import { fromRGB } from "everycolor";
import { useMemo, useState } from "react";
import { useLastExistingValue } from "../hooks/useLastExistingValue";
import classes from "./ColorInput.module.css";
import { useRandomColor } from "./useRandomColor";

export const ColorInput: React.VFC = () => {
  const [rgb, setRgb] = useState("#ff0000");
  const generateRandom = useRandomColor();

  const colorName = useMemo(() => {
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

  const lastColorName = useLastExistingValue(colorName);

  return (
    <div className={classes.wrapper}>
      <span className={classes.input}>
        <input
          type="text"
          placeholder="#ff0000"
          size={8}
          value={rgb}
          onChange={(e) => setRgb(e.currentTarget.value)}
        />
      </span>
      <span className={classes.is}>is</span>
      <div
        className={
          classes.colorWrapper +
          (colorName ? "" : " " + classes.typingColorName)
        }
      >
        {lastColorName ? (
          <div
            className={
              classes.colorName +
              " " +
              classes[
                bgLightOrDark(lastColorName.r, lastColorName.g, lastColorName.b)
              ]
            }
            style={{ color: lastColorName.rgb }}
          >
            {lastColorName.name}
          </div>
        ) : (
          "..."
        )}
      </div>
      <div className={classes.random}>
        <button
          onClick={() => {
            setRgb(generateRandom());
          }}
        >
          random
        </button>
      </div>
    </div>
  );
};

/**
 * Returns whether given color should have a light/dark background.
 */
function bgLightOrDark(r: number, g: number, b: number) {
  // https://www.w3.org/TR/WCAG20/#relativeluminancedef
  const rellum = 0.2126 * (r / 256) + 0.7152 * (g / 256) + 0.0722 * (b / 256);
  if (rellum > 0.5) {
    return "dark";
  } else {
    return "light";
  }
}
