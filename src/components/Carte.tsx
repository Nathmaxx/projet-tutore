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
        center: [4.83397, 45.76748],
        zoom: 12,
        pitch: 40
    });

    const [communes, setCommunes] = useState<string[]>([]);
    const [selectedCommune, setSelectedCommune] = useState<string>('');
    const [map, setMap] = useState<maplibregl.Map | null>(null);

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
            if (map.getSource('parcelles')) {
                map.removeLayer('parcelles-layer');
                map.removeSource('parcelles');
            }

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

                    const communeData = data.filter((parcelle: any) => parcelle.commune === selectedCommune);
                    const avgConsoElec = communeData.reduce((sum: number, parcelle: any) => sum + (parcelle.conso_elec || 0), 0) / communeData.length;

                    const features = communeData
                        .slice(0, 9999)
                        .map((parcelle: any) => {
                            const coordinates = JSON.parse(parcelle.coordinates);
                            return {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [parseFloat(coordinates.lng), parseFloat(coordinates.lat)]
                                },
                                properties: {
                                    id: parcelle.id_parcelle,
                                    surface: (parcelle.majic_surf_habitable_parcelle || 30) / 10,
                                    conso_elec: parcelle.conso_elec || 0,
                                    avgConsoElec: avgConsoElec
                                }
                            };
                        });

                    const geojson = {
                        type: 'FeatureCollection',
                        features: features
                    };

                    map.addSource('parcelles', {
                        type: 'geojson',
                        data: geojson
                    });

                    map.addLayer({
                        id: 'parcelles-layer',
                        type: 'circle',
                        source: 'parcelles',
                        paint: {
                            'circle-radius': [
                                'interpolate',
                                ['linear'],
                                ['get', 'surface'],
                                0, 3,
                                100, 10,
                                1000, 20
                            ],
                            'circle-color': [
                                'interpolate',
                                ['linear'],
                                ['/', ['get', 'conso_elec'], ['get', 'avgConsoElec']],
                                0, '#00ff00',
                                1, '#ffff00',
                                2, '#ff0000'
                            ]
                        }
                    });
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
                    <div ref={mapContainer} className="w-full h-[600px] rounded-lg" />
                </CardContent>
            </Card>
        </div>
    );
}