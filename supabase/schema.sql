-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create dialects table
CREATE TABLE IF NOT EXISTS dialects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create source_texts table
CREATE TABLE IF NOT EXISTS source_texts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text_content TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  category TEXT,
  difficulty_level INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  email TEXT NOT NULL,
  total_translations INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create translations table
CREATE TABLE IF NOT EXISTS translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_text_id UUID NOT NULL REFERENCES source_texts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  translation_text TEXT NOT NULL,
  dialect TEXT NOT NULL DEFAULT 'siargaonon',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_translations_source_text_id ON translations(source_text_id);
CREATE INDEX IF NOT EXISTS idx_translations_user_id ON translations(user_id);
CREATE INDEX IF NOT EXISTS idx_translations_created_at ON translations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_source_texts_status ON source_texts(status);
CREATE INDEX IF NOT EXISTS idx_users_total_translations ON users(total_translations DESC);

-- Enable Row Level Security
ALTER TABLE dialects ENABLE ROW LEVEL SECURITY;
ALTER TABLE source_texts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for dialects (public read, admin write)
CREATE POLICY "Dialects are viewable by everyone" ON dialects
  FOR SELECT USING (true);

-- RLS Policies for source_texts (authenticated users can read, admin write)
CREATE POLICY "Source texts are viewable by authenticated users" ON source_texts
  FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for users (users can read their own, update their own)
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view public profiles" ON users
  FOR SELECT USING (true);

-- RLS Policies for translations (users can read all, insert their own, update their own)
CREATE POLICY "Translations are viewable by authenticated users" ON translations
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert their own translations" ON translations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own translations" ON translations
  FOR UPDATE USING (auth.uid() = user_id);

-- Function to update user stats after translation insert
CREATE OR REPLACE FUNCTION update_user_stats_on_translation()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users
  SET 
    total_translations = total_translations + 1,
    updated_at = NOW()
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update user stats
CREATE TRIGGER trigger_update_user_stats
  AFTER INSERT ON translations
  FOR EACH ROW
  EXECUTE FUNCTION update_user_stats_on_translation();

-- Insert default dialect
INSERT INTO dialects (name, code, is_active) 
VALUES ('Siargaonon', 'siargaonon', true)
ON CONFLICT (code) DO NOTHING;
