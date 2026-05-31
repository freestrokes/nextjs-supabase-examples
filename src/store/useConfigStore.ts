import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, translations } from '@/constants/translations';

interface ConfigState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set, get) => ({
      language: 'ko',
      setLanguage: (lang) => set({ language: lang }),
      t: (key) => {
        const lang = get().language;
        return translations[lang][key] || translations['en'][key] || key;
      }
    }),
    {
      name: 'app-config',
    }
  )
);
