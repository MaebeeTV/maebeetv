import HeroHeader from "components/HeroHeader";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
const Home: NextPage = () => {
    return (
        <div className="flex flex-col mb-6">
            <HeroHeader className="font-sans italic">
                Changing the world, one story at a time
            </HeroHeader>

            <div className="flex flex-col gap-3 items-center mx-10">
                <div className="flex gap-32 items-center justify-center text-center min-h-[65vh] max-w-[80%] mb-8 flex-wrap md:flex-nowrap p-7">
                    <div className="md:inline hidden min-w-[150px]">
                        <Image src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fkids.nationalgeographic.com%2Fanimals%2Famphibians%2Ffacts%2Fred-eyed-tree-frog&psig=AOvVaw3gI831MrcsJ8Kj0X9x0WRe&ust=1683418829032000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLC--fu13_4CFQAAAAAdAAAAABAG" width="400" height="400" alt="MaebeeTV Logo" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-4xl md:text-6xl text-orange-400"><h1>Welcome to MaebeeTV!</h1></div>
                        <div className="text-center md:text-right text-1xl md:text-2xl">We are a movie production company that strives to change the way stories are told.</div>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <div className="text-center text-4xl md:text-4xl mb-1 text-orange-400"><h1>Want to join our team?</h1></div>
                    <div className="text-center text-1xl"><p>Our company is commited to providing safe and friendly environments that can ensure the highest quality productions are created. Our films are made as a single team, with smaller groups assigned based on your own unique talents and quirks. Each team is given important tasks with flexible deadlines, all in the spirit of raising awareness and encouraging others to share their stories.</p></div>
                    <div className="text-center my-6 text-xl text-blue-200"><h2>Use this form to apply:</h2></div>
                    <iframe
                        allowTransparency={true}
                        className="min-w-full h-[75vh] bg-transparent border-none"
                        src="https://docs.google.com/forms/d/e/1FAIpQLSdaBYNVmnUodH3BqEIymy7LIrWOhiGqPkH2OF0i-wPWj-YkQA/viewform?embedded=true"
                    >
                        Loading Google Form...
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default Home;
