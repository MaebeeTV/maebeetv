import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
const Home: NextPage = () => {

  return (
    <>
      <Head>
        <meta property="og:type" content="video" />
        <meta property='og:video' content='https://www.youtube.com/v/r_fWFDubP_Q' />
      </Head>
      <div className="fixed -z-50 top-0 left-0 h-full w-full bg-gradient-to-br from-orange-400 via-[#FF23AC] to-purple-700"></div>

      <div className="flex-1 flex flex-col gap-6 pb-6 text-white">
        <div className="py-32 font-bold text-5xl text-center bg-transparent">
          <h1>MaebeeTV Asks</h1>
        </div>

        <div className="flex md:items-center flex-1 gap-8 mx-12 flex-wrap md:flex-nowrap">
          <div className="md:w-7/12 w-full">
            <iframe
              className="w-full md:h-[60vh] h-[56vw]"
              src="https://www.youtube.com/embed/r_fWFDubP_Q" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}
            ></iframe>
            <p>MaebeeTV Asks was created by Mae Spencer, MaebeeTV&apos;s CEO, in an effort to provide everyone with access to knowledge they need to learn.</p>
          </div>
          <div className="md:w-5/12 md:text-right w-full text-white font-extrabold text-3xl">
            <p>MaebeeTV Asks is a webseries with eight episodes that educates people about society and dispels common misunderstandings regarding the LGBT community.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
