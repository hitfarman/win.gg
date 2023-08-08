export const frontendOrigin = `http${
  process.env.NODE_ENV === "production" ? "s" : ""
}://${process.env.NEXT_PUBLIC_FE_DOMAIN}`;
