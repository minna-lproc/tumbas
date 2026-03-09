'use client';

import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
// import { supabase } from '@/lib/supabase/client';
import { mockUser } from '@/lib/mock/data';
import { LogOut } from 'lucide-react';
import { LanguageProficiency } from '@/components/profile/LanguageProficiency';

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
    <div className="flex min-h-screen w-full
    py-12 px-8 bg-background text-foreground text-sm font-medium">

      <div className="mx-auto w-full">

        <div className="rounded-xl p-6 shadow-md mb-8 space-y-8
        flex flex-col items-center justify-between
        border border-border-gray">

          <div className='flex flex-row w-full items-center justify-between'>

            <h1 className="text-lg font-semibold">My Profile</h1>

            <button
              onClick={handleSignOut}
              className="rounded-lg flex flex-row mr-0 px-4 py-2 items text-xs transition-colors gap-2 
              text-text-grey hover:text-btn-hover font-medium"
            >
              <LogOut className="icon" />
              Sign Out
            </button>

          </div>

          <div className='flex flex-row items-center gap-2 w-full m-auto'>
            <div>
              <label htmlFor="firstName" className="sr-only">
                First name
              </label>
              <input
                type="text"
                required
                className={`relative block w-full rounded-lg px-3 py-3 focus:z-10 
                border border-border-gray focus:border-btn-active 
                focus:outline-none focus:ring--btn-active  
                sm:text-sm placeholder:text-gray`}
                placeholder="First name"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="sr-only">
                Last name
              </label>
              <input
                type="text"
                required
                className={`relative block w-full rounded-lg px-3 py-3 focus:z-10 
                border border-border-gray focus:border-btn-active 
                focus:outline-none focus:ring--btn-active  
                sm:text-sm placeholder:text-gray`}
                placeholder="Last name"
              />
            </div>

          </div>
          
          <LanguageProficiency />

        </div>


      </div>

    </div>
  );
}
