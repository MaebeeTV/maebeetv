import { NextPage } from "next";
import { routes } from "modules/routes";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Bars3Icon, LightBulbIcon } from '@heroicons/react/24/solid'
import { useRouter } from "next/router";
import ThemeSwitch from "./ThemeSwitch";
import Head from "next/head";

const Navbar: NextPage = () => {
    const [navbar, setNavbar] = useState(false);
    const router = useRouter();

    const found_route = routes.find((e) => e.path == router.route);

    const title = found_route?.name ? `${found_route.name} -` : "";

    const navbar_options = found_route?.navbar_options;

    return (
        <header className={`bg-${navbar_options?.bg_color ? navbar_options.bg_color : "[#FF9DD0]"} sticky top-0 z-50 md:mt-0 md:py-0 py-3 text-${ navbar_options?.text_color ? navbar_options.text_color : "black" }`}>
            <Head>
                <title>{title} MaebeeTV</title>
                <meta property="og:title" content={title} />
                <meta property="og:type" content="website" />
            </Head>
            <nav>
                <div className="container flex flex-wrap justify-between mx-auto items-stretch gap-3">
                    <Link href="/">
                        <a className="flex items-center justify-center gap-3 mx-3">
                            <Image src="/img/MaebeeTV-logos.png" width="32" height="32" alt="MaebeeTV Logo" />
                            <span className="">MaebeeTV Productions</span>
                        </a>
                    </Link>
                    <button className="transition-all md:hidden px-3" title="Navigation" onClick={() => { setNavbar(!navbar) }}>
                        <Bars3Icon height="32px" />
                    </button>
                    <ul className={`transition-all md:flex ${navbar ? "" : "hidden"} items-stretch md:w-auto w-full`}>
                        {
                            routes.map((e) => {
                                if (e.show_in_nav) {
                                    return (
                                        <li key={e.path} className={`transition-all flex flex-1 items-stretch hover:backdrop-brightness-90 ${e.path == router.route ? "backdrop-brightness-125" : ""}`}>
                                            <Link href={e.path}>
                                                <a className="flex flex-1 justify-center items-center p-3 md whitespace-nowrap">
                                                    {e.name}
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                }
                            })
                        }
                        <li className="flex flex-1 hover:backdrop-brightness-90" >
                            <ThemeSwitch></ThemeSwitch>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
};
export default Navbar