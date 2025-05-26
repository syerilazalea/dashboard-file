'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Schedule = {
  id: number;
  period: string;
  createdAt: string;
  updatedAt: string;
  status: string;
};

export default function SchedulePage() {
  const [search, setSearch] = useState('');

  // Isi data dummy schedule
  const schedules: Schedule[] = [
    {
      id: 1,
      period: 'July 2025',
      createdAt: '2025-04-16T14:10:00',
      updatedAt: '2025-04-16T14:10:00',
      status: 'Up to Date',
    },
    {
      id: 2,
      period: 'May 2025',
      createdAt: '2025-04-16T14:08:00',
      updatedAt: '2025-05-19T14:45:00',
      status: 'Updated',
    },
  ];

  const onView = (id: number) => {
    console.log('View', id);
  };

  const onEdit = (id: number) => {
    console.log('Edit', id);
  };

  const onDelete = (id: number) => {
    console.log('Delete', id);
  };

  const filteredSchedules = schedules.filter((schedule) =>
    schedule.period.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSchedule = () => {
    // Navigate to form page without id for creating new schedule
    window.location.href = '/form-schedule';
  };


  return (
    <div className="w-full overflow-auto p-6 bg-white">
      <h1 className="text-2xl font-bold mb-1">List Monthly Schedule</h1>

      <p className="text-sm text-gray-500 mb-4">
        Manage your schedules per month.
      </p>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by month..."
          className="w-full md:w-1/3 px-3 py-1 border border-gray-300 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={handleAddSchedule}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Generate
        </button>
      </div>


      <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">
                Period
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">
                Created At
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">
                Updated At
              </th>
              <th className="px-6 py-3 border-b text-right text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredSchedules.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center h-24 text-gray-500 px-6 py-4"
                >
                  No schedules found
                </td>
              </tr>
            ) : (
              filteredSchedules.map((schedule) => (
                <tr
                  key={schedule.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="font-medium px-6 py-4 border-t">{schedule.period}</td>
                  <td className="px-6 py-4 border-t">
                    {format(new Date(schedule.createdAt), 'dd-MMM-yyyy | HH:mm')}
                  </td>
                  <td className="px-6 py-4 border-t">
                    {format(new Date(schedule.updatedAt), 'dd-MMM-yyyy | HH:mm')}
                  </td>
                  <td className="text-right space-x-1 px-6 py-4 border-t">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => onView(schedule.id)}
                    >
                      <Calendar className="h-4 w-4" />
                      <span className="sr-only">View schedule</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => onEdit(schedule.id)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit schedule</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => onDelete(schedule.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete schedule</span>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
