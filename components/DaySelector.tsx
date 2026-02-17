
import React from 'react';
import { WEEKLY_SCHEDULE } from '../constants';

interface DaySelectorProps {
  currentDayIndex: number;
  onSelectDay: (index: number) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({ currentDayIndex, onSelectDay }) => {
  return (
    <div className="flex overflow-x-auto pb-4 no-scrollbar gap-2 px-2 md:px-0">
      {WEEKLY_SCHEDULE.map((day, index) => (
        <button
          key={day.dayName}
          onClick={() => onSelectDay(index)}
          className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all duration-300 ${
            currentDayIndex === index
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 ring-4 ring-indigo-50 scale-105'
              : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700'
          }`}
        >
          {day.dayName}
        </button>
      ))}
    </div>
  );
};
