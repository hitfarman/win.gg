import { IFeaturedPost } from "@/interfaces/posts";
import React, { FC, useRef } from "react";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { truncateExcerpt } from "@/utils/truncateExcerpt";
import { frontendOrigin } from "@/constants/general";

type Props = {
  featuredPost: IFeaturedPost;
  className?: string;
  variant: "main" | "secondary";
};

const FeaturedPostItem: FC<Props> = ({ featuredPost, className, variant }) => {
  const authorName = `${featuredPost.author.node.firstName} ${featuredPost.author.node.lastName}`;
  const date = formatDate(featuredPost.date);
  const outerLinkRef = useRef<HTMLAnchorElement | null>(null);

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden text-win-black ${
        className || ""
      }`}
    >
      <Image
        alt={featuredPost.featuredImage.node.altText}
        src={featuredPost.featuredImage.node.sourceUrl}
        priority
        fill
        className="object-cover transition duration-500 group-hover:scale-110"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />

      <Link
        className={`absolute inset-0 z-10 flex items-end`}
        href={`${frontendOrigin}/news/${featuredPost.slug}/`}
        ref={outerLinkRef}
      />

      <div
        className={`absolute inset-x-0 bottom-0 z-20 flex flex-col bg-gradient-to-t from-black/80 from-50% ${
          variant === "main" ? "gap-3 p-8" : " gap-1.5 p-4"
        }`}
        onClick={() => {
          if (outerLinkRef.current) {
            outerLinkRef.current.click();
          }
        }}
      >
        <div className="flex flex-wrap gap-3">
          {featuredPost.categories.nodes.map((category) => (
            <Link
              key={`${category.slug}-featured-post-id`}
              href={`${frontendOrigin}/${category.slug}/`}
              className="win-tag-button w-max"
              onClick={(e) => e.stopPropagation()}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <Link
          className={`cursor-pointer font-header  font-semibold  transition-colors hover:text-win-gray  ${
            variant === "main" ? "text-4xl" : "text-base"
          }`}
          href={`${frontendOrigin}/news/${featuredPost.slug}/`}
          onClick={(e) => e.stopPropagation()}
        >
          {featuredPost.title}
        </Link>

        <div
          className={`${variant === "main" ? "text-base" : "text-sm"}`}
          dangerouslySetInnerHTML={{
            __html: truncateExcerpt(featuredPost.excerpt)
          }}
        />

        <div className="flex items-center gap-2 text-xs font-bold">
          <p>{date}</p>
          <p className="pb-0.5">|</p>
          <Link
            href={`${frontendOrigin}/author/${featuredPost.author.node.slug}/`}
            className="transition-colors hover:text-win-slate"
            onClick={(e) => e.stopPropagation()}
          >
            {authorName}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPostItem;
