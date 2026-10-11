import { StudentProvider, useStudent } from './context/StudentContext';
import './styles.css';
import './styles/student-workspace.css';
import { useMemo, useState } from 'react';
import StudentWorkspace from './components/StudentWorkspace';

type Role = 'Student' | 'Freedom' | 'Open';

type RoleConfig = {
  title: string;
  tagline: string;
  focus: string[];
};

const roleConfig: Record<Role, RoleConfig> = {
  Student: {
    title: 'Student',
    tagline: 'Academic clarity with room to explore beyond the syllabus.',
    focus: ['Ongoing learning', 'Curriculum', 'Rigidity Bar', 'Revision'],
  },
  Freedom: {
    title: 'Freedom',
    tagline: 'Understand what matters, build capability, and make original work.',
    focus: ['Discovery', 'Capability', 'Project work', 'Curiosity'],
  },
  Open: {
    title: 'Open',
    tagline: 'Shared learning, public knowledge, and community contributions.',
    focus: ['Community', 'Teaching', 'Reports', 'Saved ideas'],
  },
};

function AppContent() {
  const { profile } = useStudent();
  const [role, setRole] = useState<Role>('Student');

  const activeTrack = profile.tracks[0];

  const summary = useMemo(() => {
    const totalTopicCount = profile.tracks.reduce((sum, track) => sum + track.topics.length, 0);
    const inProgressCount = Object.values(profile.progress).filter((entry) => entry.state !== 'Not Started').length;
    return { totalTopicCount, inProgressCount };
  }, [profile.progress, profile.tracks]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark" aria-label="BEYOND logo">
            <span className="brand-mark__inner" />
          </div>
          <div>
            <p className="eyebrow">LEARNING ECOSYSTEM</p>
            <h1>BEYOND</h1>
          </div>
        </div>

        <nav className="primary-nav" aria-label="Role selector">
          {(['Student', 'Freedom', 'Open'] as Role[]).map((item) => (
            <button
              key={item}
              type="button"
              className={`nav-pill ${role === item ? 'selected' : ''}`}
              onClick={() => setRole(item)}
            >
              <span>{item}</span>
            </button>
          ))}
        </nav>

        <div className="mini-panel">
          <p className="panel-label">Active role</p>
          <h2>{roleConfig[role].title}</h2>
          <p>{roleConfig[role].tagline}</p>
        </div>

        <div className="mini-panel muted">
          <p className="panel-label">Current focus</p>
          <ul>
            {roleConfig[role].focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow soft">Role selector</p>
            <h2>What are you here to do today?</h2>
          </div>
          <button type="button" className="ghost-button">
            Search BEYOND
          </button>
        </header>

        <section className="hero">
          <div>
            <p className="purple-label">{roleConfig[role].title}</p>
            <h3>{roleConfig[role].tagline}</h3>
          </div>
          <div className="hero-actions">
            <button type="button">Create my material</button>
            <button type="button" className="secondary">
              Use my material
            </button>
          </div>
        </section>

        <div className="content-grid">
          <div className="section-panel wide-panel">
            {role === 'Student' && activeTrack ? (
              <StudentWorkspace trackId={activeTrack.id} />
            ) : (
              <div className="panel-stack">
                <div className="section-panel wide-panel">
                  <div className="panel-header">
                    <h4>{role} overview</h4>
                    <span className="chip">Ready for expansion</span>
                  </div>
                  <div className="hero-strip">
                    <div>
                      <p className="purple-label">{role}</p>
                      <h5>Build your next learning and creation flow here.</h5>
                    </div>
                    <div className="status-box">
                      <span>Current scope</span>
                      <strong>{summary.totalTopicCount} tracked topics</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="section-panel side-panel">
            <div className="panel-header">
              <h4>Overview</h4>
              <span className="chip">Live</span>
            </div>
            <div className="mini-panel muted">
              <p className="panel-label">Student snapshot</p>
              <ul>
                <li>{profile.tracks.length} active tracks</li>
                <li>{summary.totalTopicCount} topics</li>
                <li>{summary.inProgressCount} in progress</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <StudentProvider>
      <AppContent />
    </StudentProvider>
  );
}
