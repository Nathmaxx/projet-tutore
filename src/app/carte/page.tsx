"use client";
import {useEffect, useRef, useState} from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {ComboBoxYear} from '@/components/ComboBoxYear';
import {Popover, PopoverTrigger, PopoverContent} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';
import {Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup} from '@/components/ui/command';
import {Check, ChevronsUpDown} from 'lucide-react';
import {cn} from '@/lib/utils';


const API_URL = process.env.API_URL;
const API_KEY = process.env.NRG_LYON_API_KEY;

export default function Carte() {
    const [MAP_SKIN_API_KEY] = useState('INdXbZgYY8GqK1IGryTJ');
    const mapContainer = useRef(null);
    const [viewState] = useState<{ center: [number, number]; zoom: number; pitch: number }>({
        center: [4.83397, 45.76748],
        zoom: 14,
        pitch: 40
    });

    const [communes, setCommunes] = useState<string[]>([]);
    const [selectedCommune, setSelectedCommune] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [map, setMap] = useState<maplibregl.Map | null>(null);
    const [open, setOpen] = useState(false);
    const [overlayData, setOverlayData] = useState<any>(null);

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
        if (selectedYear) {
            console.log('Selected year:', selectedYear);
            const fetchData = async () => {
                const tokenOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${API_KEY}`,
                    },
                };

                try {
                    const response = await fetch(`${API_URL}parcelles/annee/${selectedYear}`, tokenOptions);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log(data);

                    const uniqueCommunes: string[] = Array.from(new Set(data.map((parcelle: any) => parcelle.commune)));
                    setCommunes(uniqueCommunes);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [API_KEY, selectedYear]);

    useEffect(() => {
        if (map && selectedCommune && selectedYear) {
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
                    const response = await fetch(`${API_URL}parcelles/annee/${selectedYear}`, tokenOptions);
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
                            //const coordinates = parcelle?.coordinates?.lat !== '' ? parcelle.coordinates : JSON.parse(parcelle.coordinates);
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

                    console.log('Features:', features);

                    const geojson: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
                        type: "FeatureCollection",
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
                                0, '#22c55e',
                                1, '#f59e0b',
                                2, '#ef4444'
                            ],
                            'circle-stroke-width': 0.2,
                            'circle-stroke-color': '#000000'
                        }
                    });

                    map.on('click', 'parcelles-layer', async (e) => {
                        if (e.features && e.features.length > 0) {
                            const id = e.features[0].properties.id;
                            console.log('Parcelle ID:', id);
                            //id = '69381000AL0245';
                            try {
                                const response = await fetch(`${API_URL}parcelles/${id}`, tokenOptions);
                                if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }
                                const data = await response.json();
                                setOverlayData(data);
                                console.log(data);
                            } catch (error) {
                                console.error('Error fetching data:', error);
                            }
                        } else {
                            console.log('No features found on click event.');
                        }
                    });

                    const lngLat = features
                        .map((feature: any) => feature.geometry.coordinates)
                        .filter((coord: number[]) => coord && coord.length === 2 && coord[0] !== null && coord[1] !== null);

                    if (lngLat.length > 0) {
                        const randomIndex = Math.floor(Math.random() * lngLat.length);
                        const randomCoord = lngLat[randomIndex];

                        if (randomCoord && randomCoord.length === 2 && !isNaN(randomCoord[0]) && !isNaN(randomCoord[1])) {
                            map.flyTo({
                                center: [randomCoord[0], randomCoord[1]],
                                essential: true
                            });
                            console.log('Center:', randomCoord[0], randomCoord[1]);
                        } else {
                            console.log('Invalid random coordinate:', randomCoord);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [selectedCommune, selectedYear, map]);

    return (
        <div className="w-full px-4">
            <Card className="w-full h-full">
                <CardHeader className="flex flex-row justify-between">
                    <h1 className="text-2xl font-bold">Carte interactive de la Métropole de Lyon</h1>
                    <div className="flex items-center space-x-4 text-sm m-4">
                        <div>Année: <ComboBoxYear onChange={(year) => setSelectedYear(year)}/></div>
                        <div>
                            Commune:
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-[200px] justify-between"
                                    >
                                        {selectedCommune || "Select a commune"}
                                        <ChevronsUpDown className="opacity-50"/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[250px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search commune..." className="h-9"/>
                                        <CommandList>
                                            <CommandEmpty>No commune found.</CommandEmpty>
                                            <CommandGroup>
                                                {communes.map((commune) => (
                                                    <CommandItem
                                                        key={commune}
                                                        value={commune}
                                                        onSelect={() => {
                                                            setSelectedCommune(commune);
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        {commune}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                selectedCommune === commune ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div ref={mapContainer} className="w-full h-[800px] rounded-lg"/>
                    {overlayData && (
                        <div
                            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold">Parcelle Details</h2>
                                <pre>{JSON.stringify(overlayData, null, 2)}</pre>
                                <button onClick={() => setOverlayData(null)}
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close
                                </button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}