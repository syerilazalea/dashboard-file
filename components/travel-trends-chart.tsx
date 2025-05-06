"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { date: "Jan 1", value: 15.2 },
  { date: "Jan 15", value: 14.8 },
  { date: "Jan 29", value: 14.2 },
  { date: "Feb 12", value: 13.5 },
  { date: "Feb 26", value: 12.8 },
  { date: "Mar 12", value: 12.2 },
  { date: "Mar 26", value: 12.6 },
  { date: "Apr 9", value: 12.1 },
]

export function TravelTrendsChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            domain={[0, 16]}
            ticks={[0, 4, 8, 12, 16]}
            tickFormatter={(value) => `${value}km`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ r: 4, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
