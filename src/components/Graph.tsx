import { Card, CardHeader } from "./ui/card";
import {ComboBoxYear} from "@/components/ComboBoxYear";
import {ComboBoxGraphType} from "@/components/ComboBoxGraphType";
import {BarCharter} from "@/components/BarCharter";
import {useEffect, useState} from "react";

export default function Graph() {
    const [startYear, setStartYear] = useState("2018");
    const [endYear, setEndYear] = useState("2019");
    const [graphType, setGraphType] = useState(null);

    const handleStartYearChange = (year) => {
        setStartYear(year);
    };

    const handleEndYearChange = (year) => {
        setEndYear(year);
    };

    const handleGraphTypeChange = (type) => {
        setGraphType(type);
    };

    /*useEffect(() => {
        console.log("year selected: ", startYear, endYear);
    }, [startYear, endYear]);*/

    return (
        <Card className="w-4/5 h-fit mx-auto">
            <CardHeader>
                <h1 className="text-2xl font-bold">Graph page</h1>
            </CardHeader>

            <div className="m-3">
                Graph type: <ComboBoxGraphType onChange={handleGraphTypeChange} />
            </div>

            <div className="m-2">
                <BarCharter graphType={graphType} startYear={startYear} endYear={endYear} />
            </div>

            <div className="flex items-center space-x-4 text-sm m-10">
                <div>Début: <ComboBoxYear value={startYear} onChange={handleStartYearChange} /></div>
                <div>Fin: <ComboBoxYear value={endYear} onChange={handleEndYearChange} /></div>
            </div>
        </Card>
    );
}