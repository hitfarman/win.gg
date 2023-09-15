export const hasInvalidPageParams = (params: string[]): boolean => {
  if (params.length === 2 || params.length > 3) {
    return true;
  }

  if (params.length === 3) {
    if (params[1] !== "page" || isNaN(Number(params[2]))) {
      return true;
    }
  }

  return false;
};
