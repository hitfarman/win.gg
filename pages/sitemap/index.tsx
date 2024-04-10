import React from "react";
import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { DEFAULT_REVALIDATION_TIME } from "@/constants/posts";
import { ICategorySlug } from "@/interfaces/categories";
import { getCategorySlugs } from "@/apollo/categories";
import Link from "next/link";
import { frontendOrigin } from "@/constants/general";

type Props = {
  categories: ICategorySlug[];
};

const SitemapPage: NextPage<Props> = ({ categories }) => {
  return (
    <div>
      <Head>
        <title> Sitemap | WIN.gg</title>
        <meta name="robots" content="index, follow" />
      </Head>
      <Breadcrumbs
        crumbs={[{ text: "Sitemap", url: `${frontendOrigin}/sitemap/` }]}
      />
      <h1 className="mb-10 mt-5 border-b-2 border-b-win-primary pb-5 font-header text-4xl font-semibold">
        Sitemap
      </h1>
      <div className="my-10 flex flex-col gap-5 md:grid md:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.node.slug}
            href={`${frontendOrigin}/${category.node.slug}`}
          >
            {category.node.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SitemapPage;

export const getStaticProps: GetStaticProps = async () => {
  let categories: ICategorySlug[] = [];
  try {
    categories = await getCategorySlugs();
  } catch (e) {
    console.log(
      "Fetching categories failed, generating paths for categories with []",
      e
    );
  }

  return {
    props: {
      categories
    },
    revalidate: DEFAULT_REVALIDATION_TIME
  };
};
