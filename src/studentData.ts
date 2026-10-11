import { StudentProfile, Topic } from './types';

const topicLibrary: Record<string, Topic> = {
  'fundamentals-logic': {
    id: 'fundamentals-logic',
    title: 'Logic Foundations',
    summary: 'Understand reasoning patterns, structure, and how to break down complex parts into solvable problems.',
    level: 'Intro',
    tags: ['logic', 'problem solving', 'reasoning'],
    relatedTopicIds: ['systems-thinking', 'pattern-recognition'],
  },
  'systems-thinking': {
    id: 'systems-thinking',
    title: 'Systems Thinking',
    summary: 'Learn how individual decisions affect larger systems and why feedback loops matter in learning and production.',
    level: 'Core',
    tags: ['systems', 'feedback'],
    relatedTopicIds: ['fundamentals-logic', 'research-methods'],
  },
  'pattern-recognition': {
    id: 'pattern-recognition',
    title: 'Pattern Recognition',
    summary: 'Spot recurring structures and apply familiar solutions to new problems more effectively.',
    level: 'Intro',
    tags: ['patterns', 'analysis'],
    relatedTopicIds: ['fundamentals-logic', 'research-methods'],
  },
  'research-methods': {
    id: 'research-methods',
    title: 'Research Methods',
    summary: 'Gather evidence responsibly, compare sources, and build a reliable basis for understanding.',
    level: 'Core',
    tags: ['research', 'evidence'],
    relatedTopicIds: ['systems-thinking', 'critical-reading'],
  },
  'critical-reading': {
    id: 'critical-reading',
    title: 'Critical Reading',
    summary: 'Interpret complex material, identify assumptions, and extract meaningful insight from text.',
    level: 'Core',
    tags: ['reading', 'analysis'],
    relatedTopicIds: ['research-methods'],
  },
  'knowledge-organization': {
    id: 'knowledge-organization',
    title: 'Knowledge Organization',
    summary: 'Structure what you learn so it can be revisited, connected, and reused in future work.',
    level: 'Core',
    tags: ['organization', 'memory'],
    relatedTopicIds: ['critical-reading', 'systems-thinking'],
  },
  'self-directed-learning': {
    id: 'self-directed-learning',
    title: 'Self-Directed Learning',
    summary: 'Create your own learning loops, define priorities, and remain motivated without constant external guidance.',
    level: 'Advanced',
    tags: ['learning design', 'discipline'],
    relatedTopicIds: ['knowledge-organization', 'research-methods'],
  },
  'creative-iteration': {
    id: 'creative-iteration',
    title: 'Creative Iteration',
    summary: 'Turn rough ideas into better outcomes by testing, revising, and improving in cycles.',
    level: 'Advanced',
    tags: ['creativity', 'iteration'],
    relatedTopicIds: ['self-directed-learning', 'knowledge-organization'],
  },
};

export function seedKnowledgeLibrary(): Record<string, Topic> {
  return { ...topicLibrary };
}

export function createStudentProfile(studentId: string, role: StudentProfile['role']): StudentProfile {
  const tracks = [
    {
      id: 'deep-learning-track',
      title: 'Deep Learning Track',
      curriculum: 'Foundations + Systems + Practice',
      topics: [
        'fundamentals-logic',
        'systems-thinking',
        'pattern-recognition',
        'research-methods',
        'critical-reading',
        'knowledge-organization',
        'self-directed-learning',
        'creative-iteration',
      ],
    },
  ];

  const progress: Record<string, { state: 'Not Started' | 'In Progress' | 'Paused' | 'Review' | 'Mastered'; completionPercent: number; lastUpdated: string }> = {};

  tracks.forEach((track) => {
    track.topics.forEach((topicId, index) => {
      progress[`${track.id}:${topicId}`] = {
        state: index === 0 ? 'In Progress' : 'Not Started',
        completionPercent: index === 0 ? 32 : 0,
        lastUpdated: new Date().toISOString(),
      };
    });
  });

  return {
    id: studentId,
    role,
    tracks,
    progress,
    notes: [
      {
        id: 'note-seed-1',
        trackId: 'deep-learning-track',
        topicId: 'fundamentals-logic',
        type: 'rough',
        content: 'Build a simple method for distinguishing fact, assumption, and inference for every short concept I encounter.',
        tags: ['reasoning', 'method'],
        createdAt: new Date(),
        updatedAt: new Date(),
        isProcessed: false,
      },
    ],
    updatedAt: new Date(),
  };
}
