export interface Route {
    name: string,
    path: string,
    show_in_nav?: boolean

    navbar_options?: NavbarOptions

    folder?: string
}

export interface NavbarOptions {
    bg_color?: string,
    text_color?: string
}