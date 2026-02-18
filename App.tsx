
import React, { useState, useEffect, useMemo } from 'react';
import { WEEKLY_SCHEDULE } from './constants.tsx';
import { LessonCard } from './components/LessonCard.tsx';
import { DaySelector } from './components/DaySelector.tsx';
import { StatsHeader } from './components/StatsHeader.tsx';
import { InteractiveBackground } from './components/InteractiveBackground.tsx';
import { LayoutGrid, List, Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const today = new Date().getDay(); 
    const currentIdx = today === 0 ? 5 : today - 1; 
    if (currentIdx < 6) {
      setSelectedDayIndex(currentIdx);
    }
  }, []);

  const stats = useMemo(() => {
    let totalLessonsCount = 0;
    const subjectsSet = new Set<string>();

    WEEKLY_SCHEDULE.forEach(day => {
      totalLessonsCount += day.lessons.length;
      day.lessons.forEach(lesson => {
        subjectsSet.add(lesson.name.toLowerCase().trim());
      });
    });

    return {
      totalLessonsCount,
      uniqueSubjectsCount: subjectsSet.size
    };
  }, []);

  const currentDay = WEEKLY_SCHEDULE[selectedDayIndex];

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <InteractiveBackground theme={theme} />
      
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-[100] p-4 rounded-full transition-all duration-300 shadow-2xl flex items-center gap-2 group border-2 ${
          theme === 'dark' 
            ? 'bg-black/40 text-white border-white/40 hover:bg-white/60' 
            : 'bg-white text-black border-[#D4AF37] hover:scale-110'
        }`}
      >
        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} className="text-black" />}
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap">
          {theme === 'dark' ? "Yorug' rejim" : "Qora rejim"}
        </span>
      </button>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
        <StatsHeader 
          totalLessonsCount={stats.totalLessonsCount} 
          uniqueSubjectsCount={stats.uniqueSubjectsCount} 
          theme={theme}
        />
        
        <div className="mb-10 sticky top-4 z-50">
          <div className={`p-2 rounded-[2rem] shadow-xl backdrop-blur-xl transition-all duration-300 border-2 ${
            theme === 'dark' 
              ? 'bg-black/80 border-white/20' 
              : 'bg-white/80 border-[#D4AF37]'
          }`}>
            <DaySelector 
              currentDayIndex={selectedDayIndex} 
              onSelectDay={setSelectedDayIndex} 
              theme={theme}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h2 className={`text-3xl font-black flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {currentDay.dayName}
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg ${
              theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
            }`}>
              {currentDay.lessons.length} dars
            </span>
          </h2>
          
          <div className={`flex p-1.5 rounded-2xl border-2 transition-all duration-300 ${
            theme === 'dark' ? 'bg-black/60 border-white/30' : 'bg-white/40 border-[#D4AF37]'
          }`}>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                viewMode === 'grid' 
                  ? (theme === 'dark' ? 'bg-white text-black shadow-md' : 'bg-black text-white shadow-md') 
                  : 'text-slate-400'
              }`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                viewMode === 'list' 
                  ? (theme === 'dark' ? 'bg-white text-black shadow-md' : 'bg-black text-white shadow-md') 
                  : 'text-slate-400'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        <div className={`grid gap-5 transition-all duration-700 ease-in-out ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 max-w-3xl mx-auto'
        }`}>
          {currentDay.lessons.map((lesson, idx) => (
            <div key={lesson.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
              <LessonCard lesson={lesson} index={idx} theme={theme} />
            </div>
          ))}
        </div>

        {currentDay.lessons.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className={`p-10 rounded-full mb-6 border-2 backdrop-blur-md ${
              theme === 'dark' ? 'bg-white/5 border-white/20' : 'bg-black/5 border-[#D4AF37]'
            }`}>
              <LayoutGrid size={64} className={`opacity-20 animate-pulse ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
            </div>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Bugun darslar yo'q!</p>
            <p className="opacity-50 mt-2 font-medium">Miriqib dam oling.</p>
          </div>
        )}

        <footer className="mt-24 text-center pb-12 opacity-50">
          <div className={`h-px w-32 mx-auto mb-8 bg-gradient-to-r from-transparent via-current to-transparent`}></div>
          <p className="text-xs font-bold uppercase tracking-[0.3em]">
            Sinfingiz uchun &bull; 2024
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
