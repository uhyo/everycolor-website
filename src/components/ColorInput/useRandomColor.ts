import { useRef } from "react";

export function useRandomColor() {
  const level = useRef(0);

  const generate = () => {
    const lv = level.current++;

    if (lv === 0) {
      return [
        "#800000",
        "#ffff00",
        "#808000",
        "#00ff00",
        "#008000",
        "#00ffff",
        "#008080",
        "#0000ff",
        "#000080",
        "#ff00ff",
        "#800080",
      ][Math.floor(Math.random() * 11)];
    }
    if (lv <= 2) {
      const r = get80Or255();
      const g = get80Or255();
      const b = get80Or255();
      return `#${r}${g}${b}`;
    }
    const r = getFullRand();
    const g = getFullRand();
    const b = getFullRand();
    return `#${r}${g}${b}`;
  };
  return generate;
}

function get80Or255() {
  if (Math.random() < 0.5) {
    return "80";
  } else {
    return "ff";
  }
}

function getFullRand() {
  const v = Math.floor(Math.random() * 256);
  return v.toString(16).padStart(2, "0");
}
