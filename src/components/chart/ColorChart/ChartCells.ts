const maxColorValue = 256;

export class ChartCells {
  #cellX: number;
  #cellY: number;
  #element: HTMLElement;
  #blue: number = 0;
  constructor(cellSize: number, element: HTMLElement) {
    this.#element = element;

    const width = element.clientWidth;
    const height = element.clientHeight;

    const cellX = Math.floor(width / cellSize) + 2;
    const cellY = Math.floor(height / cellSize) + 2;

    this.#cellX = cellX;
    this.#cellY = cellY;

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
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    for (let i = 0; i < cellX * cellY; i++) {
      const c = cell.cloneNode();
      df.append(c);
    }
    sr.append(df);
  }

  setBlue(blue: number) {
    this.#blue = blue;
  }
}
