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
            ticks: {
                font: {
                    family: 'monospace'
                }
            }
        },
        y: {
            ticks: {
                font: {
                    family: 'monospace'
                }
            }
        }
    },
};

export interface DatasetLineCharterType {
    annee: string;
    total_conso_gaz: number;
    total_conso_elec: number;
}

interface LineCharterProps {
    startYear: number;
    endYear: number;
    dataset: DatasetLineCharterType[]
}

export function LineCharter({ startYear, endYear, dataset}: LineCharterProps) {

    const [data, setData] = useState<ChartData<'line'>>({
        labels: [],
        datasets: []
    });

    type ConsoType = 'total_conso_gaz' | 'total_conso_elec';

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

    const fetchData = () => {

        const labels = generateYearsList();
        
        // Example datasets
        const datasets = [
            {
                label: 'Electricité',
                data: addConsoOfType('total_conso_elec'),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                tension: 0.2
            },
            {
                label: 'Gaz',
                data: addConsoOfType('total_conso_gaz'),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                tension: 0.2
            },
        ];

        // Update the data state
        setData({ labels, datasets });
    };

    useEffect(() => {
        if(dataset && dataset.length > 0 ){
            fetchData();
        }        

    }, [startYear, endYear, dataset]);

    return (
        <Line options={options} data={data} className='max-h-64 w-full'/>
    );
}