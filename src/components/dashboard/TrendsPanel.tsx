import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { HistoryPoint } from '../../hooks/useSimulation';
import { TrendingUp } from 'lucide-react';

interface TrendsPanelProps {
    history: HistoryPoint[];
}

const TrendsPanel: React.FC<TrendsPanelProps> = ({ history }) => {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <TrendingUp size={20} color="var(--color-info)" />
                <h3 style={{ fontSize: '1.1rem' }}>Live Trends</h3>
            </div>

            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={history}>
                        <defs>
                            <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#00f2ff" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorCongestion" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#7000ff" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#7000ff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="timestamp" hide />
                        <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ background: '#0a0f1c', border: '1px solid #333', borderRadius: '8px' }}
                            itemStyle={{ fontSize: '0.85rem' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="airQualityIndex"
                            stroke="#00f2ff"
                            fillOpacity={1}
                            fill="url(#colorAqi)"
                            name="AQI"
                        />
                        <Area
                            type="monotone"
                            dataKey="trafficCongestion"
                            stroke="#7000ff"
                            fillOpacity={1}
                            fill="url(#colorCongestion)"
                            name="Congestion %"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TrendsPanel;
