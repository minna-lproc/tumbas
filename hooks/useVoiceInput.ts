'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

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
  const recognitionRef = useRef<any>(null);
  const accumulatedTranscriptRef = useRef<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          // Accumulate final transcripts
          if (finalTranscript) {
            accumulatedTranscriptRef.current += finalTranscript;
          }

          const currentTranscript = accumulatedTranscriptRef.current + (interimTranscript || '');
          setTranscript(currentTranscript);

          // Call onTranscript with current transcript for real-time updates
          if (onTranscript) {
            onTranscript(currentTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          setError(`Speech recognition error: ${event.error}`);
          setIsListening(false);
        };

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onend = () => {
          setIsListening(false);
          // Call onTranscript with accumulated final transcript when listening ends
          if (onTranscript && accumulatedTranscriptRef.current.trim()) {
            onTranscript(accumulatedTranscriptRef.current.trim());
          }
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setError('Speech recognition is not supported in your browser');
      return;
    }

    setError(null);
    setTranscript('');
    accumulatedTranscriptRef.current = '';
    setIsListening(true);
    try {
      recognitionRef.current.start();
    } catch (err) {
      setError('Failed to start speech recognition');
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    error,
  };
};
