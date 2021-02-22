/**
 * Returns whether given color should have a light/dark background.
 */
export function bgLightOrDark(r: number, g: number, b: number) {
  // https://www.w3.org/TR/WCAG20/#relativeluminancedef
  const rellum = 0.2126 * (r / 256) + 0.7152 * (g / 256) + 0.0722 * (b / 256);
  if (rellum > 0.5) {
    return "dark";
  } else {
    return "light";
  }
}
