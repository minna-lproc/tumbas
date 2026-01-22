'use client';

import { useState } from 'react';
import { VoiceInputButton } from '../utils/VoiceInputButton';

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
        className={`relative rounded-xl border-2  transition-colors  ${isFocused
            ? ' '
            : ' '
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
          className="w-full resize-none rounded-xl border-0 bg-transparent px-4 py-4 text-lg  focus:outline-none "
        />

          <div className="absolute bottom-2 left-4">
            <VoiceInputButton
              onTranscript={(text) => onChange(value + ' ' + text)}
              disabled={false}
            />
          </div>

          <div className="absolute bottom-2 right-4 text-sm ">
            <span className={remainingChars < 50 ? '' : ''}>
              {characterCount}/{maxLength}
            </span>
          </div>

      </div>
    </div>
  );
};
