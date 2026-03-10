'use client';

import { useState, useCallback } from 'react';
import type { SourceText, Translation } from '@/lib/types/translation';

export const useTranslation = () => {


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const fetchNextSourceText = useCallback(async (language: number): Promise<SourceText | null> => {
    try {
      const response = await fetch(`/api/source-texts?languages=${language}&limit=1`);
      const data = await response.json();

      console.log(data)

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
  
};
