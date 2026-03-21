'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ListFilterPlus, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import type { Translation } from '@/lib/types/translation';

export default function MyTranslationsPage() {

    const router = useRouter();
    const { user, userProfile, loading: authLoading } = useAuth();
    const [translations, setTranslations] = useState<Translation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }

    }, [user, userProfile, authLoading, router]);

    useEffect(() => {
        if (userProfile) {
            fetchStats();
        }
    }, [userProfile]);

    const fetchStats = async () => {
        setLoading(true);

        try {
            const response = await fetch(`/api/stats?role=${userProfile?.role}`);
            const data = await response.json();
            if (data.error) {
                console.error('Failed to fetch translations:', data.error);
                return;
            }

            setTranslations(data.data.recent_translations);
        } catch (error) {
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const filteredTranslations = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        return translations.filter((translation) => {
            const sourceText = translation.source_texts.text_content || '';
            const translatedText = translation.translation_text || '';

            return (
                sourceText.toLowerCase().includes(query) ||
                translatedText.toLowerCase().includes(query)
            );
        });
    }, [translations, searchQuery]);

    if (authLoading || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
                <div className="text-center">
                    <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center ">
                <p className="">Failed to load translations</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-background text-foreground text-sm font-medium">
            <div className="mx-auto max-w-7xl">

                <div className='space-y-6'>

                    <p className='text-xl font-semibold'>
                        My Translations
                    </p>

                    <div className=' flex gap-4 h-10 items-center
                    border border-border-gray rounded-lg bg-input-bg
                    px-4'>
                        <Search className='icon text-text-grey' />

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='w-full flex placeholder:text-text-grey outline-none bg-transparent'
                            placeholder='Search translations...' />

                        {
                            searchQuery &&
                            (<X
                                onClick={() => setSearchQuery('')}
                                className={`icon text-text-grey cursor-pointer`} />)
                        }

                        {/*<ListFilterPlus className='icon text-text-grey' />*/}
                    </div>

                    <div className='rounded-xl px-6 border border-border-gray w-full bg-input-bg'>
                        
                        {filteredTranslations.length === 0 && searchQuery && (
                            <p className="py-4 text-sm text-text-grey">No translations found.</p>
                        )}

                        {filteredTranslations.map((translation, index) => (
                            <div key={index} className="border-b border-border-gray py-4 last:border-0 ">
                                <p className="text-sm font-normal">
                                    {translation.source_texts.text_content || 'Source text'}
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