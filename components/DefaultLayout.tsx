import { FC, ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "./Footer";
import InsertedAd from "./InsertedAd";

type Props = {
  children: ReactNode;
};

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col p-4 pb-0 sm:px-6 lg:px-8">
      <Header />
      <InsertedAd
        id="td-top-leaderboard-1"
        className="full-bleed-black mt-16 min-h-[110px] bg-black py-2"
      />
      <main className="flex-[1_1_0] pt-12">{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
