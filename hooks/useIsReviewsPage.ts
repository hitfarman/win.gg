import { useRouter } from "next/router";

export const useGetReviewsPageBtnColor = (): {
  isReviewsPage: boolean;
  buttonClassname: string;
} => {
  const router = useRouter();
  const params = router.query.params;
  if (params && params.length > 0) {
    return params[0] === "reviews"
      ? { buttonClassname: "win-primary-button-yellow", isReviewsPage: true }
      : { buttonClassname: "win-primary-button", isReviewsPage: false };
  }
  return { buttonClassname: "win-primary-button", isReviewsPage: false };
};
