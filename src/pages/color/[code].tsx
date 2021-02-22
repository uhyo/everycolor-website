import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import React from "react";
import { Description } from "../../components/Description";
import { PageHeader } from "../../components/PageHeader";
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
  return (
    <div>
      <Head>
        <title>
          {colorName
            ? `${code} is ${colorName.name} - Everycolor`
            : "Everycolor"}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader initialColor={code} />
      <Description />
    </div>
  );
}
