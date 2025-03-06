
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const LeaveTrendsChart: React.FC = () => {
  // Sample data for the chart
  const data = [
    { month: "Jan", medical: 0, vacation: 0, dayLeave: 2, emergency: 0 },
    { month: "Feb", medical: 1, vacation: 0, dayLeave: 1, emergency: 0 },
    { month: "Mar", medical: 0, vacation: 0, dayLeave: 3, emergency: 0 },
    { month: "Apr", medical: 2, vacation: 0, dayLeave: 2, emergency: 0 },
    { month: "May", medical: 0, vacation: 0, dayLeave: 1, emergency: 1 },
    { month: "Jun", medical: 0, vacation: 7, dayLeave: 0, emergency: 0 },
    { month: "Jul", medical: 3, vacation: 0, dayLeave: 1, emergency: 0 },
  ];

  // Custom tooltip content
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
      
      return (
        <div className="rounded-md border border-border bg-background p-2 shadow-sm">
          <p className="mb-1 font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-xs flex items-center">
              <span className="mr-1 inline-block h-2 w-2" style={{ backgroundColor: entry.color }} />
              {entry.name}: {entry.value} days
            </p>
          ))}
          <p className="mt-1 text-xs font-medium">Total: {total} days</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
        barGap={2}
        barSize={24}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickCount={5}
          allowDecimals={false}
          domain={[0, 'dataMax + 1']}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
        <Legend
          iconSize={8}
          iconType="circle"
          wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
        />
        <Bar
          dataKey="medical"
          name="Medical"
          fill="#ef4444"
          radius={[4, 4, 0, 0]}
          animationDuration={500}
        />
        <Bar
          dataKey="vacation"
          name="Vacation"
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
          animationDuration={750}
        />
        <Bar
          dataKey="dayLeave"
          name="Day Leave"
          fill="#10b981"
          radius={[4, 4, 0, 0]}
          animationDuration={1000}
        />
        <Bar
          dataKey="emergency"
          name="Emergency"
          fill="#f97316"
          radius={[4, 4, 0, 0]}
          animationDuration={1250}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
