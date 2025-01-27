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

export function RadarCharter({startYear, endYear}) {
    const [data, setData] = useState({
        labels,
        datasets: [
            {
                label: 'Electricité',
                data: [6, 9, 3, 5, 4],
                backgroundColor: 'rgba(255, 215, 0, 0.2)',
                borderColor: 'rgba(255, 215, 0, 0.7)',
                borderWidth: 1,
            },
            {
                label: 'Gaz',
                data: [3, 2, 6, 3, 5],
                backgroundColor: 'rgba(169, 169, 169, 0.2)',
                borderColor: 'rgba(169, 169, 169, 0.7)',
                borderWidth: 1,
            },
        ],
    });

    /*useEffect(() => {
        // Update the data based on startYear if needed
        console.log(`RadarCharter updated with startYear: ${startYear}`);
    }, [startYear]);*/

    return (
        <Radar options={options} data={data} />
    );
}