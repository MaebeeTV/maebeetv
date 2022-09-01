import { Route } from "./types";

export const dashboard_routes: Route[] = [
    {
        name: "Dashboard",
        path: "/dashboard",
        show_in_nav: true
    },
    {
        name: "Teams",
        path: "/dashboard/team",
        show_in_nav: true
    },
    {
        name: "Calendar",
        path: "/dashboard/calendar",
        show_in_nav: true   
    }
]