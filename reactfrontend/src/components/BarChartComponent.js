// components/BarChartComponent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChartComponent = ({ chartData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-200 border-b">
        <h2 className="text-lg font-bold text-gray-800">Monthly Sales Targets</h2>
      </div>
      <div className="p-4">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default BarChartComponent;
