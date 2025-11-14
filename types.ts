export type Language = 'en' | 'hi' | 'te' | 'ta' | 'mr' | 'bn' | 'pa' | 'gu' | 'kn' | 'ml' | 'or';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  rain?: {
    '1h': number;
  };
}

export interface PestAnalysisResult {
  pestOrDiseaseName: string;
  chemicalTreatment: string[];
  organicTreatment: string[];
  prevention: string[];
  urgencyLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface Scheme {
  name: string;
  description: string;
  department: string;
  link: string;
}

export interface MarketPrice {
  crop: string;
  price: number;
  change: number;
  trend: { day: string; price: number }[];
}

export interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}