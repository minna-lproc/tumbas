'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { RecentTranslations } from '@/components/dashboard/user/RecentTranslations';
import { TotalTranslations } from '@/components/dashboard/user/TotalTranslations';
import { TranslationsToday } from '@/components/dashboard/user/TranslationsToday';

import { RecentReviews } from '@/components/dashboard/evaluator/RecentReviews';
import { ReviewsToday } from '@/components/dashboard/evaluator/ReviewsToday';
import { TotalReviews } from '@/components/dashboard/evaluator/TotalReviews';

import { TotalUsers } from '@/components/dashboard/admin/TotalUsers';
import { TotalSentences } from '@/components/dashboard/admin/TotalSentences';
import { TotalTranslationsAdmin } from '@/components/dashboard/admin/TotalTranslationsAdmin';
import { QuickActions } from '@/components/dashboard/admin/QuickActions';

import type { Translation, Review } from '@/lib/types/translation';


interface DashboardStats {
  total_stats: number;
  stats_today: number;
  recent_translations: Translation[];
  recent_reviews: Review[];
}

export default function DashboardPage() {

  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      // router.push('/login');
      // For testing, show dashboard without login
      fetchStats();
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
      // Mock data for testing
      setStats({
        total_stats: 10,
        stats_today: 5,
        recent_translations: [],
        recent_reviews: []
      });
    } catch (error) {
        console.error(error);
        setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getHeader = () => {
    if (userProfile?.role === 'admin') return 'Track and manage users, datasets, and languages—all in one place.'
    if (userProfile?.role === 'evaluator') return 'Track and manage all your completed reviews right here.'
    return 'Track and manage all your completed translations right here.'
  }

  const getStats = () => {
    if (userProfile?.role === 'admin') {
      return (<>
        <div className='flex flex-col gap-4'>
        <div className="grid gap-4 grid-rows-1 lg:grid-cols-3">

          <TotalUsers />
          <TotalSentences />
          <TotalTranslationsAdmin />

        </div>
        <QuickActions />

      </div> </>);
    }

    if (userProfile?.role === 'evaluator') {
      return (<>
        <div className='flex flex-col gap-4'>
        <div className="grid gap-4 grid-rows-1 lg:grid-cols-2">

          <TotalReviews total_reviews={stats?.total_stats ?? 0}/>
          <ReviewsToday reviews_today={stats?.stats_today ?? 0}/>

        </div>
        {<RecentReviews reviews={stats?.recent_reviews ?? []}/>}
      </div> </>);
    }

    return (<>
      <div className='flex flex-col gap-4'>
      <div className="grid gap-4 grid-rows-1 lg:grid-cols-2">

        <TotalTranslations total_translations={stats?.total_stats ?? 0} />
        <TranslationsToday translations_today={stats?.stats_today ?? 0}/>

      </div>

      {<RecentTranslations translations={stats?.recent_translations ?? []}/>}

    </div> </>)
  }

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
        <p className="">Failed to load statistics</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-background text-foreground text-sm font-medium">
      <div className="mx-auto max-w-7xl">

        <div className="space-y-6">

          <div className='flex flex-col justify-center w-full h-36 rounded-xl p-6 space-y-2 shadow-lg
          text-btn-text text-shadow-lg text-shadow-teal-700/25
          border border-background/25
          bg-linear-to-bl from-header-gradient-from via-header-gradient-via to-header-gradient-to'>
            <h1 className='font-bold text-3xl tracking-tight'>
              Welcome {userProfile?.first_name}!
            </h1>
            <p className='font-medium text-sm'>
              {getHeader()}
            </p>
          </div>

          <div>
            {getStats()}
          </div>
        </div>
      </div>
    </div>
  );
}
