
import React from 'react';
import { WEEKLY_SCHEDULE } from '../constants.tsx';

interface DaySelectorProps {
  currentDayIndex: number;
  onSelectDay: (index: number) => void;
  theme?: 'light' | 'dark';
}

export const DaySelector: React.FC<DaySelectorProps> = ({ currentDayIndex, onSelectDay, theme = 'light' }) => {
  return (
    <div className="flex overflow-x-auto pb-2 no-scrollbar gap-3 px-2">
      {WEEKLY_SCHEDULE.map((day, index) => (
        <button
          key={day.dayName}
          onClick={() => onSelectDay(index)}
          className={`px-8 py-4 rounded-full font-black whitespace-nowrap transition-all duration-300 text-sm uppercase tracking-tighter ${
            currentDayIndex === index
              ? (theme === 'dark' 
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105' 
                  : 'bg-black text-white shadow-lg ring-4 ring-black/10 scale-105')
              : (theme === 'dark'
                  ? 'bg-transparent text-white/60 hover:text-white border border-white/10'
                  : 'bg-transparent text-black/60 hover:text-black border-2 border-[#D4AF37]/30 hover:border-[#D4AF37]')
          }`}
        >
          {day.dayName}
        </button>
      ))}
    </div>
  );
};
