'use client'

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

interface DatasetYear {
    total_conso_elec: number[];
    total_conso_gaz: number[];
  }
  
  interface RadarCharterProps {
    labels: string[];
    datasets: any[]
}

export function RadarCharter({labels, datasets}: RadarCharterProps) {

    const year = 2020

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Electricité',
                data: datasets["2020"]?.total_conso_elec,
                borderWidth: 1,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Gaz',
                data: datasets[year]?.total_conso_gaz,
                borderWidth: 1,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
            }
        ]
    }

    return (
        <div className="h-full w-full">
            <Radar options={options} data={data}/>
        </div>
    );
}