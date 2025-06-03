"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  RefreshCw,
  Save,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function ScheduleGenerator() {
  const [employees, setEmployees] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [weekDays, setWeekDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minShifts, setMinShifts] = useState("4");
  const [maxShifts, setMaxShifts] = useState("2");
  const [currentView, setCurrentView] = useState("week");
  const [currentMonth, setCurrentMonth] = useState("May");
  const [currentYear, setCurrentYear] = useState("2025");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [shiftRules, setShiftRules] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [summaryData, setSummaryData] = useState([]);

  const scheduleRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          combinedDataRes,
          weekDaysRes,
          shiftRulesRes,
          shiftsRes,
          summaryRes,
        ] = await Promise.all([
          fetch("https://mocki.io/v1/8eababb2-fc07-4988-96eb-721e8e2338b5"), // This is your new combined file
          fetch("https://mocki.io/v1/1cc8a07e-69ff-4225-a959-30efd548b12e"), // Weekdays data
          fetch("https://mocki.io/v1/6fbe4289-29a1-4ae5-86a1-5eec4e4d322d"), // Shift rules data
          fetch("https://mocki.io/v1/d041a696-5008-47bb-a066-a4aea09b8089"), // Shifts data
          fetch("https://mocki.io/v1/5de398b5-6a44-44ca-b39c-d75f91c98e43"), // Summary data
        ]);

        const [
          combinedData,
          weekDaysData,
          shiftRulesData,
          shiftsData,
          summaryData,
        ] = await Promise.all([
          combinedDataRes.json(),
          weekDaysRes.json(),
          shiftRulesRes.json(),
          shiftsRes.json(),
          summaryRes.json(),
        ]);

        setEmployees(combinedData.employees);
        setSchedule(combinedData.schedule);
        setWeekDays(weekDaysData);
        setShiftRules(shiftRulesData);
        setShifts(shiftsData);
        setSummaryData(summaryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateSummary = () => {
    let off = 0;
    let hq = 0;
    let shift6 = 0;
    let shift7 = 0;
    let shift8 = 0;
    let shift9 = 0;
    let shift10 = 0;
    let shift11 = 0;
    let shift12 = 0;
    let total = 0;

    Object.values(schedule).forEach((employeeSchedule) => {
      Object.values(employeeSchedule).forEach((shift) => {
        total++;
        if (shift === "OFF") off++;
        if (shift === "HQ") hq++;
        if (shift === "Shift 6") shift6++;
        if (shift === "Shift 7") shift7++;
        if (shift === "Shift 8") shift8++;
        if (shift === "Shift 9") shift9++;
        if (shift === "Shift 10") shift10++;
        if (shift === "Shift 11") shift11++;
        if (shift === "Shift 12") shift12++;
      });
    });

    return {
      off,
      hq,
      shift6,
      shift7,
      shift8,
      shift9,
      shift10,
      shift11,
      shift12,
      total,
      offPercent: Math.round((off / total) * 100),
      hqPercent: Math.round((hq / total) * 100),
      shift6Percent: Math.round((shift6 / total) * 100),
      shift7Percent: Math.round((shift7 / total) * 100),
      shift8Percent: Math.round((shift8 / total) * 100),
      shift9Percent: Math.round((shift9 / total) * 100),
      shift10Percent: Math.round((shift10 / total) * 100),
      shift11Percent: Math.round((shift11 / total) * 100),
      shift12Percent: Math.round((shift12 / total) * 100),
    };
  };

  const summary = calculateSummary();
  const totalShifts = summaryData.reduce(
    (total, shift) => total + shift.count,
    0
  );

  const handleShiftChange = (employeeId, date, shift) => {
    setSchedule((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [date]: shift,
      },
    }));
  };

  const getShiftColor = (shift) => {
    switch (shift) {
      case "OFF":
        return "bg-red-100";
      case "HQ":
        return "bg-blue-100";
      case "Shift 6":
        return "bg-green-100";
      case "Shift 7":
        return "bg-yellow-100";
      case "Shift 8":
        return "bg-green-100";
      case "Shift 9":
        return "bg-blue-100";
      case "Shift 10":
        return "bg-purple-100";
      case "Shift 11":
        return "bg-indigo-100";
      case "Shift 12":
        return "bg-pink-100";
      default:
        return "bg-gray-100";
    }
  };

  const shuffleSchedule = () => {
    const shifts = [
      "OFF",
      "HQ",
      "Shift 6",
      "Shift 7",
      "Shift 8",
      "Shift 9",
      "Shift 10",
      "Shift 11",
      "Shift 12",
    ];
    const newSchedule = { ...schedule };

    employees.forEach((employee) => {
      weekDays.forEach((day) => {
        const randomShift = shifts[Math.floor(Math.random() * shifts.length)];
        newSchedule[employee.id][day.date] = randomShift;
      });
    });

    setSchedule(newSchedule);
  };

  const saveScheduleToPDF = async () => {
    if (!scheduleRef.current) return;

    setIsGeneratingPDF(true);
    try {
      const canvas = await html2canvas(scheduleRef.current, {
        scale: 2,
        scrollY: -window.scrollY,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "pt", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`schedule-${currentMonth}-${currentYear}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSave = () => {
    saveScheduleToPDF();
  };

  const renderShiftCards = () => {
    if (!shifts.length) return null;

    const firstRowShifts = shifts.slice(0, 4);
    const secondRowShifts = shifts.slice(4, 8);

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-center mb-2">
          {firstRowShifts.map((shift, index) => (
            <div
              key={index}
              className={`${getShiftColor(
                shift.label
              )} rounded-lg p-3 flex flex-col items-center justify-center`}
            >
              <div className="text-lg font-bold">{shift.count}</div>
              <div className="text-sm font-medium">{shift.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-center mb-2">
          {secondRowShifts.map((shift, index) => (
            <div
              key={index + 4}
              className={`${getShiftColor(
                shift.label
              )} rounded-lg p-3 flex flex-col items-center justify-center`}
            >
              <div className="text-lg font-bold">{shift.count}</div>
              <div className="text-sm font-medium">{shift.label}</div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderSummaryCards = () => {
    if (!summaryData.length) return null;

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-center mb-2">
          {summaryData.slice(0, 4).map((shift, index) => (
            <div
              key={index}
              className={`${getShiftColor(
                shift.label
              )} rounded-lg p-3 flex flex-col items-center justify-center`}
            >
              <div className="text-xl font-bold">{shift.count}</div>
              <div className="text-sm font-medium">{shift.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-center mb-2">
          {summaryData.slice(4, 8).map((shift, index) => (
            <div
              key={index + 4}
              className={`${getShiftColor(
                shift.label
              )} rounded-lg p-3 flex flex-col items-center justify-center`}
            >
              <div className="text-xl font-bold">{shift.count}</div>
              <div className="text-sm font-medium">{shift.label}</div>
            </div>
          ))}
        </div>
      </>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading schedule data...
      </div>
    );
  }

  return (
    <Card className="w-full max-w-6xl border-0 ">
      <div className="flex flex-col space-y-4" ref={scheduleRef}>
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Schedule Generation
            </h1>
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
              {isGeneratingPDF ? "Generating PDF..." : "Save Schedule"}
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
            <div className="mb-4 space-y-2">
              {shiftRules.map((rule, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      index === 0
                        ? "bg-blue-200"
                        : index === 1
                        ? "bg-purple-200"
                        : index === 2
                        ? "bg-yellow-200"
                        : "bg-red-200"
                    }`}
                  ></div>
                  <span className="text-gray-600 mr-2">{rule.label}:</span>
                  <span className="font-medium">{rule.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3 p-1">
              <div className="flex items-center">
                <Info className="h-5 w-5 text-blue-500 mr-2" />
                <h2 className="font-semibold text-gray-900">
                  Aturan Per Shift
                </h2>
              </div>
            </div>
            {renderShiftCards()}
          </div>

          {/* Schedule Summary */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3 p-1">
              <div className="flex items-center">
                <Info className="h-5 w-5 text-blue-500 mr-1" />
                <h2 className="font-semibold text-gray-900">
                  Schedule Summary
                </h2>
              </div>
              <div className="text-xs text-gray-500">
                Total shifts: {totalShifts}
              </div>
            </div>
            {renderSummaryCards()}
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
                      const employeeSchedule = schedule[employee.id] || {};
                      const currentShift = employeeSchedule[day.date] || "OFF";

                      return (
                        <td
                          key={`${employee.id}-${day.date}`}
                          className="px-2 py-2 whitespace-nowrap text-sm text-gray-500"
                        >
                          <Select
                            value={currentShift}
                            onValueChange={(value) =>
                              handleShiftChange(employee.id, day.date, value)
                            }
                          >
                            <SelectTrigger
                              className={`w-full ${getShiftColor(
                                currentShift
                              )}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="OFF">OFF</SelectItem>
                              <SelectItem value="HQ">HQ</SelectItem>
                              <SelectItem value="Shift 6">Shift 6</SelectItem>
                              <SelectItem value="Shift 7">Shift 7</SelectItem>
                              <SelectItem value="Shift 8">Shift 8</SelectItem>
                              <SelectItem value="Shift 9">Shift 9</SelectItem>
                              <SelectItem value="Shift 10">Shift 10</SelectItem>
                              <SelectItem value="Shift 11">Shift 11</SelectItem>
                              <SelectItem value="Shift 12">Shift 12</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
}
