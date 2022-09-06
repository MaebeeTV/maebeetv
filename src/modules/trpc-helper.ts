import { Clearance } from "@prisma/client";
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

export const ClearanceOrder: Clearance[] = [ "User", "Staff", "Moderator", "Admin", "Technician"];

export const SubsetOfClearanceOrder = (lower: Clearance, upper?: Clearance) => {
    if (upper) {
        return ClearanceOrder.slice(ClearanceOrder.indexOf(lower), ClearanceOrder.indexOf(upper) + 1);
    }
    return ClearanceOrder.slice(ClearanceOrder.indexOf(lower));
}