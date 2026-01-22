'use client';

import { motion } from 'framer-motion';
import {Circle} from "lucide-react";

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
}

export const SubmitButton = ({
  onClick,
  disabled = false,
  loading = false,
  label = 'Submit Translation',
}: SubmitButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className="flex h-12 w-full min-w-12 items-center justify-center rounded-xl px-6 
      bg-btn hover:bg-btn-hover active:text-btn-active
      text-btn-text text-sm lg:text-base font-semibold 
      shadow-sm transition-colors 
      focus:outline-none focus:ring-2 focus:ring-btn-focus focus:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50 "
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Circle className='icon animate-spin'/>
          Submitting...
        </span>
      ) : (
        label
      )}
    </motion.button>
  );
};
