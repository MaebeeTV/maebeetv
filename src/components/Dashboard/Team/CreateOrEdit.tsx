import { Dialog } from "@headlessui/react";
import { Team, User } from "@prisma/client";
import Button from "components/Button";
import Card from "components/Card";
import UserSearch from "components/Search/User";
import { OptimisticRefreshDefault } from "modules/trpc-helper";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { trpc } from "utils/trpc";

export interface CreateTeamOrEditProps {
    teamId?: string,
    children: (input: [boolean, Dispatch<SetStateAction<boolean>>]) => React.ReactNode;
}

const CreateTeamOrEdit: FC<CreateTeamOrEditProps> = ({ teamId, children }) => {
    const ctx = trpc.useContext();
    const createTeam = trpc.useMutation("team.create", OptimisticRefreshDefault(ctx, ["team.get_all"]) as any);
    const editTeam = trpc.useMutation("team.edit", OptimisticRefreshDefault(ctx, ["team.get_all"]) as any);
    
    const selectedUsersState = useState<User[]>([]),
        [selectedUsers, setSelectedUsers] = selectedUsersState;

    const openState = useState(false),
        [newTeamOpen, setNewTeamOpen] = openState;
    
    const form_ref = useRef<HTMLFormElement>(null)

    const createOrEditText = teamId ? "Edit" : "Create";

    if (teamId) {
        trpc.useQuery(["team.get", { id: teamId }], { enabled: newTeamOpen, 
            onSuccess: (e) => {
                if (e && form_ref.current) {
                    for (const i in e) {
                        if (form_ref.current[i]) {
                            form_ref.current[i].value = (e as any)[i]
                        }
                    }
                }
            } 
        });
        trpc.useQuery(["team.get_users", { id: teamId }], { enabled: newTeamOpen, onSuccess: (e) => { setSelectedUsers(e ? e : selectedUsers) } });
    }

    return (
        <>
            { children(openState) }
            <Dialog className="p-3 absolute top-0 left-0 flex items-center justify-center w-full h-full" open={newTeamOpen} onClose={() => setNewTeamOpen(false)}>
                <Dialog.Panel>
                    <Card title={`${createOrEditText} Team`} className="dark:backdrop-filter-none dark:bg-black bg-white max-w-none">
                        <form
                            ref={form_ref}
                            onSubmit={(event) => {
                                event.preventDefault();
                                const target = event.target as unknown as { [key: string]: { value?: string, name?: string } };
                                const value_map = Object.assign({}, 
                                    ...(
                                        Object.keys(event.target).map(e => {
                                            const target_e = target[e];
                                            if (target_e && target_e.name) {
                                                return { [target_e.name]: (target_e?.value ? target_e.value : undefined) }
                                            }
                                        }).filter(e => e)
                                    )
                                );
                                if (teamId) editTeam.mutate({memberUserIds: selectedUsers.map(e => e.id), ...value_map, id: teamId});
                                else createTeam.mutate({memberUserIds: selectedUsers.map(e => e.id), ...value_map});
                                setNewTeamOpen(false);
                            }}
                        >
                            <input name="name" className="my-2 text_input" placeholder="Name" required />
                            <textarea name="description" className="my-2 text_input md:min-w-[50vw] min-w-[80vw]" placeholder="Description" />
                            <UserSearch selectedUsersState={selectedUsersState}></UserSearch>

                            <Button type="submit" className="my-2 mr-3">{createOrEditText}</Button>
                            <Button className="my-2" onClick={() => setNewTeamOpen(false)}>Cancel</Button>
                        </form>
                    </Card>
                </Dialog.Panel>
            </Dialog>
        </>
    )
}

export default CreateTeamOrEdit