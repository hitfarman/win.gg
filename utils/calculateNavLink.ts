type Props = {
  to: number;
  asPath: string;
  pageNumber: number;
  pageParamIsInUrl: boolean;
};

export const calculateNavLink = ({
  asPath,
  pageNumber,
  to,
  pageParamIsInUrl
}: Props): string => {
  if (to === 1) {
    return asPath.replace(`/page/${pageNumber}`, "/");
  }

  if (!pageParamIsInUrl) {
    return `${asPath}${asPath[asPath.length - 1] === "/" ? "" : "/"}page/${to}`;
  }

  return asPath.replace(`/page/${pageNumber}`, `/page/${to}`);
};
