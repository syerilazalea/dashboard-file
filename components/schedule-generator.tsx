"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Calendar, RefreshCw, Save, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export function ScheduleGenerator() {
  const [employees, setEmployees] = useState([])
  const [schedule, setSchedule] = useState({})
  const [weekDays, setWeekDays] = useState([])
  const [loading, setLoading] = useState(true)
  const [minShifts, setMinShifts] = useState("4")
  const [maxShifts, setMaxShifts] = useState("2")
  const [currentView, setCurrentView] = useState("week")
  const [currentMonth, setCurrentMonth] = useState("May")
  const [currentYear, setCurrentYear] = useState("2025")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  // Create the ref for PDF generation
  const scheduleRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesRes, scheduleRes, weekDaysRes] = await Promise.all([
          fetch('/employees.json'),
          fetch('/schedule.json'),
          fetch('https://mocki.io/v1/1cc8a07e-69ff-4225-a959-30efd548b12e') // Changed to external endpoint
        ])

        const [employeesData, scheduleData, weekDaysData] = await Promise.all([
          employeesRes.json(),
          scheduleRes.json(),
          weekDaysRes.json()
        ])

        setEmployees(employeesData)
        setSchedule(scheduleData)
        setWeekDays(weekDaysData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  // Calculate schedule summary
  const calculateSummary = () => {
    let off = 0
    let hq = 0
    let shift1 = 0
    let shift2 = 0
    let shift3 = 0
    let total = 0

    Object.values(schedule).forEach((employeeSchedule) => {
      Object.values(employeeSchedule).forEach((shift) => {
        total++
        if (shift === "OFF") off++
        if (shift === "HQ") hq++
        if (shift === "Shift 1") shift1++
        if (shift === "Shift 2") shift2++
        if (shift === "Shift 3") shift3++
      })
    })

    return {
      off,
      hq,
      shift1,
      shift2,
      shift3,
      total,
      offPercent: Math.round((off / total) * 100),
      hqPercent: Math.round((hq / total) * 100),
      shift1Percent: Math.round((shift1 / total) * 100),
      shift2Percent: Math.round((shift2 / total) * 100),
      shift3Percent: Math.round((shift3 / total) * 100),
    }
  }

  const summary = calculateSummary()

  // Handle shift change
  const handleShiftChange = (employeeId, date, shift) => {
    setSchedule((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [date]: shift,
      },
    }))
  }

  // Get background color based on shift
  const getShiftColor = (shift) => {
    switch (shift) {
      case "OFF":
        return "bg-red-100"
      case "HQ":
        return "bg-blue-100"
      case "Shift 1":
        return "bg-green-100"
      case "Shift 2":
        return "bg-purple-100"
      case "Shift 3":
        return "bg-yellow-100"
      default:
        return "bg-gray-100"
    }
  }

  // Shuffle schedule (random assignment for demo)
  const shuffleSchedule = () => {
    const shifts = ["OFF", "HQ", "Shift 1", "Shift 2", "Shift 3"]
    const newSchedule = { ...schedule }

    employees.forEach((employee) => {
      weekDays.forEach((day) => {
        const randomShift = shifts[Math.floor(Math.random() * shifts.length)]
        newSchedule[employee.id][day.date] = randomShift
      })
    })

    setSchedule(newSchedule)
  }

  // Save schedule to PDF
  const saveScheduleToPDF = async () => {
    if (!scheduleRef.current) return

    setIsGeneratingPDF(true)
    try {
      const canvas = await html2canvas(scheduleRef.current, {
        scale: 2,
        scrollY: -window.scrollY,
        useCORS: true,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('landscape', 'pt', 'a4')
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`schedule-${currentMonth}-${currentYear}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  // Combined save function
  const handleSave = () => {
    saveSchedule() // Your existing save function
    saveScheduleToPDF()
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading schedule data...</div>
  }

  return (
    <div ref={scheduleRef}>
      <Card className="w-full max-w-6xl border-0 ">

        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Schedule Generation</h1>
              <p className="text-gray-500">Manage your team's schedule easily</p>
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-white text-black border border-gray-300 hover:bg-gray-100"
                onClick={shuffleSchedule}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Shuffle
              </Button>
              <Button
                className="bg-white text-black border border-gray-300 hover:bg-gray-100"
                onClick={handleSave}
                disabled={isGeneratingPDF}
              >
                <Save className="h-4 w-4 mr-2" />
                {isGeneratingPDF ? "Generating PDF..." : "Save Schedule as PDF"}
              </Button>
              <Select value={currentMonth} onValueChange={setCurrentMonth}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="June">June</SelectItem>
                  <SelectItem value="July">July</SelectItem>
                </SelectContent>
              </Select>

              <Select value={currentYear} onValueChange={setCurrentYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Rules and Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Schedule Rules */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Info className="h-5 w-5 text-blue-500 mr-2" />
                <h2 className="font-semibold text-gray-900">Aturan Dasar</h2>
              </div>
              <div className=" mb-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-200 mr-2"></div>
                  <span className="text-gray-600 mr-2">Shift 6 :</span>
                  <span className="font-medium">06.00 - 15.00</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-200 mr-2"></div>
                  <span className="text-gray-600 mr-2">Shift 7 :</span>
                  <span className="font-medium">07.00 - 16.00</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-200 mr-2"></div>
                  <span className="text-gray-600 mr-2">Shift 8 :</span>
                  <span className="font-medium">08.00 - 17.00</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-200 mr-2"></div>
                  <span className="text-gray-600 mr-2">Shift 10 :</span>
                  <span className="font-medium">10.00 - 19.00</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-200 mr-2"></div>
                  <span className="text-gray-600 mr-2">Shift 11 :</span>
                  <span className="font-medium">11.00 - 20.00</span>
                </div>
              </div>

            </div>


            {/* Schedule Summary */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3 p-1">
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-blue-500 mr-2" />
                  <h2 className="font-semibold text-gray-900">Aturan Per Shift</h2>
                </div>
                <div className="text-xs text-gray-500">Total shifts: {summary.total}</div>
              </div>
              {/* First Row - 3 cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-center mb-2">
                <div className="bg-blue-100 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="text-lg font-bold">2</div>
                  <div className="text-sm font-medium">Shift 6</div>
                </div>
                <div className="bg-purple-100 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="text-lg font-bold">2</div>
                  <div className="text-sm font-medium">Shift 7</div>
                </div>
                <div className="bg-red-100 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="text-lg font-bold">2</div>
                  <div className="text-sm font-medium">Shift 8</div>
                </div>

              </div>
              {/* Second Row - 3 cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-center mb-2">
                <div className="bg-yellow-100 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="text-lg font-bold">2</div>
                  <div className="text-sm font-medium">Shift 9</div>
                </div>
                <div className="bg-green-100 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="text-lg font-bold">2</div>
                  <div className="text-sm font-medium">Shift 10</div>
                </div>
                <div className="bg-blue-100 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="text-lg font-bold">2</div>
                  <div className="text-sm font-medium">Shift 11</div>
                </div>
              </div>
            </div>


            {/* Schedule Summary */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3 p-1">
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-blue-500 mr-1" />
                  <h2 className="font-semibold text-gray-900">Schedule Summary</h2>
                </div>
                <div className="text-xs text-gray-500">Total shifts: {summary.total}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-center mb-2">
                <div className="bg-blue-100 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold">{summary.off}</div>
                  <div className="text-sm font-medium">OFF</div>
                </div>
                <div className="bg-purple-100 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold">{summary.hq}</div>
                  <div className="text-sm font-medium">HQ</div>
                </div>
                <div className="bg-red-100 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold">{summary.hq}</div>
                  <div className="text-sm font-medium">Shift 6</div>
                </div>
                <div className="bg-yellow-100 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold">{summary.shift1}</div>
                  <div className="text-sm font-medium">Shift 7</div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-center mb-2">
                <div className="bg-green-100 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold">{summary.shift2}</div>
                  <div className="text-sm font-medium">Shift 8</div>
                </div>
                <div className="bg-blue-100 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold">{summary.shift3}</div>
                  <div className="text-sm font-medium">Shift 9</div>
                </div>
                <div className="bg-purple-100 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold">{summary.shift2}</div>
                  <div className="text-sm font-medium">Shift 10</div>
                </div>
                <div className="bg-red-100 rounded-lg p-3 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold">{summary.shift3}</div>
                  <div className="text-sm font-medium">Shift 11</div>
                </div>
              </div>

            </div>
          </div>

          <div className="border rounded-lg">
            <div
              className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              style={{
                maxWidth: "100%",
                overflowY: "visible",
                maxHeight: "500px",
              }}
            >
              <table className="min-w-full " style={{ minWidth: "1000px" }}>
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 z-10 border-r shadow-sm">
                      Employee
                    </th>
                    {weekDays.map((day) => (
                      <th
                        key={day.date}
                        className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        style={{ minWidth: "140px" }}
                      >
                        <div>{day.name}</div>
                        <div>{day.date}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-white sticky left-0 z-10 border-r shadow-sm">
                        {employee.name}
                      </td>
                      {weekDays.map((day) => {
                        const currentShift = schedule[employee.id]?.[day.date] || "OFF"
                        return (
                          <td
                            key={`${employee.id}-${day.date}`}
                            className="px-2 py-2 whitespace-nowrap text-sm text-gray-500"
                          >
                            <Select
                              value={currentShift}
                              onValueChange={(value) => handleShiftChange(employee.id, day.date, value)}
                            >
                              <SelectTrigger className={`w-full ${getShiftColor(currentShift)}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="OFF">OFF</SelectItem>
                                <SelectItem value="HQ">HQ</SelectItem>
                                <SelectItem value="Shift 1">Shift 1</SelectItem>
                                <SelectItem value="Shift 2">Shift 2</SelectItem>
                                <SelectItem value="Shift 3">Shift 3</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>


  )
}