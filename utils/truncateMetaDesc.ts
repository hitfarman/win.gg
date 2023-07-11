export const truncateMetaDesc = (desc: string) => {
  if (desc.length > 100) {
    return desc.substring(0, 100) + desc.substring(100).split(" ")[0] + "...";
  } else {
    return desc;
  }
};
