import React from 'react';
import { Recommendation } from '../../engine/types';
import { Lightbulb, AlertTriangle } from 'lucide-react';

interface RecommendationsListProps {
    items: Recommendation[];
}

const RecommendationsList: React.FC<RecommendationsListProps> = ({ items }) => {
    if (items.length === 0) {
        return (
            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <div style={{ marginBottom: '0.5rem' }}>✅</div>
                All systems nominal. No immediate interventions required.
            </div>
        );
    }

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', height: '100%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Lightbulb size={20} color="var(--color-warning)" />
                <h3 style={{ fontSize: '1.1rem' }}>AI Recommendations</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {items.map(rec => (
                    <div key={rec.id} style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '1rem',
                        borderRadius: '8px',
                        borderLeft: `3px solid ${rec.category === 'Emergency' ? '#ff2e63' : 'var(--color-primary)'}`
                    }}>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                            {rec.title}
                            {rec.category === 'Emergency' && <AlertTriangle size={14} color="#ff2e63" />}
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: 1.4 }}>
                            {rec.description}
                        </p>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-success)' }}>
                            Expected Impact: {rec.impactPrediction}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationsList;
