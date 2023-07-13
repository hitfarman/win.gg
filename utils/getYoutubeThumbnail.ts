export const getYoutubeThumbnail = (url: string) => {
  const iswithWatchParam = /watch\?v=/.test(url);
  const isshortYTUrl = /youtu.be/.test(url);
  let splitterStr = "";

  if (isshortYTUrl) {
    splitterStr = "youtu.be/";
  }

  if (iswithWatchParam) {
    splitterStr = "watch?v=";
  }

  const splitStr = url.split(splitterStr);
  return `https://img.youtube.com/vi/${
    splitStr.length > 1 ? `${splitStr[1]}/` : ""
  }maxresdefault.jpg`;
};
