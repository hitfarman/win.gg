import Breadcrumbs from "@/components/Breadcrumbs";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage
} from "next";
import React, { JSXElementConstructor, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ICategoryInfo, ICategorySlug } from "@/interfaces/categories";
import { getCategoryInfoBySlug, getCategorySlugs } from "@/apollo/categories";
import { englishMonthNames } from "@/constants/dates";
import { IPaginatedPostsResponse, IPost } from "@/interfaces/posts";
import {
  getFirstPostInCategoryByYearAndMonth,
  getPaginatedPosts,
  getPaginatedPostsFilteredByDate
} from "@/apollo/posts";
import { DEFAULT_REVALIDATION_TIME, POSTS_PER_PAGE } from "@/constants/posts";
import { calculatePaginationOffset } from "@/utils/calculatePaginationOffset";
import { hasTooHighPagenumber } from "@/utils/hasTooHighPagenumber";
import PostList from "@/components/PostList";
import Link from "next/link";
import { frontendOrigin } from "@/constants/general";

type Props = {
  categoryInfo: ICategoryInfo & {
    earliestYear: number;
    monthsForYear: { month: number; hasPosts: boolean }[];
  };
  year: number;
  month?: string;
  pageNumber?: number;
  paginatedPosts: IPaginatedPostsResponse;
};

const SitemapPage: NextPage<Props> = ({
  categoryInfo,
  year,
  month,
  paginatedPosts
}) => {
  let crumbs = [
    {
      text: "Sitemap",
      url: `/sitemap`
    },
    {
      text: `${categoryInfo.name}`,
      url: `/sitemap/${categoryInfo.slug}`
    }
  ];

  if (year) {
    crumbs.push({
      text: `${year}`,
      url: `/sitemap/${categoryInfo.slug}/${year}`
    });
  }

  if (month) {
    crumbs.push({
      text: `${month}`,
      url: `/sitemap/${categoryInfo.slug}/${year}/${month}`
    });
  }

  const content = getSitemapContent(
    {
      ...categoryInfo,
      earliestYear: Number(categoryInfo.earliestYear),
      monthsForYear: categoryInfo.monthsForYear
    },
    Number(year),
    month,
    paginatedPosts
  );

  return (
    <>
      {/* SEO */}
      <Head>
        <title>{`Sitemap ${categoryInfo?.name} - WIN.gg`}</title>
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="mb-10">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      {content}
    </>
  );
};

export default SitemapPage;

export const getStaticPaths: GetStaticPaths = async () => {
  let categories: ICategorySlug[] = [];

  try {
    categories = await getCategorySlugs();
  } catch (e) {
    console.log(
      "Fetching categories failed, generating paths for categories with []",
      e
    );
  }

  const paths: { params: { params: string[] } }[] = [
    ...categories.map((category) => ({
      params: { params: [category.node.slug] }
    }))
  ];
  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context.params as { params: string[] };
  const categoryName: string | null = params[0] ?? null;
  const year: string | null = params[1] ?? null;
  const month: string | null = params[2] ?? null;
  const pageNumber: string | null = params[4] ?? null;

  let categoryInfo: ICategoryInfo | null = null;
  let paginatedPosts: IPaginatedPostsResponse | null = null;
  let earliestYearInCategory: number | null = null;

  if (month && !englishMonthNames.includes(month)) {
    return { notFound: true };
  }

  if (year && isNaN(Number(year))) {
    return { notFound: true, revalidate: DEFAULT_REVALIDATION_TIME };
  }

  if (pageNumber && isNaN(Number(pageNumber))) {
    return { notFound: true, revalidate: DEFAULT_REVALIDATION_TIME };
  }

  try {
    categoryInfo = await getCategoryInfoBySlug(categoryName);
  } catch (e) {
    console.log(
      `Fetching category info for category: ${categoryName} failed with cause:`,
      e
    );
  }

  if (!categoryInfo) {
    return { notFound: true, revalidate: DEFAULT_REVALIDATION_TIME };
  }

  if (year && month) {
    const monthsPosts = await getFirstPostInCategoryByYearAndMonth({
      month: englishMonthNames.indexOf(month) + 1,
      year: Number(year),
      categoryName: categoryInfo?.slug
    });
    if (monthsPosts.posts.nodes.length < 1) {
      return { notFound: true, revalidate: DEFAULT_REVALIDATION_TIME };
    }

    try {
      paginatedPosts = await getPaginatedPostsFilteredByDate({
        size: POSTS_PER_PAGE,
        year: Number(year),
        month: englishMonthNames.indexOf(month) + 1,
        offset: pageNumber ? calculatePaginationOffset(Number(pageNumber)) : 0,
        categoryName: categoryInfo.slug
      });
    } catch (e) {
      console.log("Fetching paginated posts failed with cause:", e);
    }
    if (
      paginatedPosts &&
      hasTooHighPagenumber(
        paginatedPosts.posts.pageInfo.offsetPagination.total,
        Number(pageNumber)
      )
    ) {
      return { notFound: true, revalidate: DEFAULT_REVALIDATION_TIME };
    }
  }

  if (!year && !month) {
    const allPosts = await getPaginatedPosts({
      categoryName: categoryInfo.slug
    });
    const lastPost = await getPaginatedPosts({
      categoryName: categoryInfo.slug,
      size: 1,
      offset: allPosts.posts.pageInfo.offsetPagination.total - 1
    });

    earliestYearInCategory = new Date(
      Date.parse(lastPost.posts.edges[0].node.date)
    ).getFullYear();
  }

  let monthsForYear: { month: number; hasPosts: boolean }[] = [];

  if (year) {
    monthsForYear = await Promise.all(
      Array.from({ length: 12 }, (x, i) => i + 1).map(async (month) => {
        return {
          month: month,
          hasPosts:
            (
              await getFirstPostInCategoryByYearAndMonth({
                month: month,
                year: Number(year),
                categoryName: categoryInfo?.slug
              })
            ).posts.nodes.length > 0
        };
      })
    );
  }

  return {
    props: {
      categoryInfo: {
        ...categoryInfo,
        earliestYear: earliestYearInCategory,
        monthsForYear: monthsForYear
      },
      year: Number(year),
      month,
      pageNumber,
      paginatedPosts
    }
  };
};

function getSitemapContent(
  categoryInfo: ICategoryInfo & {
    earliestYear: number;
    monthsForYear: { month: number; hasPosts: boolean }[];
  },
  year: number,
  month: string | undefined,
  paginatedPosts: IPaginatedPostsResponse | null
): JSX.Element {
  /*
    /sitemap/[category]/[year]/[month]/page/[pageNumber]
    /sitemap/[category]/[year]/[month]
    /sitemap/[category]/[year]
    /sitemap/[category]
*/

  if (paginatedPosts) {
    return (
      <div className="flex flex-col gap-10 py-5 md:flex-row">
        <div className="flex-1">
          <PostList
            paginatedPosts={paginatedPosts}
            title={`${categoryInfo.name} - ${year} ${month}`}
          />
        </div>
      </div>
    );
  }

  if (year) {
    return (
      <div className={`flex flex-col gap-y-2 pb-5`}>
        {categoryInfo.monthsForYear
          .filter((month) => month.hasPosts)
          .map((month) => (
            <Link
              key={month.month}
              href={`${frontendOrigin}/sitemap/${categoryInfo.slug}/${year}/${
                englishMonthNames[month.month - 1]
              }`}
              className="win-tag-button w-max uppercase"
            >
              {englishMonthNames[month.month - 1]}
            </Link>
          ))}
      </div>
    );
  }

  let years = Array.from(
    { length: new Date().getFullYear() - categoryInfo.earliestYear + 1 },
    (x, i) => i + categoryInfo.earliestYear
  );

  return (
    <div className={`flex flex-col gap-y-2 pb-5`}>
      {years.map((year) => (
        <Link
          key={year}
          href={`${frontendOrigin}/sitemap/${categoryInfo.slug}/${year}/`}
          className="win-tag-button w-max uppercase"
        >
          {year}
        </Link>
      ))}
    </div>
  );
}
