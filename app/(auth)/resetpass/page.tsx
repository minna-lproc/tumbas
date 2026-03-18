'use client';

import { Eye, EyeClosed } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';


const resetPassSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmedPassword: z.string().min(8, 'Confirmed password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmedPassword, {
    message: 'Passwords do not match',
});

type resetPassData = z.infer<typeof resetPassSchema>;

export default function ResetPassPage() {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

    const supabase = createClient();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<resetPassData>({
        resolver: zodResolver(resetPassSchema),
    });

    const onSubmit = async (data: resetPassData) => {

        const { error: resetError } = await supabase.auth.updateUser({
            password: data.password,
        });

        if (resetError) throw resetError;

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
        <div className="flex min-h-screen w-full items-center justify-center 
    py-12 px-8 bg-background text-foreground text-sm font-medium">

            {success ?

                <div className='flex flex-col items-center justify-center space-y-4'>

                    <div className='space-y-4'>
                        <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight ">
                            Password reset successfully!
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
                <div className="flex flex-col items-center justify-center space-y-4">

                    <div className='space-y-4'>
                        <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight ">
                            Reset your password
                        </h2>
                        <p className="mt-2 text-center text-xs text-text-grey">
                            Or {' '}
                            <Link
                                href="/login"
                                className="font-medium text-btn hover:text-btn-hover"
                            >
                                sign in to your existing account
                            </Link>
                        </p>

                    </div>

                    <form className="mt-4 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4 rounded-md w-72 md:w-80">
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('password')}
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        className={`relative block w-full rounded-lg p-3 focus:z-10 
                border border-gray-500 focus:border-btn-active bg-input-bg
                focus:outline-none focus:ring--btn-active  
                placeholder:text-text-grey
                ${errors.password ? 'error-border' : 'border-border-gray'}`}
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

                                </div>
                                {errors.password && (
                                    <p className="mt-1 error-text">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div >
                                <div className="relative">
                                    <input
                                        {...register('confirmedPassword')}
                                        type={showConfirmedPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        className={`relative block w-full rounded-lg p-3 focus:z-10 
                border border-gray-500 focus:border-btn-active bg-input-bg
                focus:outline-none focus:ring--btn-active  
                placeholder:text-text-grey
                ${errors.confirmedPassword ? 'error-border' : 'border-border-gray'}`}
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
                                </div>
                                {errors.confirmedPassword && (
                                    <p className="mt-1 error-text">
                                        {errors.confirmedPassword.message}
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
                 focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed "
                                >
                                    {loading ? 'Resetting...' : 'Reset'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </div>
    )

}