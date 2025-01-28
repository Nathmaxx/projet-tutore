import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Card, CardContent, CardHeader } from './ui/card';
import { ComboBoxYear } from './ComboBoxYear';

const API_URL = process.env.API_URL;
const API_KEY = process.env.NRG_LYON_API_KEY;

export default function Carte() {
    const [MAP_SKIN_API_KEY] = useState('INdXbZgYY8GqK1IGryTJ');
    const mapContainer = useRef(null);
    const [viewState] = useState<{ center: [number, number]; zoom: number; pitch: number }>({
        center: [5.0000, 45.7667],
        zoom: 10,
        pitch: 40
    });

    const [communes, setCommunes] = useState<string[]>([]);
    const [selectedCommune, setSelectedCommune] = useState<string>('');
    const [map, setMap] = useState<maplibregl.Map | null>(null);
    const [markers, setMarkers] = useState<maplibregl.Marker[]>([]);

    useEffect(() => {
        if (mapContainer.current) {
            const mapInstance = new maplibregl.Map({
                container: mapContainer.current,
                style: `https://api.maptiler.com/maps/toner-v2/style.json?key=${MAP_SKIN_API_KEY}`,
                center: viewState.center,
                zoom: viewState.zoom,
                pitch: viewState.pitch
            });
            setMap(mapInstance);

            return () => mapInstance.remove();
        }
    }, [MAP_SKIN_API_KEY, viewState]);

    useEffect(() => {
        const fetchData = async () => {
            const tokenOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
            };

            try {
                const response = await fetch(`${API_URL}parcelles`, tokenOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);

                const uniqueCommunes = Array.from(new Set(data.map((parcelle: any) => parcelle.commune)));
                setCommunes(uniqueCommunes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [API_KEY]);

    useEffect(() => {
        if (map && selectedCommune) {
            markers.forEach(marker => marker.remove());

            const fetchData = async () => {
                const tokenOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${API_KEY}`,
                    },
                };

                try {
                    const response = await fetch(`${API_URL}parcelles`, tokenOptions);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log(data);

                    let markerCount = 0;
                    const newMarkers: maplibregl.Marker[] = [];
                    data.forEach((parcelle: any) => {
                        if (markerCount >= 500) return;

                        if (parcelle.commune === selectedCommune) {
                            const coordinates = JSON.parse(parcelle.coordinates);
                            const lng = parseFloat(coordinates.lng);
                            const lat = parseFloat(coordinates.lat);

                            if (!isNaN(lng) && !isNaN(lat)) {
                                const marker = new maplibregl.Marker()
                                    .setLngLat([lng, lat])
                                    .addTo(map);
                                newMarkers.push(marker);
                                markerCount++;
                            } else {
                                console.error(`Invalid coordinates for parcelle ${parcelle.id_parcelle}:`, coordinates);
                            }
                        }
                    });
                    setMarkers(newMarkers);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [selectedCommune, map]);

    return (
        <div className="w-full h-full px-4">
            <Card className="w-full h-full">
                <CardHeader>
                    <h1 className="text-2xl font-bold">Carte interactive de la Métropole de Lyon</h1>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4 text-sm m-4">
                        <div>Début: <ComboBoxYear onChange={() => { }} /></div>
                        <div>Fin: <ComboBoxYear onChange={() => { }} /></div>
                        <div>
                            Commune:
                            <select value={selectedCommune} onChange={(e) => setSelectedCommune(e.target.value)}>
                                <option value="">Select a commune</option>
                                {communes.map((commune) => (
                                    <option key={commune} value={commune}>{commune}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div ref={mapContainer} className="w-full h-96 rounded-lg" />
                </CardContent>
            </Card>
        </div>
    );
}