import { Montserrat, Roboto } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--header-font"
});

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--body-font"
});
