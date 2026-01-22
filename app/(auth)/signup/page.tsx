'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { supabase } from '@/lib/supabase/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setError(null);

    try {
      // Mock signup - always succeeds for UI development
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push('/translate');
      router.refresh();

      /* COMMENTED OUT - Supabase authentication
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username || null,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        // Create user profile
        const { error: profileError } = await supabase.from('users').insert({
          id: authData.user.id,
          email: data.email,
          username: data.username || null,
        });

        if (profileError) throw profileError;

        router.push('/translate');
        router.refresh();
      }
      */
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError(null);

    try {
      // Mock social login - always succeeds for UI development
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push('/translate');
      router.refresh();

      /* COMMENTED OUT - Supabase OAuth
      const { error: socialError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/translate`,
        },
      });

      if (socialError) throw socialError;
      */
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12  sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight ">
            Create your account
          </h2>
          <p className="mt-2 text-center text-xs ">
            Or{' '}
            <Link
              href="/login"
              className="font-medium text-btn hover:text-btn-hover"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="rounded-md ">
              <p className="text-sm ">{error}</p>
            </div>
          )}

          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">
                Username (optional)
              </label>
              <input
                {...register('username')}
                type="text"
                autoComplete="username"
                className="relative block w-full rounded-lg border border-border px-3 py-3 focus:z-10 
                focus:border-btn-active focus:outline-none focus:ring--btn-active  
                sm:text-sm text-secondary-text"
                placeholder="Username (optional)"
              />
              {errors.username && (
                <p className="mt-1 text-sm ">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-lg border border-border px-3 py-3 focus:z-10 
                focus:border-btn-active focus:outline-none focus:ring--btn-active  
                sm:text-sm text-secondary-text"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm ">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full rounded-lg border border-border px-3 py-3 focus:z-10 
                focus:border-btn-active focus:outline-none focus:ring--btn-active  
                sm:text-sm text-secondary-text z-10"
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm ">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg border 
              border-transparent px-4 py-3 bg-btn text-foreground  hover:bg-btn-hover
              text-sm font-medium  
              focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed "
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className=" text-secondary-text px-2 bg-background">
                Or continue with
              </span>
            </div>
          </div>

          <div className="">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-lg 
              border border-border px-4 py-3 text-sm font-medium 
              focus:outline-none focus:ring-2 
              focus:ring-btn-focus focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed "
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="ml-2">Google</span>
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
}
