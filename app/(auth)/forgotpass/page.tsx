'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const forgotPassSchema = z.object({
    email: z.email('Invalid email address'),
});

type forgotPassData = z.infer<typeof forgotPassSchema>;

export default function ForgotPassPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<forgotPassData>({
        resolver: zodResolver(forgotPassSchema),
    });

    const onSubmit = async (data: forgotPassData) => {
        setLoading(true);
        setError(null);

        try {
            setSuccess(!success);
            await new Promise((resolve) => setTimeout(resolve, 500));

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-background 
        text-foreground">

            {success ?

                <div className='w-full max-w-md space-y-8'>

                    <div className='space-y-4'>
                        <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight ">
                            Reset link sent!
                        </h2>
                        <p className='text-gray-400 text-center text-xs'>
                            Please check your inbox to reset your password. If you do not see the link, check your spam folder. The link will expire in one hour.
                        </p>
                    </div>

                    <div>
                        <p className="mt-2 text-gray-400 text-center text-xs ">
                            Remember your password?{' '}
                            <button className='text-btn hover:text-btn-hover'>
                                Resend
                            </button>
                        </p>
                    </div>


                    <Link
                        href="/login"
                        className="group relative flex w-full justify-center rounded-lg border 
              border-transparent px-4 py-3 bg-btn text-btn-text  hover:bg-btn-hover
              text-sm font-medium  
              focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed "
                    >
                        Go back
                    </Link>


                </div>

                :
                <div className="w-full max-w-md space-y-8">

                    <div className='space-y-4'>
                        <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight ">
                            Reset your password
                        </h2>
                        <p className='text-gray-400 text-center text-xs'>
                            Enter your email address, and we will send you a link to reset your password.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>

                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                autoComplete="email"
                                required
                                className={`relative block w-full rounded-lg px-3 py-3 focus:z-10 
                border border-gray-400 focus:border-btn-active 
                focus:outline-none focus:ring--btn-active  
                sm:text-sm placeholder:text-gray
                ${errors.email ? 'error-border' : 'border-gray-400'}`}
                                placeholder="Email address"
                            />
                            {errors.email && (
                                <p className="mt-1 error-text">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex w-full justify-center rounded-lg border 
              border-transparent px-4 py-3 bg-btn text-btn-text  hover:bg-btn-hover
              text-sm font-medium  
              focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-2 
              disabled:opacity-50 disabled:cursor-not-allowed "
                            >
                                {loading ? 'Sending link...' : 'Send link'}
                            </button>
                        </div>

                        <p className="mt-2 text-center text-xs text-gray-400">
                            Remember your password?{' '}
                            <Link
                                href="/login"
                                className="font-medium text-btn hover:text-btn-hover"
                            >
                                Sign in
                            </Link>
                        </p>

                    </form>
                </div>
            }
        </div>
    )

}