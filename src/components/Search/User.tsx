import { Combobox } from "@headlessui/react";
import { User } from "@prisma/client";
import { FC, useState } from "react";
import { trpc } from "utils/trpc";

export interface UserSearchProps {
    selectedUsers: User[]
}

const UserSearch: FC<UserSearchProps> = ({ selectedUsers }) => {
    // for selecting users
    const [query, setQuery] = useState('');

    const filteredUsers = trpc.useQuery(["user.get_search", {
        query
    }]).data;
        
    return (
        <Combobox 
            value=""
            onChange={(el: unknown) => {
                const e = el as unknown as User;
                !selectedUsers.map(u => u.id).includes(e.id) ? selectedUsers.push(e) : undefined
            }}
            as="div"
            className="relative my-2"
        >
            <Combobox.Button className="w-full">
                <Combobox.Input className="text_input" placeholder="Add Users" onChange={(event) => setQuery(event.target.value)} />
            </Combobox.Button>
            <Combobox.Options className="absolute max-h-60 w-full overflow-auto bg-white dark:bg-black">
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