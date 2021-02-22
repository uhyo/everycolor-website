import { fromRGB } from "everycolor";
import { useMemo, useState } from "react";
import { useLastExistingValue } from "../hooks/useLastExistingValue";
import classes from "./ColorInput.module.css";

export const ColorInput: React.VFC = () => {
  const [rgb, setRgb] = useState("#ff0000");

  const colorName = useMemo(() => {
    const match = rgb.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (!match) {
      return undefined;
    }
    const [, r, g, b] = match;
    return {
      rgb,
      name: fromRGB(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)),
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
      {lastColorName ? (
        <div
          className={
            classes.colorName + (colorName ? "" : " " + classes.typingColorName)
          }
          style={{ color: lastColorName.rgb }}
        >
          {lastColorName.name}
        </div>
      ) : (
        "..."
      )}
    </div>
  );
};
