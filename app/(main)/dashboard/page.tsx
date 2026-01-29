'use client';

import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
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

  const getHeader = () => {
    
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

          {/* DASHBOARD HEADER */}
          <div className='flex flex-col justify-center w-full h-36 rounded-xl p-6 space-y-2 shadow-lg
          text-btn-text text-shadow-lg text-shadow-teal-700/25
          border border-background/25
          bg-linear-to-bl from-header-gradient-from via-header-gradient-via to-header-gradient-to'>
            <h1 className='font-bold text-3xl tracking-tight'>
              Welcome to tumbas! {/* Will be dynamic based on role and name*/}
            </h1>
            <p className='font-medium text-sm'>
              Track and manage all your completed translations right here. {/* Will be dynamic based on role*/}
            </p>
          </div>

          <div className="grid gap-4 grid-rows-1 lg:grid-cols-2">

            <div className="rounded-xl p-6 shadow-md border border-border-gray bg-box-bg">
              <p className="text-sm font-medium ">
                Total Translations
              </p>
              <p className="mt-2 text-3xl font-bold">
                {stats.total_translations}
              </p>
            </div>

            <div className="rounded-xl p-6 shadow-md border border-border-gray bg-box-bg">
              <p className="text-sm font-medium ">
                Translations Today
              </p>
              <p className="mt-2 text-3xl font-bold ">
                {stats.translations_today}
              </p>
            </div>
          </div>
          
          <RecentTranslations translations={stats.recent_translations} />
        </div>
      </div>
    </div>
  );
}
