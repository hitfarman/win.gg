export const calculateReadingTime = (content: string): number => {
  const wpm = 225;
  const words = content.trim().split(/\s+/).length;
  const time = Math.round(words / wpm);

  return time;
};
