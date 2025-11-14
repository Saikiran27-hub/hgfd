import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { UserIcon } from './IconComponents';
import type { Language } from '../types';

interface HeaderProps {
  selectedLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
}

const AgriMitraLogo = () => (
    <div className="flex items-center">
        <svg className="h-9 w-9 text-agri-green" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.62 3.16C15.77 2.4 13.43 2 12 2c-3.1 0-5.8.9-7.62 2.38.38 1.15.54 2.39.38 3.66-.2 1.55-1 2.94-2.18 4.09 1.45.69 2.83 1.63 4.14 2.82 1.95 1.79 3.03 4.11 3.03 6.55h.5c.08-2.43 1.1-4.75 3.03-6.55 1.3-1.19 2.69-2.13 4.14-2.82-.47-.45-.88-.95-1.24-1.48-.84-1.23-1.32-2.65-1.43-4.13a4.42 4.42 0 0 1 .64-2.31zM12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
        <span className="text-2xl font-bold text-agri-dark-green ml-2 tracking-tight">AgriMitra</span>
    </div>
);


const Header: React.FC<HeaderProps> = ({ selectedLanguage, onSelectLanguage }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <AgriMitraLogo />
          </div>
          <div className="flex items-center space-x-2">
            <LanguageSwitcher selectedLanguage={selectedLanguage} onSelectLanguage={onSelectLanguage} />
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="User profile"
            >
              <UserIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;