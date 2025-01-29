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

    interface ArrondissementData {
        years : number[],
        labels : number[]
    }

    const object = {
        "2018": {
            "total_conso_elec": [
                24353.66,
                48677.28000000001,
                82273.18000000001,
                50349.89999999993,
                46547.68000000001,
                37959.890000000014,
                54025.28,
                51422.04000000001,
                55903.4
            ],
            "total_conso_gaz": [
                23628.609999999997,
                36342.19,
                37261.35999999999,
                38536.29999999997,
                111104.97,
                29024.3,
                41743.81,
                71038.23999999999,
                68463.46999999999
            ]
        },
        "2019": {
            "total_conso_elec": [
                25544.70000000002,
                49594.090000000026,
                78880.47000000002,
                56075.48000000002,
                49704.42999999997,
                33281.68999999999,
                55269.00000000003,
                57740.29000000004,
                59088.16999999999
            ],
            "total_conso_gaz": [
                22164.97,
                30687.92,
                35432.049999999974,
                45307.28000000001,
                125498.10999999994,
                28544.570000000003,
                36499.250000000015,
                73538.89000000003,
                70277.78999999996
            ]
        },
        "2020": {
            "total_conso_elec": [
                21550.050000000007,
                46506.06000000005,
                48689.779999999984,
                52788.9,
                46870.85999999997,
                47307.420000000006,
                55315.869999999966,
                60157.85999999997,
                56228.62000000001
            ],
            "total_conso_gaz": [
                21131.140000000007,
                25173.290000000008,
                33879.77999999999,
                39335.85000000001,
                104915.31,
                28412.42,
                35856.70999999999,
                63360.95999999996,
                59754.38999999999
            ]
        },
        "labels": [
            "Lyon 1er Arrondissement",
            "Lyon 2e Arrondissement",
            "Lyon 3e Arrondissement",
            "Lyon 4e Arrondissement",
            "Lyon 5e Arrondissement",
            "Lyon 6e Arrondissement",
            "Lyon 7e Arrondissement",
            "Lyon 8e Arrondissement",
            "Lyon 9e Arrondissement"
        ]
    }

    const [consoArrondissement, setConsoArrondissement] = React.useState<{ years: { [key: string]: number[] }, labels: string[] }>({
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
                console.log(data)
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
                
                console.log("data", data);
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
                            "2018": data["2018"],
                            "2019": data["2019"],
                            "2020": data["2020"]
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
                console.log('lineChart : ', data)
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
                    <CardContent >
                        <RadarCharter 
                            startYear={startYear} 
                            endYear={endYear}
                        
                            
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