import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

declare module "next" {
    type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
        getLayout?: (page: ReactElement) => ReactNode
    }
}
