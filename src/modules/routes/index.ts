import { Route } from "./types";

export const routes: Route[] = [
    {
        name: "Home",
        path: "/",
        show_in_nav: true,
    },
    {
        name: "About Us",
        path: "/about",
        show_in_nav: true,
    },
    {
        name: "Sweet Pea's Fire",
        path: "/projects/sweet_peas_fire",
        show_in_nav: true,

        navbar_options: {
            bg_color: "[#0084FF]",
            text_color: "white"
        },
        folder: "Projects"        
    },
    {
        name: "MaebeeTV Asks",
        path: "/projects/maebeetv_asks",
        show_in_nav: true,

        navbar_options: {
            bg_color: "transparent",
            text_color: "white"
        },
        folder: "Projects"
    }
]