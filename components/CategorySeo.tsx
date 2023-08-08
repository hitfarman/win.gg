import Head from "next/head";
import React, { FC } from "react";
import parse from "html-react-parser";
import { ICategoryInfo } from "@/interfaces/categories";
import { parseSeo } from "@/utils/parseSeo";

type Props = {
  categoryInfo: ICategoryInfo | null;
};

const CategorySeo: FC<Props> = ({ categoryInfo }) => {
  const parsedCategorySeo = parse(categoryInfo?.seo.fullHead || "", {
    replace: parseSeo
  });
  return (
    <>
      <Head>{parsedCategorySeo}</Head>
    </>
  );
};

export default CategorySeo;
