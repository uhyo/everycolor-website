import { fromRGB } from "everycolor";
import { bgLightOrDark } from "../../../logic/color";

const maxColorValue = 256;

export class ChartCells {
  #cellX: number;
  #cellY: number;
  #cellSize: number;
  #element: HTMLElement;
  #blue: number = 0;

  #lastScrollLeft = -1;
  #lastScrollTop = -1;
  #forceRedraw = false;

  #colorMap: Map<number, HTMLElement>;

  constructor(cellSize: number, element: HTMLElement) {
    this.#element = element;

    const width = element.clientWidth;
    const height = element.clientHeight;

    const cellX = Math.floor(width / cellSize) + 2;
    const cellY = Math.floor(height / cellSize) + 2;

    const colorMap = new Map<number, HTMLElement>();

    this.#cellX = cellX;
    this.#cellY = cellY;
    this.#cellSize = cellSize;
    this.#colorMap = colorMap;

    const sr =
      element.shadowRoot ||
      element.attachShadow({
        mode: "open",
      });
    while (sr.firstChild) {
      sr.firstChild.remove();
    }

    const df = document.createDocumentFragment();
    const spacer = document.createElement("div");
    spacer.style.width = `${cellSize * maxColorValue}px`;
    spacer.style.height = `${cellSize * maxColorValue}px`;
    df.append(spacer);

    const cell = document.createElement("div");
    cell.style.position = "absolute";
    cell.style.left = "0";
    cell.style.top = "0";
    cell.style.width = `${cellSize - 1}px`;
    cell.style.height = `${cellSize - 1}px`;
    cell.style.fontSize = "0.8rem";
    cell.style.wordBreak = "break-all";
    cell.style.overflow = "hidden";
    cell.style.whiteSpace = "pre-wrap";
    // @ts-expect-error
    cell.style.contain = "size layout paint";

    for (let i = 0; i < cellX * cellY; i++) {
      const c = cell.cloneNode(false);
      df.append(c);
      colorMap.set(-i - 1, c as HTMLElement);
    }
    sr.append(df);
  }

  setBlue(blue: number) {
    this.#blue = blue;
    this.#forceRedraw = true;
  }

  run() {
    let rafHandle: number;
    const mainLoop = () => {
      this.main();
      rafHandle = requestAnimationFrame(mainLoop);
    };
    rafHandle = requestAnimationFrame(mainLoop);

    const eventHandler = (e: Event) => {
      this.showColor(e.composedPath()[0] as HTMLElement);
    };
    this.#element.addEventListener("click", eventHandler, {
      passive: true,
    });
    this.#element.addEventListener("touchstart", eventHandler, {
      passive: true,
    });
    return () => {
      cancelAnimationFrame(rafHandle);
      this.#element.removeEventListener("click", eventHandler);
      this.#element.removeEventListener("touchstart", eventHandler);
    };
  }

  private main() {
    const { scrollLeft, scrollTop } = this.#element;
    if (
      this.#lastScrollLeft === scrollLeft &&
      this.#lastScrollTop === scrollTop &&
      !this.#forceRedraw
    ) {
      return;
    }
    this.#lastScrollLeft = scrollLeft;
    this.#lastScrollTop = scrollTop;
    this.#forceRedraw = false;

    const cellX = this.#cellX;
    const cellY = this.#cellY;
    const cellSize = this.#cellSize;
    const blue = this.#blue;
    const colorMap = this.#colorMap;

    const nextColorMap = new Map<number, HTMLElement>();

    const firstCellLeft = scrollLeft - (scrollLeft % cellSize);
    const firstCellTop = scrollTop - (scrollTop % cellSize);

    const firstR = 255 - Math.floor(firstCellLeft / cellSize);
    const firstG = 255 - Math.floor(firstCellTop / cellSize);

    const queue = [];
    for (let x = 0; x < cellX; x++) {
      const cx = firstCellLeft + x * cellSize;
      const r = firstR - x;
      if (r > 255) {
        continue;
      }
      if (r < 0) {
        break;
      }
      for (let y = 0; y < cellY; y++) {
        const cy = firstCellTop + y * cellSize;
        const g = firstG - y;
        if (g > 255) {
          continue;
        }
        if (g < 0) {
          break;
        }

        const rgbv = (r << 16) | (g << 8) | blue;
        const el = colorMap.get(rgbv);
        if (el === undefined) {
          queue.push({
            rgbv,
            cx,
            cy,
          });
        } else {
          el.style.transform = `translate(${cx}px,${cy}px)`;
          colorMap.delete(rgbv);
          nextColorMap.set(rgbv, el);
        }
      }
    }
    console.log({
      scrollLeft,
      scrollTop,
      size: colorMap.size,
      length: queue.length,
    });
    let remainderId = -1;
    for (const el of colorMap.values()) {
      if (queue.length === 0) {
        nextColorMap.set(remainderId--, el);
        continue;
      }
      const { rgbv, cx, cy } = queue.pop()!;
      const r = rgbv >> 16;
      const g = (rgbv >> 8) & 0xff;
      const b = rgbv & 0xff;
      el.style.transform = `translate(${cx}px,${cy}px)`;
      el.style.backgroundColor = `rgb(${r},${g},${b})`;
      el.dataset.color = `${r},${g},${b}`;
      el.textContent = "";
      const bg = bgLightOrDark(r, g, b);
      if (bg === "dark") {
        el.style.color = "#000000";
      } else {
        el.style.color = "#ffffff";
      }
      nextColorMap.set(rgbv, el);
    }

    this.#colorMap = nextColorMap;
  }

  private showColor(e: HTMLElement) {
    const color = e.dataset.color;
    if (color) {
      const [r, g, b] = color.split(",").map((s) => Number(s));
      e.textContent = `rgb(${r},${g},${b})\n${fromRGB(r, g, b)}`;
    }
  }
}
