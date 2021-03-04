import { useEffect, useRef } from "react";
import { ChartCells } from "./ChartCells";
import classes from "./ColorChart.module.css";

const cellSize = 100;

export const ColorChart: React.FC<{
  blue: number;
}> = ({ blue }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cellsRef = useRef<ChartCells>();
  const size = useRef<{ width: Number; height: number }>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    if (!wrapperElement) {
      return;
    }
    const cells = new ChartCells(cellSize, wrapperElement);
    cellsRef.current = cells;
    const cleanup = cells.run();
    return cleanup;
  }, []);
  useEffect(() => {
    cellsRef.current?.setBlue(blue);
  }, [blue]);

  return <div className={classes.wrapper} ref={wrapperRef} />;
};
