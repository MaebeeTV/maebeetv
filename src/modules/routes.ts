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
    }
  },
  {
    name: "MaebeeTV Asks",
    path: "/projects/maebeetv_asks",
    show_in_nav: true,

    navbar_options: {
      bg_color: "transparent",
      text_color: "white"
    }
  }
]

export interface Route {
    name: string,
    path: string,
    show_in_nav?: boolean

    navbar_options?: NavbarOptions
}

export interface NavbarOptions {
    bg_color?: string,
    text_color?: string
}

export interface RouteContainer extends Route {
    routes: Route[]
}