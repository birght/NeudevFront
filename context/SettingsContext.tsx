
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'zh' | 'en';
type ThemeColor = { name: string; main: string; hover: string };

const themes: ThemeColor[] = [
  { name: 'Indigo', main: '#4f46e5', hover: '#4338ca' },
  { name: 'Blue', main: '#2563eb', hover: '#1d4ed8' },
  { name: 'Rose', main: '#e11d48', hover: '#be123c' },
  { name: 'Emerald', main: '#10b981', hover: '#059669' },
  { name: 'Amber', main: '#f59e0b', hover: '#d97706' },
];

interface SettingsContextType {
  lang: Language;
  setLang: (l: Language) => void;
  theme: ThemeColor;
  setTheme: (t: ThemeColor) => void;
  isMourning: boolean;
  setIsMourning: (b: boolean) => void;
  themes: ThemeColor[];
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('zh');
  const [theme, setTheme] = useState<ThemeColor>(themes[0]);
  const [isMourning, setIsMourning] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-color', theme.main);
    root.style.setProperty('--theme-color-hover', theme.hover);
  }, [theme]);

  useEffect(() => {
    if (isMourning) {
      document.body.classList.add('mourning-mode');
    } else {
      document.body.classList.remove('mourning-mode');
    }
  }, [isMourning]);

  return (
    <SettingsContext.Provider value={{ lang, setLang, theme, setTheme, isMourning, setIsMourning, themes }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
