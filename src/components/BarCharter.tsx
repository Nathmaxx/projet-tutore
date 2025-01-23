import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

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
        title: {
            display: true,
            text: 'Graphique en Barre',
        },
    },
};

const labels = ['2018', '2019', '2020'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Electricité',
            data: [65, 20, 80],
            backgroundColor: 'rgba(255, 215, 0, 0.5)',
        },
        {
            label: 'Gaz',
            data: [6, 59, 40],
            backgroundColor: 'rgba(169, 169, 169, 0.5)',
        },
    ],
};

export function BarCharter() {
    return (
        <Bar options={options} data={data} />
    );
}