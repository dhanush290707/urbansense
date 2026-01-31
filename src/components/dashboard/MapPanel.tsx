import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CityMetrics } from '../../engine/types';

interface MapPanelProps {
    metrics: CityMetrics;
}

// Center of London as default, but can be anywhere
const CITY_CENTER = [51.505, -0.09] as [number, number];

// Mock sensor locations
const SENSORS = [
    { id: 1, pos: [51.505, -0.09], name: "City Center" },
    { id: 2, pos: [51.51, -0.1], name: "Industrial District" },
    { id: 3, pos: [51.49, -0.08], name: "Residential Zone South" },
    { id: 4, pos: [51.515, -0.07], name: "Tech Park" },
    { id: 5, pos: [51.50, -0.12], name: "West End" },
];

//Const MapController = () => {
//    const map = useMap();
//    map.setView(CITY_CENTER, 13); // Reset view on load/updated if needed
//    return null;
//}

const MapPanel: React.FC<MapPanelProps> = ({ metrics }) => {

    // Determine color based on AQI
    const getAQIColor = (aqi: number) => {
        if (aqi < 50) return '#00ff9d'; // Good
        if (aqi < 100) return '#ffbd2e'; // Moderate
        if (aqi < 150) return '#ffaa00'; // Unhealthy for sensitive
        return '#ff2e63'; // Unhealthy
    };

    // Determine radius/intensity based on Traffic
    const getTrafficRadius = (congestion: number) => {
        return 400 + (congestion * 10); // Base 400m + up to 1000m extra
    };

    const aqiColor = getAQIColor(metrics.airQualityIndex);
    const radius = getTrafficRadius(metrics.trafficCongestion);

    return (
        <div className="glass-panel" style={{ height: '100%', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
            <MapContainer
                center={CITY_CENTER}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', background: '#0a0f1c' }}
                zoomControl={false}
            >
                {/* Dark Matter / Dark Map Tiles */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {SENSORS.map(sensor => (
                    <Circle
                        key={sensor.id}
                        center={sensor.pos as [number, number]}
                        pathOptions={{
                            fillColor: aqiColor,
                            color: aqiColor,
                            fillOpacity: 0.4,
                            weight: 1
                        }}
                        radius={radius}
                    >

                        <Popup className="custom-popup">
                            <div style={{ color: '#333' }}>
                                <strong>{sensor.name}</strong><br />
                                AQI: {metrics.airQualityIndex}<br />
                                Congestion: {metrics.trafficCongestion}%
                            </div>
                        </Popup>
                    </Circle>
                ))}
                {/* <MapController /> */}
            </MapContainer>

            {/* Overlay Legend */}
            <div style={{
                position: 'absolute', bottom: '20px', left: '20px', zIndex: 1000,
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
                padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ fontSize: '0.8rem', color: '#fff', marginBottom: '5px' }}><strong>Live Sensors</strong></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#ccc' }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: aqiColor }}></span>
                    <span>AQI Status: {metrics.airQualityIndex > 100 ? 'Poor' : 'Good'}</span>
                </div>
            </div>
        </div>
    );
};

export default MapPanel;
