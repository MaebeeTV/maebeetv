import { NextPage } from "next";
import { routes } from "modules/routes";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { useRouter } from "next/router";
import ThemeSwitch from "./ThemeSwitch";
import Head from "next/head";

import styles from 'styles/Navbar.module.css'

const Navbar: NextPage = () => {
    const [navbar, setNavbar] = useState(false);
    const router = useRouter();

    const found_route = routes.find((e) => e.path == router.route);

    const title = (found_route?.name ? `${found_route.name} -` : "") + "MaebeeTV";

    const navbar_options = found_route?.navbar_options;

    return (
        <header className={`bg-${navbar_options?.bg_color ? navbar_options.bg_color : "[#FF9DD0]"} sticky top-0 z-50 md:mt-0 text-${ navbar_options?.text_color ? navbar_options.text_color : "black" }`}>
            <Head>
                <title>{title}</title>
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
                    <div className="md:hidden">
                        <ul className={styles.navbar_button_list}>
                            <li>
                                <button className={`${styles.navbar_button} p-2 rounded-bl-xl overflow-hidden`} title="Navigation" onClick={() => { setNavbar(!navbar) }}>
                                    {
                                        !navbar ? <Bars3Icon height="32px" /> : <XMarkIcon height="32px" />
                                    }
                                </button>
                            </li>
                        </ul>
                    </div>
                    <ul className={`${styles.navbar_button_list} ${navbar ? "" : "hidden"}`}>
                        {
                            routes.map((e) => {
                                if (e.show_in_nav) {
                                    return (
                                        <li key={e.path} className={`${styles.navbar_button} ${e.path == router.route ? "backdrop-brightness-[115%]" : ""}`}>
                                            <Link href={e.path}>
                                                <a>
                                                    {e.name}
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                }
                            })
                        }
                        <li className={styles.navbar_button} >
                            <ThemeSwitch></ThemeSwitch>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
};
export default Navbar