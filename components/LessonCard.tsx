
import React from 'react';
import { Lesson } from '../types.ts';
import { SUBJECT_METADATA } from '../constants.tsx';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  theme?: 'light' | 'dark';
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, index, theme = 'light' }) => {
  const metadata = SUBJECT_METADATA[lesson.type];

  return (
    <div className={`group relative flex items-center p-5 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
      theme === 'dark' 
        ? 'bg-black/60 border-white/20 hover:border-white text-white' 
        : 'bg-white shadow-sm border-[#D4AF37]/40 hover:border-[#D4AF37] text-black'
    }`}>
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl mr-5 font-bold text-lg shadow-inner border ${
        theme === 'dark'
          ? 'bg-white/10 border-white/30 text-white'
          : `${metadata.color} border-[#D4AF37]/30 text-black`
      }`}>
        {index + 1}
      </div>
      
      <div className="flex-1">
        <h4 className={`font-bold text-xl leading-tight transition-colors ${
          theme === 'dark' ? 'group-hover:text-[#FFD700]' : 'group-hover:text-black'
        }`}>
          {lesson.name}
        </h4>
        <div className={`flex items-center mt-1 text-xs font-bold uppercase tracking-widest opacity-60`}>
          <span className="mr-2">{metadata.icon}</span>
          {lesson.type === 'language' ? "Til o'rganish" : 
           lesson.type === 'math' ? 'Aniq fanlar' : 
           lesson.type === 'science' ? 'Tabiiy fanlar' : 
           lesson.type === 'it' ? 'Axborot texnologiyalari' :
           lesson.type === 'history' ? 'Ijtimoiy fanlar' : 'Boshqa'}
        </div>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div className={`h-2 w-2 rounded-full animate-pulse ${
          theme === 'dark' ? 'bg-[#FFD700]' : 'bg-black'
        }`}></div>
      </div>
    </div>
  );
};
