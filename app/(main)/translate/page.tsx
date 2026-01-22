'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationCard } from '@/components/translation/TranslationCard';
import type { SourceText } from '@/lib/types/translation';

export default function TranslatePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { submitTranslation, fetchNextSourceText, loading: translationLoading, error } =
    useTranslation();
  const [currentSourceText, setCurrentSourceText] = useState<SourceText | null>(null);
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(true);

  // Auth check commented out for UI development
  // useEffect(() => {
  //   if (!authLoading && !user) {
  //     router.push('/login');
  //   }
  // }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadNextText();
    }
  }, [user]);

  const loadNextText = async () => {
    setLoading(true);
    const nextText = await fetchNextSourceText();
    setCurrentSourceText(nextText);
    setTranslation('');
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!currentSourceText || !translation.trim()) return;

    try {
      await submitTranslation(currentSourceText.id, translation);
      // Optimistic update - load next text immediately
      await loadNextText();
    } catch (err) {
      console.error('Failed to submit translation:', err);
    }
  };

  const handleSkip = async () => {
    await loadNextText();
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-r-transparent"></div>
          <p className="">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentSourceText) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 ">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">
            All caught up!
          </h2>
          <p className="">
            There are no more texts to translate at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {error && (
          <div className="mb-6 rounded-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}
        <TranslationCard
          sourceText={currentSourceText}
          translation={translation}
          onTranslationChange={setTranslation}
          onSubmit={handleSubmit}
          onSkip={handleSkip}
          loading={translationLoading}
        />
      </div>
    </div>
  );
}
