'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import tumbas from '@/app/assets/tumbas.png';
import Image from 'next/image';
import { Eye, EyeClosed, EyeIcon } from 'lucide-react';

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const supabase = createClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) throw signInError;

      router.push('/translate');
      router.refresh();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google') => {
    setLoading(true);
    setError(null);

    try {
      const { error: socialError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/translate`,
        },
      });

      if (socialError) throw socialError;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center 
    py-12 px-8 bg-background text-foreground text-sm font-medium">

      <div className="flex flex-col items-center justify-center space-y-8">

        <Image className='h-8 w-auto' src={tumbas} alt='tumbas' />

        <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="rounded-md text-red-500 text-sm">
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-4 rounded-md w-72 md:w-80">

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className={`relative block w-full rounded-lg p-3 focus:z-10 
                border border-gray-500 focus:border-btn-active 
                focus:outline-none focus:ring--btn-active  
                placeholder:text-text-grey
                ${errors.email ? 'border-red-500' : 'border-border-gray'}`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`relative block w-full rounded-lg p-3 focus:z-10 
                border border-gray-500 focus:border-btn-active 
                focus:outline-none focus:ring--btn-active  
                placeholder:text-text-grey
                ${errors.password ? 'border-red-500' : 'border-border-gray'}`}
                  placeholder="Password"
                />

                <button
                  className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer 
                  text-text-grey hover:text-btn-hover'
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <span>
                      <Eye className="icon" />
                    </span>
                  ) : (
                    <span>
                      <EyeClosed className="icon" />
                    </span>
                  )}
                </button>

              </div>
              {errors.password && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}

            </div>

            <div>

              <p className="text-right text-xs text-text-grey hover:text-btn-hover">
                <Link
                  href="/forgotpass"
                >
                  Forgot password?
                </Link>
              </p>

            </div>

          </div>

          <div className='space-y-4 mt-8'>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-lg p-3
                border border-transparent 
                bg-btn hover:bg-btn-hover
                text-btn-text
                focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-1
                disabled:opacity-50 disabled:cursor-not-allowed "
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-gray" />
              </div>
              <div className="relative flex justify-center text-xs text-text-grey">
                <span className=" px-2 bg-background">
                  or continue with
                </span>
              </div>
            </div>


            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-lg p-3
                border border-border-gray
                bg-secondary-btn hover:bg-secondary-btn-hover
              focus:outline-none focus:ring-2  focus:ring-btn-focus focus:ring-offset-2 
              disabled:opacity-50 disabled:cursor-not-allowed "
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
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

          <p className="mt-2 text-center text-xs text-text-grey">
            Not a user yet?{' '}
            <Link
              href="/signup"
              className="text-btn hover:text-btn-hover"
            >
              Register here
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}
