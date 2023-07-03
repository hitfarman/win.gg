import Head from "next/head";
import React, { FC } from "react";
import parse from "html-react-parser";
import { ICategoryInfo } from "@/interfaces/categories";

type Props = {
  categoryInfo: ICategoryInfo | null;
};

const CategorySeo: FC<Props> = ({ categoryInfo }) => {
  const parsedCategorySeo = parse(categoryInfo?.seo.fullHead || "");
  return (
    <>
      <Head>
        {parsedCategorySeo}
        <meta
          property="og:site_name"
          content={`${process.env.NEXT_PUBLIC_FE_DOMAIN}`}
        />
        <meta
          property="og:url"
          content={`https://${process.env.NEXT_PUBLIC_FE_DOMAIN}/category/${categoryInfo?.slug}/`}
        />
        <link
          rel="canonical"
          href={`https://${process.env.NEXT_PUBLIC_FE_DOMAIN}/category/${categoryInfo?.slug}/`}
        />
      </Head>
    </>
  );
};

export default CategorySeo;
