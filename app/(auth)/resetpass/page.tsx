'use client';

import { Eye, EyeClosed } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ResetPassPage() {

    const resetPassSchema = z.object({
        password: z.string().min(8, 'Password must be at least 8 characters'),
    });

    type resetPassData = z.infer<typeof resetPassSchema>;

    const {
        handleSubmit,
        formState: { errors },
    } = useForm<resetPassData>({
        resolver: zodResolver(resetPassSchema),
    });

    const onSubmit = async (data: resetPassData) => {
        setLoading(true);
        setError(null);

        try {
            setSuccess(!success);
            await new Promise((resolve) => setTimeout(resolve, 500));


            /* COMMENTED OUT - Supabase authentication
            const { error: signInError } = await supabase.auth.signInWithPassword({
              email: data.email,
              password: data.password,
            });
      
            if (signInError) throw signInError;
      
            router.push('/translate');
            router.refresh();
            */
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-background 
           font-medium text-foreground">

            {success ?

                <div className='w-full max-w-md space-y-8'>

                    <div className='space-y-4'>
                        <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight ">
                            Password reset successfully!
                        </h2>
                        <p className='text-secondary-text text-center text-xs'>
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
                <div className="w-full max-w-md space-y-8">

                    <div className='space-y-4'>
                        <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight ">
                            Reset your password
                        </h2>
                        <p className="mt-2 text-center text-xs text-secondary-text">
                            Or {' '}
                            <Link
                                href="/login"
                                className="font-medium text-btn hover:text-btn-hover"
                            >
                                sign in to your existing account
                            </Link>
                        </p>

                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>

                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    className={`relative block w-full rounded-lg border border-border px-3 py-3 focus:z-10 
                focus:border-btn-active focus:outline-none focus:ring--btn-active  
                sm:text-sm placeholder:text-gray
                ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-border'}`}
                                    placeholder="Password"
                                />
                                <button
                                    className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-secondary-text hover:text-btn-hover'
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
                                <p className="mt-1 text-xs font-base text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="relative">
                                <input
                                    type={showConfirmedPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full rounded-lg border border-border px-3 py-3 focus:z-10 
                focus:border-btn-active focus:outline-none focus:ring--btn-active  
                sm:text-sm placeholder:text-secondary-text"
                                    placeholder="Confirmed password"
                                />
                                <button
                                    className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-secondary-text hover:text-btn-hover'
                                    type="button"
                                    onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
                                >
                                    {showConfirmedPassword ? (
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
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex w-full justify-center rounded-lg border 
                 border-transparent px-4 py-3 bg-btn text-btn-text  hover:bg-btn-hover
                 text-sm font-medium  
                 focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed "
                            >
                                {loading ? 'Resetting...' : 'Reset'}
                            </button>
                        </div>

                    </form>
                </div>
            }
        </div>
    )

}