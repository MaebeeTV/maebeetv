import { trpc } from "utils/trpc"


export const OptimisticRefreshDefault = (ctx: ReturnType<typeof trpc.useContext>, query: Parameters<typeof ctx.cancelQuery>[0]) => {    
    return {
        onMutate: () => {
            ctx.cancelQuery(query)
            const optimisticUpdate = ctx.getQueryData(query);
            if (optimisticUpdate) {
                ctx.setQueryData(query, optimisticUpdate);
            }
        },
        onSettled: () => {
            ctx.invalidateQueries(query);
        }
    } as Parameters<typeof trpc.useMutation>[1]
}