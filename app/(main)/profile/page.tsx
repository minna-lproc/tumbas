'use client';

import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
// import { supabase } from '@/lib/supabase/client';
import { mockUser } from '@/lib/mock/data';

interface UserProfile {
  id: string;
  username: string | null;
  email: string;
  total_translations: number;
}

export default function ProfilePage() {
  // const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth check commented out for UI development
  // useEffect(() => {
  //   if (!authLoading && !user) {
  //     router.push('/login');
  //   }
  // }, [user, authLoading, router]);

  useEffect(() => {
    // Use mock data instead of API call
    setProfile({
      id: mockUser.id,
      username: mockUser.username,
      email: mockUser.email,
      total_translations: mockUser.total_translations,
    });
    setLoading(false);

    /* COMMENTED OUT - Supabase API call
    if (user) {
      fetchProfile();
    }
    */
  }, [user]);

  /* COMMENTED OUT - Supabase API call
  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, email, total_translations')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };
  */

  const handleSignOut = async () => {
    // Mock sign out - just log for now
    console.log('Sign out clicked (mock)');
    // await supabase.auth.signOut();
    // router.push('/login');
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
          <button
            onClick={handleSignOut}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            {profile.username || profile.email.split('@')[0]}
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">{profile.email}</p>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Translations
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {profile.total_translations}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
