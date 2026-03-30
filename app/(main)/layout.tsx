import Link from 'next/link';
import Image from 'next/image';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { ThemeToggle } from '@/components/utils/ThemeToggle';
import tumbas from '../assets/tumbas.png';
import Nav from '@/components/utils/Nav';
import Tutorial from '@/components/utils/Tutorial';

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
    <div className="h-screen">
      {/* Desktop Navbar */}
      <nav className="hidden lg:block border-b mb-4 bg-background text-foreground border-border-gray">
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex h-14 items-center justify-between">

            <Link
              href="/translate"
              className="h-20 w-20 items-center justify-center flex"
            >
              <Image src={tumbas} alt='Tumbas' />
            </Link>

            <div className="ml-auto flex gap-6">
              <Nav />
              <ThemeToggle />
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background text-foreground border-b border-border-gray">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/translate" className="h-20 w-20 flex items-center justify-center">
            <Image src={tumbas} alt='Tumbas' />
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="min-h-full pt-16 pb-16 lg:pt-0 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navbar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background text-foreground border-t border-border-gray">
        <div className="h-14">
          <Nav mobile={true} />
        </div>
      </nav>

      <Tutorial />

    </div>
  );
}
