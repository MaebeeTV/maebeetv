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
      
      <div className="flex flex-col gap-6 pb-6 bg-[url('/img/SnowBackground.png')] bg-fixed bg-center bg-no-repeat bg-cover">
        <div className="py-16 text-white text-3xl text-center bg-[#0084FF]">
          <h1>Sweet Pea&apos;s Fire</h1>
        </div>
        <div className="flex flex-col gap-6 mx-12">
          <iframe
            className="w-full md:h-[45em] h-[56vw]"
            src="https://www.youtube.com/embed/HK_BAvuWsNA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}
          ></iframe>
          <div className="md:w-[50%] md:my-72 md:text-right self-end text-white md:text-2xl text-lg leading-loose">
            <p>Sweet Pea&apos;s Fire is a story of a creature who had no family or friends to talk to. Sweet Pea tells a fire spirit all about her life after an encounter with one, until she learns she failed to keep the fire going. In which the fire spirit perishes and Sweet Pea realizes what she&apos;s done wrong. <br/><br/> Sweet Pea&apos;s Fire is a fantastic illustration of the neglection cycle. Sweet Pea was neglected by her family in this narrative, and in order to avoid being neglected herself, she neglected others.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
