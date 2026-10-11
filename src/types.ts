export type TopicLevel = 'Intro' | 'Core' | 'Advanced';

export interface Topic {
  id: string;
  title: string;
  summary: string;
  level: TopicLevel;
  tags: string[];
  relatedTopicIds: string[];
}

export interface StudentProgress {
  state: 'Not Started' | 'In Progress' | 'Paused' | 'Review' | 'Mastered';
  completionPercent: number;
  lastUpdated: string;
}

export interface TopicTrack {
  id: string;
  title: string;
  curriculum?: string;
  topics: string[];
}

export interface StudentNote {
  id: string;
  trackId: string;
  topicId: string;
  type: 'rough' | 'review' | 'insight';
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isProcessed: boolean;
}

export interface StudentProfile {
  id: string;
  role: 'Student' | 'Freedom' | 'Open';
  tracks: TopicTrack[];
  progress: Record<string, StudentProgress>;
  notes: StudentNote[];
  updatedAt: Date;
}
