'use client';

import { ListFilterPlus, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export const LanguageManagement = () => {

    const [isLoading, setIsLoading] = useState(false);

    return (

        <div className="rounded-xl  shadow-md mb-8 space-y-6
                flex flex-col">

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
                    Add Language
                </button>
            </div>
            <div>

                {
                    isLoading ? (
                        <p>Loading language...</p>
                    ) : (
                        <table className='rounded-lg border border-border-gray w-full p-8'>
                            <tr className='border border-border-gray text-sm '>
                                <th className='text-sm font-medium py-2'>Language</th>
                                <th className='text-sm font-medium py-2'>ISO Code</th>
                                <th className='text-sm font-medium py-2'>Type</th>
                                <th className='text-sm font-medium py-2'>Actions</th>
                            </tr>
                            <tr className='items-center justify-center text-center'>
                                <td className='text-sm font-normal py-2'>English</td>
                                <td className='text-sm font-normal py-2' >en</td>
                                <td className='text-sm font-normal py-2'>source</td>
                                <td><div>
                                    <button>Edit</button>
                                </div></td>
                            </tr>

                        </table>

                    )
                }

            </div>

        </div>
    )

}