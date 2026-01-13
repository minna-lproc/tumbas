import type { SourceText, Translation } from '@/lib/types/translation';
import type { User } from '@/lib/types/auth';

// Mock user data
export const mockUser: User = {
  id: 'mock-user-1',
  email: 'user@example.com',
  username: 'testuser',
  total_translations: 15,
};

// Mock source texts
export const mockSourceTexts: SourceText[] = [
  {
    id: '1',
    text_content: 'Hello, how are you today?',
    language: 'en',
    category: 'Greetings',
    difficulty_level: 1,
    status: 'pending',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    text_content: 'The weather is beautiful today.',
    language: 'en',
    category: 'Weather',
    difficulty_level: 1,
    status: 'pending',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    text_content: 'I would like to order a coffee, please.',
    language: 'en',
    category: 'Food & Drink',
    difficulty_level: 2,
    status: 'pending',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    text_content: 'Can you help me find the nearest hospital?',
    language: 'en',
    category: 'Directions',
    difficulty_level: 2,
    status: 'pending',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    text_content: 'Thank you very much for your assistance.',
    language: 'en',
    category: 'Gratitude',
    difficulty_level: 1,
    status: 'pending',
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
  },
  {
    id: 't2',
    source_text_id: '2',
    user_id: mockUser.id,
    translation_text: 'Maayo ang panahon kuman.',
    dialect: 'siargaonon',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
];

// Get next untranslated source text
export const getNextSourceText = (): SourceText | null => {
  const translatedIds = new Set(mockTranslations.map((t) => t.source_text_id));
  const available = mockSourceTexts.find((text) => !translatedIds.has(text.id));
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
