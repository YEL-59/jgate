"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export function GrowthChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((dataset, idx) => ({
      label: idx === 1 ? 'Project Growth' : dataset.label, // Match design
      data: dataset.data,
      backgroundColor: dataset.color,
      borderRadius: 4,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        stacked: true,
        ticks: {
          callback: function(value) {
            if (value >= 1000) {
              return value / 1000 + 'k';
            }
            return value;
          },
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
      },
    },
  };

  return (
    <Card style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <CardHeader>
        <CardTitle style={{ fontSize: '20px', fontWeight: '600' }}>
          User & Project Growth
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: '300px', position: 'relative' }}>
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}

