import React from 'react';
import { CityParams } from '../../engine/types';
import SliderControl from '../ui/SliderControl';
import { Settings2, Car, Factory, Trees, Users, Zap, Train } from 'lucide-react';

interface ControlPanelProps {
    params: CityParams;
    onUpdate: (key: keyof CityParams, val: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ params, onUpdate }) => {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', height: '100%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Settings2 size={20} color="var(--color-primary)" />
                <h3 style={{ fontSize: '1.1rem' }}>Simulation Controls</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <SliderControl
                    label="Traffic Volume"
                    value={params.trafficVolume}
                    onChange={(v) => onUpdate('trafficVolume', v)}
                    color="#ff2e63"
                />
                <SliderControl
                    label="Public Transport"
                    value={params.publicTransportUsage}
                    onChange={(v) => onUpdate('publicTransportUsage', v)}
                    color="#0ea5e9"
                />
                <SliderControl
                    label="Industrial Activity"
                    value={params.industrialActivity}
                    onChange={(v) => onUpdate('industrialActivity', v)}
                    color="#ffbd2e"
                />
                <SliderControl
                    label="Green Energy"
                    value={params.greenEnergyAdoption}
                    onChange={(v) => onUpdate('greenEnergyAdoption', v)}
                    color="#00ff9d"
                />
                <SliderControl
                    label="Green Space"
                    value={params.greenSpaceCoverage}
                    onChange={(v) => onUpdate('greenSpaceCoverage', v)}
                    color="#00ff9d"
                />
                <SliderControl
                    label="Population Density"
                    value={params.populationDensity}
                    onChange={(v) => onUpdate('populationDensity', v)}
                    color="#7000ff"
                />
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    Adjust sliders to simulate different future scenarios for the city.
                </p>
            </div>
        </div>
    );
};

export default ControlPanel;
