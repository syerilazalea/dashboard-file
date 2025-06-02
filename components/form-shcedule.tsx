"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function FormSchedule() {
  const [formState, setFormState] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    shift6: "",
    shift7: "",
    shift8: "",
  })

  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formState)
    setFormSubmitted(true)

    setTimeout(() => {
      setFormSubmitted(false)
      window.location.href = "/schedule-table"
    }, 1000)
  }

  const renderOptions = (count: number) =>
    Array.from({ length: count }, (_, i) => i + 1).map((num) => (
      <option key={num} value={num}>
        {num}
      </option>
    ))

  return (
    <Card className="shadow-lg p-6">
  <CardHeader className="bg-blue-50 rounded-t-lg p-6">
        <CardTitle className="text-2xl font-bold text-blue-900">Form Jadwal Nakes</CardTitle>
        <CardDescription className="text-gray-600">
          Masukkan parameter untuk menghitung dan menghasilkan jadwal nakes secara otomatis.
        </CardDescription>
      </CardHeader>

       <CardContent className="bg-white p-6 space-y-10">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-0">
            Pengaturan Umum
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="field1">Maksimal Nakes per Hari</Label>
              <select
                id="field1"
                name="field1"
                value={formState.field1}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Pilih jumlah</option>
                {renderOptions(10)}
              </select>
              <p className="text-sm text-gray-500">Batas harian jumlah nakes</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="field4">Maksimal Nakes per Shift</Label>
              <select
                id="field4"
                name="field4"
                value={formState.field4}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Pilih jumlah</option>
                {renderOptions(10)}
              </select>
              <p className="text-sm text-gray-500">Batas nakes per shift</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="field2">Hari Libur per Nakes / Minggu</Label>
              <select
                id="field2"
                name="field2"
                value={formState.field2}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Pilih jumlah</option>
                {renderOptions(7)}
              </select>
              <p className="text-sm text-gray-500">Jumlah hari libur mingguan</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="field3">Minimal Homecare per Hari</Label>
              <select
                id="field3"
                name="field3"
                value={formState.field3}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Pilih jumlah</option>
                {renderOptions(10)}
              </select>
              <p className="text-sm text-gray-500">Jumlah homecare minimal harian</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Pengaturan Shift
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Shift 6", "Shift 7", "Shift 8", "Shift 9", "Shift 10", "Shift 11"].map((shift, idx) => {
              const shiftId = `shift${6 + (idx % 3)}`
              return (
                <div key={shift + idx} className="space-y-2">
                  <Label htmlFor={shiftId}>{shift}</Label>
                  <select
                    id={shiftId}
                    name={shiftId}
                    value={formState[shiftId as keyof typeof formState]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Pilih jumlah</option>
                    {renderOptions(10)}
                  </select>
                </div>
              )
            })}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
          disabled={formSubmitted}
          onClick={handleSubmit}
        >
          {formSubmitted ? (
            <span className="flex items-center justify-center">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Generating...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Generate
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
