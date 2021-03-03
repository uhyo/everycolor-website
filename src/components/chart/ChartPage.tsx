import Link from "next/link";
import React from "react";
import classes from "./ChartPage.module.css";

export const ChartPage: React.FC<{
  control?: React.ReactNode;
}> = ({ children, control }) => {
  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <h1>
          <Link href="/">EveryColor</Link> Chart
        </h1>
        <div className={classes.control}>{control}</div>
      </header>
      <main className={classes.main}>{children}</main>
    </div>
  );
};
