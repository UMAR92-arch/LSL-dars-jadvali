
export type SubjectType = 'language' | 'science' | 'math' | 'it' | 'sport' | 'art' | 'history' | 'other';

export interface Lesson {
  id: string;
  name: string;
  type: SubjectType;
}

export interface DaySchedule {
  dayName: string;
  lessons: Lesson[];
}

export interface AppState {
  currentDayIndex: number;
}
