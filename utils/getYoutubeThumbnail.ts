export const getYoutubeThumbnail = (url: string) => {
  const splitStr = url.split("watch?v=");
  return `https://img.youtube.com/vi/${
    splitStr.length > 1 ? `${url.split("watch?v=")[1]}/` : ""
  }maxresdefault.jpg`;
};
