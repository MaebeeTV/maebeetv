import { Route, routes as impted_routes } from "modules/routes";
import Link from "next/link";
import Image from "next/image";
import { FC, useState } from "react";
import { Bars3Icon, XMarkIcon, ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { useRouter } from "next/router";
import ThemeSwitch from "./ThemeSwitch";
import Head from "next/head";

import { useSession, signOut } from "next-auth/react";

import styles from 'styles/Navbar.module.css'
import { Menu } from "@headlessui/react";

export interface NavbarProps {
    routes?: Route[]
}

const Navbar: FC<NavbarProps> = (props) => {
    const routes = props.routes ? props.routes : impted_routes;

    const [navbar, setNavbar] = useState(false);
    const router = useRouter();

    const { data: session } = useSession();

    const found_route = routes.find((e) => e.path == router.route);

    const title = (found_route?.name ? `${found_route.name} - ` : "") + "MaebeeTV";

    const navbar_options = found_route?.navbar_options;

    const bg_color = `bg-${navbar_options?.bg_color ? navbar_options.bg_color : "[#FF9DD0]"}`
    const text_color = navbar_options?.text_color ? navbar_options.text_color : "black"

    let folders = routes.map(e => e.folder as NonNullable<typeof e.folder>).filter(Boolean);

    return (
        <header className={`${bg_color} sticky top-0 z-50 md:mt-0 text-${text_color}`}>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta property="og:type" content="website" />
            </Head>
            <nav>
                <div className="container flex flex-wrap md:flex-nowrap justify-between mx-auto items-stretch gap-3">
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
                    <ul className={`${styles.navbar_button_list} ${navbar ? "max-h-screen mb-2" : "max-h-0"}`}>
                        {
                            routes.map((e) => {
                                if (e.show_in_nav) {
                                    if (e.folder) {
                                        if (!folders.includes(e.folder)) return <></>;
                                        folders = folders.filter(folder => folder !== e.folder)
                                        
                                        const folder_routes = routes.filter(e => e.folder);

                                        return (
                                            <Menu as="li" key={e.folder} className="relative">
                                                <div className="flex-1 flex items-stretch flex-wrap md:flex-nowrap">
                                                    <Menu.Button className={styles.navbar_button}>
                                                        <span className={styles.navbar_button_button}>
                                                            {e.folder} <ChevronDownIcon className="ml-1 mt-1" height="18px" />
                                                        </span>
                                                    </Menu.Button>
                                                    <Menu.Items className={`md:absolute md:mt-12 right-0 min-w-full ${bg_color}`}>
                                                        {folder_routes.map(folder_route => (
                                                            <Menu.Item key={folder_route.path} as="div" className={`${styles.navbar_button} ${folder_route.path == router.route ? "backdrop-brightness-[115%]" : ""}`}>
                                                                <Link href={folder_route.path} >
                                                                    <a className="" onClick={() => { setNavbar(!navbar) }}>
                                                                        {folder_route.name}
                                                                    </a>
                                                                </Link>
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </div>
                                            </Menu>
                                        )
                                    }
                                    else {
                                        return (
                                            <li key={e.path} className={`${styles.navbar_button} ${e.path == router.route ? "backdrop-brightness-[115%]" : ""}`}>
                                                <Link href={e.path}>
                                                    <a onClick={() => { setNavbar(!navbar) }}>
                                                        {e.name}
                                                    </a>
                                                </Link>
                                            </li>
                                        )
                                    }
                                }
                            })
                        }
                        <li className={styles.navbar_button} >
                            <ThemeSwitch></ThemeSwitch>
                        </li>
                        {
                            session ? (
                                <li className={styles.navbar_button}>
                                    <button className="px-3 py-1 flex flex-1 justify-center items-center" title="Logout" onClick={() => { signOut({ callbackUrl: location.origin }) }}>
                                        <ArrowLeftOnRectangleIcon height="32px" />
                                    </button>
                                </li>
                            ) : (
                                <li className={styles.navbar_button}>
                                    <div className="flex-1">
                                        <Link href="/auth/login">
                                            <a onClick={() => { setNavbar(!navbar) }} className="px-3 py-1 flex h-full justify-center items-center">
                                                <ArrowRightOnRectangleIcon height="32px" />
                                            </a>
                                        </Link>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
};
export default Navbar