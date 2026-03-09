'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Eye, EyeClosed } from 'lucide-react';

const signupSchema = z.object({
  firstName: z.string().min(1, 'First name must be at least 1 character'),
  lastName: z.string().min(1, 'Last name must be at least 1 character'),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmedPassword: z.string().min(8, 'Confirmed password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmedPassword, {
  message: "Passwords don't match",
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const supabase = createClient();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const nextStep = async () => {
    const isValid = await trigger(['firstName', 'lastName']);

    if (!isValid) return;

    setStep(step => step + 1)
  };

  const prevStep = () => {
    setStep(step => step - 1)
  }

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setError(null);

    console.log(data);
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName
          }
        }
      });

      if (signUpError) throw signUpError;
        setSuccess(true)
        
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

  const getForms = () => {

    if (step == 1) {
      return (
        <>
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="sr-only">
                First name
              </label>
              <input
                {...register('firstName')}
                className={`relative block w-full rounded-lg p-3 focus:z-10 
                border border-gray-500 focus:border-btn-active 
                focus:outline-none focus:ring--btn-active  
                placeholder:text-text-grey
                ${errors.firstName ? 'border-red-500' : 'border-border-gray'}`}
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Last name
              </label>
              <input
                {...register('lastName')}
                type="text"
                className={`relative block w-full rounded-lg p-3 focus:z-10 
                border border-gray-500 focus:border-btn-active 
                focus:outline-none focus:ring--btn-active  
                placeholder:text-text-grey
                ${errors.lastName ? 'border-red-500' : 'border-border-gray'}`}
                placeholder="Last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className='space-y-4 mt-8'>
            <button
              type="button"
              disabled={loading}
              onClick={nextStep}
              className="group relative flex w-full justify-center rounded-lg p-3
                border border-transparent 
                bg-btn hover:bg-btn-hover
                text-btn-text
                focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-1
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Continuing...' : 'Continue'}
            </button>
          </div>
        </>

      );
    }

    if (step == 2) {
      return (
        <>
          <div className="space-y-4 rounded-md shadow-sm">

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
                className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-text-grey hover:text-btn-hover'
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <span>
                    <EyeClosed className="icon" />
                  </span>
                ) : (
                  <span>
                    <Eye className="icon" />
                  </span>
                )}
              </button>
              {errors.password && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                {...register('confirmedPassword')}
                type={showConfirmedPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className={`relative block w-full rounded-lg p-3 focus:z-10 
                border border-gray-500 focus:border-btn-active 
                focus:outline-none focus:ring--btn-active  
                placeholder:text-text-grey
                ${errors.confirmedPassword ? 'border-red-500' : 'border-border-gray'}`}
                placeholder="Confirmed password"
              />
              <button
                className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-text-grey hover:text-btn-hover'
                type="button"
                onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
              >
                {showConfirmedPassword ? (
                  <span>
                    <EyeClosed className="icon" />
                  </span>
                ) : (
                  <span>
                    <Eye className="icon" />
                  </span>
                )}
              </button>
              {errors.confirmedPassword && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.confirmedPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className='flex items-start w-full gap-2'>

            <input type="checkbox" id='termsOfService' className='bg-transparent accent-btn cursor-pointer' />
            <label htmlFor="termsOfService" className="text-xs text-center text-text-grey whitespace-nowrap">
              I agree to the{' '}
              <button type='button' className='underline text-btn'>
                Terms of Service
              </button>
            </label>
          </div>

          <div className='mt-8 grid grid-cols-2 gap-2'>
            <button
              type="button"
              disabled={loading}
              onClick={prevStep}
              className="group relative flex w-full justify-center rounded-lg 
              border border-border-gray p-3
              bg-secondary-btn hover:bg-secondary-btn-hover
              focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-2 
              disabled:opacity-50 disabled:cursor-not-allowed "
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg p-3
                border border-transparent 
                bg-btn hover:bg-btn-hover
                text-btn-text
                focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-1
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </>

      );
    };
  }

  return (
    <div className='flex min-h-screen w-full items-center justify-center 
    py-12 px-8 bg-background text-foreground text-sm font-medium'>
      {
        success ?

          <div className='w-full max-w-md space-y-8'>

            <div className='space-y-4'>
              <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight ">
                Registration successful!
              </h2>
              <p className='text-text-grey text-center text-xs'>
                You have successfully changed your password.
              </p>
            </div>

            <Link
              href="/login"
              className="group relative flex w-full justify-center rounded-lg border 
                             border-transparent px-4 py-3 bg-btn text-btn-text  hover:bg-btn-hover
                             text-sm font-medium  
                             focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed "
            >
              Sign in
            </Link>

          </div>

          :

          <div className="flex flex-col items-center justify-center space-y-8">
            <div>
              <h2 className="text-center text-3xl font-semibold tracking-tight">
                Create your account
              </h2>
              <p className="mt-2 text-center text-xs">
                Or{' '}
                <Link
                  href="/login"
                  className="text-btn hover:text-btn-hover"
                >
                  sign in to your existing account
                </Link>
              </p>
            </div>


            <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <div className="rounded-md ">
                  <p className="text-sm ">{error}</p>
                </div>
              )}

              <div className="space-y-4 rounded-md w-72 md:w-80" key={step}>
                {getForms()}


                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border-gray" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className=" text-text-grey px-2 bg-background">
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
              border border-border-gray px-4 py-3 
              bg-secondary-btn hover:bg-secondary-btn-hover text-sm font-medium 
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
              </div>
            </form>
          </div>


      }
    </div>
  );
}
