'use client'
import { Pencil } from 'lucide-react';


export const TotalTranslationsAdmin = () => {
    return (
        <div className="flex flex-row rounded-xl p-6 shadow-md border border-border-gray bg-box-bg">

            <Pencil className='icon text-green-500'/>

            <div className="flex">
                <p className="text-sm font-medium ">
                Total Translations
            </p>
            <p className="mt-2 text-3xl font-bold ">
                5 {/** Mock Data */}
            </p>
            </div>
            
        </div>
    )
}