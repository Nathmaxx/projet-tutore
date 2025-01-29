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

export interface DataItem {
    total: number;
    annee: number;
}

// Interface pour le dataset complet
interface DoughnutCharterProps {
    labels: string[];
    datasets: DataItem[][];  // Tableau de tableaux d'items
    year: string;
}




export function DoughnutCharter({year, labels, datasets}: DoughnutCharterProps) {

        const yearInt = parseInt(year)

        const calcValues = (year: number) => {

            let returnList = [0, 0, 0]

            datasets.forEach((sousTableau, index) => {
                sousTableau.forEach(item => {
                    if(item.annee === year){
                        returnList[index] = item.total
                    }
                });
            });

            return returnList
        } 

    const data = {
        labels: labels,
        // replace datasets with the one from the props
        datasets: [
            {
                label: 'Quantité',
                data: calcValues(yearInt),
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