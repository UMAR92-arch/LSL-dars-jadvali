
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen, GraduationCap, Layers } from 'lucide-react';

interface StatsHeaderProps {
  uniqueSubjectsCount: number;
  totalLessonsCount: number;
  theme?: 'light' | 'dark';
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({ uniqueSubjectsCount, totalLessonsCount, theme = 'light' }) => {
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

  const cardClass = `px-6 py-4 rounded-3xl flex items-center gap-4 transition-all duration-300 border-2 ${
    theme === 'dark' 
      ? 'bg-black/60 border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.05)]' 
      : 'bg-white/80 border-[#D4AF37]/20 shadow-xl shadow-[#D4AF37]/5'
  }`;

  const iconContainerClass = `p-3 rounded-2xl transition-colors duration-300 ${
    theme === 'dark' ? 'bg-white/10 text-white' : 'bg-[#D4AF37]/10 text-[#D4AF37]'
  }`;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
      <div>
        <h1 className="text-5xl font-black tracking-tighter flex items-center gap-4">
          <GraduationCap className={theme === 'dark' ? 'text-white' : 'text-[#D4AF37]'} size={52} />
          <span>Sinfimiz</span>
        </h1>
        <p className="opacity-60 mt-3 font-bold flex items-center gap-2 text-lg uppercase tracking-widest">
          <Calendar size={20} />
          {formattedDate}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className={cardClass}>
          <div className={iconContainerClass}>
            <Clock size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black opacity-50 leading-none mb-1">Hozir</p>
            <p className="text-xl font-black tabular-nums">
              {time.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <div className={cardClass}>
          <div className={iconContainerClass}>
            <Layers size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black opacity-50 leading-none mb-1">Darslar</p>
            <p className="text-xl font-black">{totalLessonsCount} soat</p>
          </div>
        </div>

        <div className={cardClass}>
          <div className={iconContainerClass}>
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black opacity-50 leading-none mb-1">Fanlar</p>
            <p className="text-xl font-black">{uniqueSubjectsCount} ta</p>
          </div>
        </div>
      </div>
    </div>
  );
};
