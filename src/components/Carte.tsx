import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Card, CardContent, CardHeader } from './ui/card';
import { Combobox } from './ComboBox';

export default function Carte() {
    const mapContainer = useRef(null);
    const [API_KEY] = useState('INdXbZgYY8GqK1IGryTJ');
    const [viewState] = useState({
        center: [2.213749, 46.227638],
        zoom: 5,
        pitch: 40
    });

    useEffect(() => {
        if (mapContainer.current) {
            const map = new maplibregl.Map({
                container: mapContainer.current,
                style: `https://api.maptiler.com/maps/toner-v2/style.json?key=${API_KEY}`,
                center: viewState.center,
                zoom: viewState.zoom,
                pitch: viewState.pitch
            });

            const marker = new maplibregl.Marker()
                .setLngLat([5.0000, 45.7667])
                .addTo(map);

            return () => map.remove();
        }
    }, [API_KEY, viewState]);

    return (
        <Card className="w-4/5 h-fit mx-auto">
            <CardHeader>
                <h1 className="text-2xl font-bold">Carte interactive de la Métropole de Lyon</h1>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-4 text-sm m-4">
                    <div>Début: <Combobox /></div>
                    <div>Fin: <Combobox /></div>
                </div>
                <div ref={mapContainer} className="w-full h-96 rounded-lg" />
            </CardContent>
        </Card>
    );
}