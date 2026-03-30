'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Tutorial() {
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if tutorial should start
    if (typeof window !== 'undefined') {
      const tutorialStarted = sessionStorage.getItem('tutorialStarted');

      if (tutorialStarted === 'true') {
        setShowTutorial(true);
        setTutorialStep(1);
      }
    }
  }, []);

  const nextTutorialStep = () => {
    if (tutorialStep < 14) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowTutorial(false);
      setTutorialStep(0);
      sessionStorage.removeItem('tutorialStarted');
    }
  };

  const skipTutorial = () => {
    setShowTutorial(false);
    setTutorialStep(0);
    sessionStorage.removeItem('tutorialStarted');
  };

  const goToTranslate = () => {
    nextTutorialStep(); // Advance to next tutorial step
    router.push('/translate');
  };

  const goToMyTranslations = () => {
    nextTutorialStep(); // Advance to next tutorial step
    router.push('/mytranslations');
  };

  const goToDashboard = () => {
    nextTutorialStep(); // Advance to next tutorial step
    router.push('/dashboard');
  };
  

  if (!showTutorial) return null;

  return (
    <>
      {/* Tutorial Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40 pointer-events-none" />

      {/* Dashboard Tutorial */}
      {tutorialStep === 1 && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-xs text-center relative">
            <p className="text-sm mb-3">Hello and welcome to Tumbas! Let us help you get started.</p>
            <div className="flex justify-between">
              <button onClick={skipTutorial} className="text-xs text-gray-500 hover:text-gray-700">Skip</button>
              <button onClick={nextTutorialStep} className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Additional Left Popup */}
      {tutorialStep === 2 && (
        <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-50 pointer-events-auto">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-xs text-center relative">
            <p className="text-sm mb-3">On your dashboard you can see the "Total Translations" that you have made</p>
            <div className="flex justify-between">
              <button onClick={skipTutorial} className="text-xs text-gray-500 hover:text-gray-700">Skip</button>
              <button onClick={nextTutorialStep} className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Additional Center-Right Popup */}
      {tutorialStep === 3 && (
        <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-50 pointer-events-auto">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-xs text-center relative">
            <p className="text-sm mb-3">You can also see how many translations you have completed for today with "Translations Today".</p>
            <div className="flex justify-between">
              <button onClick={skipTutorial} className="text-xs text-gray-500 hover:text-gray-700">Skip</button>
              <button onClick={nextTutorialStep} className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Additional Bottom-Left Popup */}
      {tutorialStep === 4 && (
        <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-50 pointer-events-auto">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-xs text-center relative">
            <p className="text-sm mb-3">And a hstory of your recent translations will be displayed on your dashboard.</p>
            <div className="flex justify-between">
              <button onClick={skipTutorial} className="text-xs text-gray-500 hover:text-gray-700">Skip</button>
              <button onClick={nextTutorialStep} className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Translate Tutorial */}
      {tutorialStep === 5 && (
        <div className="fixed top-20 right-40 z-50 pointer-events-auto">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-xs text-center relative">
            <p className="text-sm mb-3">Click the "Translate" button above to start translating sentences!</p>
            <div className="flex justify-between">
              <button onClick={skipTutorial} className="text-xs text-gray-500 hover:text-gray-700">Skip</button>
              <button onClick={goToTranslate} className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700">Go to Translate</button>
            </div>
          </div>
        </div>
      )}

      {/* Additional Center Popup */}
      {tutorialStep === 6 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-xs text-center relative">
            <p className="text-sm mb-3">This is the Translator Page, where you can start translating prompts!</p>
            <div className="flex justify-between">
              <button onClick={skipTutorial} className="text-xs text-gray-500 hover:text-gray-700">Skip</button>
              <button onClick={nextTutorialStep} className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* New Tutorial Step 7 */}
      {tutorialStep === 7 && (
        <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-50 pointer-events-auto">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-xs text-center relative">
            <p className="text-sm mb-3">The textbox above display the source text for translation.</p>
            <div className="flex justify-between">
              <button onClick={skipTutorial} className="text-xs text-gray-500 hover:text-gray-700">Skip</button>
              <button onClick={nextTutorialStep} className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* New Tutorial Step 8 */}
      {tutorialStep === 8 && (
        <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-50 pointer-events-auto">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-xs text-center relative">
            <p className="text-sm mb-3">And the textbox below is where you enter the translated text in your preferred language.</p>
            <div className="flex justify-between">
              <button onClick={skipTutorial} className="text-xs text-gray-500 hover:text-gray-700">Skip</button>
              <button onClick={nextTutorialStep} className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Additional Tutorial Step */}
      {tutorialStep === 9 && (
        <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-50 pointer-events-auto">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-xs text-center relative">
            <p className="text-sm mb-3">Once you've translated a sentence, you can submit your translation for review.</p>
            <div className="flex justify-between">
              <button onClick={skipTutorial} className="text-xs text-gray-500 hover:text-gray-700">Skip</button>
              <button onClick={nextTutorialStep} className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* My Translations Tutorial */}
      {tutorialStep === 10 && (
        <div className="fixed top-20 right-20 z-50 pointer-events-auto">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-xs text-center relative">
            <p className="text-sm mb-3">Click "My Translations" above to view all your completed translations.</p>
            <div className="flex justify-between">
              <button onClick={skipTutorial} className="text-xs text-gray-500 hover:text-gray-700">Skip</button>
              <button onClick={goToMyTranslations} className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700">Go to My Translations</button>
            </div>
          </div>
        </div>
      )}

      {tutorialStep === 11 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-xs text-center relative">
            <p className="text-sm mb-3">This is the My Translation Page, where you can review your submitted translations from the translation page.</p>
            <div className="flex justify-between">
              <button onClick={skipTutorial} className="text-xs text-gray-500 hover:text-gray-700">Skip</button>
              <button onClick={nextTutorialStep} className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Additional Left Popup */}
      {tutorialStep === 12 && (
        <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-50 pointer-events-auto">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-xs text-center relative">
            <p className="text-sm mb-3">You can see here the history of your translations. Like the Translator's page, the texts are arranged the same (source text above, translation text below).</p>
            <div className="flex justify-between">
              <button onClick={skipTutorial} className="text-xs text-gray-500 hover:text-gray-700">Skip</button>
              <button onClick={nextTutorialStep} className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Additional Left Popup */}
      {tutorialStep === 13 && (
        <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-50 pointer-events-auto">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-xs text-center relative">
            <p className="text-sm mb-3">To find a specific translation, use the search bar and type either the source text or the translation text.</p>
            <div className="flex justify-between">
              <button onClick={skipTutorial} className="text-xs text-gray-500 hover:text-gray-700">Skip</button>
              <button onClick={nextTutorialStep} className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Additional Tutorial Step */}
      {tutorialStep === 14 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-xs text-center relative">
            <p className="text-sm mb-3">Now you are ready to use Tumbas! Happy Translating!</p>
            <div className="flex justify-between">
              <button onClick={skipTutorial} className="text-xs text-gray-500 hover:text-gray-700">Skip</button>
              <button onClick={goToDashboard} className="bg-teal-600 text-white px-3 py-1 rounded text-xs hover:bg-teal-700">Finish</button>
            </div>
          </div>
        </div>
      )}

      
    </>
  );
}