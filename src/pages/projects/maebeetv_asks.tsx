import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
const Home: NextPage = () => {

  return (
    <>
      <Head>
        <meta property="og:type" content="video" />
        <meta property='og:video' content='https://www.youtube.com/v/HK_BAvuWsNA' />
      </Head>
      <div className="fixed -z-50 top-0 left-0 h-full w-full bg-gradient-to-br from-orange-400 via-[#FF23AC] to-purple-700"></div>

      <div className="flex-1 flex flex-col gap-6 pb-6 bg-fixed bg-center bg-no-repeat bg-cover">
        <div className="py-16 text-white text-3xl text-center bg-transparent">
          <h1>MaebeeTV Asks</h1>
        </div>

        <div className="flex gap-6 mx-12 flex-nowrap">
          <div className="w-1/2">
            <iframe
              className=""
              src="https://www.youtube.com/embed/HK_BAvuWsNA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}
            ></iframe>
          </div>
          <div className="w-1/2 text-right text-white md:text-2xl text-lg leading-loose">
            <p>MaebeeTV Asks is a webseries with eight episodes that educates people about society and dispels common misunderstandings regarding the LGBT community.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
