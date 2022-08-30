import { NextPage } from "next";

const About: NextPage = () => {
    return (
      <div className="min-h-full m-12 flex items-center justify-center">
        <div className="p-6 max-w-5xl rounded-lg border border-gray-200 shadow-md dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">About Us</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-200">
              MaebeeTV is a non-profit LGBTQ+ Centered cinema production organisation. We were founded in 2021 with a strive to teach lessons to everyday individuals. We do this by sharing the experiences of others and transforming them into movies and short films to help demonstrate these stories and the lessons that can be learned from them. We are a close-knit group of people who seek to change the world one story at a time. For every story we create and share, a piece of misinformation can be corrected and awareness is spread.
            </p>
        </div>
      </div>
    );
};

export default About;