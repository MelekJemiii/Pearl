import { AdminDashChart } from '@/components/AdminDashChart';
import React from 'react';

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const Main = () => {
  return (
    <div>
      <h1>Main Page</h1>
        <AdminDashChart chartData={chartData} />
    </div>
  );
};

export default Main;
