import { IVideo } from "@/interfaces/videos";
import React, { FC } from "react";

type Props = {
  video: IVideo;
};

const VideoCard: FC<Props> = ({ video }) => {
  return <div>{video.title}</div>;
};

export default VideoCard;
