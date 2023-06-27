import { FC, ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col p-4 sm:px-6 lg:px-8">
      <Header />
      <main className="flex-[1_1_0]">{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
