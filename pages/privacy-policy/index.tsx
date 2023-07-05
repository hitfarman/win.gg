import React from "react";
import Head from "next/head";
import { getPageInfoBySlug } from "@/apollo/pageInfo";
import { IPageInfo } from "@/interfaces/pageInfo";
import { GetStaticProps, NextPage } from "next";
import parse from "html-react-parser";

type Props = {
  pageInfo: IPageInfo;
};

const PrivacyPolicyPage: NextPage<Props> = ({ pageInfo }) => {
  return (
    <div>
      <Head>{parse(pageInfo.seo.fullHead)}</Head>
      <div
        className="parsed-wp-content"
        dangerouslySetInnerHTML={{ __html: pageInfo.content }}
      />
    </div>
  );
};

export default PrivacyPolicyPage;

export const getStaticProps: GetStaticProps = async () => {
  let pageInfo: IPageInfo | null = null;

  try {
    pageInfo = await getPageInfoBySlug("privacy-policy");
  } catch (e) {
    console.log("Fetching pageInfo failed in getStaticProps, with cause:", e);
  }

  if (!pageInfo) {
    return { notFound: true };
  }

  return {
    props: {
      pageInfo
    },
    revalidate: 60 * 15
  };
};
