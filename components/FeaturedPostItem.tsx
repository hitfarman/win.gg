import { IFeaturedPost } from "@/interfaces/posts";
import React, { FC } from "react";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  featuredPost: IFeaturedPost;
  className?: string;
  variant: "main" | "secondary";
};

const FeaturedPostItem: FC<Props> = ({ featuredPost, className, variant }) => {
  const authorName = `${featuredPost.author.node.firstName} ${featuredPost.author.node.lastName}`;
  const date = formatDate(featuredPost.date);
  const router = useRouter();

  const goToPostPage = () => {
    router.push(`/news/${featuredPost.slug}`);
  };

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden ${
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
      <div
        className="absolute inset-0 z-10 flex items-end bg-black/70 p-8"
        onClick={goToPostPage}
      >
        <div
          className={`flex flex-col ${
            variant === "main" ? "gap-3" : "gap-1.5"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-wrap gap-3">
            {featuredPost.categories.nodes.map((category) => (
              <Link
                key={`${category.slug}-featured-post-id`}
                href={`/${category.slug}`}
                className="win-primary-button w-max font-header text-sm font-bold"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <h3
            className={`cursor-pointer font-header text-4xl font-semibold transition-colors hover:text-win-primary ${
              variant === "secondary" ? "text-lg" : ""
            }`}
            onClick={goToPostPage}
          >
            {featuredPost.title}
          </h3>
          <div className="flex items-center gap-2 text-xs font-bold">
            <p>{date}</p>
            <p>{"//"}</p>
            <Link
              href={`/news/author/${featuredPost.author.node.slug}`}
              className="transition-colors hover:text-gray-300"
            >
              {authorName}
            </Link>
          </div>
          <div
            className="max-h-[52px] overflow-hidden"
            dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedPostItem;
