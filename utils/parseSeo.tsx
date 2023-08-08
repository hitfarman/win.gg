import { DOMNode } from "html-react-parser";

export const parseSeo = (domNode: DOMNode) => {
  // DOMnode type is not correct
  const { name, attribs, children } = domNode as any;

  if (attribs && /lyMe/.test(attribs.class)) {
  }

  if (name === "meta" && attribs.property === "og:site_name") {
    attribs.content = process.env.NEXT_PUBLIC_FE_DOMAIN;
  }
  if (name === "meta" && attribs.property === "og:url") {
    attribs.content = attribs.content
      .replace(
        process.env.NEXT_PUBLIC_WP_API_DOMAIN,
        process.env.NEXT_PUBLIC_FE_DOMAIN
      )
      .replace("./", ""); // Had to insert this line because WP sends it on tag pages only
  }
  if (name === "link" && attribs.rel === "canonical") {
    return <></>;
  }

  return domNode;
};
