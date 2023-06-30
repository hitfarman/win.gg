import { useRouter } from "next/router";
import React from "react";

type Props = {};

const CategoryPage = (props: Props) => {
  const { query } = useRouter();
  return <div>{query.slug || "No slug prop"}</div>;
};

export default CategoryPage;
