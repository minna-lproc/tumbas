'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useReview } from '@/hooks/useReview'
import { ReviewCard } from '@/components/review/ReviewCard';
import type { SourceText } from '@/lib/types/translation';

type TranslationProps = {
  translation_id: number | 0,
  translation_text: string | '',
}

export default function ReviewPage() {
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();
  const { submitReview, fetchNextTranslation, loading: reviewLoading, error } =
    useReview();
  const [currentSourceText, setCurrentSourceText] = useState<SourceText | null>(null);
  const [translation, setTranslation] = useState('');
  const [currentTranslation, setCurrentTranslation] = useState<TranslationProps | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }

  }, [user, userProfile, authLoading, router]);

  useEffect(() => {
    if (userProfile?.source_language_id) {
      loadNextText();
    }
  }, [userProfile?.source_language_id]);

  const loadNextText = async () => {
    setLoading(true);
    const nextText = await fetchNextTranslation(Number(userProfile?.source_language_id), Number(userProfile?.target_language_id));

    const translationData: TranslationProps = {
      translation_id: Number(nextText?.id) ?? 0,
      translation_text:  nextText?.translation_text ?? ''
    }

    setCurrentSourceText(nextText?.source_texts ?? null);
    setTranslation(nextText?.translation_text ?? '');
    setCurrentTranslation(translationData);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!currentSourceText || !translation.trim()) return;

    const hasModified = !(translation.trim() === currentTranslation?.translation_text);

    try {
      await submitReview(Number(currentTranslation?.translation_id), translation, hasModified);
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
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  if (!currentSourceText) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">
            All caught up!
          </h2>
          <p className="">
            There are no more texts to review at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {error && (
          <div className="mb-6 rounded-lg p-4 ">
            <p className="text-sm">{error}</p>
          </div>
        )}
        <ReviewCard
          sourceText={currentSourceText}
          translation={translation}
          onTranslationChange={setTranslation}
          onSubmit={handleSubmit}
          onSkip={handleSkip}
          loading={reviewLoading}
        />
      </div>
    </div>
  );
}
