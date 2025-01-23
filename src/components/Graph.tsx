import { useState, useEffect } from 'react';
import { Card, CardHeader } from "./ui/card";
import { ComboBoxYear } from "@/components/ComboBoxYear";
import { ComboBoxGraphType } from "@/components/ComboBoxGraphType";
import { BarCharter } from "@/components/BarCharter";

export default function Graph() {
    const [startYear, setStartYear] = useState("2018");
    const [endYear, setEndYear] = useState("2019");
    const [graphType, setGraphType] = useState(null);
    const [error, setError] = useState("");

    const handleStartYearChange = (year: string) => {
        if (parseInt(year) > parseInt(endYear)) {
            setError("Année de début ne peut pas être supérieure à l'année de fin");
        } else {
            setError("");
            setStartYear(year);
        }
    };

    const handleEndYearChange = (year: string) => {
        if (parseInt(year) < parseInt(startYear)) {
            setError("Année de fin ne peut pas être inférieure à l'année de début");
        } else {
            setError("");
            setEndYear(year);
        }
    };

    const handleGraphTypeChange = (type: string) => {
        setGraphType(type);
    };

    useEffect(() => {
        console.log(graphType)
    }, [graphType])

    return (
        <Card className="w-4/5 h-fit mx-auto">
            <CardHeader>
                <h1 className="text-2xl font-bold">Graph page</h1>
            </CardHeader>

            <div className="m-3">
                Graph type: <ComboBoxGraphType onChange={handleGraphTypeChange} />
            </div>

            <div className="m-2">
                {graphType == "Barre" ? (
                    <BarCharter graphType={graphType} startYear={startYear} endYear={endYear} />
                ) : (
                    <div>Graph type not supported</div>
                )}
            </div>

            <div className="flex items-center space-x-4 text-sm m-10">
                <div>Début: <ComboBoxYear value={startYear} onChange={handleStartYearChange} /></div>
                <div>Fin: <ComboBoxYear value={endYear} onChange={handleEndYearChange} startYear={startYear} /></div>
            </div>

            {error && <div className="text-red-500">{error}</div>}
        </Card>
    );
}