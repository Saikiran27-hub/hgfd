
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getMarketPrices } from '../services/dataService';
import { getTranslation } from '../constants';
import type { MarketPrice, Language } from '../types';

interface MarketPricesProps {
  language: Language;
}

const MarketPrices: React.FC<MarketPricesProps> = ({ language }) => {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const t = (key: string) => getTranslation(language, key);

  const fetchPrices = () => {
    setPrices(getMarketPrices());
  };
  
  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 2 * 60 * 60 * 1000); // Refresh every 2 hours
    return () => clearInterval(interval);
  }, []);

  const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-md shadow-lg">
          <p className="label">{`${label} : ₹${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-agri-dark-green mb-4">{t('marketPrices')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prices.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">{item.crop}</h3>
              <div className={`font-bold ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{item.price}{' '}
                <span className="text-sm">({item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change)})</span>
              </div>
            </div>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={item.trend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={['dataMin - 10', 'dataMax + 10']} hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="price" stroke="#4CAF50" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
             <p className="text-xs text-center text-gray-500 mt-1">{t('last7Days')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPrices;
