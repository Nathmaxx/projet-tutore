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

    const [consoGazDoughnut, setConsoGazDoughnut] = React.useState<{ dataConso: number[], labels: string[] }>
    ({
        dataConso: [],
        labels: []
    })


    const [consoArrondissement, setConsoArrondissement] = React.useState<{ years: { [key: string]: { total_conso_elec: number[], total_conso_gaz: number[] } }, labels: string[] }>({
        years: {},
        labels: []
    })

    const [consommationData, setConsommationData] = useState({

    });


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
                
                setConsoElectDoughnut(data)
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
                setConsoGazDoughnut(data);
            });
        } catch (error) {
            console.error("Error fetching subcategories: ", error);
            return [];
        }
    };

    const fecthElectGazArr = async () => {
        try {
            await fetch(`/api/elec-gaz-commune`,
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
                setConsoArrondissement(
                    {
                        years: {
                            "2018": { total_conso_elec: [data["2018"][0]], total_conso_gaz: [data["2018"][1]] },
                            "2019": { total_conso_elec: [data["2019"][0]], total_conso_gaz: [data["2019"][1]] },
                            "2020": { total_conso_elec: [data["2020"][0]], total_conso_gaz: [data["2020"][1]] }
                        },
                        labels: data.labels
                    }
                )
            });
        } catch (error) {
            console.error("Error fetching subcategories: ", error);
            return [];
        }
    };

    const fecthConsoYear = async () => {
        try {
            await fetch(`/api/elec-gaz-commune`,
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
            });
        } catch (error) {
            console.error("Error fetching subcategories: ", error);
            return [];
        }
    };



    React.useEffect(() => {
        fetchStatElecForDoughnut();
        fetchStatGazForDoughnut();
        fecthElectGazArr();
        fecthConsoYear();
    }, []);


    return (
        <div className="w-full px-4 flex flex-col">

            <div className='h-96 w-full flex'>
                <div className='h-96 w-1/2'>
                    <Card className="w-full h-full flex flex-col" style={{height: '-webkit-fill-available'}}>
                        <CardHeader>
                            <CardTitle className='text-xl text-center'>Consommation d'énergie totale</CardTitle>
                        </CardHeader>
                        <CardContent className=' flex-1'>
                            <LineCharter startYear={startYear} endYear={endYear}
                                         rElec={rElec} gElec={gElec} bElec={bElec} transparencyElec={transparencyElec}
                                         rGaz={rGaz} gGaz={gGaz} bGaz={bGaz} transparencyGaz={transparencyGaz}
                            />
                        </CardContent>
                    </Card>
                </div>
                <div className='h-96 bg-green-300 w-1/2'>
                    <Card className="w-full h-full flex flex-col items-center" style={{height: '-webkit-fill-available'}}>
                        <CardHeader>
                            <CardTitle className='text-xl text-center'>Consommation d'énergie par secteur</CardTitle>
                        </CardHeader>
                        <CardContent className='flex-1'> 
                            <BarCharter startYear={startYear} endYear={endYear}
                                        rElec={rElec} gElec={gElec} bElec={bElec}
                                        transparencyElec={transparencyElec}
                                        rGaz={rGaz} gGaz={gGaz} bGaz={bGaz} transparencyGaz={transparencyGaz}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>

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
                
            </div>

           

                <div className='flex flex-col gap-4 w-2/3 lg:w-1/2'>
                    

                    <div className="flex gap-4 h-screen w-full bg-blue-500">
                        <Card className=" items-center flex flex-col justify-center">
                            <CardHeader>
                                <CardTitle className='text-xl'>Consommation d'énergie par arondissement</CardTitle>
                            </CardHeader>
                            <CardContent >
                                <RadarCharter 
                                    labels={consoArrondissement.labels}
                                    datasets={consoArrondissement.years}   
                                />
                            </CardContent>
                        </Card>
                        <div className=''>
                            <Card className=" flex flex-col items-center justify-center" style={{height: '-webkit-fill-available'}}>
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
                            <Card className="flex flex-col items-center justify-center" style={{height: '-webkit-fill-available'}}>
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