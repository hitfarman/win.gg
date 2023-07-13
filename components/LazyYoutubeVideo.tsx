import React, { FC, useState } from "react";
import Image from "next/image";
import { getYoutubeThumbnail } from "@/utils/getYoutubeThumbnail";
import { PlayIcon } from "@heroicons/react/24/solid";
import { getYoutubeEmbed } from "@/utils/getYoutubeEmbed";

type Props = {
  url: string;
  width: number;
  height: number;
};

const LazyYoutubeVideo: FC<Props> = ({ url, height, width }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  if (isLoaded) {
    return (
      <iframe
        src={`${getYoutubeEmbed(url)}?autoplay=true`}
        width={width}
        height={height}
        className="aspect-[16/9] h-full w-full border-none p-0"
        allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Featured video"
      />
    );
  } else {
    return (
      <div
        className="group relative cursor-pointer"
        onClick={() => setIsLoaded(true)}
      >
        <Image
          src={getYoutubeThumbnail(url)}
          alt="thumbnail"
          width={width}
          height={height}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-black/40 px-2 py-1 text-white transition-all group-hover:scale-125 group-hover:bg-win-primary/70">
          <PlayIcon className="h-10 w-10" />
        </div>
      </div>
    );
  }
};

export default LazyYoutubeVideo;
