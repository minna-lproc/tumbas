'use client';

import { useState, useRef } from 'react';
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
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const originalValueRef = useRef<string>('');
  const characterCount = value.length;
  const remainingChars = maxLength - characterCount;

  const handleVoiceStart = () => {
    setIsVoiceListening(true);
    originalValueRef.current = value;
  };

  const handleVoiceStop = () => {
    setIsVoiceListening(false);
  };

  const handleVoiceTranscript = (transcript: string) => {
    onChange(originalValueRef.current + (originalValueRef.current ? ' ' : '') + transcript);
  };

  return (
    <div className="w-full">
      <div
        className={`relative rounded-xl border transition-colors  ${isFocused
            ? 'border-btn-focus shadow-lg'
            : 'border-gray-400'
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
          className="w-full resize-none rounded-xl border-0 focus:outline-none
          bg-transparent px-4 py-4 
          text-sm lg:text-base placeholder:text-gray-400"
        />

          <div className="absolute bottom-2 left-4">
            <VoiceInputButton
              onTranscript={handleVoiceTranscript}
              onStart={handleVoiceStart}
              onStop={handleVoiceStop}
              disabled={false}
            />
          </div>

          <div className="absolute bottom-2 right-4 text-xs text-gray-400">
            <span className={remainingChars < 50 ? 'text-orange-600' : ''}>
              {characterCount}/{maxLength}
            </span>
          </div>

      </div>
    </div>
  );
};
