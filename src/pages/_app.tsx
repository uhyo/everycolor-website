import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

if (typeof CSS !== "undefined" && "paintWorklet" in CSS) {
  const darkChecksWorklet = new URL(
    "../worklets/checks.worklet.ts",
    import.meta.url
  );
  CSS.paintWorklet.addModule(darkChecksWorklet.href);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
