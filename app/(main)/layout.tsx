import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link
                href="/translate"
                className="text-xl font-bold text-teal-600 dark:text-teal-400"
              >
                Tumbas
              </Link>
              <div className="hidden gap-6 sm:flex">
                <Link
                  href="/translate"
                  className="text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
                >
                  Translate
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
                >
                  Profile
                </Link>
              </div>
            </div>
            {user && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </div>
            )}
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
