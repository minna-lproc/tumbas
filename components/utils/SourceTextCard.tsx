'use client';

import { motion } from 'framer-motion';
import type { SourceText } from '@/lib/types/translation';

interface SourceTextCardProps {
  sourceText: SourceText;
}

export const SourceTextCard = ({ sourceText }: SourceTextCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-xl px-6 py-3 shadow-lg border border-gray-400"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center justify-between">
          <p className='text-xs text-gray-400' >Source sentence</p>
        </div>
      </div>
      <p className="text-sm lg:text-base leading-relaxed ">
        {sourceText.text_content}
      </p>
    </motion.div>
  );
};
