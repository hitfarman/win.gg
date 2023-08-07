import { useRouter } from "next/router";

export const useIsReviewsPage = (): {
  isReviewPage: boolean;
} => {
  const router = useRouter();
  const params = router.query.params;
  if (params && params.length > 0) {
    return params[0] === "reviews"
      ? { isReviewPage: true }
      : { isReviewPage: false };
  }
  return { isReviewPage: false };
};
