'use client';

import { useState, useCallback } from 'react';

interface UseVoiceInputReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
}

export const useVoiceInput = (onTranscript?: (text: string) => void): UseVoiceInputReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const recognition = typeof window !== 'undefined' && 'webkitSpeechRecognition' in window
    ? new (window as any).webkitSpeechRecognition()
    : typeof window !== 'undefined' && 'SpeechRecognition' in window
      ? new (window as any).SpeechRecognition()
      : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // Can be changed to support other languages

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      const newTranscript = finalTranscript || interimTranscript;
      setTranscript(newTranscript);
      if (onTranscript && finalTranscript) {
        onTranscript(finalTranscript.trim());
      }
    };

    recognition.onerror = (event: any) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }

  const startListening = useCallback(() => {
    if (!recognition) {
      setError('Speech recognition is not supported in your browser');
      return;
    }

    setError(null);
    setTranscript('');
    setIsListening(true);
    recognition.start();
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    error,
  };
};
