import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { ThemeToggle } from '@/components/utils/ThemeToggle';

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
    <div className="min-h-screen">
      <nav className="border-b mb-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link
                href="/translate"
                className="text-xl font-bold"
              >
                Tumbas
              </Link>
              <div className="hidden gap-6 sm:flex">
                <Link
                  href="/translate"
                  className="transition-colors "
                >
                  Translate
                </Link>
                <Link
                  href="/dashboard"
                  className="transition-colors "
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="transition-colors"
                >
                  Profile
                </Link>

                <ThemeToggle />
              </div>
            </div>
            {user && (
              <div className="text-sm ">
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
