import React from "react";
import Head from "next/head";
import Image from "next/image";
import { getPageInfoBySlug } from "@/apollo/pageInfo";
import { IAboutUsCardInfo, IPageInfo } from "@/interfaces/pageInfo";
import { GetStaticProps, NextPage } from "next";
import parse from "html-react-parser";
import Breadcrumbs from "@/components/Breadcrumbs";
import heroImg from "@/assets/img/about-us-hero.jpeg";
import ceoImg from "@/assets/img/ceo.png";
import contentManagerImg from "@/assets/img/content-manager.png";
import HeadOfVideoImg from "@/assets/img/head-of-video.png";
import Link from "next/link";
import AboutUsCard from "@/components/AboutUsCard";
import { DEFAULT_REVALIDATION_TIME } from "@/constants/posts";

type Props = {
  pageInfo: IPageInfo;
};

const aboutUsCards: IAboutUsCardInfo[] = [
  {
    name: "Stephen Shoemaker",
    position: "CEO",
    image: ceoImg,
    email: "stephen@win.gg"
  },
  {
    name: "Marta Juras",
    position: "Head of Content and Operations",
    image: contentManagerImg,
    email: "marta@win.gg"
  },
  {
    name: "Marcin Rojek",
    position: "Head of Video",
    image: HeadOfVideoImg,
    email: "mrojek@winners.net"
  }
];

const AboutUsPage: NextPage<Props> = ({ pageInfo }) => {
  return (
    <>
      <Head>{parse(pageInfo.seo.fullHead)}</Head>
      <Breadcrumbs crumbs={[{ text: "About us", url: "/about-us" }]} />
      <h1 className="mb-10 mt-5 border-b-2 border-b-white pb-5 font-header text-4xl font-semibold">
        About us
      </h1>
      <div className="parsed-wp-content mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Image
          src={heroImg}
          alt="About us"
          className="order-2 object-contain md:order-1"
        />
        <div className="order-1 md:order-2">
          <p>
            First of all, we love that you’re interested in learning more about
            us! If you’re looking to contact us, please visit our{" "}
            <Link href="/contact">contact page</Link>.
          </p>
          <p>
            WIN.gg is a video gaming media platform that brings gamers all the
            information they’re looking for in written and in video format. From
            esports coverage to Eldern Ring guides, you’ll find it all on
            WIN.gg. As gamers behind the scenes ourselves, we bring strong
            knowledge of the space and audience interests. We built great
            coverage with our small team and our growing every day – thank you
            for supporting us!
          </p>
          <p>WIN.gg is a proud member of Final Boss Entertainment.</p>
          <Link href="/contact">
            <button className="win-primary-button mx-auto mt-5">Contact</button>
          </Link>
        </div>
      </div>
      <h2 className="mb-10 mt-16 border-b-2 border-b-white pb-5 font-header text-4xl font-semibold">
        Team members
      </h2>
      <div className="mb-10 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-5">
        {aboutUsCards.map((card) => (
          <AboutUsCard key={card.name} info={card} />
        ))}
      </div>
    </>
  );
};

export default AboutUsPage;

export const getStaticProps: GetStaticProps = async () => {
  let pageInfo: IPageInfo | null = null;

  try {
    pageInfo = await getPageInfoBySlug("about-us");
  } catch (e) {
    console.log("Fetching pageInfo failed in getStaticProps, with cause:", e);
  }

  if (!pageInfo) {
    return { notFound: true };
  }

  return {
    props: {
      pageInfo
    },
    revalidate: DEFAULT_REVALIDATION_TIME
  };
};
