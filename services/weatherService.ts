import type { WeatherData } from '../types';

// Simple hashing function to create deterministic "random" data from a location name
const simpleHash = (str: string): number => {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

const getCityName = async (lat: number, lon: number): Promise<string> => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`);
    if (!response.ok) {
      throw new Error('Reverse geocoding request failed');
    }
    const data = await response.json();
    if (data && data.address) {
      const address = data.address;
      const locationName = address.city || address.town || address.village || address.county || address.state;
      if (locationName) {
        return locationName;
      }
    }
    return `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
  }
};

const generateMockWeatherData = (locationName: string): WeatherData => {
    const hash = simpleHash(locationName.toLowerCase());

    const temp = (hash % 25) + 15; // Temp between 15°C and 40°C
    const humidity = (hash % 40) + 50; // Humidity between 50% and 90%
    const windSpeed = ((hash % 80) / 10) + 2; // Wind speed between 2 and 10 m/s
    const hasRain = (hash % 10) > 7;
    const rain = hasRain ? { '1h': parseFloat(((hash % 10) / 10).toFixed(1)) } : undefined;
    
    const weatherConditions = [
        { main: 'Clear', description: 'clear sky', icon: '01d' },
        { main: 'Clouds', description: 'few clouds', icon: '02d' },
        { main: 'Clouds', description: 'scattered clouds', icon: '03d' },
        { main: 'Clouds', description: 'broken clouds', icon: '04d' },
        { main: 'Rain', description: 'light rain', icon: '10d' },
        { main: 'Haze', description: 'haze', icon: '50d' },
    ];
    const weather = weatherConditions[hash % weatherConditions.length];

    return {
        name: locationName,
        main: { temp, humidity },
        weather: [weather],
        wind: { speed: windSpeed },
        rain,
    };
}

export const getWeather = async (
  lat: number | null,
  lon: number | null,
  city?: string,
): Promise<WeatherData> => {
  // Simulate a network delay for a more realistic loading experience
  await new Promise(resolve => setTimeout(resolve, 500));

  if (city) {
      return generateMockWeatherData(city);
  }

  if (lat && lon) {
    const cityName = await getCityName(lat, lon);
    return generateMockWeatherData(cityName);
  } 

  // Fallback to Delhi
  return generateMockWeatherData('Delhi (Fallback)');
};