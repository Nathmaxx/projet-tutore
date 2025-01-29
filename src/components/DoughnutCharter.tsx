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
    datasets: number[]
}




export function DoughnutCharter({startYear, endYear, labels, datasets}: DoughnutCharterProps) {

        const calculateSumByYears = (startYear: string, endYear: string, dataset: any[]) => {
            // Initialiser tableau de résultats
            const sums = [0, 0, 0];
            
            // Pour chaque catégorie (résidentiel, industriel, tertiaire)
            dataset.forEach((category, index) => {
                // Filtrer et sommer les données entre startYear et endYear
                const sum = category
                    .filter((item: any) => 
                        item.annee >= parseInt(startYear) && 
                        item.annee <= parseInt(endYear))
                    .reduce((acc: number, curr: any) => acc + curr.total, 0);
                    
                sums[index] = Number(sum.toFixed(0));
            });
            
            return sums;
        }; 
       

    const data = {
        labels: labels,
        // replace datasets with the one from the props
        datasets: [
            {
                label: 'Quantité',
                data: calculateSumByYears(startYear, endYear, datasets),
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