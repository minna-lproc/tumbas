'use client';

import { useState } from 'react';

interface TranslationInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export const TranslationInput = ({
  value,
  onChange,
  placeholder = 'Enter your translation in Siargaonon...',
  maxLength = 1000,
}: TranslationInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const characterCount = value.length;
  const remainingChars = maxLength - characterCount;

  return (
    <div className="w-full">
      <div
        className={`relative rounded-xl border-2 bg-white transition-colors dark:bg-gray-800 ${
          isFocused
            ? 'border-teal-500 dark:border-teal-400'
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={6}
          className="w-full resize-none rounded-xl border-0 bg-transparent px-4 py-4 text-lg text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white dark:placeholder-gray-500"
        />
        <div className="absolute bottom-2 right-4 text-sm text-gray-500 dark:text-gray-400">
          <span className={remainingChars < 50 ? 'text-orange-500' : ''}>
            {characterCount}/{maxLength}
          </span>
        </div>
      </div>
    </div>
  );
};
