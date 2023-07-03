import LazyYoutubeVideo from "@/components/LazyYoutubeVideo";
import { DOMNode } from "html-react-parser";
import Image from "next/image";

export const replaceImage = (domNode: DOMNode) => {
  // DOMnode type is not correct
  const { name, attribs } = domNode as any;

  if (attribs && /lyMe/.test(attribs.class)) {
    console.log(`https://www.youtube.com/watch?v=${attribs.id}`);

    const youtubeId = attribs.id.split("_")[1];

    return (
      <div className="py-5">
        <LazyYoutubeVideo
          width={640}
          height={360}
          url={`https://www.youtube.com/watch?v=${youtubeId}`}
        />
      </div>
    );
  }

  if (name === "img") {
    return (
      <div className="py-5">
        <Image
          src={attribs.src}
          width={attribs.width || 640}
          height={attribs.height || 360}
          alt={attribs.alt ? attribs.alt : "Blog post image"}
          className="mx-auto"
        />
      </div>
    );
  }

  return domNode;
};
