
import React from 'react';
import { Lesson } from '../types';
import { SUBJECT_METADATA } from '../constants';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, index }) => {
  const metadata = SUBJECT_METADATA[lesson.type];

  return (
    <div className="group relative flex items-center p-4 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-1">
      <div className={`flex items-center justify-center w-10 h-10 rounded-xl mr-4 font-bold text-sm ${metadata.color} border shadow-inner`}>
        {index + 1}
      </div>
      
      <div className="flex-1">
        <h4 className="text-slate-800 font-semibold text-lg leading-tight group-hover:text-indigo-600 transition-colors">
          {lesson.name}
        </h4>
        <div className="flex items-center mt-1 text-slate-400 text-xs font-medium uppercase tracking-wider">
          <span className="mr-1.5 opacity-70">{metadata.icon}</span>
          {lesson.type === 'language' ? 'Til o\'rganish' : 
           lesson.type === 'math' ? 'Aniq fanlar' : 
           lesson.type === 'science' ? 'Tabiiy fanlar' : 
           lesson.type === 'it' ? 'Axborot texnologiyalari' :
           lesson.type === 'history' ? 'Ijtimoiy fanlar' : 'Boshqa'}
        </div>
      </div>

      <div className="hidden group-hover:flex absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
      </div>
    </div>
  );
};
