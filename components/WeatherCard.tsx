
import React, { useEffect, useState, useCallback } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { getWeather } from '../services/weatherService';
import { getTranslation } from '../constants';
import type { WeatherData, Language } from '../types';
import { TempIcon, HumidityIcon, RainIcon, WindIcon, LocationMarkerIcon } from './IconComponents';

interface WeatherCardProps {
  language: Language;
}

const LOCATION_STORAGE_KEY = 'agrimitra-manual-location';

const WeatherCard: React.FC<WeatherCardProps> = ({ language }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [manualLocationInput, setManualLocationInput] = useState('');
  const [locationQuery, setLocationQuery] = useState<{lat: number | null, lon: number | null, city?: string} | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const location = useGeolocation();
  const t = (key: string) => getTranslation(language, key);

  const fetchWeatherData = useCallback(async (lat: number | null, lon: number | null, city?: string) => {
    setLoading(true);
    try {
      const data = await getWeather(lat, lon, city);
      setWeather(data);
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect for initializing location from storage or geolocation
  useEffect(() => {
    if (!isInitialLoad) return;

    const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (savedLocation) {
        setLocationQuery({ lat: null, lon: null, city: savedLocation });
        setIsInitialLoad(false);
        return;
    }
    
    // Wait for geolocation to become available
    if (location.latitude || location.error) {
        setLocationQuery({ lat: location.latitude, lon: location.longitude });
        setIsInitialLoad(false);
    }
  }, [location, isInitialLoad]);

  const handleLocationUpdate = () => {
    if (manualLocationInput.trim()) {
      const newCity = manualLocationInput.trim();
      localStorage.setItem(LOCATION_STORAGE_KEY, newCity);
      setLocationQuery({ lat: null, lon: null, city: newCity });
      setIsEditingLocation(false);
    }
  };
  
  const handleDetectLocation = () => {
    localStorage.removeItem(LOCATION_STORAGE_KEY);
    setLocationQuery({ lat: location.latitude, lon: location.longitude });
    setIsEditingLocation(false);
  };
  
  // Fetch weather whenever the location query changes
  useEffect(() => {
    if (!locationQuery) return;
    const { lat, lon, city } = locationQuery;
    fetchWeatherData(lat, lon, city);
  }, [locationQuery, fetchWeatherData]);

  // Set up periodic refresh
  useEffect(() => {
    const interval = setInterval(() => {
      if (locationQuery) {
        const { lat, lon, city } = locationQuery;
        fetchWeatherData(lat, lon, city);
      }
    }, 30 * 60 * 1000); // Refresh every 30 minutes
    return () => clearInterval(interval);
  }, [locationQuery, fetchWeatherData]);
  
  const WeatherInfo: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-center">
      <div className="text-agri-green mr-3">{icon}</div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="font-bold">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-agri-dark-green mb-4">{t('weatherAdvisory')}</h2>
      
      {location.error && !loading && weather?.name.includes('Fallback') && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 mb-4 rounded-md text-sm" role="alert">
            <p>{t('locationDenied')}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">{t('loadingWeather')}</div>
      ) : weather ? (
        isEditingLocation ? (
          <div className="space-y-3 py-4">
            <label htmlFor="city-input" className="block text-sm font-medium text-gray-700">Enter a city name</label>
            <input
              id="city-input"
              type="text"
              value={manualLocationInput}
              onChange={(e) => setManualLocationInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLocationUpdate()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-agri-green focus:border-agri-green"
              placeholder="e.g., Mumbai"
              autoFocus
            />
            <div className="flex flex-col sm:flex-row gap-2 justify-end">
                <button 
                  onClick={handleDetectLocation} 
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-agri-dark-green bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                    <LocationMarkerIcon className="w-4 h-4" />
                    <span>Detect Location</span>
                </button>
                <div className="flex gap-2">
                    <button onClick={() => setIsEditingLocation(false)} className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                    <button onClick={handleLocationUpdate} className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white bg-agri-green border border-transparent rounded-md hover:bg-agri-dark-green">Update</button>
                </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-600 font-medium">{weather.name}</p>
                  <button 
                    onClick={() => {
                        setIsEditingLocation(true);
                        if (weather.name && !weather.name.startsWith('Lat:')) {
                            setManualLocationInput(weather.name.replace(' (Fallback)', ''));
                        } else {
                            setManualLocationInput('');
                        }
                    }}
                    className="text-xs text-blue-600 hover:underline"
                    aria-label="Change location"
                  >
                    (Change)
                  </button>
                </div>
              </div>
              <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt={weather.weather[0].description}
                className="w-16 h-16"
              />
            </div>
            <p className="text-lg text-agri-yellow font-semibold capitalize">{weather.weather[0].description}</p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <WeatherInfo icon={<HumidityIcon className="w-6 h-6" />} label={t('humidity')} value={`${weather.main.humidity}%`} />
              <WeatherInfo icon={<WindIcon className="w-6 h-6" />} label={t('windSpeed')} value={`${(weather.wind.speed * 3.6).toFixed(1)} km/h`} />
              <WeatherInfo icon={<RainIcon className="w-6 h-6" />} label={t('rainfall')} value={`${weather.rain ? weather.rain['1h'] : '0'} mm`} />
              <WeatherInfo icon={<TempIcon className="w-6 h-6" />} label={t('condition')} value={weather.weather[0].main} />
            </div>
          </div>
        )
      ) : (
        <div>{t('loadingWeather')}</div>
      )}
    </div>
  );
};

export default WeatherCard;
