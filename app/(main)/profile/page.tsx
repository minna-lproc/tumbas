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
      <div className="flex min-h-screen items-center justify-center ">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
          <p className="">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <p className="">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  px-4 py-8  sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold ">Profile</h1>
          <button
            onClick={handleSignOut}
            className="rounded-lg  px-4 py-2  transition-colors "
          >
            Sign Out
          </button>
        </div>
        <div className="rounded-xl  p-6 shadow-md ">
          <h2 className="mb-2 text-xl font-semibold ">
            {profile.username || profile.email.split('@')[0]}
          </h2>
          <p className="mb-4 ">{profile.email}</p>
          <div className="rounded-lg  p-4 ">
            <p className="text-sm font-medium ">
              Total Translations
            </p>
            <p className="mt-1 text-2xl font-bold ">
              {profile.total_translations}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
