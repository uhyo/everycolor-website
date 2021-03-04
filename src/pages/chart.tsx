import Head from "next/head";
import React, { useState } from "react";
import { ChartPage as ChartPageWrapper } from "../components/chart/ChartPage";
import { ColorChart } from "../components/chart/ColorChart";
import { appOrigin } from "../constants/appOrigin";
import classes from "../styles/pages/ChartPage.module.css";

export default function ChartPage() {
  const [blue, setBlue] = useState(0);

  const control = (
    <input
      className={classes.control}
      type="range"
      min="0"
      max="255"
      value={blue}
      onChange={(e) => setBlue(Number(e.currentTarget.value))}
    />
  );

  return (
    <ChartPageWrapper control={control}>
      <Head>
        <title>Everycolor Chart</title>
        <link rel="icon" href="/favicon.png" />
        <meta property="og:url" content={appOrigin + "/chart"} />
        <meta property="og:image" content={appOrigin + "/everycolor.png"} />
        <meta property="og:site_name" content="Everycolor" />
        <meta property="og:title" content="Everycolor Chart" />
        <meta property="og:description" content="Give name to every color." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@uhyo_" />
      </Head>
      <ColorChart blue={blue} />
    </ChartPageWrapper>
  );
}
