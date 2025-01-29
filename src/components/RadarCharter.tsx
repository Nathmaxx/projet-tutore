import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import {Radar} from 'react-chartjs-2';

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
    },
};

const labels = ['1er Arr.', '2ème Arr.', '3ème Arr.', '4ème Arr.', '5ème Arr.',
    "6ème Arr.", "7ème Arr.", "8ième Arr.", "9ième Arr."];

export function RadarCharter({
                                 startYear,
                                 endYear,
                                 rElec,
                                 gElec,
                                 bElec,
                                 transparencyElec,
                                 rGaz,
                                 gGaz,
                                 bGaz,
                                 transparencyGaz
                             }) {
    const [data, setData] = useState({
        labels,
        datasets: [
            {
                label: 'Electricité',
                data: [6, 9, 3, 5, 4, 7, 8, 9, 10],
                backgroundColor: `rgba(${rElec}, ${gElec}, ${bElec}, ${transparencyElec})`,
                borderColor: `rgba(${rElec}, ${gElec}, ${bElec}, ${Math.min(transparencyElec + 0.5, 1)})`,
                borderWidth: 1,
            },
            {
                label: 'Gaz',
                data: [3, 2, 6, 3, 5, 8, 4, 5, 7],
                backgroundColor: `rgba(${rGaz}, ${gGaz}, ${bGaz}, ${transparencyGaz})`,
                borderColor: `rgba(${rGaz}, ${gGaz}, ${bGaz}, ${Math.min(transparencyGaz + 0.5, 1)})`,
                borderWidth: 1,
            },
        ],
    });

    return (
        <div className="h-[300px]">
            <Radar options={options} data={data}/>
        </div>
    );
}