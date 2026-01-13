'use client';

import { formatDistanceToNow } from 'date-fns';

interface RecentTranslation {
  translation_text: string;
  created_at: string;
  source_texts?: {
    text_content: string;
  };
}

interface RecentTranslationsProps {
  translations: RecentTranslation[];
}

export const RecentTranslations = ({ translations }: RecentTranslationsProps) => {
  if (translations.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Recent Translations
        </h3>
        <p className="text-gray-500 dark:text-gray-400">No translations yet. Start translating!</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        Recent Translations
      </h3>
      <div className="space-y-4">
        {translations.map((translation, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-0 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {translation.source_texts?.text_content || 'Source text'}
            </p>
            <p className="mt-1 text-gray-900 dark:text-white">{translation.translation_text}</p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
              {formatDistanceToNow(new Date(translation.created_at), { addSuffix: true })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
