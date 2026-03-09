'use client'
import { User } from 'lucide-react';


export const TotalUsers = () => {
    return (
        <div className="flex flex-row rounded-xl p-6 shadow-md border border-border-gray bg-box-bg">

            <User className='icon text-teal-500'/>

            <div className="flex">
                <p className="text-sm font-medium ">
                Total Users
            </p>
            <p className="mt-2 text-3xl font-bold ">
                5 {/** Mock Data */}
            </p>
            </div>
            
        </div>
    )
}