'use client';
import { Users, NotebookText, ChartColumn} from 'lucide-react';
import Link from 'next/link';

export const QuickActions = () => {

    return (
        <div className="rounded-xl px-6 pt-6 shadow-md bg-box-bg
    border border-border-gray">
            <h3 className="mb-4 text-lg font-semibold ">
                Quick Actions
            </h3>
            <div className="space-y-4">
                <Link
                    href='/users'
                >
                    <div className="flex flex-row rounded-xl p-6 shadow-md border border-border-gray bg-box-bg">

                        <Users className='icon text-teal-500' />

                            <p className="text-sm font-medium ">
                                Manage Users
                            </p>

                    </div>
                </Link>

                <Link
                    href='/sentences'
                >
                    <div className="flex flex-row rounded-xl p-6 shadow-md border border-border-gray bg-box-bg">

                        <NotebookText className='icon text-green-500' />

                            <p className="text-sm font-medium ">
                                Manage Sentences
                            </p>

                    </div>
                </Link>

                <Link
                    href='/overview'
                >
                    <div className="flex flex-row rounded-xl p-6 shadow-md border border-border-gray bg-box-bg">

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
