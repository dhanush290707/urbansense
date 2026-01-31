export interface CityParams {
  trafficVolume: number; // 0-100%
  publicTransportUsage: number; // 0-100%
  greenEnergyAdoption: number; // 0-100%
  greenSpaceCoverage: number; // 0-100%
  populationDensity: number; // People per sq unit, normalized 0-100
  industrialActivity: number; // 0-100%
}

export interface EnvironmentalConditions {
  temperature: number; // Celsius
  rainfall: number; // mm
  windSpeed: number; // km/h
  isDaytime: boolean;
}

export interface CityMetrics {
  airQualityIndex: number; // 0-500 (lower is better)
  noiseLevel: number; // dB
  energyConsumption: number; // MW
  trafficCongestion: number; // 0-100%
  publicSentiment: number; // 0-100% (higher is better)
  emergencyResponseTime: number; // Minutes
  disasterRisk: number; // 0-100%
}

export interface SimulationState {
  params: CityParams;
  environment: EnvironmentalConditions;
  metrics: CityMetrics;
  timestamp: number;
}

export interface Recommendation {
  id: string;
  category: 'Infrastructure' | 'Policy' | 'Emergency';
  title: string;
  description: string;
  impactPrediction: string; // Text description of expected result
  triggerCondition: (metrics: CityMetrics) => boolean;
}
