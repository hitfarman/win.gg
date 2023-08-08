export const truncateExcerpt = (desc: string | null): string => {
  if (!desc) {
    return "";
  }

  if (desc.length > 100) {
    return desc.substring(0, 100) + desc.substring(100).split(" ")[0] + "...";
  } else {
    return desc;
  }
};
