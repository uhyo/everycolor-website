import Head from "next/head";
import { Description } from "../components/Description";
import { PageHeader } from "../components/PageHeader";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Everycolor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader />
      <Description />
    </div>
  );
}
