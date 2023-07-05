import React from "react";
import Head from "next/head";
import { getPageInfoBySlug } from "@/apollo/pageInfo";
import { IPageInfo } from "@/interfaces/pageInfo";
import { GetStaticProps, NextPage } from "next";
import parse from "html-react-parser";
import Breadcrumbs from "@/components/Breadcrumbs";

type Props = {
  pageInfo: IPageInfo;
};

const ContactPage: NextPage<Props> = ({ pageInfo }) => {
  return (
    <div>
      <Head>{parse(pageInfo.seo.fullHead)}</Head>
      <Breadcrumbs crumbs={[{ text: "Contact", url: "/contact" }]} />
      <h1 className="mb-10 mt-5 border-b-2 border-b-white pb-5 font-header text-4xl font-semibold">
        Contact
      </h1>
    </div>
  );
};

export default ContactPage;

export const getStaticProps: GetStaticProps = async () => {
  let pageInfo: IPageInfo | null = null;

  try {
    pageInfo = await getPageInfoBySlug("contact");
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
