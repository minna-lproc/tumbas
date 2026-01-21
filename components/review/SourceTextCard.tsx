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
      className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className='text-sm text-gray'>Source sentence</p>
      </div>
      <p className="text-lg leading-relaxed text-gray-900 dark:text-white">
        {sourceText.text_content}
      </p>
    </motion.div>
  );
};
