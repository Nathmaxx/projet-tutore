'use client'

import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "./../../components/ui/card";
import {ComboBoxYear} from "./../../components/ComboBoxYear";
import {BarCharter} from "./../../components/BarCharter";
import {RadarCharter} from './../../components/RadarCharter';
import {DoughnutCharter} from './../../components/DoughnutCharter';
import {LineCharter} from "./../../components/LineCharter";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AnimatedNoise } from '@/components/ui/AnimatedNoise';

const rElec = 115;
const gElec = 181;
const bElec = 255;
const transparencyElec = 0.5;

const rGaz = 255;
const gGaz = 183;
const bGaz = 52;
const transparencyGaz = 0.5;

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
        <div className="w-full h-full px-4 flex flex-col">
            <div className=' fixed h-screen w-full overflow-hidden -z-10'>
                <AnimatedNoise opacity={0.07}/>
            </div>
            <Navbar />

            <div className='flex flex-row-reverse gap-4 h-min'>
                <Card className="w-1/3 lg:w-1/2 h-full">
                    <CardHeader>
                        <CardTitle>Consommation d'énergie par arondissement</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadarCharter startYear={startYear} endYear={endYear}
                                      rElec={rElec} gElec={gElec} bElec={bElec}
                                      transparencyElec={transparencyElec}
                                      rGaz={rGaz} gGaz={gGaz} bGaz={bGaz} transparencyGaz={transparencyGaz}
                        />
                    </CardContent>
                </Card>

                <div className='flex flex-col gap-4 w-2/3 lg:w-1/2'>
                    <Card className="w-full max-w-2/3" style={{height: '-webkit-fill-available'}}>
                        <CardHeader>
                            <CardTitle>Consommation d'énergie par secteur</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <BarCharter startYear={startYear} endYear={endYear}
                                        rElec={rElec} gElec={gElec} bElec={bElec}
                                        transparencyElec={transparencyElec}
                                        rGaz={rGaz} gGaz={gGaz} bGaz={bGaz} transparencyGaz={transparencyGaz}
                            />
                        </CardContent>
                    </Card>

                    <div className="flex flex-row gap-4">
                        <Card className="w-full max-w-1/3" style={{height: '-webkit-fill-available'}}>
                            <CardHeader>
                                <CardTitle>Consommation d'Electricité par secteur</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DoughnutCharter startYear={startYear} endYear={endYear}/>
                            </CardContent>
                        </Card>
                        <Card className="w-full max-w-1/3" style={{height: '-webkit-fill-available'}}>
                            <CardHeader>
                                <CardTitle>Consommation de Gaz par secteur</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DoughnutCharter startYear={startYear} endYear={endYear}/>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <Card className="w-1/3 max-w-1/3" style={{height: '-webkit-fill-available'}}>
                        <CardHeader>
                            <CardTitle>Choisir les années voulues</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center gap-4">
                                <p className='min-w-12'>
                                    Début:<ComboBoxYear value={startYear} onChange={handleStartYearChange}/>
                                </p>
                                <p className='min-w-12'>
                                    Fin:<ComboBoxYear value={endYear} onChange={handleEndYearChange} startYear={startYear}/>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full" style={{height: '-webkit-fill-available'}}>
                        <CardHeader>
                            <CardTitle>Consommation d'énergie totale</CardTitle>
                        </CardHeader>
                        <CardContent className='mt-4'>
                            <LineCharter startYear={startYear} endYear={endYear}
                                         rElec={rElec} gElec={gElec} bElec={bElec} transparencyElec={transparencyElec}
                                         rGaz={rGaz} gGaz={gGaz} bGaz={bGaz} transparencyGaz={transparencyGaz}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}