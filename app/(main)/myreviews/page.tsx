'use client';

import { useState, useEffect } from 'react';
import { Search, ListFilterPlus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import type { Review } from '@/lib/types/translation';



export default function MyReviewsPage() {

    const router = useRouter();
    const { user, userProfile, loading: authLoading } = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
                console.error('Failed to fetch stats:', data.error);
                return;
            }

            setReviews(data.data.recent_stats);
            console.log(reviews)
        } catch (error) {
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

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
                <p className="">Failed to load reviews</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-6 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                <div className='space-y-6'>

                    <p className='text-xl font-semibold'>
                        My Reviews
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

                        {reviews.map((review, index) => (
                            <div key={index} className="border-b border-border-gray py-4 last:border-0 ">
                                <p className={`${review.translations.source_texts.parallel_source_texts.status == 'reviewed' ? 'bg-emerald-600' : 'bg-gold-600'} 
             text-btn-text mb-4 px-1 text-xs w-fit rounded-sm font-medium `}>
                                    {review.translations.source_texts.parallel_source_texts.status == 'reviewed' ? 'Reviewed' : 'Modified'}
                                </p>
                                <p className="text-sm font-normal">
                                    {review.translations.source_texts.text_content || 'Source text'}
                                </p>
                                <p className="mt-1 font-medium">{review.modified_translation ? review.modified_translation : review.translations.translation_text}</p>
                                <p className="mt-2 text-xs font-normal text-text-grey">
                                    {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    )


}