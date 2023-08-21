import React from "react";
import Head from "next/head";
import { getPageInfoBySlug } from "@/apollo/pageInfo";
import { IPageInfo } from "@/interfaces/pageInfo";
import { GetStaticProps, NextPage } from "next";
import parse from "html-react-parser";
import Breadcrumbs from "@/components/Breadcrumbs";
import { DEFAULT_REVALIDATION_TIME } from "@/constants/posts";
import { parseSeo } from "@/utils/parseSeo";

type Props = {
  pageInfo: IPageInfo;
};

const TermsAndServicesPage: NextPage<Props> = ({ pageInfo }) => {
  return (
    <>
      <Head>
        {parse(pageInfo.seo.fullHead, {
          replace: parseSeo
        })}
      </Head>
      <Breadcrumbs
        crumbs={[{ text: "Terms of service", url: "/terms-of-service" }]}
      />
      <h1 className="mb-10 mt-5 border-b-2 border-b-white pb-5 font-header text-4xl font-semibold">
        Terms of Service
      </h1>

      <div
        className="parsed-wp-content mb-10"
        dangerouslySetInnerHTML={{
          __html: pageInfo.content
        }}
      />
    </>
  );
};

export default TermsAndServicesPage;

export const getStaticProps: GetStaticProps = async () => {
  let pageInfo: IPageInfo | null = null;

  try {
    pageInfo = await getPageInfoBySlug("terms-of-service");
  } catch (e) {
    console.log("Fetching pageInfo failed in getStaticProps, with cause:", e);
  }

  if (!pageInfo) {
    return { notFound: true, revalidate: DEFAULT_REVALIDATION_TIME };
  }

  pageInfo.content = pageInfo.content
    .replace(
      "[et_pb_section fb_built=&#8221;1&#8243; admin_label=&#8221;TERMS OF SERVICE\r&#8221; _builder_version=&#8221;4.19.4&#8243; hover_enabled=&#8221;0&#8243; global_colors_info=&#8221;{}&#8221; background_color=&#8221;RGBA(255,255,255,0)&#8221; sticky_enabled=&#8221;0&#8243;][et_pb_row admin_label=&#8221;TERMS OF SERVICE&#8221; _builder_version=&#8221;4.19.4&#8243; background_size=&#8221;initial&#8221; background_position=&#8221;top_left&#8221; background_repeat=&#8221;repeat&#8221; hover_enabled=&#8221;0&#8243; global_colors_info=&#8221;{}&#8221; background_color=&#8221;RGBA(255,255,255,0)&#8221; sticky_enabled=&#8221;0&#8243;][et_pb_column type=&#8221;4_4&#8243; _builder_version=&#8221;4.16&#8243; custom_padding=&#8221;|||&#8221; global_colors_info=&#8221;{}&#8221; custom_padding__hover=&#8221;|||&#8221;][et_pb_post_title _builder_version=&#8221;4.19.4&#8243; _module_preset=&#8221;default&#8221; meta=&#8221;off&#8221; featured_image=&#8221;off&#8221; hover_enabled=&#8221;0&#8243; sticky_enabled=&#8221;0&#8243; admin_label=&#8221;TERMS OF SERVICE &#8211; Title&#8221;][/et_pb_post_title][et_pb_text admin_label=&#8221;TERMS OF SERVICE &#8211; Text&#8221; _builder_version=&#8221;4.16&#8243; background_size=&#8221;initial&#8221; background_position=&#8221;top_left&#8221; background_repeat=&#8221;repeat&#8221; global_colors_info=&#8221;{}&#8221;]",
      ""
    )
    .replace("[/et_pb_text][/et_pb_column][/et_pb_row][/et_pb_section]", "");

  return {
    props: {
      pageInfo
    },
    revalidate: DEFAULT_REVALIDATION_TIME
  };
};
