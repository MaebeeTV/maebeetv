import { Combobox } from "@headlessui/react";
import { User } from "@prisma/client";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { trpc } from "utils/trpc";

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
            <Combobox.Button className="text_input p-0 overflow-hidden flex cursor-default">
                { selectedUsers.length !== 0 && 
                    (
                        <div className="px-1 flex gap-2">
                            {selectedUsers?.map(u => (
                                <div key={u.id} className="h-full items-center flex gap-1">
                                    {u.image && <Image layout="fixed" width="24px" height="24px" src={u.image} alt={`Profile Picture of ${u.discordName}`}></Image>}
                                    {u.discordName}
                                </div>
                            ))}
                        </div>
                    ) 
                }
                
                <Combobox.Input className="w-full h-full p-2.5" placeholder="Add Users" onChange={(event) => setQuery(event.target.value)} onKeyDown={input_key_down} />
            </Combobox.Button>
            <Combobox.Options className="mt-1 absolute max-h-60 w-full overflow-auto bg-white dark:bg-black">
                {
                    filteredUsers ? 
                        filteredUsers.map((user) => (
                            <Combobox.Option className="text_input cursor-pointer" key={user.id} value={user}>
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