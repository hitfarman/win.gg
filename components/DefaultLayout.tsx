import { FC, ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsertedAd from "@/components/InsertedAd";

type Props = {
  children: ReactNode;
};

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col p-4 pb-0 sm:px-6 lg:px-8">
      <Header />
      <InsertedAd
        id="td-top-leaderboard-1"
        className="full-bleed-black mt-16 hidden bg-black py-2 md:flex md:min-h-[110px]"
      />
      <main className="flex-[1_1_0] pt-24 md:pt-12">{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
