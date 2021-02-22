import convert from "color-convert";
import { memo } from "react";
import { ColorData } from "../../hooks/useColorName";
import { bgLightOrDark } from "../../logic/color";
import { ShareColorButton } from "../ShareColorButton";
import classes from "./ColorInfo.module.css";

type Props = {
  colorData: ColorData;
};

export const ColorInfo: React.VFC<Props> = memo(({ colorData }) => {
  const { r, g, b, name, rgb } = colorData;
  const bg = bgLightOrDark(r, g, b);
  const style = { color: rgb };

  const hsl = convert.rgb.hsl(r, g, b);
  return (
    <div className={classes[bg]}>
      <ShareColorButton color={colorData} />
      <h1 className={classes.title}>
        <b style={style}>{name}</b> in other forms:
      </h1>
      <p>
        <span style={style}>{rgb}</span>,{" "}
        <span style={style}>
          rgb({r}, {g}, {b})
        </span>
        ,{" "}
        <span style={style}>
          hsl({hsl[0]}, {hsl[1]}%, {hsl[2]}%)
        </span>
      </p>
      <h1 className={classes.title}>Using in CSS:</h1>
      <pre>
        <code>
          {`a {
  color: `}
          <span style={style}>{name}</span>
          {`;
  text-decoration: none;
}`}
        </code>
      </pre>
    </div>
  );
});
