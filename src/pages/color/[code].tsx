import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import React from "react";
import { Description } from "../../components/Description";
import { Page } from "../../components/Page";
import { PageHeader } from "../../components/PageHeader";
import { appOrigin } from "../../constants/appOrigin";
import { useColorName } from "../../hooks/useColorName";

type ServerSideProps = {
  code: string;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ServerSideProps>> {
  if (/^[0-9a-f]{6}$/.test(String(context.params?.code))) {
    return {
      props: {
        code: "#" + context.params?.code,
      },
    };
  }
  return {
    notFound: true,
  };
}

export default function ColorPage({ code }: ServerSideProps) {
  const colorName = useColorName(code);
  const desc = colorName ? `${code} is ${colorName.name}` : "";
  const title = colorName ? `${code} - Everycolor` : "Everycolor";
  return (
    <Page>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          property="og:url"
          content={appOrigin + "/color/" + code.slice(1)}
        />
        <meta
          property="og:image"
          content={appOrigin + "/api/image?code=" + code.slice(1)}
        />
        <meta property="og:site_name" content="Everycolor" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@uhyo_" />
      </Head>
      <PageHeader initialColor={code} />
      <Description />
    </Page>
  );
}
