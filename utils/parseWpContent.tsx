import LazyYoutubeVideo from "@/components/LazyYoutubeVideo";
import { DOMNode } from "html-react-parser";
import Image from "next/image";

export const parseWpContent = (domNode: DOMNode) => {
  // DOMnode type is not correct
  const { name, attribs, children } = domNode as any;

  if (attribs && /lyMe/.test(attribs.class)) {
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

  if (name === "iframe" && attribs.src && /clips.twitch.tv/.test(attribs.src)) {
    attribs.src = `${attribs.src}&parent=${process.env.NEXT_PUBLIC_FE_DOMAIN}`;
    return (
      <div className="flex justify-center py-5">
        <iframe
          allowFullScreen
          loading="lazy"
          src={attribs.src || ""}
          height={attribs.height || 300}
          width={attribs.width || 600}
          className="border-none"
        >
          {children}
        </iframe>
      </div>
    );
  }

  return domNode;
};
