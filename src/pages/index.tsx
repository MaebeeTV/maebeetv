import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-6 pb-6">
      <div className="py-16 text-black text-3xl text-center bg-[#FF9DD0]">
        <h1>Changing the world, one story at a time</h1>
      </div>

      <div className="flex flex-col gap-12 items-center mx-6">
        <div className="flex items-center justify-center gap-6 flex-wrap text-center min-h-[65vh]">
          <div className="m-3">
          <Image src="/img/MaebeeTV-logos.png" width="360" height="360" alt="MaebeeTV Logo" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-3xl md:text-4xl"><h1>Welcome to MaebeeTV!</h1></div>
            <div className="text-xl md:text-2xl">We are a movie production company that strives to change the way stories are told.</div>
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="text-center text-3xl md:text-4xl mb-2"><h1>Want to join our team?</h1></div>
          <div><p>Our company is commited to providing safe and friendly environments that can ensure the highest quality productions are created. Our films are made as a single team, with smaller groups assigned based on your own unique talents and quirks. Each team is given important tasks with flexible deadlines, all in the spirit of raising awareness and encouraging others to share their stories.</p></div>
          <div className="text-center mt-6 mb-3 text-xl"><h2>Use the form below to apply:</h2></div>
          <iframe 
            className="min-w-full h-[75vh]"
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
