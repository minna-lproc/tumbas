'use client';

import { motion, PanInfo } from 'framer-motion';
import { SourceTextCard } from '../utils/SourceTextCard';
import { TranslationInput } from './TranslationInput';
import type { SourceText } from '@/lib/types/translation';
import { Circle, CircleQuestionMark } from "lucide-react";

interface ReviewCardProps {
  sourceText: SourceText;
  translation: string;
  onTranslationChange: (value: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
  loading?: boolean;
}

const SWIPE_THRESHOLD = 50;

export const ReviewCard = ({
  sourceText,
  translation,
  onTranslationChange,
  onSubmit,
  onSkip,
  loading = false,
}: ReviewCardProps) => {
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
      className="w-full mt-12 px-8"
    >
      <div className="space-y-4">

        <div className='flex gap-2 items-center justify-between'>
          <p className='text-xl font-semibold my-4'>
          Review
        </p>

        <CircleQuestionMark className='h-4 w-auto text-text-grey cursor-pointer'/>
        </div>

        <SourceTextCard sourceText={sourceText} />
        <div className="space-y-4">
          <TranslationInput value={translation} onChange={onTranslationChange} />
        </div>
        <div className="flex gap-2">
          {<motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSkip}
            className="flex flex-1 items-center justify-center rounded-xl border border-border-gray
            p-3 text-sm font-medium bg-secondary-btn hover:bg-secondary-btn-hover
              focus:outline-none focus:ring-2  focus:ring-btn-focus focus:ring-offset-2"
          >
            Skip
          </motion.button>}
          <motion.button
            whileHover={{ scale: !translation.trim() ? 1 : 1.02 }}
            whileTap={{ scale: !translation.trim() ? 1 : 0.98 }}
            onClick={onSubmit}
            disabled={!translation.trim() || loading}
            className="flex w-full min-w-12 items-center justify-center rounded-xl px-6 
      bg-btn hover:bg-btn-hover active:text-btn-active
      text-btn-text text-sm font-medium
      shadow-sm transition-colors 
      focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Circle className='icon animate-spin' />
                Submitting...
              </span>
            ) : (
              'Confirm Translation'
            )}
          </motion.button>
        </div>
        <p className="text-center text-xs text-text-grey">
          Swipe right to skip • Tap to review
        </p>
      </div>
    </motion.div>
  );
};
