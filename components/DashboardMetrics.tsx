
import React from 'react';
import { getTranslation } from '../constants';
import type { Language } from '../types';

interface DashboardMetricsProps {
    language: Language;
}

const MetricItem: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex flex-col items-center text-center">
        <div className="text-2xl md:text-3xl mb-1">{icon}</div>
        <div className="text-xs md:text-sm font-semibold">{label}</div>
        <div className="text-sm md:text-lg font-bold">{value}</div>
    </div>
);


const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ language }) => {
    const t = (key: string) => getTranslation(language, key);
    
    const metrics = [
        { icon: '🌾', label: t('activeCrops'), value: '4' },
        { icon: '💧', label: t('waterUsage'), value: '1.2 ML' },
        { icon: '💸', label: t('estimatedRevenue'), value: '₹4.5 Lakh' },
        { icon: '📈', label: t('yieldForecast'), value: '2.1 Ton/Acre' },
        { icon: '🧠', label: t('farmHealthIndex'), value: '92%' },
    ];

    return (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm text-white p-3 md:p-4">
            <div className="grid grid-cols-5 gap-2 md:gap-4">
                {metrics.map((metric, index) => (
                    <MetricItem key={index} {...metric} />
                ))}
            </div>
        </div>
    );
};

export default DashboardMetrics;
