import { NextPage } from "next";

const About: NextPage = () => {
    return (
      <div className="h-full">
        <div className="p-6 max-w-sm rounded-lg border border-gray-200 shadow-md dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>
      </div>
    );
};

export default About;