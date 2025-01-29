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
    onResize: (700),
    plugins: {
        legend: {
            position: 'top' as const,
        },
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

export function BarCharter({ startYear, endYear, rElec, gElec, bElec, transparencyElec, rGaz, gGaz, bGaz, transparencyGaz }) {
    const [data, setData] = useState({ labels: [], datasets: [] });

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
                    backgroundColor: `rgba(${rElec}, ${gElec}, ${bElec}, ${transparencyElec})`,
                },
                {
                    label: 'Gaz',
                    data: labels.map(() => Math.floor(Math.random() * 100)),
                    backgroundColor: `rgba(${rGaz}, ${gGaz}, ${bGaz}, ${transparencyGaz})`,
                },
            ];

            setData({ labels, datasets });
        };

        fetchData();
    }, [startYear, endYear, rElec, gElec, bElec, transparencyElec, rGaz, gGaz, bGaz, transparencyGaz]);

    return (
        <Bar options={options} data={data} />
    );
}