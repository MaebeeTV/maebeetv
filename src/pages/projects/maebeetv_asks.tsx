import HeroHeader from "components/HeroHeader";
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
                <HeroHeader className="text-white bg-transparent text-center">
                    MaebeeTV Asks
                </HeroHeader>

                <div className="flex md:items-center flex-1 gap-8 flex-wrap md:flex-nowrap text-center md:mx-24 mx-6">
                    <div className="md:w-7/12 w-full">
                        <div className="w-full overflow-hidden relative pt-[56.25%]"> {/* arbirtary value is for making aspect ratio 16:9 */}
                            <iframe
                                className="w-full h-full top-0 bottom-0 right-0 left-0 absolute"
                                src="https://www.youtube.com/embed/r_fWFDubP_Q" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}
                            />
                        </div>
                        <p className="px-16 pt-4 text-1xl">MaebeeTV Asks was created by Mae Spencer, MaebeeTV&apos;s CEO, in an effort to provide everyone with access to knowledge they need to learn.</p>
                    </div>
                    <div className="md:w-5/12 md:text-right w-full text-white font-extrabold text-4xl md:mb-16 md:px-6">
                        <p>MaebeeTV Asks is a webseries with nine episodes that educates people about society and dispels common misunderstandings regarding the LGBT community.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
