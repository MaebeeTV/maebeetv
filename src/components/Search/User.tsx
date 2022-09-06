import { Combobox } from "@headlessui/react";
import { User } from "@prisma/client";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { trpc } from "utils/trpc";

import { XCircleIcon } from "@heroicons/react/24/solid";

export interface UserSearchProps {
    selectedUsersState: [User[], Dispatch<SetStateAction<User[]>>]
}

const UserSearch: FC<UserSearchProps> = ({ selectedUsersState: [ selectedUsers, setSelectedUsers ] }) => {
    // for selecting users
    const [query, setQuery] = useState('');

    const filteredUsers = trpc.useQuery(["user.get_search", {
        query
    }]).data;

    const input_key_down = (e: any) => {
        if (!e.target.value && e.code === "Backspace") {
            const selectedUsersCopy = [...selectedUsers];
            selectedUsersCopy.pop();
            setSelectedUsers(selectedUsersCopy);
        }
    };
        
    return (
        <Combobox 
            value={selectedUsers}
            onChange={(el: unknown) => {
                const e = el as unknown as User;
                !selectedUsers?.map(u => u.id).includes(e.id) ? setSelectedUsers(old => [...(old ? old : []), e]) : undefined
            }}
            as="div"
            className="relative my-2"
        >
            <Combobox.Button className="text_input p-0 flex-wrap overflow-hidden flex cursor-default">
                { selectedUsers.length !== 0 && 
                    (
                        <>
                            {selectedUsers?.map(u => (
                                <div key={u.id} className="flex-1 flex-nowrap whitespace-nowrap justify-around items-center rounded-none flex gap-1 text_input border-y-0 border-x-0 border-r-[1px]">
                                    {u.image && <Image layout="fixed" width="18" height="18" src={u.image} alt={`Profile Picture of ${u.discordName}`}></Image>}
                                    {u.discordName}
                                    <a className="cursor-pointer" onClick={() => {setSelectedUsers(selectedUsers.filter(e => e.id !== u.id))}}>
                                        <XCircleIcon height="18px" width="18px" />
                                    </a>
                                </div>
                            ))}
                        </>
                    ) 
                }
                
                <Combobox.Input className="text_input rounded-none flex-[100] w-full h-full min-w-[100px] border-none" placeholder="Add Users" onChange={(event) => setQuery(event.target.value)} onKeyDown={input_key_down} />
            </Combobox.Button>
            <Combobox.Options className="absolute max-h-60 w-full overflow-auto bg-white dark:bg-black">
                {
                    filteredUsers ? 
                        filteredUsers.map((user) => (
                            <Combobox.Option className="mt-1 text_input cursor-pointer" key={user.id} value={user}>
                                {user.discordName}
                            </Combobox.Option>
                        )) 
                        : <></>
                }
            </Combobox.Options>
        </Combobox>
    )
}

export default UserSearch;