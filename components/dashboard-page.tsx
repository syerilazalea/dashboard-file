"use client"

import { useState } from "react"
import { Calendar, Filter, LineChart, Route, Users } from "lucide-react"
import { Sidebar } from "./sidebar"
import { MetricCard } from "./metric-card"
import { TravelTrendsChart } from "./travel-trends-chart"
import { VisitsChart } from "./visits-chart"
import { EfficiencyTable } from "./efficiency-table"
import { HighDemandAreas } from "./high-demand-areas"

export function DashboardPage() {
  const [dateRange, setDateRange] = useState("Jan 01, 2023 - Apr 30, 2025")

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Nakes Travel Distance Optimization</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white border rounded-md px-3 py-1.5">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{dateRange}</span>
              </div>
              <button className="flex items-center gap-2 bg-white border rounded-md px-3 py-1.5">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Filter</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Avg. Distance Per Nakes"
              value="12.4 km"
              change={2}
              icon={<Route className="h-5 w-5 text-emerald-500" />}
            />
            <MetricCard
              title="Total Daily Distance"
              value="248.6 km"
              change={12}
              icon={<LineChart className="h-5 w-5 text-emerald-500" />}
            />
            <MetricCard
              title="Avg. Visits Per Nakes"
              value="8.2"
              change={5}
              icon={<Users className="h-5 w-5 text-emerald-500" />}
            />
            <MetricCard
              title="Potential Cost Savings"
              value="Rp 4.2M"
              subtitle="Monthly estimate with optimization"
              icon={<LineChart className="h-5 w-5 text-emerald-500" />}
              showChange={false}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border">
              <h2 className="text-lg font-medium text-gray-800 mb-1">Travel Distance Trends</h2>
              <p className="text-sm text-gray-500 mb-4">Average daily travel distance per nakes over time</p>
              <TravelTrendsChart />
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h2 className="text-lg font-medium text-gray-800 mb-1">Visits Per Nakes</h2>
              <p className="text-sm text-gray-500 mb-4">Distribution of visits among healthcare workers</p>
              <VisitsChart />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Nakes Travel Efficiency</h2>
              <EfficiencyTable />
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h2 className="text-lg font-medium text-gray-800 mb-4">High-Demand Areas</h2>
              <HighDemandAreas />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
