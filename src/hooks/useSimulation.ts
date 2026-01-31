import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { CityParams, EnvironmentalConditions, CityMetrics, Recommendation } from '../engine/types';
import { calculateMetrics, getRecommendations, INITIAL_PARAMS, INITIAL_ENVIRONMENT } from '../engine/simulator';
import { fetchLiveWeather } from '../engine/weather';

export interface HistoryPoint extends CityMetrics {
    timestamp: string;
}

export function useSimulation() {
    const [params, setParams] = useState<CityParams>(INITIAL_PARAMS);
    const [env, setEnv] = useState<EnvironmentalConditions>(INITIAL_ENVIRONMENT);
    const [isLiveWeather, setIsLiveWeather] = useState(false); // Toggle for real data vs manual override
    const [history, setHistory] = useState<HistoryPoint[]>([]);

    // Derived state: Metrics
    const metrics = useMemo(() => calculateMetrics(params, env), [params, env]);

    // Update history buffer
    useEffect(() => {
        setHistory(prev => {
            const newPoint = { ...metrics, timestamp: new Date().toLocaleTimeString() };
            const newHistory = [...prev, newPoint];
            if (newHistory.length > 20) newHistory.shift();
            return newHistory;
        });
    }, [metrics]);

    // Derived state: Recommendations
    const recommendations = useMemo(() => getRecommendations(metrics), [metrics]);

    // Update param helper
    const updateParam = useCallback((key: keyof CityParams, value: number) => {
        setParams(prev => ({ ...prev, [key]: value }));
    }, []);

    const updateEnv = useCallback((key: keyof EnvironmentalConditions, value: any) => {
        setEnv(prev => ({ ...prev, [key]: value }));
    }, []);

    // Effect: Poll Weather if Live
    useEffect(() => {
        if (!isLiveWeather) return;

        const fetchWeather = async () => {
            const liveData = await fetchLiveWeather();
            if (liveData) {
                setEnv(prev => ({ ...prev, ...liveData }));
            }
        };

        fetchWeather();
        const interval = setInterval(fetchWeather, 300000); // 5 mins
        return () => clearInterval(interval);
    }, [isLiveWeather]);

    return {
        params,
        env,
        metrics,
        history,
        recommendations,
        updateParam,
        updateEnv,
        isLiveWeather,
        setIsLiveWeather
    };
}
