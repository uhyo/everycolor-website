import { appOrigin } from "../../constants/appOrigin";
import { ColorData } from "../../hooks/useColorName";
import classes from "./ShareColorButton.module.css";

type Props = {
  color?: ColorData;
};

export const ShareColorButton: React.VFC<Props> = ({ color }) => {
  const click = () => {
    if (!color) {
      return;
    }
    const url = appOrigin + "/color/" + color.rgb.slice(1);
    const text = `${color.rgb.replace("#", "#\u200b")} is ${color.name}`;
    if (navigator.share !== undefined) {
      navigator
        .share({
          title: `${color.rgb} - Everycolor`,
          url,
          text,
        })
        .catch(() => {});
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}&hashtags=everycolor`
      );
    }
  };
  return (
    <button
      className={classes.button}
      disabled={color === undefined}
      onClick={click}
    >
      Share this color on Twitter
    </button>
  );
};
