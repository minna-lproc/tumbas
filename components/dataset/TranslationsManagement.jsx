'use client';

import { ListFilterPlus, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export const TranslationsManagement = () => {

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
                    Export Translations
                </button>
            </div>
            <div>

                {
                    isLoading ? (
                        <p>Loading translation...</p>
                    ) : (
                        
                        <div> </div>
                    )
                }

            </div>

        </div>
    )

}