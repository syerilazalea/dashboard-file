"use client"

import { useState } from "react"
import { Calendar, Filter, LineChart, Route, Users } from "lucide-react"
import { MetricCard } from "./metric-card"
import { TravelTrendsChart } from "./travel-trends-chart"
import { VisitsChart } from "./visits-chart"
import { EfficiencyTable } from "./efficiency-table"
import { HighDemandAreas } from "./high-demand-areas"
import { DateRange } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { add } from "date-fns"

export function DashboardPage() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-04-05"),
      key: "selection",
    },
  ])
  const [showPicker, setShowPicker] = useState(false)


  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Nakes Travel Distance Optimization</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className="flex items-center gap-2 bg-white border rounded-md px-3 py-1.5 cursor-pointer"
                  onClick={() => setShowPicker(!showPicker)}
                >
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
                  </span>
                </div>
                {showPicker && (
                  <div className="absolute right-0 z-10 mt-2">
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDateRange([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                      maxDate={new Date("2025-12-31")}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
            <MetricCard
              title="Avg. Distance Per Nakes"
              value="12.4 km"
              change={2}
              icon={<Route className="h-8 w-8 text-emerald-500" />}
            />
            <MetricCard
              title="Total Daily Distance"
              value="248.6 km"
              change={12}
              icon={<LineChart className="h-8 w-8 text-emerald-500" />}
            />
            <MetricCard
              title="Avg. Visits Per Nakes"
              value="8.2"
              change={5}
              icon={<Users className="h-8 w-8 text-emerald-500" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
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
