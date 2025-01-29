'use client'

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "./../../components/ui/card";
import {ComboBoxYear} from "./../../components/ComboBoxYear";
import {BarCharter} from "./../../components/BarCharter";
import {RadarCharter} from './../../components/RadarCharter';
import {DoughnutCharter} from './../../components/DoughnutCharter';
import {LineCharter} from "./../../components/LineCharter";

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
    const [consoElectDoughnut, setConsoElectDoughnut] = React.useState<
        { dataConso: number[], labels: string[] }
    >({
        dataConso: [],
        labels: []
    })

    const [consoGazDoughnut, setConsoGazDoughnut] = React.useState<
        { dataConso: number[], labels: string[] }
    >({
        dataConso: [],
        labels: []
    })
    

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

    const fetchStatElecForDoughnut = async () => {
        try {
            await fetch(`/api/stat-elec-doughnut`,
                {
                    method: "GET",
                }
            )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.error) {
                    console.log("error", data.error);
                    return;
                }
                setConsoElectDoughnut(data);
            });
        } catch (error) {
            console.error("Error fetching subcategories: ", error);
            return [];
        }
    };

    const fetchStatGazForDoughnut = async () => {
        try {
            await fetch(`/api/stat-gaz-doughnut`,
                {
                    method: "GET",
                }
            )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.error) {
                    console.log("error", data.error);
                    return;
                }
                
                console.log("data", data);
                setConsoGazDoughnut(data);
            });
        } catch (error) {
            console.error("Error fetching subcategories: ", error);
            return [];
        }
    };

    React.useEffect(() => {
        fetchStatElecForDoughnut();
        fetchStatGazForDoughnut();
    }, []);

    return (
        <div className="w-full h-full px-4 flex flex-col">

            <div className="flex gap-4 mb-4 w-full h-96">
                <div className='w-1/4 h-full flex text-xl'>
                    <Card className="w-full" style={{height: '-webkit-fill-available'}}>
                        <CardHeader className='text-center pt-12 w-full'>
                            <CardTitle>Choisir les années voulues</CardTitle>
                        </CardHeader>
                        <CardContent className='pt-16'>
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
                </div>
                <Card className="w-3/4" style={{height: '-webkit-fill-available'}}>
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

            <div className='flex gap-4 h-screen'>

                <Card className="lg:w-1/2 h-fit items-center flex flex-col justify-center">
                    <CardHeader>
                        <CardTitle className='text-xl'>Consommation d'énergie par arondissement</CardTitle>
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
                    <Card className="w-full max-w-2/3 flex flex-col items-center justify-center" style={{height: '-webkit-fill-available'}}>
                        <CardHeader>
                            <CardTitle className='text-xl'>Consommation d'énergie par secteur</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <BarCharter startYear={startYear} endYear={endYear}
                                        rElec={rElec} gElec={gElec} bElec={bElec}
                                        transparencyElec={transparencyElec}
                                        rGaz={rGaz} gGaz={gGaz} bGaz={bGaz} transparencyGaz={transparencyGaz}
                            />
                        </CardContent>
                    </Card>

                    <div className="flex flex-row gap-4 h-screen">
                        <Card className="w-full max-w-1/3 flex flex-col items-center h-1/2 justify-center" style={{height: '-webkit-fill-available'}}>
                            <CardHeader>
                                <CardTitle>Consommation d'Electricité par secteur</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DoughnutCharter 
                                    startYear={startYear} 
                                    endYear={endYear} 
                                    labels={consoElectDoughnut.labels} 
                                    datasets={consoElectDoughnut.dataConso}
                                />
                            </CardContent>
                        </Card>
                        <Card className="w-full max-w-1/3 flex flex-col items-center h-1/2 justify-center" style={{height: '-webkit-fill-available'}}>
                            <CardHeader>
                                <CardTitle>Consommation de Gaz par secteur</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DoughnutCharter 
                                    startYear={startYear} 
                                    endYear={endYear} 
                                    labels={consoGazDoughnut.labels} 
                                    datasets={consoGazDoughnut.dataConso}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}