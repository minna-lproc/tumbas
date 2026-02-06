'use client';

import { ListFilterPlus, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function UsersPage() {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                <div className="rounded-xl  p-6 shadow-md mb-8 space-y-6
                flex flex-col w-[50%]
                border border-border-gray">

                    <div>
                        <h1 className="text-lg font-semibold">User Management</h1>
                        <p className="text-xs text-text-grey">Create and manage users of different roles</p>
                    </div>


                    <div className='flex flex-row gap-2 justify-between'>
                        <div className=' flex gap-4 h-10 items-center w-full
                                                border border-border-gray rounded-lg
                                                px-4'>
                            <Search className='icon text-text-grey' />

                            <input type="text"
                                className='w-full flex placeholder:text-text-grey'
                                placeholder='Search' />

                            <ListFilterPlus className='icon text-text-grey' />
                        </div>

                        <button className="group relative flex justify-center rounded-lg px-4 text-center items-center
                border border-transparent w-auto whitespace-nowrap
                bg-btn hover:bg-btn-hover
                text-btn-text text-sm font-medium
                focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-1
                disabled:opacity-50 disabled:cursor-not-allowed">
                            Add User
                        </button>
                    </div>
                    <div>

                        {
                            isLoading ? (
                                <p>Loading users...</p>
                            ) : (
                                <table className='rounded-lg border border-border-gray w-full p-8'>
                                    <tr className='border border-border-gray text-sm '>
                                        <th className='text-sm font-medium py-2'>Full name</th>
                                        <th className='text-sm font-medium py-2'>Email Address</th>
                                        <th className='text-sm font-medium py-2'>Role</th>
                                        <th className='text-sm font-medium py-2'>Language</th>
                                        <th className='text-sm font-medium py-2'>Actions</th>
                                    </tr>
                                    <tr className='items-center justify-center text-center'>
                                        <td className='text-sm font-normal py-2'>Hilbert Tan</td>
                                        <td className='text-sm font-normal py-2' >hilbert@email.com</td>
                                        <td className='text-sm font-normal py-2'>User</td>
                                        <td className='text-sm font-normal py-2'>en2sia</td>
                                        <td><div>
                                            <button>Edit</button>
                                            </div></td>
                                    </tr>

                                </table>

                            )
                        }

                    </div>

                </div>

            </div>

        </div>
    )

}