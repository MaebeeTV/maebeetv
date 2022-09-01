import HeroHeader from "components/HeroHeader";
import { NextPage } from "next";
import Image from "next/image";

const About: NextPage = () => {
    return (
    // <div className="flex-1 m-12 flex items-center justify-center">
    //   <div className="p-6 max-w-5xl rounded-lg border border-gray-200 shadow-md dark:border-gray-700">
    //       <a href="#">
    //           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">About Us</h5>
    //       </a>
    //       <p className="mb-3 font-normal text-gray-700 dark:text-gray-200">
    //         MaebeeTV is a non-profit LGBTQ+ Centered cinema production organisation. We were founded in 2021 with a strive to teach lessons to everyday individuals. We do this by sharing the experiences of others and transforming them into movies and short films to help demonstrate these stories and the lessons that can be learned from them. We are a close-knit group of people who seek to change the world one story at a time. For every story we create and share, a piece of misinformation can be corrected and awareness is spread.
    //       </p>
    //   </div>
    // </div>
        <div className="flex flex-col items-stretch">
            <HeroHeader>
                About Us
            </HeroHeader>
            <div className="flex mx-auto px-16 max-w-screen-xl font-semibold md:flex-row flex-col justify-items-stretch items-center m-6 gap-6">
                <div className="md:w-1/2 text-center">
                    <Image width={562} height={350} src="/img/about/Camera.jpg" alt="camera"></Image>
                </div>
                <div className="md:w-1/2">
                    MaebeeTV is a non-profit LGBT-centered cinema production organization founded in 2021 that strives to teach lessons to young and old individuals. It allows everyday people to make their own experiences into movies or short films. We are a close-knit group of people who want to change the world one story at a time. Every story we create the more misinformation is corrected and awareness is spread.
                </div>
            </div>

        </div>
    );
};

export default About;