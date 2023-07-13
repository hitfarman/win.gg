export const getYoutubeEmbed = (url: string) => {
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
  return `https://www.youtube.com/embed/${
    splitStr.length > 1 ? `${splitStr[1]}/` : ""
  }`;
};
