import React, {useState} from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { endOfYear } from 'date-fns';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

interface DoughnutCharterProps {
    startYear: string;
    endYear: string;
    labels: string[];
    datasets: []
}



export function DoughnutCharter({startYear, endYear, labels, datasets}: DoughnutCharterProps) {

        const dataset = [
            [
                {
                    "total": 196317.22000000003,
                    "annee": 2019
                },
                {
                    "total": 199418.71,
                    "annee": 2020
                },
                {
                    "total": 198073.5099999998,
                    "annee": 2018
                }
            ],
            [
                {
                    "total": 36930.33000000001,
                    "annee": 2019
                },
                {
                    "total": 30485.52,
                    "annee": 2020
                },
                {
                    "total": 34757.81000000001,
                    "annee": 2018
                }
            ],
            [
                {
                    "total": 465178.31999999954,
                    "annee": 2019
                },
                {
                    "total": 435415.42000000016,
                    "annee": 2020
                },
                {
                    "total": 451512.3099999997,
                    "annee": 2018
                }
            ]
        ]

    const calculateSumByYears = (startYear: string, endYear: string, dataset: any[]) => {
        // Initialiser tableau de résultats
        const sums = [0, 0, 0];
        
        // Pour chaque catégorie (résidentiel, industriel, tertiaire)
        dataset.forEach((category, index) => {
            // Filtrer et sommer les données entre startYear et endYear
            sums[index] = category
                .filter((item: any) => 
                    item.annee >= parseInt(startYear) && 
                    item.annee <= parseInt(endYear))
                .reduce((acc: number, curr: any) => acc + curr.total, 0);
        });

        console.log(typeof sums[0])
        
        return sums;
    };
    
    // Usage:
    const sumResults = calculateSumByYears(startYear, endYear, datasets);
    console.log(sumResults)
    

    /*const calcSum2 = () => {
        let actualYear = parseInt(startYear)
        const sums = new Array(3).fill(0); // Pour les 3 types

        while(parseInt(endYear) - parseInt(startYear) !== 0 ){

            sums[0] = datasets[0]
            actualYear++
        }

    }*/

    
       

    const data = {
        labels: labels,
        // replace datasets with the one from the props
        datasets: [
            {
                label: 'Quantité',
                data: [15,5,6],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Doughnut options={options} data={data} />
    );
}