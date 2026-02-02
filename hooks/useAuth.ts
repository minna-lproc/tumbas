'use client';

// import { useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabase/client';
import { useMemo } from 'react';
import type { User } from '@supabase/supabase-js';
import { mockUser } from '@/lib/mock/data';

// Supabase commented out - using mock data for UI development
export const useAuth = () => {
  // Mock user for UI development - memoized to prevent infinite loops
  const mockUserData = mockUser[0]; // Assuming first user
  const user = useMemo(
    () =>
      ({
        id: mockUserData.id,
        email: mockUserData.email,
        role: mockUserData.role ? 'admin' : mockUserData.role ? 'evaluator' : 'user',
      }) as User & { role: string },
    []
  );

  return { user, loading: false };

  /* COMMENTED OUT - Supabase authentication
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
  */
};
