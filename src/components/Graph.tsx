import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "./ui/card";
import { ComboBoxYear } from "@/components/ComboBoxYear";
import { BarCharter } from "@/components/BarCharter";
import { RadarCharter } from './RadarCharter';
import { DoughnutCharter } from './DoughnutCharter';
import {LineCharter} from "@/components/LineCharter";

const rElec = 115;
const gElec = 181;
const bElec = 255;
const transparencyElec = 0.5;

const rGaz = 255;
const gGaz = 183;
const bGaz = 52;
const transparencyGaz = 0.5;
import { Label } from './ui/label';

export default function Graph() {
    const [startYear, setStartYear] = useState("2018");
    const [endYear, setEndYear] = useState("2019");
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

    return (
        <div className="w-full h-full px-4 flex flex-col gap-4">

            <div className='flex flex-row gap-4 h-1/6'>
                <Card className="w-1/3">
                    <CardContent>
                        <BarCharter startYear={startYear} endYear={endYear}
                                    rElec={rElec} gElec={gElec} bElec={bElec} transparencyElec={transparencyElec}
                                    rGaz={rGaz} gGaz={gGaz} bGaz={bGaz} transparencyGaz={transparencyGaz}
                        />
                    </CardContent>
                </Card>

                <Card className="w-full overflow-hidden">
                    <CardContent>
                        <BarCharter startYear={startYear} endYear={endYear} />
                    </CardContent>
                </Card>

                <Card className="w-fit">
                    <div className="flex flex-col items-center gap-4 text-sm m-10">
                        <div className='flex flex-row items-center gap-2'>
                            <p className='min-w-12'>
                                Début:
                            </p>
                            <ComboBoxYear value={startYear} onChange={handleStartYearChange} />
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <p className='min-w-12'>
                                Fin:
                            </p>
                            <ComboBoxYear value={endYear} onChange={handleEndYearChange} startYear={startYear} />
                        </div>
                    </div>
                </Card>

            </div>

            <div className='flex flex-row-reverse gap-4 h-4/5'>
                <Card className="w-1/3 h-full">
                    <CardContent>

                    </CardContent>
                </Card>
                <div className='flex flex-col gap-4 w-2/3'>
                    <Card className="w-full" style={{ height: '-webkit-fill-available' }}>
                        <CardContent className='mt-4'>
                            <LineCharter startYear={startYear} endYear={endYear}
                                         rElec={rElec} gElec={gElec} bElec={bElec} transparencyElec={transparencyElec}
                                         rGaz={rGaz} gGaz={gGaz} bGaz={bGaz} transparencyGaz={transparencyGaz}
                            />
                        </CardContent>
                    </Card>
                    <div className="flex flex-row gap-4">
                        <Card className="w-full" style={{ height: '-webkit-fill-available' }}>
                            <CardContent>
                                <RadarCharter startYear={startYear} endYear={endYear}
                                              rElec={rElec} gElec={gElec} bElec={bElec} transparencyElec={transparencyElec}
                                              rGaz={rGaz} gGaz={gGaz} bGaz={bGaz} transparencyGaz={transparencyGaz}
                                />
                            </CardContent>
                        </Card>
                        <Card className="w-full" style={{ height: '-webkit-fill-available' }}>
                            <CardContent>
                                <DoughnutCharter startYear={startYear} endYear={endYear} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}