import { useEffect, useRef } from "react";
import { useCounter } from "../../../hooks/useCounter";
import { ChartCells } from "./ChartCells";
import classes from "./ColorChart.module.css";

const cellSize = 100;

export const ColorChart: React.FC<{
  blue: number;
}> = ({ blue }) => {
  const [counter, increment] = useCounter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cellsRef = useRef<ChartCells>();

  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    if (!wrapperElement) {
      return;
    }
    const cells = new ChartCells(cellSize, wrapperElement);
    cellsRef.current = cells;
    const cleanup = cells.run();
    return cleanup;
  }, [counter]);
  useEffect(() => {
    cellsRef.current?.setBlue(blue);
  }, [blue]);
  useEffect(() => {
    window.addEventListener("resize", increment, false);
    return () => {
      window.removeEventListener("resize", increment, false);
    };
  }, []);

  return <div className={classes.wrapper} ref={wrapperRef} />;
};
