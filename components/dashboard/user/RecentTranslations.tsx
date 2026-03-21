'use client';

import { formatDistanceToNow } from 'date-fns';
import type { Translation } from '@/lib/types/translation';

interface RecentTranslationsProps {
  translations: Translation[];
}

export const RecentTranslations = ({translations}: RecentTranslationsProps) => {

  if (translations.length === 0) {
    return (
      <div className="rounded-xl  p-6 shadow-md bg-input-bg
    border border-border-gray">
        <h3 className="mb-4 text-lg font-semibold ">
          Recent Translations
        </h3>
        <p className="">No translations yet. Start translating!</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl px-6 pt-6 shadow-md bg-input-bg
    border border-border-gray">
      <h3 className="mb-4 text-lg font-semibold ">
        Recent Translations
      </h3>
      <div className="space-y-4">
        {translations.map((translation, index) => (
          <div key={index} className="border-b border-border-gray py-4 last:border-0 ">
            <p className="text-sm font-normal">
              {translation.source_texts.text_content || 'Source text'}
            </p>
            <p className="mt-1 font-medium">{translation.translation_text}</p>
            <p className="mt-2 text-xs font-normal text-text-grey">
              {formatDistanceToNow(new Date(translation.created_at), { addSuffix: true })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
