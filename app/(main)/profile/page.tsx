'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { LogOut } from 'lucide-react';
import type { Language } from '@/lib/types/translation';

export const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  sourceLanguage: z.number(),
  targetLanguage: z.number(),
}).refine((data) => data.sourceLanguage !== data.targetLanguage, {
  message: "Source and target language cannot be the same",
  path: ["targetLanguage"],
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {

  const supabase = createClient();

  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const isLoading = authLoading || !userProfile || !languages;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    register("sourceLanguage");
    register("targetLanguage");
  }, [register]);

  useEffect(() => {
    if (userProfile) {
      reset({
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        sourceLanguage: userProfile.source_language_id,
        targetLanguage: userProfile.target_language_id,
      });
    }
  }, [userProfile, reset]);

  const sourceLanguage = watch("sourceLanguage");
  const targetLanguage = watch("targetLanguage");


  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const fetchLanguages = async () => {
    try {

      const response = await fetch(`/api/languages`);
      const data = await response.json();

      if (data.error) {
        console.error('Failed to fetch stats:', data.error);
        return;
      }

      setLanguages(data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
        </div>
      </div>
    )
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

        <div className="space-y-6">

          <div className="rounded-xl p-6 shadow-md mb-8 space-y-8
        flex flex-col items-center justify-between bg-input-bg
        border border-border-gray">

            <div className='flex flex-row w-full items-center justify-between'>

              <h1 className="text-lg font-semibold">My Profile</h1>

              <button
                onClick={handleSignOut}
                className="rounded-lg flex flex-row mr-0 px-4 py-2 items text-xs transition-colors gap-2 
              text-text-grey hover:text-btn-hover font-medium"
              >
                <LogOut className="icon text-text-grey" />
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
                  className={`relative block w-full rounded-lg p-3 focus:z-10 
                border border-border-gray focus:border-btn-active bg-input-bg
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
                  className={`relative block w-full rounded-lg p-3 focus:z-10 
                border border-border-gray focus:border-btn-active bg-input-bg
                focus:outline-none focus:ring--btn-active  
                sm:text-sm placeholder:text-gray`}
                  placeholder="Last name"
                />
              </div>

            </div>

            <div className="rounded-xl p-6 mt-4 w-full shadow-md border border-border-gray bg-input-bg">


              <div className="mb-4 gap-4 flex flex-col">

                <p className="text-xs">Source Language</p>

                <div className="flex flex-row flex-wrap gap-2">

                  {languages?.filter((source_language) => source_language.type === 'source').map((source_language) => (
                    <div key={source_language.id}>

                      <button
                        key={source_language.id}
                        type="button"
                        disabled={true}
                        onClick={() => setValue("sourceLanguage", Number(source_language.id), {
                          shouldValidate: true,
                        })}
                        className={`w-fit p-2 rounded-lg text-sm border bg-input-bg duration-200
                        ${sourceLanguage == Number(source_language.id)
                            ? "bg-secondary-btn-active border-2 border-teal-500"
                            : " border-border-gray"}
    `}
                      >
                        {source_language.language_name}
                      </button>

                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4 gap-4 flex flex-col">

                <p className="text-xs">Target Language</p>

                <div className="flex flex-row flex-wrap gap-2">

                  {languages?.filter((target_language) => target_language.type === 'target').map((target_language) => (
                    <div key={target_language.id}>
                      <button
                        key={target_language.id}
                        disabled={true}
                        type="button"
                        onClick={() => setValue("targetLanguage", Number(target_language.id), {
                          shouldValidate: true,
                        })}
                        className={`w-fit p-2 rounded-lg text-sm border bg-input-bg duration-200
                        ${targetLanguage == Number(target_language.id)
                            ? "bg-secondary-btn-active border-2 border-teal-500"
                            : " border-border-gray"}
    `}
                      >
                        {target_language.language_name}
                      </button>

                    </div>
                  ))}
                </div>
              </div>
            </div >

          </div>

        </div>
      </div>

    </div>
  );
}
