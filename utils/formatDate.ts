export const formatDate = (str: string) => {
  const date = new Date(str);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};
