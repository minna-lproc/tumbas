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
      className="rounded-xl w-1/2 bg-white shadow-lg dark:bg-gray-800"
    >
      <div className="mb-4 w-full h-full items-center flex ">

        <select 
            name=""
            id=""
            className='w-full px-6 py-3 rounded-xl appearance-auto border-r-20 border-transparent bg-white dark:bg-gray-800'
            required>
            <option value="en">English</option>
            <option value="tl">Tagalog</option>
            <option value="ceb">Cebuano</option>
        </select>
        
      </div>

    </motion.div>
  );
};