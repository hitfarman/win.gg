export const frontendOrigin =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_FE_DOMAIN}`
    : "http://localhost:3000";
