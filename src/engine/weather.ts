import { EnvironmentalConditions } from './types';

// Default to London or a generic city lat/long if not specified
const DEFAULT_LAT = 51.5074;
const DEFAULT_LON = -0.1278;

export async function fetchLiveWeather(lat = DEFAULT_LAT, lon = DEFAULT_LON): Promise<Partial<EnvironmentalConditions>> {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,rain,wind_speed_10m,is_day`
        );
        const data = await response.json();

        if (!data.current) throw new Error('No weather data');

        return {
            temperature: data.current.temperature_2m,
            rainfall: data.current.rain,
            windSpeed: data.current.wind_speed_10m,
            isDaytime: data.current.is_day === 1
        };
    } catch (error) {
        console.error('Weather fetch failed, using fallback', error);
        return {}; // Return empty to keep existing/default state
    }
}
