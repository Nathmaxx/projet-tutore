import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
            font: {
                family: 'monospace'
            }
        },
        font: {
            family: 'monospace'
        }
    },

    scales: {
        x: {
            title: {
                display: true,
                align: 'center',
                text: 'Année',
                color: 'black',
                font: {
                    family: 'monospace'
                },
            },
            ticks: {
                font: {
                    family: 'monospace'
                }
            }
        },
        y: {
            title: {
                display: true,
                align: 'center',
                text: 'kWh',
                color: 'black',
                font: {
                    family: 'monospace'
                },
            },
            ticks: {
                font: {
                    family: 'monospace'
                }
            }
        }
    },
};

interface LineCharterProps {
    startYear: number;
    endYear: number;
    rElec: number;
    gElec: number;
    bElec: number;
    transparencyElec: number;
    rGaz: number;
    gGaz: number;
    bGaz: number;
    transparencyGaz: number;
}

export function LineCharter({ startYear, endYear, rElec, gElec, bElec, transparencyElec, rGaz, gGaz, bGaz, transparencyGaz }: LineCharterProps) {

    const [data, setData] = useState<ChartData<'line'>>({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            // Generate labels based on startYear and endYear
            const labels = [];
            for (let year = startYear; year <= endYear; year++) {
                labels.push(year.toString());
            }

            // Example datasets
            const datasets = [
                {
                    label: 'Electricité',
                    data: labels.map(() => Math.floor(Math.random() * 100)),
                    backgroundColor: `rgba(${rElec}, ${gElec}, ${bElec}, ${transparencyElec})`,
                    borderColor: `rgba(${rElec}, ${gElec}, ${bElec}, ${Math.min(transparencyElec + 0.2, 1)})`,
                    tension: 0.3
                },
                {
                    label: 'Gaz',
                    data: labels.map(() => Math.floor(Math.random() * 100)),
                    backgroundColor: `rgba(${rGaz}, ${gGaz}, ${bGaz}, ${transparencyGaz})`,
                    borderColor: `rgba(${rGaz}, ${gGaz}, ${bGaz}, ${Math.min(transparencyGaz + 0.2, 1)})`,
                    tension: 0.3
                },
            ];

            // Update the data state
            setData({ labels, datasets });
        };

        fetchData();
    }, [startYear, endYear, rElec, gElec, bElec, transparencyElec, rGaz, gGaz, bGaz, transparencyGaz]);

    return (
        <Line options={options} data={data} className='max-h-64 w-full'/>
    );
}