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
    annee: number,
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
    const [data, setData] = useState({ labels: [], datasets: [] });

    const addConsoOfType = (searchedType: ConsoType) => {
        let returnList = []
        for(let i = 0; i < dataset.length; i++) {
            const year = parseInt(dataset[i].annee);
            if (year >= startYear && year <= endYear) {
                returnList.push(dataset[i][searchedType]);
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

    useEffect(() => {
        const fetchData = async () => {
            const labels = [];
            for (let year = startYear; year <= endYear; year++) {
                labels.push(year.toString());
            }

            const datasets = [
                {
                    label: 'Electricité',
                    data: labels.map(() => Math.floor(Math.random() * 100)),
                    backgroundColor: ,
                },
                {
                    label: 'Gaz',
                    data: labels.map(() => Math.floor(Math.random() * 100)),
                    backgroundColor: ,
                },
            ];

            setData({ labels, datasets });
        };

        fetchData();
    }, [startYear, endYear]);

    return (
        <Bar options={options} data={data} />
    );
}