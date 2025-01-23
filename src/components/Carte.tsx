import {Combobox} from "@/components/ComboBox";
import {Card, CardHeader} from "@/components/ui/card";
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Carte() {
    const mapContainer = useRef(null);

    useEffect(() => {
        if (mapContainer.current) {
            const map = new maplibregl.Map({
                container: mapContainer.current,
                style: 'https://demotiles.maplibre.org/style.json',
                center: [0, 0],
                zoom: 2,
            });

            return () => map.remove();
        }
    }, []);

    return (
        <Card className="w-4/5 h-fit mx-auto">
            <CardHeader>
                <h1 className="text-2xl font-bold">Map page</h1>
            </CardHeader>
            <CardHeader>
                <div className='font-bold'>
                    Page de la carte
                </div>
                <div ref={mapContainer} className="w-full h-96" />
                <div className="flex items-center space-x-4 text-sm m-10">
                    <div>Début: <Combobox /></div>
                    <div>Fin: <Combobox /></div>
                </div>
            </CardHeader>
        </Card>
    );
}