
import React, { useState, useEffect, useMemo } from 'react';
import { WEEKLY_SCHEDULE } from './constants';
import { LessonCard } from './components/LessonCard';
import { DaySelector } from './components/DaySelector';
import { StatsHeader } from './components/StatsHeader';
import { LayoutGrid, List } from 'lucide-react';

const App: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const today = new Date().getDay(); 
    const currentIdx = today === 0 ? 5 : today - 1; // 0 is Sunday, set to Saturday view
    if (currentIdx < 6) {
      setSelectedDayIndex(currentIdx);
    }
  }, []);

  // Dinamik hisob-kitoblar
  const stats = useMemo(() => {
    let totalLessons = 0;
    const subjectsSet = new Set<string>();

    WEEKLY_SCHEDULE.forEach(day => {
      totalLessons += day.lessons.length;
      day.lessons.forEach(lesson => {
        // Fan nomini normallashtirish (bo'sh joylarni olib tashlash va kichik harfga o'tkazish)
        // lekin ko'rsatishda original nomdan foydalanamiz
        subjectsSet.add(lesson.name.toLowerCase().trim());
      });
    });

    return {
      totalLessons,
      uniqueSubjects: subjectsSet.size
    };
  }, []);

  const currentDay = WEEKLY_SCHEDULE[selectedDayIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <StatsHeader 
        totalLessonsCount={stats.totalLessons} 
        uniqueSubjectsCount={stats.uniqueSubjects} 
      />
      
      <div className="mb-10 sticky top-4 z-50">
        <div className="bg-white/80 backdrop-blur-md p-2 rounded-[2rem] shadow-xl border border-white/40">
          <DaySelector 
            currentDayIndex={selectedDayIndex} 
            onSelectDay={setSelectedDayIndex} 
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          {currentDay.dayName} darslari
          <span className="text-sm font-medium bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full border border-indigo-200">
            {currentDay.lessons.length} soat
          </span>
        </h2>
        
        <div className="flex bg-white/50 p-1 rounded-xl border border-white/50 shadow-sm w-fit">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
          >
            <LayoutGrid size={20} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      <div className={`grid gap-4 transition-all duration-500 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1 max-w-2xl mx-auto'
      }`}>
        {currentDay.lessons.map((lesson, idx) => (
          <LessonCard key={lesson.id} lesson={lesson} index={idx} />
        ))}
      </div>

      {currentDay.lessons.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="bg-slate-100 p-6 rounded-full mb-4">
            <LayoutGrid size={48} className="opacity-20" />
          </div>
          <p className="text-xl font-medium">Bugun darslar yo'q!</p>
          <p className="text-sm">Dam olish vaqti keldi.</p>
        </div>
      )}

      <footer className="mt-20 text-center pb-10">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-6"></div>
        <p className="text-slate-400 text-sm font-medium">
          Sinfingiz uchun maxsus tayyorlandi &bull; 2024
        </p>
      </footer>
    </div>
  );
};

export default App;
