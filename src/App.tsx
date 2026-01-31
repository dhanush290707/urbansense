import { useSimulation } from './hooks/useSimulation';
import ControlPanel from './components/dashboard/ControlPanel';
import MapPanel from './components/dashboard/MapPanel';
import TrendsPanel from './components/dashboard/TrendsPanel';
import RecommendationsList from './components/dashboard/RecommendationsList';
import StatCard from './components/ui/StatCard';
import { Wind, Activity, Zap, CloudRain, Car } from 'lucide-react';
import './index.css';

function App() {
  const { params, env, metrics, history, recommendations, updateParam, isLiveWeather, setIsLiveWeather } = useSimulation();

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1.5rem', boxSizing: 'border-box' }}>

      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '1.75rem', letterSpacing: '-0.5px' }}>UrbanSense</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Digital Twin & Predictive City Interface
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <CloudRain size={16} />
            <span>{Math.round(env.temperature)}°C</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span>Rain: {env.rainfall}mm</span>
          </div>
          <button
            className="glass-panel"
            onClick={() => setIsLiveWeather(!isLiveWeather)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: isLiveWeather ? '1px solid var(--color-success)' : '1px solid var(--glass-border)',
              color: isLiveWeather ? 'var(--color-success)' : 'var(--text-muted)'
            }}
          >
            {isLiveWeather ? '● Live Data Connected' : '○ Manual Simulation'}
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr 350px', gap: '1.5rem', minHeight: 0 }}>

        {/* Left Column: Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: 0 }}>
          <ControlPanel params={params} onUpdate={updateParam} />
        </div>

        {/* Center Column: Map & Trends */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: 0 }}>
          <div style={{ flex: 3, minHeight: 0 }}>
            <MapPanel metrics={metrics} />
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <TrendsPanel history={history} />
          </div>
        </div>

        {/* Right Column: Stats & Recommendations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: 0, overflowY: 'auto' }}>

          {/* Key Metrics Grid */}
          <div style={{ display: 'grid', gap: '1rem' }}>
            <StatCard
              label="Air Quality (AQI)"
              value={metrics.airQualityIndex}
              icon={Wind}
              color={metrics.airQualityIndex > 100 ? 'var(--color-danger)' : 'var(--color-success)'}
            />
            <StatCard
              label="Congestion"
              value={metrics.trafficCongestion}
              unit="%"
              icon={Car}
              color={metrics.trafficCongestion > 70 ? 'var(--color-warning)' : 'var(--color-primary)'}
            />
            <StatCard
              label="Public Sentiment"
              value={metrics.publicSentiment}
              unit="%"
              icon={Activity}
              color="var(--color-secondary)"
            />
            <StatCard
              label="Energy Load"
              value={metrics.energyConsumption}
              unit="MW"
              icon={Zap}
              color="var(--color-info)"
            />
          </div>

          <div style={{ flex: 1, minHeight: 0 }}>
            <RecommendationsList items={recommendations} />
          </div>

        </div>
      </main>
    </div>
  );
}


export default App;
