'use client';

import { useState, useCallback } from 'react';
// import { supabase } from '@/lib/supabase/client';
import type { SourceText, Translation } from '@/lib/types/translation';
import { getNextSourceText, mockTranslations, getNextTranslation } from '@/lib/mock/data';

// Supabase commented out - using mock data for UI development
export const useTranslation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitTranslation = useCallback(
    async (sourceTextId: string, translationText: string, dialect: string = 'siargaonon') => {
      setLoading(true);
      setError(null);

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock successful response
        const mockTranslation = {
          id: `t${Date.now()}`,
          source_text_id: sourceTextId,
          user_id: 'mock-user-1',
          translation_text: translationText,
          dialect,
          created_at: new Date().toISOString(),
        };

        // In real app, this would be added to mockTranslations array
        console.log('Mock translation submitted:', mockTranslation);

        return { data: mockTranslation };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchNextSourceText = useCallback(async (): Promise<SourceText | null> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      // Return next available source text from mock data
      return getNextSourceText();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  }, []);

  const fetchNextTranslation = useCallback(async (): Promise<Translation | null> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      // Return next available translation from mock data
      return getNextTranslation();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  }, []);

  return {
    submitTranslation,
    fetchNextSourceText,
    fetchNextTranslation,
    loading,
    error,
  };

  /* COMMENTED OUT - Supabase API calls
  const submitTranslation = useCallback(
    async (sourceTextId: string, translationText: string, dialect: string = 'siargaonon') => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/translations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            source_text_id: sourceTextId,
            translation_text: translationText,
            dialect,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to submit translation');
        }

        return data.data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchNextSourceText = useCallback(async (): Promise<SourceText | null> => {
    try {
      const response = await fetch('/api/source-texts?status=pending&limit=1');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch source text');
      }

      return data.data && data.data.length > 0 ? data.data[0] : null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  }, []);

  return {
    submitTranslation,
    fetchNextSourceText,
    loading,
    error,
  };
  */
};
