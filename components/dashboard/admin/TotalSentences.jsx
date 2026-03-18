'use client'
import { BookOpenText } from 'lucide-react';


export const TotalSentences = () => {
    return (
        <div className="flex flex-col rounded-xl px-4 py-3 gap-2 shadow-md border border-border-gray bg-input-bg">

            <div className='flex flex-row items-center gap-2'>
                <BookOpenText className='icon ' />

                <div className="flex">
                    <p className="text-sm font-medium ">
                        Total Sentences
                    </p>
                </div>
            </div>
            <p className="text-3xl font-bold ">
                5 {/** Mock Data */}
            </p>

        </div>
    )
}