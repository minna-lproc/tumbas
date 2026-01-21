import type { Language, SourceText, Translation } from '@/lib/types/translation';
import type { User } from '@/lib/types/auth';

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

export const mockUser: User = {
  id: 'mock-user-1',
  email: 'user@example.com',
  username: 'testuser',
  total_translations: 15,
  first_name: '',
  last_name: '',
  is_active: false,
  is_admin: false,
  is_evaluator: false,
  date_joined: '',
  source_language: mockLanguage[0],
  target_language: mockLanguage[0]
};

// Mock source texts
export const mockSourceTexts: SourceText[] = [
  {
    id: '1',
    text_content: 'Hello, how are you today?',
    language: 'en',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    text_content: 'The weather is beautiful today.',
    language: 'en',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    text_content: 'I would like to order a coffee, please.',
    language: 'en',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    text_content: 'Can you help me find the nearest hospital?',
    language: 'en',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    text_content: 'Thank you very much for your assistance.',
    language: 'en',
    created_at: new Date().toISOString(),
  },
];

// Mock translations
export const mockTranslations: Translation[] = [
  {
    id: 't1',
    source_text_id: '1',
    user_id: mockUser.id,
    translation_text: 'Kumusta ka kuman?',
    dialect: 'siargaonon',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    review_status: 'pending'
  },
  {
    id: 't2',
    source_text_id: '2',
    user_id: mockUser.id,
    translation_text: 'Maayo ang panahon kuman.',
    dialect: 'siargaonon',
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
};
