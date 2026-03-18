'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ListFilterPlus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { RecentTranslations } from '@/components/dashboard/user/RecentTranslations';
import { mockUser, getRecentTranslations } from '@/lib/mock/data';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';

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

    const router = useRouter();
    const { user, userProfile, loading: authLoading } = useAuth();
    const { fetchUserTranslations, loading: translationLoading, error } =
        useTranslation();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }

    }, [user, userProfile, authLoading, router]);

    useEffect(() => {
        if (userProfile?.source_language) {
            getUserTranslations();
        }
    }, [userProfile?.source_language]); // change this

    const getUserTranslations = async () => {
        setLoading(true);
        const allTranslations = await fetchUserTranslations();
        setStats(allTranslations);
        setLoading(false);
    };

    return (
        <div className="min-h-screen px-6 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                <div className='space-y-6'>

                    <p className='text-xl font-semibold'>
                        My Translations
                    </p>

                    {/*<div className=' flex gap-4 h-10 items-center
                    border border-border-gray rounded-lg
                    px-4'>
                        <Search className='icon text-text-grey' />

                        <input type="text"
                            className='w-full flex placeholder:text-text-grey'
                            placeholder='Search' />

                        <ListFilterPlus className='icon text-text-grey' />
                    </div>*/}

                    <div className='rounded-xl px-6 border border-border-gray w-full bg-input-bg'>

                        {stats?.recent_translations.map((translation, index) => (
                            <div key={index} className="border-b border-border-gray py-6 last:border-0 ">
                                <p className="text-sm font-normal">
                                    {translation.source_texts?.text_content || 'Source text'}
                                </p>
                                <p className="mt-1 font-medium">{translation.translation_text}</p>
                                <p className="mt-2 text-xs font-normal text-text-grey">
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