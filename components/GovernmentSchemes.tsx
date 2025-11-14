
import React, { useState, useEffect } from 'react';
import { getSchemes } from '../services/dataService';
import { getTranslation } from '../constants';
import type { Scheme, Language } from '../types';

interface GovernmentSchemesProps {
  language: Language;
}

const GovernmentSchemes: React.FC<GovernmentSchemesProps> = ({ language }) => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const t = (key: string) => getTranslation(language, key);

  useEffect(() => {
    // In a real app, this could fetch data periodically
    setSchemes(getSchemes());
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-agri-dark-green mb-4">{t('govtSchemes')}</h2>
      <div className="space-y-4">
        {schemes.map((scheme, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md">
            <h3 className="font-bold text-gray-800">{scheme.name}</h3>
            <p className="text-sm text-gray-500 mb-1">{scheme.department}</p>
            <p className="text-sm text-gray-600 mb-3">{scheme.description}</p>
            <a
              href={scheme.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-agri-yellow text-agri-dark-green font-semibold text-sm py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
            >
              📝 {t('applyNow')}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentSchemes;
