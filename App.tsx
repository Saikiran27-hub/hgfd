
import React, { useState } from 'react';
import Header from './components/Header';
import ImageCarousel from './components/ImageCarousel';
import DashboardMetrics from './components/DashboardMetrics';
import WeatherCard from './components/WeatherCard';
import PestDetection from './components/PestDetection';
import GovernmentSchemes from './components/GovernmentSchemes';
import MarketPrices from './components/MarketPrices';
import type { Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="bg-agri-light-gray min-h-screen font-sans text-gray-800">
      <Header selectedLanguage={language} onSelectLanguage={handleLanguageChange} />
      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
          <ImageCarousel />
          <DashboardMetrics language={language} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <WeatherCard language={language} />
            <GovernmentSchemes language={language} />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <PestDetection language={language} />
            <MarketPrices language={language} />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>&copy; 2024 AgriMitra. Empowering Farmers with Technology.</p>
      </footer>
    </div>
  );
};

export default App;
