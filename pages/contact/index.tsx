import React from "react";
import Head from "next/head";
import { getPageInfoBySlug } from "@/apollo/pageInfo";
import { IPageInfo } from "@/interfaces/pageInfo";
import { GetStaticProps, NextPage } from "next";
import parse from "html-react-parser";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { DEFAULT_REVALIDATION_TIME } from "@/constants/posts";

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
      <div className="my-10 flex flex-col gap-5 md:grid md:grid-cols-2">
        <div className="parsed-wp-content">
          <h2>We’d love to hear from you!</h2>
          <p>
            Hi! If you’re looking to get in touch to inquire about a partnership
            or business opportunity, need support, or want to share your
            feedback, please contact us at{" "}
            <a href="mailto:help@win.gg">help@win.gg</a> or{" "}
            <strong>fill out the contact form.</strong> We will get back to you
            as soon as we can.
          </p>
          <p>
            Just looking to chat with our writers and other gamers?{" "}
            <Link target="_blank" href={"https://discord.com/invite/hSkSMqR"}>
              Join our Discord!
            </Link>
          </p>
        </div>
        <ContactForm />
      </div>
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
    revalidate: DEFAULT_REVALIDATION_TIME
  };
};
