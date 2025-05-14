'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

interface VisitData {
  name: string
  visits: number
}

export function VisitsChart() {
  const [data, setData] = useState<VisitData[]>([]) 
  const [loading, setLoading] = useState<boolean>(true) 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://mocki.io/v1/00fc4e3b-103b-4388-b26f-614337660f24')
        const json: VisitData[] = await res.json() // menambah tipe data untuk JSON 
        setData(json)
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px] w-full">
        <div className="w-8 h-8 border-4 border-teal-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }


  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            domain={[0, 12]}
            ticks={[0, 3, 6, 9, 12]}
          />
          <Bar dataKey="visits" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}


