import { NextPageWithLayout } from "next";
import React, { FC, ReactElement, useState } from "react";

import DashboardLayout from "layout/dashboard";
import { trpc } from "utils/trpc";
import Spinner from "components/Spinner";
import Button from "components/Button";
import Card from "components/Card";
import { useSession } from "next-auth/react";
import { Dialog } from "@headlessui/react";

import { OptimisticRefreshDefault } from "modules/trpc-helper";

import Calendar from 'react-calendar';
import CalendarStyles from "styles/Calendar.module.css";

const CalendarPage: NextPageWithLayout = () => {
    const ctx = trpc.useContext();
    const { data: session, status } = useSession();
    
    const { data: entries, isLoading } = trpc.useQuery(["calendarEntry.get_all"]);
    const date_strings = entries ? entries.map(e => e.endsAt.toDateString()) : undefined;

    const [newEntryOpen, setNewEntryOpen] = useState(false);

    if (isLoading || !entries || status === "loading" || !session) {
        return (
            <div className="flex-1 flex justify-center items-center">
                <div>
                    <Spinner className="h-16 w-16" />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex-1 m-6 relative">
                <Dialog className="p-3 absolute top-0 left-0 flex items-center justify-center w-full h-full" open={newEntryOpen} onClose={() => setNewEntryOpen(false)}>
                    <Dialog.Panel>
                        <Card title="Create Calendar Entry" className="dark:backdrop-filter-none dark:bg-black bg-white max-w-none">
                            
                        </Card>
                    </Dialog.Panel>
                </Dialog>

                <div className="absolute top-0 left-0">
                    {session?.user?.clearance !== "User" ?
                        <Button onClick={() => setNewEntryOpen(true)}>Create Calendar Entry</Button>
                        : <></>
                    }
                </div>
                <div className="my-16 flex justify-center gap-6 flex-wrap">
                    <Calendar 
                        tileContent= { 
                            ({ date }) => {
                                if (date_strings?.includes(date.toDateString())) {
                                    
                                    return (
                                        <div className="absolute top-0 left-0 h-full w-full bg-purple-300 -z-50"></div>
                                    )
                                }
                                return <></>
                            }
                        } 
                        className={`${CalendarStyles["react-calendar"]} flex-1`}
                    />                    
                </div>
            </div>
        </>
    )
}

CalendarPage.getLayout = (page) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
};

export default CalendarPage;