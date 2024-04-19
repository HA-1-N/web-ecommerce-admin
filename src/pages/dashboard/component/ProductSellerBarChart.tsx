import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [3000, 2000, 4000, 6000, 5000, 1000, 7000],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [2000, 4000, 6000, 1000, 3000, 5000, 7000],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
const ProductSellerBarChart = () => {
  return (
    <div>
      <h2 className="text-gray-500">Product Seller Chart</h2>
      <Bar options={options} data={data} />
    </div>
  );
};

export default ProductSellerBarChart;
