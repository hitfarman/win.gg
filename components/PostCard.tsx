import { IPost } from "@/interfaces/posts";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

type Props = {
  post: IPost;
};

const PostCard: FC<Props> = ({ post }) => {
  return (
    <div className="flex flex-col gap-10 pb-5 lg:flex-row">
      <Image
        alt={post.featuredImage.node.altText}
        src={post.featuredImage.node.sourceUrl}
        width={350}
        height={250}
        className="max-h-[300px] w-full object-cover lg:h-[250px] lg:w-[350px]"
        sizes="(max-width: 1024px) 100vw, 25vw"
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {post.categories.nodes.map((category) => (
            <Link
              className="win-secondary-button font-header text-xs"
              href={`/category/${category.slug}`}
              key={category.name}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <h3 className="font-header text-2xl font-semibold">{post.title}</h3>
        <div className="flex gap-2 text-sm font-bold text-gray-500">
          <p>
            By {`${post.author.node.firstName} ${post.author.node.lastName}`}
          </p>
          <p>|</p>
          <p>{formatDate(post.date)}</p>
        </div>
        <div
          className="max-h-16 overflow-hidden text-sm text-gray-300"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
      </div>
    </div>
  );
};

export default PostCard;
