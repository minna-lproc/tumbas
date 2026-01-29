'use client';

import { motion, PanInfo } from 'framer-motion';
import { SourceTextCard } from '../utils/SourceTextCard';
import { TranslationInput } from './TranslationInput';
import { SubmitButton } from './SubmitButton';
import { VoiceInputButton } from '../utils/VoiceInputButton';
import type { SourceText } from '@/lib/types/translation';

interface TranslationCardProps {
  sourceText: SourceText;
  translation: string;
  onTranslationChange: (value: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
  loading?: boolean;
}

const SWIPE_THRESHOLD = 50;

export const TranslationCard = ({
  sourceText,
  translation,
  onTranslationChange,
  onSubmit,
  onSkip,
  loading = false,
}: TranslationCardProps) => {
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSkip();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className="w-full mt-12"
    >
      <div className="space-y-4">

        <p className='text-xl font-semibold my-4'>
          Translate
        </p>

        <SourceTextCard sourceText={sourceText} />
        <div className="space-y-4">
          <TranslationInput value={translation} onChange={onTranslationChange} />
          {/*<div className="flex justify-center">
            <VoiceInputButton
              onTranscript={(text) => onTranslationChange(translation + ' ' + text)}
              disabled={loading}
            />
          </div>*/}
        </div>
        <div className="flex gap-4">
          {/*<motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSkip}
            className="flex h-14 min-w-[48px] flex-1 items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-6 text-base font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700"
          >
            Skip
          </motion.button> */}
          <SubmitButton
            onClick={onSubmit}
            disabled={!translation.trim()}
            loading={loading}
          />
        </div>
        <p className="text-center text-xs text-gray-400">
          Swipe right to skip • Tap to translate
        </p>
      </div>
    </motion.div>
  );
};
