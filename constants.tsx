
import React from 'react';
import { 
  BookOpen, 
  Beaker, 
  Cpu, 
  Dribbble, 
  Palette, 
  History, 
  Calculator,
  Languages
} from 'lucide-react';
import { DaySchedule, SubjectType } from './types.ts';

export const SUBJECT_METADATA: Record<SubjectType, { color: string; icon: React.ReactNode }> = {
  language: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <Languages size={18} /> },
  science: { color: 'bg-sky-100 text-sky-700 border-sky-200', icon: <Beaker size={18} /> },
  math: { color: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: <Calculator size={18} /> },
  it: { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: <Cpu size={18} /> },
  sport: { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: <Dribbble size={18} /> },
  art: { color: 'bg-pink-100 text-pink-700 border-pink-200', icon: <Palette size={18} /> },
  history: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <History size={18} /> },
  other: { color: 'bg-slate-100 text-slate-700 border-slate-200', icon: <BookOpen size={18} /> },
};

const getSubjectType = (name: string): SubjectType => {
  const lowerName = name.toLowerCase();
  if (
    lowerName.includes('ona tili') || 
    lowerName.includes('ingilis') || 
    lowerName.includes('rus tili') || 
    lowerName.includes('adabiyot')
  ) return 'language';
  
  if (
    lowerName.includes('matem') || 
    lowerName.includes('algebra') || 
    lowerName.includes('geometriya')
  ) return 'math';
  
  if (
    lowerName.includes('fizika') || 
    lowerName.includes('kimyo') || 
    lowerName.includes('bialogiya') ||
    lowerName.includes('biologiya')
  ) return 'science';
  
  if (lowerName.includes('dasturlash')) return 'it';
  if (lowerName.includes('jistar') || lowerName.includes('tarbiya')) return 'sport';
  if (lowerName.includes('tarix') || lowerName.includes('huquq')) return 'history';
  if (lowerName.includes('texchiz') || lowerName.includes('texnologiya')) return 'art';
  
  return 'other';
};

const formatDay = (dayName: string, subjects: string[]): DaySchedule => ({
  dayName,
  lessons: subjects.map((name, index) => ({
    id: `${dayName}-${index}-${Math.random()}`,
    name,
    type: getSubjectType(name),
  })),
});

export const WEEKLY_SCHEDULE: DaySchedule[] = [
  formatDay('Dushanba', ['Ona tili', 'Matematika', 'Ingliz tili', 'Biologiya', 'Ingliz tili', 'O\'zbekiston tarixi', 'Kimyo']),
  formatDay('Seshanba', ['Ona tili', 'Tarbiya', 'Dasturlash', 'Matematika', 'Ingliz tili', 'Ingliz tili', 'Matematika']),
  formatDay('Chorshanba', ['Jismoniy tarbiya', 'Jismoniy tarbiya', 'Fizika', 'Rus tili', 'Dasturlash', 'Matematika', 'Tarix']),
  formatDay('Payshanba', ['Ingliz tili', 'Adabiyot', 'Fizika', 'Huquq', 'Rus tili', 'Ingliz tili', 'Tarix']),
  formatDay('Juma', ['Ona tili', 'Ingliz tili', 'Dasturlash', 'Dasturlash', 'Ingliz tili', 'Ingliz tili', 'Adabiyot']),
  formatDay('Shanba', ['Texnologiya/Chizmachilik', 'Biologiya', 'Matematika', 'Matematika', 'Matematika', 'Ingliz tili', 'Ingliz tili']),
];
