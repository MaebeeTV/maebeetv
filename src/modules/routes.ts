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
]

export interface Route {
    name: string,
    path: string,
    show_in_nav: boolean
}