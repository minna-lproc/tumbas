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
      total_translations: mockUser.total_translations,
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

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">Failed to load statistics</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Translations
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.total_translations}
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Translations Today
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
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
