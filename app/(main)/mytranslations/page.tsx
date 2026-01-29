'use client';

import { useState, useEffect } from 'react';
import { Search, ListFilterPlus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { RecentTranslations } from '@/components/dashboard/RecentTranslations';
import { mockUser, getRecentTranslations } from '@/lib/mock/data';

interface DashboardStats {
    total_translations: number;
    translations_today: number;
    recent_translations: Array<{
        translation_text: string;
        created_at: string;
        source_texts?: {
            text_content: string;
        };
    }>;
}


export default function MyTranslationsPage() {

    const [stats, setStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        const mockStats: DashboardStats = {
            total_translations: 0,
            translations_today: 0,
            recent_translations: getRecentTranslations(),
        };
        setStats(mockStats);
    }, []); // change this

    return (
        <div className="min-h-screen px-6 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                <div className='space-y-6'>

                    <p className='text-xl font-semibold'>
                        My Translations
                    </p>

                    <div className=' flex gap-4 h-10 items-center
                    border border-gray-400 rounded-lg
                    px-4'>
                        <Search className='icon text-gray-400' />

                        <input type="text"
                            className='w-full flex placeholder:text-gray-400'
                            placeholder='Search' />

                        <ListFilterPlus className='icon text-gray-400' />
                    </div>

                    <div className='rounded-xl p-6 border border-gray-400 w-full'>

                        {stats?.recent_translations.map((translation, index) => (
                            <div key={index} className="border-b py-4 last:border-0 ">
                                <p className="text-sm font-normal">
                                    {translation.source_texts?.text_content || 'Source text'}
                                </p>
                                <p className="mt-1 font-medium">{translation.translation_text}</p>
                                <p className="mt-2 text-xs font-normal text-gray-400">
                                    {formatDistanceToNow(new Date(translation.created_at), { addSuffix: true })}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    )

}