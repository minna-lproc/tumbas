'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const supabase = createClient();

  const [userData, setUserData] = useState<{ user: User | null; data: any } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserWithData = async (user: User) => {
    if (!user) return;
    try {
      const { data, error: viewError } = await supabase
        .from("users_with_data")
        .select("*")
        .eq("id", user.id)
        .single();
      if (viewError) throw viewError;
      setUserData({ user, data });
    } catch (err) {
      console.error("Error fetching user view:", err);
      setUserData({ user, data: null });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        fetchUserWithData(user);
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserWithData(session.user);
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { userData, loading };
};