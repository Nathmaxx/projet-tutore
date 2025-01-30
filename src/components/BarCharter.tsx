import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

export interface BarCharterDataset {
    annee: string,
    total_conso_elec: number;
    total_conso_gaz: number;
    total_majic_nb_logement_parcelle: string;
    total_majic_surf_habitable_parcelle: string;
}

interface BarCharterProps {
    startYear: number
    endYear: number
    dataset: BarCharterDataset[]
}

export function BarCharter({ startYear, endYear, dataset}: BarCharterProps) {

    type ConsoType = 'total_conso_gaz' | 'total_conso_elec';

    const addConsoOfType = (searchedType: ConsoType) => {
        let returnList = []
        for(let i = 0; i < dataset.length; i++) {
            const year = parseInt(dataset[i].annee);
            if (year >= startYear && year <= endYear) {
                returnList.push(dataset[i][searchedType]/+dataset[i]["total_majic_surf_habitable_parcelle"]);
            }
        }
        return returnList;
    }

    const generateYearsList = () => {
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
            years.push(year.toString());
        }
        return years;
    };

    const data = {
        labels : generateYearsList(),
        datasets : [
            {
                label: 'Electricité',
                data: addConsoOfType('total_conso_elec'),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
            },
            {
                label: 'Gaz',
                data: addConsoOfType('total_conso_gaz'),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
            },
        ]
    }

    return (
        <Bar options={options} data={data} />
    );
}