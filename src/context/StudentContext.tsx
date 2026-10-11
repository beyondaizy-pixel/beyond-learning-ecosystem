import React, { createContext, useContext, useState, useCallback } from 'react';
import { StudentProgress, StudentProfile, StudentNote, Topic } from '../types';
import { seedKnowledgeLibrary, createStudentProfile } from './studentData';

interface StudentContextType {
  profile: StudentProfile;
  topics: Record<string, Topic>;
  updateTrackProgress: (trackId: string, topicId: string, progress: Partial<StudentProgress>) => void;
  addTrackNote: (trackId: string, topicId: string, content: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(() => createStudentProfile('student-1', 'Student'));
  const [topics] = useState<Record<string, Topic>>(() => seedKnowledgeLibrary());

  const updateTrackProgress = useCallback((trackId: string, topicId: string, updates: Partial<StudentProgress>) => {
    setProfile((previous) => {
      const key = `${trackId}:${topicId}`;
      const existing = previous.progress[key];

      if (!existing) {
        return previous;
      }

      return {
        ...previous,
        progress: {
          ...previous.progress,
          [key]: {
            ...existing,
            ...updates,
            lastUpdated: new Date().toISOString(),
          },
        },
        updatedAt: new Date(),
      };
    });
  }, []);

  const addTrackNote = useCallback((trackId: string, topicId: string, content: string) => {
    const note: StudentNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      trackId,
      topicId,
      type: 'rough',
      content,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isProcessed: false,
    };

    setProfile((previous) => ({
      ...previous,
      notes: [note, ...previous.notes],
      updatedAt: new Date(),
    }));
  }, []);

  const value: StudentContextType = {
    profile,
    topics,
    updateTrackProgress,
    addTrackNote,
  };

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
};

export const useStudent = (): StudentContextType => {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }

  return context;
};
