"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Central Jakarta", value: 35 },
  { name: "South Jakarta", value: 25 },
  { name: "East Jakarta", value: 20 },
  { name: "West Jakarta", value: 15 },
  { name: "North Jakarta", value: 5 },
]

const COLORS = ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#D1FAE5"]

export function HighDemandAreas() {
  
  return (
    <div className="h-[300px] w-full text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={(entry) => entry.name}
            labelLine={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value} visits`, "Demand"]}
            contentStyle={{ borderRadius: "6px", border: "1px solid #e5e7eb" }}
          />
          <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 10 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
