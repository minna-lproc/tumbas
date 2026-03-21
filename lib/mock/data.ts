/*import type { Language, ParallelSourceText, SourceText, Translation } from '@/lib/types/translation';
import type { User } from '@/lib/types/auth';
import { id } from 'zod/locales';
import { m } from 'framer-motion';

// Mock user data
export const mockLanguage: Language[] = [
  {
    id: '1',
    name: 'English',
    iso_code: 'en',
    is_source: true
  },
  {
    id: '2',
    name: 'Tagalog',
    iso_code: 'tl',
    is_source: true
  },
  {
    id: '3',
    name: 'Cebuano',
    iso_code: 'ceb',
    is_source: true
  },
  {
    id: '4',
    name: 'Siargaonon',
    iso_code: 'sia',
    is_source: false
  }
];

export const mockUser: User[] = [
  {
    id: 'mock-user-1',
    email: 'user@example.com',
    username: 'testuser',
    total_translations: 15,
    first_name: 'Translator',
    last_name: 'User',
    is_active: true,
    role: 'user',
    date_joined: '',
    source_language: mockLanguage[0],
    target_language: mockLanguage[4]
  },
  {
    id: 'mock-user-2',
    email: 'user2@example.com',
    username: 'testuser2',
    total_translations: 8,
    first_name: 'Translator 2',
    last_name: 'User',
    is_active: true,
    role: 'user',
    date_joined: '',
    source_language: mockLanguage[1],
    target_language: mockLanguage[4]
  },
  {
    id: 'mock-evaluator-1',
    email: 'evaluator@example.com',
    username: 'testevaluator',
    total_translations: 0,
    first_name: 'Evaluator',
    last_name: 'User',
    is_active: true,
    role: 'evaluator',
    date_joined: '',
    source_language: mockLanguage[0],
    target_language: mockLanguage[4]
  },
  {
    id: 'mock-evaluator-2',
    email: 'evaluator2@example.com',
    username: 'testevaluator2',
    total_translations: 0,
    first_name: 'Evaluator 2',
    last_name: 'User',
    is_active: true,
    role: 'evaluator',
    date_joined: '',
    source_language: mockLanguage[2],
    target_language: mockLanguage[4]
  },
  {
    id: 'mock-admin',
    email: 'admin@example.com',
    username: 'testadmin',
    total_translations: 0,
    first_name: 'Admin',
    last_name: 'User',
    is_active: true,
    role: 'admin',
    date_joined: '',
    source_language: undefined,
    target_language: undefined
  }
];

// Mock source texts
export const mockSourceTexts: SourceText[] = [
  {
    id: '1',
    text_content: 'Hello, how are you today?',
    language: mockLanguage[0],
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    text_content: 'The weather is beautiful today.',
    language: mockLanguage[0],
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    text_content: 'I would like to order a coffee, please.',
    language: mockLanguage[0],
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    text_content: 'Can you help me find the nearest hospital?',
    language: mockLanguage[0],
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    text_content: 'Thank you very much for your assistance.',
    language: mockLanguage[0],
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    text_content: 'Gusto kong mag-order ng kape.',
    language: mockLanguage[1],
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    text_content: 'Palihug kog order ug kape.',
    language: mockLanguage[2],
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    text_content: 'Hello, kumusta ka ngayon?',
    language: mockLanguage[1],
    created_at: new Date().toISOString(),
  }
];

export const mockParallelSourceTexts: ParallelSourceText[] = [
  {
    id: 'pst1',
    source_texts: [mockSourceTexts[0], mockSourceTexts[7]],
    status: 'translated'
  },
  {
    id: 'pst2',
    source_texts: [mockSourceTexts[1]],
    status: 'pending'
  },
  {
    id: 'pst3',
    source_texts: [mockSourceTexts[2], mockSourceTexts[5], mockSourceTexts[6]],
    status: 'pending'
  },
  {
    id: 'pst4',
    source_texts: [mockSourceTexts[3]],
    status: 'pending'
  },
  {
    id: 'pst5',
    source_texts: [mockSourceTexts[4]],
    status: 'in progress'
  }
];

// Mock translations
export const mockTranslations: Translation[] = [
  {
    id: 't1',
    source_text_id: '1',
    user_id: mockUser[0].id,
    translation_text: 'Kumusta ka kuman?',
    language: mockLanguage[3],
    created_at: new Date(Date.now() - 86400000).toISOString(),
    review_status: 'approved',
    evaluator_id: mockUser[2].id,
    reviewed_at: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: 't2',
    source_text_id: '2',
    user_id: mockUser[0].id,
    translation_text: 'Maayo ang panahon kuman.',
    language: mockLanguage[3],
    created_at: new Date(Date.now() - 3600000).toISOString(),
    review_status: 'pending'
  },
];

// Get next untranslated source text
export const getNextSourceText = (): SourceText | null => {
  const translatedIds = new Set(mockTranslations.map((t) => t.source_text_id));
  const available = mockSourceTexts.find((text) => !translatedIds.has(text.id));
  return available || null;
};

// Get next translation text
export const getNextTranslation = (): Translation | null => {
  const translatedIds = new Set(mockTranslations.map((t) => t.source_text_id));
  const available = mockTranslations.find((translation) => !translatedIds.has(translation.source_text_id));
  return available || null;
};

// Get recent translations with source text
export const getRecentTranslations = () => {
  return mockTranslations
    .slice()
    .reverse()
    .slice(0, 5)
    .map((translation) => ({
      translation_text: translation.translation_text,
      created_at: translation.created_at,
      source_texts: {
        text_content:
          mockSourceTexts.find((st) => st.id === translation.source_text_id)?.text_content ||
          'Source text',
      },
    }));
};*/
