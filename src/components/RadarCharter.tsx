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

interface RadarCharter {
    startYear: string;
    endYear: string;
    labels: string[];
    datasets: number[]
}

export function RadarCharter({startYear, endYear, labels, datasets}: RadarCharter) {

    useEffect(() => {
        console.log('le dataset', datasets)
    }, [])

    const [data, setData] = useState({
        labels: labels,
        datasets: [
            {
                label: 'Electricité',
                data: [6, 9, 3, 5, 4, 7, 8, 9, 10],
                borderWidth: 1,
            },
            {
                label: 'Gaz',
                data: [3, 2, 6, 3, 5, 8, 4, 5, 7],
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