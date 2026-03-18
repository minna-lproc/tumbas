'use client';
import { Users, NotebookText, ChartColumn} from 'lucide-react';
import Link from 'next/link';

export const QuickActions = () => {

    return (
        <div className="rounded-xl p-4 shadow-md bg-input-bg
    border border-border-gray space-y-4">
            <h3 className="text-lg font-semibold ">
                Quick Actions
            </h3>
            <div className="space-y-4 py-1 flex flex-col lg:flex-row gap lg:gap-4">
                <Link
                    href='/users'
                >
                    <div className="flex flex-row rounded-xl gap-2 p-3 shadow-md border border-border-gray bg-input-bg">

                        <Users className='icon text-teal-500' />

                            <p className="text-sm font-medium ">
                                Manage Users
                            </p>

                    </div>
                </Link>

                <Link
                    href='/sentences'
                >
                    <div className="flex flex-row rounded-xl gap-2 p-3 shadow-md border border-border-gray bg-input-bg">

                        <NotebookText className='icon text-green-500' />

                            <p className="text-sm font-medium ">
                                Manage Sentences
                            </p>

                    </div>
                </Link>

                <Link
                    href='/overview'
                >
                    <div className="flex flex-row rounded-xl gap-2 p-3 shadow-md border border-border-gray bg-input-bg">

                        <ChartColumn className='icon text-yellow-500' />

                            <p className="text-sm font-medium ">
                                View Statistics
                            </p>

                    </div>
                </Link>
            </div>
        </div>
    );
};
