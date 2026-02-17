
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen, GraduationCap, Layers } from 'lucide-react';

interface StatsHeaderProps {
  uniqueSubjectsCount: number;
  totalLessonsCount: number;
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({ uniqueSubjectsCount, totalLessonsCount }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat('uz-UZ', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(time);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <GraduationCap className="text-indigo-600 shrink-0" size={40} />
          <span>Mening Sinfim</span>
        </h1>
        <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
          <Calendar size={18} className="text-slate-400" />
          {formattedDate}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
        {/* Hozirgi vaqt */}
        <div className="glass-card px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm border-white/40">
          <div className="bg-indigo-100 p-2.5 rounded-xl">
            <Clock className="text-indigo-600" size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Vaqt</p>
            <p className="text-lg font-bold text-slate-800 tabular-nums">
              {time.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        {/* Jami haftalik darslar */}
        <div className="glass-card px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm border-white/40">
          <div className="bg-emerald-100 p-2.5 rounded-xl">
            <Layers className="text-emerald-600" size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Jami darslar</p>
            <p className="text-lg font-bold text-slate-800">{totalLessonsCount} soat</p>
          </div>
        </div>

        {/* Fanlar turlari */}
        <div className="glass-card px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm border-white/40">
          <div className="bg-amber-100 p-2.5 rounded-xl">
            <BookOpen className="text-amber-600" size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Fan turlari</p>
            <p className="text-lg font-bold text-slate-800">{uniqueSubjectsCount} ta</p>
          </div>
        </div>
      </div>
    </div>
  );
};
