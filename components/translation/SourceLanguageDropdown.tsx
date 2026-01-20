'use client';

import { motion } from 'framer-motion';
import type { SourceText } from '@/lib/types/translation';

interface SourceLanguageDropdownProps {
  sourceText: SourceText;
}

export const SourceLanguageDropdown = ({ sourceText }: SourceLanguageDropdownProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-xl w-1/2 h-12 px-6 bg-white shadow-lg dark:bg-gray-800 "
    >
      <div className="w-full items-center flex h-full">

        <select 
            name=""
            id=""
            className='w-full bg-white dark:bg-gray-800'
            required>
            <option value="en">English</option>
            <option value="tl">Tagalog</option>
            <option value="ceb">Cebuano</option>
        </select>
        
      </div>

    </motion.div>
  );
};