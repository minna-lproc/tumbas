'use client';

import { useState, useCallback } from 'react';
import type { Translation } from '@/lib/types/translation';

export const useReview = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReview = useCallback(
    async (translationId: string, reviewText: string, hasModified: boolean) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            translation_id: translationId,
            review_text: reviewText,
            has_modified: hasModified
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to submit Review');
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

  const fetchNextTranslation = useCallback(async (sourceLanguage: number, targetLanguage: number): Promise<Translation | null> => {

    try {
      const response = await fetch(`/api/translations?sourceLanguage=${sourceLanguage}&targetLanguage=${targetLanguage}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch translation');
      }

      return data.data && data.data.length > 0 ? data.data[0] : null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  }, []);

  const fetchUserReviews = useCallback(async(): Promise<Translation | null> => {
    try {
      const response = await fetch(`/api/reviews`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch translation');
      }

      return data.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  }, []);

  return {
    submitReview,
    fetchUserReviews,
    fetchNextTranslation,
    loading,
    error,
  };
  
};
