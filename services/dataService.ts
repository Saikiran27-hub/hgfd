
import type { Scheme, MarketPrice } from '../types';

export const getSchemes = (): Scheme[] => {
  return [
    {
      name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      description: 'Income support of ₹6,000 per year to all landholding farmer families.',
      department: 'Ministry of Agriculture & Farmers Welfare',
      link: 'https://pmkisan.gov.in/',
    },
    {
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      description: 'Insurance coverage and financial support to farmers in the event of failure of any of the notified crops.',
      department: 'Ministry of Agriculture & Farmers Welfare',
      link: 'https://pmfby.gov.in/',
    },
    {
      name: 'Kisan Credit Card (KCC)',
      description: 'Provides farmers with timely access to credit for their cultivation and other needs.',
      department: 'Department of Financial Services',
      link: 'https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card-kcc-',
    },
  ];
};

export const getMarketPrices = (): MarketPrice[] => {
  return [
    {
      crop: 'Wheat',
      price: 2150,
      change: 25,
      trend: [
        { day: 'Mon', price: 2100 },
        { day: 'Tue', price: 2120 },
        { day: 'Wed', price: 2110 },
        { day: 'Thu', price: 2135 },
        { day: 'Fri', price: 2140 },
        { day: 'Sat', price: 2125 },
        { day: 'Sun', price: 2150 },
      ],
    },
    {
      crop: 'Rice (Basmati)',
      price: 3500,
      change: -50,
      trend: [
        { day: 'Mon', price: 3580 },
        { day: 'Tue', price: 3550 },
        { day: 'Wed', price: 3560 },
        { day: 'Thu', price: 3520 },
        { day: 'Fri', price: 3510 },
        { day: 'Sat', price: 3550 },
        { day: 'Sun', price: 3500 },
      ],
    },
    {
      crop: 'Tomato',
      price: 45,
      change: 5,
      trend: [
        { day: 'Mon', price: 38 },
        { day: 'Tue', price: 40 },
        { day: 'Wed', price: 42 },
        { day: 'Thu', price: 39 },
        { day: 'Fri', price: 41 },
        { day: 'Sat', price: 43 },
        { day: 'Sun', price: 45 },
      ],
    },
    {
      crop: 'Cotton',
      price: 7800,
      change: 150,
      trend: [
        { day: 'Mon', price: 7500 },
        { day: 'Tue', price: 7600 },
        { day: 'Wed', price: 7550 },
        { day: 'Thu', price: 7650 },
        { day: 'Fri', price: 7700 },
        { day: 'Sat', price: 7750 },
        { day: 'Sun', price: 7800 },
      ],
    },
  ];
};
