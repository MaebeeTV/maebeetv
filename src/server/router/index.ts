// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { teamRouter } from "./team";
import { roleRouter } from "./role";
import { calendarEntryRouter } from "./calendarEntry";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge("example.", exampleRouter)
    .merge("auth.", protectedExampleRouter)
    .merge("team.", teamRouter)
    .merge("role.", roleRouter)
    .merge("calendarEntry.", calendarEntryRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
