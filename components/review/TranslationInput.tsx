'use client';

import { useState, useRef } from 'react';
import type { Translation } from '@/lib/types/translation';

interface TranslationInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export const TranslationInput = ({
  value,
  onChange,
  placeholder = 'Enter your translation in Cebuano...',
  maxLength = 1000,
}: TranslationInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const characterCount = value.length;
  const remainingChars = maxLength - characterCount;

  return (
    <div className="w-full">
      <div
        className={`relative rounded-xl border transition-colors  ${isFocused
            ? 'border-btn-focus shadow-lg'
            : 'border-border-gray'
          }`}
      >
        <textarea
          value={value}  // ← Use the value prop directly
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={6}
          className="w-full resize-none rounded-xl border-0 focus:outline-none
          bg-transparent p-3
          text-sm placeholder:text-text-grey"
        />

        <div className="absolute bottom-2 right-4 text-xs text-text-grey">
          <span className={remainingChars < 50 ? 'text-orange-600' : ''}>
            {characterCount}/{maxLength}
          </span>
        </div>
        
      </div>
    </div>
  );
};
