import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
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
            text: 'Graphique en Radar',
        },
    },
};

const labels = ['Arondissement 1', 'Arondissement 2', 'Arondissement 3', 'Arondissement 4', 'Arondissement 5'];

export function RadarCharter({startYear, endYear, rElec, gElec, bElec, transparencyElec, rGaz, gGaz, bGaz, transparencyGaz}) {
    const [data, setData] = useState({
        labels,
        datasets: [
            {
                label: 'Electricité',
                data: [6, 9, 3, 5, 4],
                backgroundColor: `rgba(${rElec}, ${gElec}, ${bElec}, ${transparencyElec})`,
                borderColor: `rgba(${rElec}, ${gElec}, ${bElec}, ${Math.min(transparencyElec + 0.5, 1)})`,
                borderWidth: 1,
            },
            {
                label: 'Gaz',
                data: [3, 2, 6, 3, 5],
                backgroundColor: `rgba(${rGaz}, ${gGaz}, ${bGaz}, ${transparencyGaz})`,
                borderColor: `rgba(${rGaz}, ${gGaz}, ${bGaz}, ${Math.min(transparencyGaz + 0.5, 1)})`,
                borderWidth: 1,
            },
        ],
    });

    return (
        <Radar options={options} data={data} />
    );
}