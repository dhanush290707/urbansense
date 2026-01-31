import React from 'react';

interface SliderControlProps {
    label: string;
    value: number;
    onChange: (val: number) => void;
    min?: number;
    max?: number;
    step?: number;
    color?: string;
}

const SliderControl: React.FC<SliderControlProps> = ({ label, value, onChange, min = 0, max = 100, step = 1, color = 'var(--color-primary)' }) => {
    return (
        <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500, minWidth: '3ch', textAlign: 'right' }}>{value}%</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{
                    width: '100%',
                    height: '6px',
                    background: `linear-gradient(90deg, ${color} ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 0%)`,
                    borderRadius: '4px',
                    appearance: 'none',
                    outline: 'none',
                    cursor: 'pointer'
                }}
                className="custom-slider"
            />
            <style>{`
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 0 10px ${color};
          border: 2px solid ${color};
          margin-top: -5px; /* Adjust for firefox/chrome diffs usually, but appearance none handles it */
        }
        .custom-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          border: 2px solid ${color};
        }
      `}</style>
        </div>
    );
};

export default SliderControl;
