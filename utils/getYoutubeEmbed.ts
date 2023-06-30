export const getYoutubeEmbed = (url: string) => {
  const splitStr = url.split("watch?v=");
  return `https://www.youtube.com/embed/${
    splitStr.length > 1 ? `${url.split("watch?v=")[1]}/` : ""
  }`;
};
