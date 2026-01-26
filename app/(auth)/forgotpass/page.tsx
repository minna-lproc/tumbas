'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ForgotPassPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-background 
        font-medium text-foreground">

            {success ?

                <div className='w-full max-w-md space-y-8'>

                    <div className='space-y-4'>
                        <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight ">
                            Reset link sent!
                        </h2>
                        <p className='text-secondary-text text-center text-xs'>
                            Please check your inbox to reset your password. If you do not see the link, check your spam folder. The link will expire in one hour.
                        </p>
                    </div>

                    <div>
                        <p className="mt-2 text-secondary-text text-center text-xs ">
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
                        <p className='text-secondary-text text-center text-xs'>
                            Enter your email address, and we will send you a link to reset your password.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6">

                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-lg border border-border px-3 py-3 focus:z-10 
                focus:border-btn-active focus:outline-none focus:ring--btn-active  
                sm:text-sm placeholder:text-secondary-text"
                                placeholder="Email address"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={() => { setSuccess(!success) }}
                                disabled={loading}
                                className="group relative flex w-full justify-center rounded-lg border 
              border-transparent px-4 py-3 bg-btn text-btn-text  hover:bg-btn-hover
              text-sm font-medium  
              focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed "
                            >
                                {loading ? 'Sending link...' : 'Send link'}
                            </button>
                        </div>

                        <p className="mt-2 text-center text-xs text-secondary-text">
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