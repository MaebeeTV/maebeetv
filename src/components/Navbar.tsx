import { NextPage } from "next";
import { routes } from "modules/routes";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Bars3Icon } from '@heroicons/react/24/solid'

const Navbar: NextPage = () => {
    const [navbar, setNavbar] = useState(false);
    return (
        <nav className="bg-transparent sticky top-0 z-50 md:mt-0 pt-1">
            <div className="container flex flex-wrap justify-between mx-auto items-stretch">
                <Link href="/">
                    <a className="flex items-center justify-center gap-3 mx-3">
                        <Image src="/img/MaebeeTV-logos.png" width="32" height="32" alt="MaebeeTV Logo" />
                        <span className="xss:inline hidden">MaebeeTV Productions</span>
                    </a>
                </Link>
                <button className="md:hidden px-3" title="Navigation" onClick={() => { setNavbar(!navbar) }}>
                   <Bars3Icon height="32px" />
                </button>
                <ul className={`md:flex ${navbar ? "" : "hidden"} items-stretch md:w-auto w-full`}>
                    { 
                        routes.map((e) => {
                            if (e.show_in_nav) {
                                return (
                                    <li key={e.path} className="flex flex-1 items-stretch">
                                        <Link href={e.path}>
                                            <a className="flex flex-1 justify-center items-center px-3 md py-3">
                                                {e.name}
                                            </a>
                                        </Link>
                                    </li>
                                )
                            }
                        }) 
                    }

                </ul>
            </div>
        </nav>
    )
};
export default Navbar