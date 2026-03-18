'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { success, z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { time } from 'console';

const forgotPassSchema = z.object({
    email: z.email('Invalid email address'),
});

type forgotPassData = z.infer<typeof forgotPassSchema>;

export default function ForgotPassPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [timer, setTimer] = useState(60);
    const [isRunning, setIsRunning] = useState(false);
    const [emailSentTo, setEmailSentTo] = useState<string | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const supabase = createClient();

    useEffect(() => {
        if (!isRunning) return;

        intervalRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isRunning]);

    const startTimer = (seconds = 60) => {
        setTimer(seconds);
        setIsRunning(true);
    };

    const handleResend = async () => {
        if (!emailSentTo) return;
        setLoading(true);
        setError(null);
        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(
                emailSentTo,
                {
                    redirectTo: `${window.location.origin}/resetpass`,
                }
            );
            if (resetError) throw resetError;
            // restart timer
            startTimer(60);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

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
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(
                data.email,
                {
                    redirectTo: `${window.location.origin}/resetpass`,
                }
            );

            if (resetError) throw resetError;

            setSuccess(true);
            setEmailSentTo(data.email);
            startTimer(60);
            await new Promise((resolve) => setTimeout(resolve, 500));

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center 
    py-12 px-8 bg-background text-foreground text-sm font-medium">

            {success ?

                <div className='flex flex-col items-center justify-center space-y-4'>

                    <div className='space-y-4'>
                        <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight ">
                            Reset link sent!
                        </h2>
                        <p className='text-text-grey text-center text-xs'>
                            Please check your inbox to reset your password. If you do not see the link, check your spam folder. The link will expire in one hour.
                        </p>
                    </div>

                    <div>
                        <p className="mt-2 text-text-grey text-center text-xs ">
                            Remember your password?{' '}
                            <button
                                onClick={handleResend}
                                disabled={isRunning || loading}
                                className="text-btn hover:text-btn-hover disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isRunning ? `Resend (${timer}s)` : 'Resend'}
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
                <div className="flex flex-col items-center justify-center space-y-4">

                    <div className='space-y-4'>
                        <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight ">
                            Reset your password
                        </h2>
                        <p className='text-text-grey text-center text-xs'>
                            Enter your email address, and we will send you a link to reset your password.
                        </p>
                    </div>

                    <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>

                        <div className="space-y-4 rounded-md w-72 md:w-80">

                            <div className='space-y-4 rounded-md w-72 md:w-80'>
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className={`relative block w-full rounded-lg p-3 focus:z-10 
                border border-border-gray focus:border-btn-active 
                focus:outline-none focus:ring--btn-active  
                sm:text-sm placeholder:text-gray
                ${errors.email ? 'error-border' : 'border-border-gray'}`}
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
              border-transparent p-3 bg-btn text-btn-text  hover:bg-btn-hover
              text-sm font-medium  
              focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-2 
              disabled:opacity-50 disabled:cursor-not-allowed "
                                >
                                    {loading ? 'Sending link...' : 'Send link'}
                                </button>
                            </div>

                            <p className="mt-2 text-center text-xs text-text-grey">
                                Remember your password?{' '}
                                <Link
                                    href="/login"
                                    className="font-medium text-btn hover:text-btn-hover"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            }
        </div>
    )

}