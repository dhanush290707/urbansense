import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    unit?: string;
    icon: LucideIcon;
    color?: string; // CSS color var or hex
    trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, unit, icon: Icon, color = 'var(--text-primary)', trend }) => {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
                style={{
                    background: `rgba(255,255,255,0.05)`,
                    padding: '12px',
                    borderRadius: '12px',
                    color: color,
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                <Icon size={24} />
            </div>
            <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {value}
                    {unit && <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '4px' }}>{unit}</span>}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
