// components/LineChartComponent.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChartComponent = ({ chartData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-200 border-b">
        <h2 className="text-lg font-bold text-gray-800">Sales Trend</h2>
      </div>
      <div className="p-4">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default LineChartComponent;
