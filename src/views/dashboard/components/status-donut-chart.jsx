"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { theme } from "@/config/theme.config";

ChartJS.register(ArcElement, Tooltip, Legend);

export function StatusDonutChart({ data }) {
  const { published, draft, closed, total } = data;
  const totalPercentage = published + draft + closed;
  const centerPercentage = Math.round((totalPercentage / total) * 100);

  const chartData = {
    labels: ['Published', 'Draft', 'Closed'],
    datasets: [
      {
        data: [published, draft, closed],
        backgroundColor: [
          theme.colors.chart.purple,
          theme.colors.chart.yellow,
          theme.colors.chart.blue,
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
          },
          generateLabels: function(chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const dataset = data.datasets[0];
                const value = dataset.data[i];
                return {
                  text: `${label} ${value}%`,
                  fillStyle: dataset.backgroundColor[i],
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  return (
    <Card style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <CardHeader>
        <CardTitle style={{ fontSize: '20px', fontWeight: '600' }}>
          Project Status Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: '300px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '250px' }}>
            <Doughnut data={chartData} options={options} />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1a1a1a' }}>
                {centerPercentage}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

