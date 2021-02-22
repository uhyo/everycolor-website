import { useState } from "react";
import { useColorName } from "../../hooks/useColorName";
import { bgLightOrDark } from "../../logic/color";
import { useLastExistingValue } from "../hooks/useLastExistingValue";
import { ShareColorButton } from "../ShareColorButton";
import classes from "./ColorInput.module.css";
import { useRandomColor } from "./useRandomColor";

type Props = {
  initialColor?: string;
};

export const ColorInput: React.VFC<Props> = ({ initialColor }) => {
  const [rgb, setRgb] = useState(initialColor || "#ff0000");
  const generateRandom = useRandomColor();

  const colorName = useColorName(rgb);

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
      <div className={classes.share}>
        <ShareColorButton color={colorName} />
      </div>
    </div>
  );
};
