'use client';

import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
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

export default function DashboardPage() {
  // const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth check commented out for UI development
  // useEffect(() => {
  //   if (!authLoading && !user) {
  //     router.push('/login');
  //   }
  // }, [user, authLoading, router]);

  useEffect(() => {
    // Use mock data instead of API call
    const mockStats: DashboardStats = {
      total_translations: 20,
      translations_today: 3,
      recent_translations: getRecentTranslations(),
    };
    setStats(mockStats);
    setLoading(false);

    /* COMMENTED OUT - Supabase API call
    if (user) {
      fetchStats();
    }
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array since we're using mock data

  /* COMMENTED OUT - Supabase API call
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();

      if (data.error) {
        console.error('Failed to fetch stats:', data.error);
        return;
      }

      setStats(data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };
  */

  const getHeader = (userRole = 'user') => {
    if (userRole === 'admin') return 'Track and manage users, datasets, and languages—all in one place.'
    if (userRole === 'evaluator') return 'Track and manage all your completed reviews right here.'
    return 'Track and manage all your completed translations right here.'
  }

  const getStats = (userRole = 'admin') => {
    if (userRole === 'admin') {
      return (<div className='flex flex-col gap-4'>
        <div className="grid gap-4 grid-rows-1 lg:grid-cols-3">

        <TotalUsers />
        <TotalSentences />
        <TotalTranslationsAdmin />

      </div>
      <QuickActions />

      </div>);
    }

    if (userRole === 'user') {
      return (<div className='flex flex-col gap-4'>
      <div className="grid gap-4 grid-rows-1 lg:grid-cols-2">

        <TotalReviews />
        <ReviewsToday />

      </div>
      <RecentReviews />
    </div>)
    }

    return (<div className='flex flex-col gap-4'>
      <div className="grid gap-4 grid-rows-1 lg:grid-cols-2">

        <TotalTranslations />
        <TranslationsToday />

      </div>
      <RecentTranslations translations={stats?.recent_translations} />
    </div>)
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
          <p className="">Loading...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <p className="">Failed to load statistics</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="space-y-6">

          <div className='flex flex-col justify-center w-full h-36 rounded-xl p-6 space-y-2 shadow-lg
          text-btn-text text-shadow-lg text-shadow-teal-700/25
          border border-background/25
          bg-linear-to-bl from-header-gradient-from via-header-gradient-via to-header-gradient-to'>
            <h1 className='font-bold text-3xl tracking-tight'>
              Welcome to tumbas!
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
