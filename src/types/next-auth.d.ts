import { DefaultSession } from "next-auth";
import { Clearance } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      discordName?: string;
      clearance: Clearance;
    } & DefaultSession["user"];
  }
}
