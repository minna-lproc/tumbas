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
      className="rounded-xl  p-6 shadow-lg "
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="mb-4 flex items-center justify-between">
        <p className='text-sm '>Source sentence</p>
      </div>  
        {/*<span className="text-sm text-gray-500 dark:text-gray-400">
          Level {sourceText.difficulty_level}
        </span>*/}
      </div>
      <p className="text-lg leading-relaxed ">
        {sourceText.text_content}
      </p>
    </motion.div>
  );
};
