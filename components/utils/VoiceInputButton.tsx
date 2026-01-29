'use client';

import { motion } from 'framer-motion';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import {Mic, Square} from 'lucide-react';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  onStart?: () => void;
  onStop?: () => void;
  disabled?: boolean;
}

export const VoiceInputButton = ({ onTranscript, onStart, onStop, disabled = false }: VoiceInputButtonProps) => {
  const { isListening, transcript, startListening, stopListening, error } = useVoiceInput(onTranscript);

  const handleClick = () => {
    if (isListening) {
      stopListening();
      onStop?.();
    } else {
      startListening();
      onStart?.();
    }
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        onClick={handleClick}
        disabled={disabled}
        className={`flex items-center justify-center rounded-full ${
          isListening
            ? 'text-red-500 hover:text-red-600'
            : 'text-gray-400 hover:text-btn-hover'
        }  shadow-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50`}
        aria-label={isListening ? 'Stop recording' : 'Start voice input'}
      >
        {isListening ? (
          <div className='bg-red-500 p-1 items-center flex rounded-full'>
            <Square className='icon text-btn-text'/>
          </div>
          
        ) : (
          <Mic className='icon'/>
        )}
      </motion.button>
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
      {isListening &&  (
        <p className="text-xs text-gray-400">Listening...</p>
      )}
    </div>
  );
};
