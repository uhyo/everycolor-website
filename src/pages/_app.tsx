import { AppProps } from "next/app";
import "../styles/globals.css";

if ("paintWorklet" in CSS) {
  const darkChecksWorklet = new URL(
    "../worklets/checks.worklet.ts",
    import.meta.url
  );
  CSS.paintWorklet.addModule(darkChecksWorklet.href);
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
