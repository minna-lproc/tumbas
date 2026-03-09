'use client'
import { Pencil } from 'lucide-react';


export const TotalTranslationsAdmin = () => {
    return (
        <div className="flex flex-col rounded-xl px-4 py-3 gap-2 shadow-md border border-border-gray bg-box-bg">

            <div className='flex flex-row items-center gap-2'>

                <Pencil className='icon ' />
                <div className="flex">
                    <p className="text-sm font-medium ">
                        Total Translations
                    </p>
                </div>
            </div>

            <p className="text-3xl font-bold ">
                5 {/** Mock Data */}
            </p>

        </div>
    )
}