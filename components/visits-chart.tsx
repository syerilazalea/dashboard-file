"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { name: "Dr. Andi", visits: 8 },
  { name: "Dr. Budi", visits: 10 },
  { name: "Dr. Citra", visits: 6 },
  { name: "Dr. Dewi", visits: 9 },
  { name: "Dr. Eko", visits: 7 },
  { name: "Dr. Gita", visits: 12 },
  { name: "Dr. Hadi", visits: 5 },
]

export function VisitsChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            domain={[0, 12]}
            ticks={[0, 3, 6, 9, 12]}
          />
          <Bar dataKey="visits" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
