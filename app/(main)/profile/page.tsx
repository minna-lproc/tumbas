'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { success, z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { LogOut } from 'lucide-react';
import { LanguageProficiency } from '@/components/profile/LanguageProficiency';

export const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
});

export default function ProfilePage() {

  const supabase = createClient();

  const router = useRouter();
  const {user, userProfile, loading: authLoading} = useAuth();
  const isLoading = authLoading;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, userProfile, authLoading, router]);


  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
          <p className="">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <p className="">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-background text-foreground text-sm font-medium">

      <div className="mx-auto max-w-7xl">

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
                disabled
                value={userProfile?.first_name}
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
                disabled
                value={userProfile?.last_name}
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
