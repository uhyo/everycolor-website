import Head from "next/head";
import { Description } from "../components/Description";
import { Page } from "../components/Page";
import { PageHeader } from "../components/PageHeader";
import { appOrigin } from "../constants/appOrigin";

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Everycolor</title>
        <link rel="icon" href="/favicon.png" />
        <meta property="og:url" content={appOrigin + "/"} />
        <meta property="og:image" content={appOrigin + "/everycolor.png"} />
        <meta property="og:site_name" content="Everycolor" />
        <meta property="og:title" content="Everycolor" />
        <meta property="og:description" content="Give name to every color." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@uhyo_" />
      </Head>
      <PageHeader />
      <Description />
    </Page>
  );
}
