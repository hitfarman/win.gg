import { IPost } from "@/interfaces/posts";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { truncateMetaDesc } from "@/utils/truncateMetaDesc";

type Props = {
  post: IPost;
  variant?: "fixed-vertical";
};

const PostCard: FC<Props> = ({ post, variant }) => {
  return (
    <div
      className={`grid grid-cols-1 grid-rows-[275px_1fr] gap-10 pb-5 ${
        variant === "fixed-vertical"
          ? "lg:grid-rows-[220px_1fr]"
          : "lg:grid-cols-2 lg:grid-rows-1"
      }`}
    >
      <Link href={`/news/${post.slug}`} className="h-full">
        <Image
          alt={post.featuredImage?.node.altText}
          src={post.featuredImage?.node.sourceUrl}
          width={350}
          height={250}
          className="h-full w-full object-cover transition-opacity hover:opacity-70"
          sizes="(max-width: 1024px) 100vw, 25vw"
        />
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {post.categories.nodes.map((category) => (
            <Link
              className="win-primary-button font-header text-xs"
              href={`/${category.slug}`}
              key={category.name}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <Link
          className="cursor-pointer font-header text-2xl font-semibold transition-colors hover:text-win-primary"
          href={`/news/${post.slug}`}
        >
          <h3>{post.title}</h3>
        </Link>
        <div className="flex gap-2 text-sm font-bold text-gray-500">
          <Link
            href={`/news/author/${post.author.node.slug}`}
            className="transition-colors hover:text-gray-300"
          >
            By {`${post.author.node.firstName} ${post.author.node.lastName}`}
          </Link>
          <p>|</p>
          <p>{formatDate(post.date)}</p>
        </div>
        <div
          className="max-h-16 overflow-hidden text-sm text-gray-300"
          dangerouslySetInnerHTML={{
            __html: truncateMetaDesc(post.seo.metaDesc)
          }}
        />
      </div>
    </div>
  );
};

export default PostCard;
