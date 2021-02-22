import { createCanvas, registerFont } from "canvas";
import dataUriToBuffer from "data-uri-to-buffer";
import { fromRGB } from "everycolor";
import { mkdtempSync, writeFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { tmpdir } from "os";
import path from "path";
import fontDataURI from "../../../fonts/Exo.ttf";
import { bgLightOrDark } from "../../logic/color";

const fontBuf = dataUriToBuffer(fontDataURI);
const td = mkdtempSync(path.join(tmpdir(), "everycolor"));
const fontFile = path.join(td, "Exo.ttf");
writeFileSync(fontFile, fontBuf);

registerFont(fontFile, {
  family: "Exo",
});

export default async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const colorCode = String(request.query.code);
  const match = colorCode.match(/([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!match) {
    response.writeHead(404);
    response.end();
    return;
  }

  const r = parseInt(match[1], 16);
  const g = parseInt(match[2], 16);
  const b = parseInt(match[3], 16);

  try {
    const colorName = fromRGB(r, g, b);
    const buf = createImage("#" + colorCode, colorName, r, g, b);

    response.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": buf.length,
      "Cache-Control": "max-age=3600",
    });
    response.end(buf, "binary");
  } catch {
    // invalid name
    response.writeHead(404);
    response.end();
    return;
  }
};

function createImage(
  colorCode: string,
  colorName: string,
  r: number,
  g: number,
  b: number
): Buffer {
  const width = 1200;
  const height = 630;
  const padding = 40;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // background color
  const bg = bgLightOrDark(r, g, b);
  ctx.fillStyle = bg === "dark" ? "#222222" : "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // color code
  ctx.font = "100px Exo";
  ctx.fillStyle = colorCode;
  const text = `${colorCode} is`;
  const metrics = ctx.measureText(text);
  ctx.fillText(text, width / 2 - metrics.width / 2, 100 + padding);
  // color name
  const mainFontSize = 85;
  ctx.font = `${mainFontSize}px Exo`;
  const lines = measureWrap(
    ctx,
    colorName,
    width - padding * 2,
    Math.ceil((width - padding * 2) / (mainFontSize / 2)) + 5
  );

  let y =
    80 +
    padding +
    (height - 100 - padding * 2) / 2 -
    (lines.length * mainFontSize) / 2 +
    mainFontSize;
  if (lines.length === 1) {
    const mes = ctx.measureText(lines[0]);
    ctx.fillText(lines[0], width / 2 - mes.width / 2, y);
  } else {
    for (const line of lines) {
      ctx.fillText(line, padding, y);
      y += mainFontSize;
    }
  }

  return canvas.toBuffer();
}

function measureWrap(
  ctx: CanvasRenderingContext2D,
  text: string,
  width: number,
  maxRowLength: number
) {
  const result: string[] = [];
  while (text.length > 0) {
    // draw one line
    let length = maxRowLength;
    while (true) {
      const part = text.slice(0, length);
      const measure = ctx.measureText(part);
      if (measure.width >= width && length > 1) {
        // too long
        length--;
        continue;
      }
      result.push(part);
      text = text.slice(length);
      break;
    }
  }
  return result;
}
