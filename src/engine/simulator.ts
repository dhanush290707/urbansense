import { CityParams, PeerConditions, CityMetrics, EnvironmentalConditions, Recommendation } from './types';

export const INITIAL_PARAMS: CityParams = {
    trafficVolume: 50,
    publicTransportUsage: 30,
    greenEnergyAdoption: 20,
    greenSpaceCoverage: 15,
    populationDensity: 40,
    industrialActivity: 30,
};

export const INITIAL_ENVIRONMENT: EnvironmentalConditions = {
    temperature: 25,
    rainfall: 0,
    windSpeed: 10,
    isDaytime: true,
};

// Complex interconnected system model
export function calculateMetrics(params: CityParams, env: EnvironmentalConditions): CityMetrics {
    // 1. Traffic Congestion Calculation
    // Rain increases congestion. Public transport reduces it.
    const rainFactor = env.rainfall > 0 ? 1.2 : 1.0;
    const baseCongestion = (params.trafficVolume * 1.5) / (1 + params.publicTransportUsage / 100);
    let trafficCongestion = Math.min(100, baseCongestion * rainFactor);

    // 2. Air Quality Index (AQI)
    // Sources: Traffic, Industry. Sinks: Green Space, Wind, Rain.
    const transportPollution = (params.trafficVolume * 0.7) * (1 - params.greenEnergyAdoption / 200); // EVs reduce pollution
    const industryPollution = params.industrialActivity * 1.2;
    const basePollution = transportPollution + industryPollution;

    // Mitigation
    const windFactor = Math.max(0.5, 1 - (env.windSpeed / 50)); // Wind blows away pollution
    const greenFactor = 1 - (params.greenSpaceCoverage / 200); // 100% green space removes 50% pollution efficiently

    let aqi = basePollution * windFactor * greenFactor;
    // Rain washes out particulate matter
    if (env.rainfall > 10) aqi *= 0.7;

    // Normalize/Clamp AQI (0-500)
    // Baseline AQI usually around 50. Let's shift it.
    let airQualityIndex = Math.min(500, Math.max(10, aqi + 30));

    // 3. Noise Level
    const trafficNoise = params.trafficVolume * 0.6;
    const industryNoise = params.industrialActivity * 0.4;
    let noiseLevel = 40 + trafficNoise + industryNoise; // Base 40dB

    // 4. Emergency Response Time
    // Directly correlated with congestion.
    // Base 5 mins. 100% congestion -> +25 mins.
    let emergencyResponseTime = 5 + (trafficCongestion / 100) * 25;
    if (env.rainfall > 20) emergencyResponseTime += 5; // Heavy rain delay

    // 5. Energy Consumption
    // Pop density + Industry. Temperature extremes increase usage (AC/Heating).
    const tempDeviation = Math.abs(env.temperature - 22); // Ideal is 22C
    const climateLoad = tempDeviation * 2;
    let energyConsumption = (params.populationDensity * 0.5) + (params.industrialActivity * 0.8) + climateLoad;
    // Green energy doesn't reduce CONSUMPTION, but we might track it separately comfortably.

    // 6. Public Sentiment
    // Negatives: Pollution, Congestion, Noise. Positives: Green Space, Good Weather.
    const polFactor = Math.max(0, 100 - (airQualityIndex / 2));
    const congFactor = 100 - trafficCongestion;
    const greenBonus = params.greenSpaceCoverage * 0.5;

    let publicSentiment = (polFactor + congFactor + greenBonus) / 2.5;
    if (!env.isDaytime) publicSentiment -= 5; // Slightly lower at night/dark? Or irrelevant.
    publicSentiment = Math.min(100, Math.max(0, publicSentiment));

    // 7. Disaster Risk
    // Risk of urban flooding if rain is high and green space (drainage) is low.
    let disasterRisk = 0;
    if (env.rainfall > 50) {
        disasterRisk += (env.rainfall - 50) * (1 - params.greenSpaceCoverage / 150);
    }
    disasterRisk = Math.min(100, disasterRisk);

    return {
        airQualityIndex: Math.round(airQualityIndex),
        noiseLevel: Math.round(noiseLevel),
        energyConsumption: Math.round(energyConsumption),
        trafficCongestion: Math.round(trafficCongestion),
        publicSentiment: Math.round(publicSentiment),
        emergencyResponseTime: parseFloat(emergencyResponseTime.toFixed(1)),
        disasterRisk: Math.round(disasterRisk),
    };
}

export const RECOMMENDATIONS_DB: Recommendation[] = [
    {
        id: 'rec_01',
        category: 'Policy',
        title: 'Implement Congestion Charge',
        description: 'Traffic congestion is critically high. Introducing a toll for city center access can reduce volume.',
        impactPrediction: 'Reduces Traffic by ~15%, improves AQI.',
        triggerCondition: (m) => m.trafficCongestion > 75
    },
    {
        id: 'rec_02',
        category: 'Infrastructure',
        title: 'Expand Green Corridors',
        description: 'Air quality is degrading. Planting vertical gardens and street trees will absorb pollutants.',
        impactPrediction: 'Improves AQI by 10-15%, boosts Sentiment.',
        triggerCondition: (m) => m.airQualityIndex > 150
    },
    {
        id: 'rec_03',
        category: 'Emergency',
        title: 'Deploy Flood Barriers',
        description: 'Heavy rainfall predicted combined with low drainage capacity. Warning Issued.',
        impactPrediction: 'Reduces Disaster Risk.',
        triggerCondition: (m) => m.disasterRisk > 50
    },
    {
        id: 'rec_04',
        category: 'Infrastructure',
        title: 'Smart Traffic Signals',
        description: 'Optimizing signal timing can improve flow without reducing volume.',
        impactPrediction: 'Improves Emergency Response Time.',
        triggerCondition: (m) => m.emergencyResponseTime > 15
    },
];

export function getRecommendations(metrics: CityMetrics): Recommendation[] {
    return RECOMMENDATIONS_DB.filter(rec => rec.triggerCondition(metrics));
}
