'use client'
import { BookOpenText } from 'lucide-react';


export const TotalSentences = () => {
    return (
        <div className="flex flex-row rounded-xl p-6 shadow-md border border-border-gray bg-box-bg">

            <BookOpenText className='icon text-green-500'/>

            <div className="flex">
                <p className="text-sm font-medium ">
                Total Sentences
            </p>
            <p className="mt-2 text-3xl font-bold ">
                5 {/** Mock Data */}
            </p>
            </div>
            
        </div>
    )
}