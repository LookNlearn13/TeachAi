import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0a0a0f;
    --paper: #f5f2eb;
    --cream: #ede9df;
    --accent: #e85d3a;
    --gold: #c9a84c;
    --teal: #2a7b6f;
    --slate: #3d4a5c;
    --muted: #8a8a9a;
    --card: #ffffff;
    --border: rgba(10,10,15,0.1);
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  .nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 40px; background: var(--ink); position: sticky; top: 0; z-index: 100;
    border-bottom: 2px solid var(--accent);
  }
  .nav-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem; color: var(--paper); letter-spacing: -0.02em; }
  .nav-logo span { color: var(--accent); }
  .nav-tabs { display: flex; gap: 4px; background: rgba(255,255,255,0.07); border-radius: 10px; padding: 4px; }
  .nav-tab {
    padding: 8px 18px; border-radius: 7px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 500;
    color: rgba(245,242,235,0.6); background: transparent; transition: all 0.2s;
  }
  .nav-tab.active { background: var(--accent); color: white; }
  .nav-tab:hover:not(.active) { color: var(--paper); }
  .nav-badge { background: var(--gold); color: var(--ink); font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 20px; }

  .hero {
    background: var(--ink); color: var(--paper); padding: 80px 40px 60px;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; top: -100px; right: -100px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,93,58,0.15) 0%, transparent 70%);
  }
  .hero-eyebrow { font-size: 0.8rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
  .hero-title { font-family: 'Syne', sans-serif; font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 800; line-height: 1.05; letter-spacing: -0.03em; max-width: 700px; margin-bottom: 20px; }
  .hero-title em { font-style: normal; color: var(--gold); }
  .hero-sub { color: rgba(245,242,235,0.65); font-size: 1.05rem; max-width: 500px; line-height: 1.6; margin-bottom: 40px; }
  .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
  .btn { padding: 12px 28px; border-radius: 8px; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; }
  .btn-primary { background: var(--accent); color: white; }
  .btn-primary:hover { background: #d44e2d; transform: translateY(-1px); }
  .btn-outline { background: transparent; color: var(--paper); border: 1.5px solid rgba(245,242,235,0.3); }
  .btn-outline:hover { border-color: var(--paper); background: rgba(255,255,255,0.05); }
  .hero-stats { display: flex; gap: 40px; margin-top: 48px; padding-top: 32px; border-top: 1px solid rgba(245,242,235,0.1); }
  .stat-num { font-family: 'Syne', sans-serif; font-size: 1.8rem; font-weight: 800; color: var(--paper); }
  .stat-label { font-size: 0.8rem; color: rgba(245,242,235,0.5); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px; }

  .main { flex: 1; padding: 40px; max-width: 1200px; margin: 0 auto; width: 100%; }

  .section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 24px; }
  .section-title { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 700; letter-spacing: -0.02em; }
  .section-link { font-size: 0.85rem; color: var(--accent); cursor: pointer; font-weight: 500; }

  .course-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-bottom: 48px; }
  .course-card {
    background: var(--card); border-radius: 16px; overflow: hidden;
    border: 1.5px solid var(--border); cursor: pointer;
    transition: all 0.25s; position: relative;
  }
  .course-card:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(10,10,15,0.12); border-color: var(--accent); }
  .course-thumb {
    height: 140px; display: flex; align-items: center; justify-content: center;
    font-size: 3rem; position: relative;
  }
  .course-thumb-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0)); }
  .course-live-badge {
    position: absolute; top: 12px; right: 12px; background: var(--accent);
    color: white; font-size: 0.7rem; font-weight: 700; padding: 3px 10px; border-radius: 20px;
    letter-spacing: 0.05em; display: flex; align-items: center; gap: 5px;
  }
  .live-dot { width: 6px; height: 6px; background: white; border-radius: 50%; animation: pulse 1.2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
  .course-body { padding: 20px; }
  .course-subject { font-size: 0.75rem; font-weight: 600; color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; }
  .course-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.05rem; margin-bottom: 8px; line-height: 1.3; }
  .course-meta { font-size: 0.82rem; color: var(--muted); margin-bottom: 14px; }
  .course-progress-bar { height: 4px; background: var(--cream); border-radius: 2px; margin-bottom: 6px; }
  .course-progress-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, var(--teal), var(--gold)); }
  .course-progress-label { font-size: 0.78rem; color: var(--muted); display: flex; justify-content: space-between; }

  .schedule-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 48px; }
  .schedule-item {
    background: var(--card); border-radius: 12px; padding: 16px 20px;
    border: 1.5px solid var(--border); display: flex; align-items: center; gap: 16px;
    cursor: pointer; transition: all 0.2s;
  }
  .schedule-item:hover { border-color: var(--teal); background: #f9fffe; }
  .schedule-item.live { border-color: var(--accent); background: #fff9f8; }
  .schedule-time { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.95rem; min-width: 80px; color: var(--slate); }
  .schedule-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
  .schedule-info { flex: 1; }
  .schedule-name { font-weight: 600; font-size: 0.95rem; margin-bottom: 2px; }
  .schedule-detail { font-size: 0.82rem; color: var(--muted); }
  .schedule-action { padding: 8px 18px; border-radius: 7px; font-size: 0.82rem; font-weight: 600; border: none; cursor: pointer; }
  .schedule-action.join { background: var(--accent); color: white; }
  .schedule-action.upcoming { background: var(--cream); color: var(--slate); }

  .classroom {
    background: var(--ink); border-radius: 20px; overflow: hidden;
    border: 1.5px solid rgba(245,242,235,0.1); margin-bottom: 48px;
  }
  .classroom-header {
    padding: 20px 28px; display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid rgba(245,242,235,0.1);
  }
  .classroom-title { font-family: 'Syne', sans-serif; color: var(--paper); font-weight: 700; font-size: 1.1rem; }
  .classroom-meta { font-size: 0.8rem; color: rgba(245,242,235,0.5); margin-top: 2px; }
  .classroom-badges { display: flex; gap: 8px; }
  .cbadge { padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
  .cbadge-live { background: rgba(232,93,58,0.2); color: var(--accent); border: 1px solid rgba(232,93,58,0.3); }
  .cbadge-rec { background: rgba(42,123,111,0.2); color: #4ecdc4; border: 1px solid rgba(42,123,111,0.3); }
  .classroom-body { display: grid; grid-template-columns: 1fr 320px; min-height: 400px; }
  .classroom-stage {
    padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center;
    position: relative; border-right: 1px solid rgba(245,242,235,0.1);
  }
  .ai-teacher-avatar {
    width: 120px; height: 120px; border-radius: 50%; margin-bottom: 24px;
    background: linear-gradient(135deg, var(--accent), var(--gold));
    display: flex; align-items: center; justify-content: center; font-size: 3rem;
    position: relative;
  }
  .avatar-ring {
    position: absolute; inset: -6px; border-radius: 50%;
    border: 2px solid transparent;
    background: linear-gradient(var(--ink), var(--ink)) padding-box,
                linear-gradient(135deg, var(--accent), var(--gold)) border-box;
    animation: spin 3s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .speaking-waves { display: flex; gap: 4px; align-items: center; margin-bottom: 20px; }
  .wave-bar {
    width: 4px; background: var(--accent); border-radius: 2px;
    animation: wave 0.8s ease-in-out infinite;
  }
  .wave-bar:nth-child(1){height:12px;animation-delay:0s}
  .wave-bar:nth-child(2){height:24px;animation-delay:0.1s}
  .wave-bar:nth-child(3){height:36px;animation-delay:0.2s}
  .wave-bar:nth-child(4){height:24px;animation-delay:0.3s}
  .wave-bar:nth-child(5){height:12px;animation-delay:0.4s}
  @keyframes wave { 0%,100%{transform:scaleY(0.5)} 50%{transform:scaleY(1)} }
  .teacher-speech {
    background: rgba(245,242,235,0.06); border-radius: 12px; padding: 16px 20px;
    max-width: 480px; text-align: center; color: var(--paper);
    font-size: 0.95rem; line-height: 1.6; font-style: italic;
    border: 1px solid rgba(245,242,235,0.1);
  }
  .classroom-sidebar { display: flex; flex-direction: column; }
  .sidebar-section { padding: 20px; border-bottom: 1px solid rgba(245,242,235,0.08); }
  .sidebar-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(245,242,235,0.4); margin-bottom: 12px; font-weight: 600; }
  .lesson-outline-item {
    display: flex; align-items: center; gap: 10px; padding: 8px 0;
    color: rgba(245,242,235,0.6); font-size: 0.85rem; cursor: pointer; transition: color 0.2s;
  }
  .lesson-outline-item.active { color: var(--paper); font-weight: 500; }
  .lesson-outline-item.done { color: rgba(245,242,235,0.35); }
  .outline-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .outline-dot.active { background: var(--accent); }
  .outline-dot.done { background: var(--teal); }
  .outline-dot.pending { background: rgba(245,242,235,0.2); border: 1px solid rgba(245,242,235,0.3); }
  .student-list { display: flex; flex-direction: column; gap: 8px; }
  .student-item { display: flex; align-items: center; gap: 10px; }
  .student-avatar { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, var(--teal), var(--gold)); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: white; }
  .student-name { font-size: 0.82rem; color: rgba(245,242,235,0.7); }
  .student-status { margin-left: auto; font-size: 0.7rem; color: var(--teal); }

  .lesson-plan-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; margin-bottom: 48px; }
  .day-card {
    background: var(--card); border-radius: 12px; padding: 14px 12px;
    border: 1.5px solid var(--border); cursor: pointer; transition: all 0.2s; text-align: center;
  }
  .day-card:hover { border-color: var(--teal); transform: translateY(-2px); }
  .day-card.today { border-color: var(--accent); background: #fff9f8; }
  .day-card.completed { border-color: var(--teal); background: #f4faf9; }
  .day-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 6px; font-weight: 600; }
  .day-num { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem; margin-bottom: 8px; }
  .day-card.today .day-num { color: var(--accent); }
  .day-card.completed .day-num { color: var(--teal); }
  .day-topics { display: flex; flex-direction: column; gap: 4px; }
  .day-topic { font-size: 0.72rem; background: var(--cream); border-radius: 4px; padding: 3px 6px; color: var(--slate); }
  .day-card.today .day-topic { background: rgba(232,93,58,0.1); color: var(--accent); }
  .day-card.completed .day-topic { background: rgba(42,123,111,0.1); color: var(--teal); }

  .generate-section {
    background: linear-gradient(135deg, var(--teal) 0%, #1a5a50 100%);
    border-radius: 20px; padding: 40px; margin-bottom: 48px; position: relative; overflow: hidden;
  }
  .generate-section::before {
    content: ''; position: absolute; top: -60px; right: -60px; width: 200px; height: 200px;
    border-radius: 50%; background: rgba(255,255,255,0.05);
  }
  .generate-title { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; color: white; margin-bottom: 8px; }
  .generate-sub { color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 28px; max-width: 500px; line-height: 1.6; }
  .generate-form { display: flex; gap: 12px; flex-wrap: wrap; }
  .gen-input {
    flex: 1; min-width: 200px; background: rgba(255,255,255,0.12); border: 1.5px solid rgba(255,255,255,0.2);
    border-radius: 10px; padding: 12px 16px; color: white; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; outline: none;
  }
  .gen-input::placeholder { color: rgba(255,255,255,0.4); }
  .gen-input:focus { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.15); }
  .gen-select {
    background: rgba(255,255,255,0.12); border: 1.5px solid rgba(255,255,255,0.2);
    border-radius: 10px; padding: 12px 16px; color: white; font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; outline: none; cursor: pointer;
  }
  .gen-select option { background: #1a5a50; }
  .btn-generate {
    padding: 12px 28px; background: white; color: var(--teal); font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 0.9rem; border: none; border-radius: 10px; cursor: pointer; transition: all 0.2s; white-space: nowrap;
  }
  .btn-generate:hover { background: var(--paper); transform: translateY(-1px); }
  .btn-generate:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .generated-plan { background: white; border-radius: 16px; border: 1.5px solid var(--border); overflow: hidden; margin-bottom: 48px; }
  .plan-header { padding: 20px 24px; background: var(--ink); display: flex; align-items: center; justify-content: space-between; }
  .plan-header-title { font-family: 'Syne', sans-serif; color: white; font-weight: 700; }
  .plan-header-sub { font-size: 0.82rem; color: rgba(255,255,255,0.5); margin-top: 2px; }
  .plan-content { padding: 24px; font-size: 0.9rem; line-height: 1.8; color: var(--slate); }
  .plan-content h3 { font-family: 'Syne', sans-serif; font-weight: 700; margin: 16px 0 8px; color: var(--ink); font-size: 1rem; }
  .plan-content ul { padding-left: 20px; }
  .plan-content li { margin-bottom: 4px; }

  .voice-section {
    background: var(--card); border-radius: 20px; padding: 32px;
    border: 1.5px solid var(--border); margin-bottom: 48px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
  }
  .voice-title { font-family: 'Syne', sans-serif; font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
  .voice-sub { color: var(--muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 20px; }
  .voice-recorder { background: var(--cream); border-radius: 14px; padding: 24px; text-align: center; border: 2px dashed rgba(10,10,15,0.15); }
  .record-btn {
    width: 72px; height: 72px; border-radius: 50%; background: var(--accent);
    border: none; cursor: pointer; font-size: 1.8rem; margin-bottom: 12px; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;
  }
  .record-btn:hover { transform: scale(1.08); background: #d44e2d; }
  .record-btn.recording { animation: recordPulse 0.8s ease-in-out infinite; background: #c0392b; }
  @keyframes recordPulse { 0%,100%{box-shadow:0 0 0 0 rgba(232,93,58,0.4)} 50%{box-shadow:0 0 0 20px rgba(232,93,58,0)} }
  .record-label { font-size: 0.85rem; color: var(--muted); }
  .voice-samples { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
  .voice-sample { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: white; border-radius: 10px; border: 1.5px solid var(--border); }
  .sample-play { width: 34px; height: 34px; background: var(--teal); border-radius: 50%; border: none; cursor: pointer; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; color: white; }
  .sample-info { flex: 1; }
  .sample-name { font-size: 0.85rem; font-weight: 500; }
  .sample-dur { font-size: 0.75rem; color: var(--muted); }
  .sample-wave { flex: 1; height: 24px; background: repeating-linear-gradient(90deg, var(--teal) 0px, var(--teal) 2px, transparent 2px, transparent 6px); border-radius: 2px; opacity: 0.3; }
  .voice-preview { background: var(--ink); border-radius: 14px; padding: 24px; color: var(--paper); }
  .preview-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(245,242,235,0.4); margin-bottom: 16px; }
  .preview-avatar-row { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
  .preview-avatar { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--gold)); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
  .preview-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; }
  .preview-role { font-size: 0.8rem; color: rgba(245,242,235,0.5); }
  .preview-text { font-size: 0.88rem; line-height: 1.7; color: rgba(245,242,235,0.75); font-style: italic; margin-bottom: 16px; }
  .voice-waveform { display: flex; align-items: center; gap: 3px; height: 32px; }
  .vwave { width: 3px; background: var(--accent); border-radius: 2px; opacity: 0.7; }

  .loading-dots { display: flex; gap: 6px; align-items: center; justify-content: center; padding: 20px; }
  .loading-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; animation: bounce 0.8s ease-in-out infinite; }
  .loading-dot:nth-child(2){animation-delay:0.15s}
  .loading-dot:nth-child(3){animation-delay:0.3s}
  @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

  @media (max-width: 768px) {
    .nav { padding: 14px 20px; }
    .nav-tabs { display: none; }
    .hero { padding: 48px 20px 40px; }
    .main { padding: 24px 20px; }
    .classroom-body { grid-template-columns: 1fr; }
    .classroom-sidebar { display: none; }
    .lesson-plan-grid { grid-template-columns: repeat(4, 1fr); }
    .voice-section { grid-template-columns: 1fr; }
    .hero-stats { gap: 24px; }
  }
`;

const COURSES = [
  { id: 1, emoji: "🧮", bg: "#1a1a2e", name: "Advanced Mathematics", subject: "Math", topics: "Calculus, Linear Algebra", lessons: 24, done: 14, isLive: true },
  { id: 2, emoji: "⚗️", bg: "#0d1b2a", name: "Physics Fundamentals", subject: "Science", topics: "Mechanics, Waves", lessons: 20, done: 8, isLive: false },
  { id: 3, emoji: "🌍", bg: "#162032", name: "World History", subject: "History", topics: "WWII, Cold War", lessons: 18, done: 18, isLive: false },
  { id: 4, emoji: "💻", bg: "#0a1628", name: "Python Programming", subject: "CS", topics: "OOP, Data Structures", lessons: 30, done: 22, isLive: true },
];

const SCHEDULE = [
  { time: "09:00 AM", name: "Advanced Mathematics", topic: "Integration by Parts", icon: "🧮", bg: "#e85d3a", isLive: true },
  { time: "11:00 AM", name: "Physics Fundamentals", topic: "Wave Mechanics", icon: "⚗️", bg: "#2a7b6f", isLive: false },
  { time: "02:00 PM", name: "Python Programming", topic: "Binary Trees", icon: "💻", bg: "#c9a84c", isLive: false },
  { time: "04:00 PM", name: "English Literature", topic: "Shakespearean Sonnets", icon: "📚", bg: "#3d4a5c", isLive: false },
];

const WEEK_DAYS = [
  { day: "Mon", num: 21, topics: ["Derivatives", "Limits"], state: "completed" },
  { day: "Tue", num: 22, topics: ["Integrals", "Areas"], state: "completed" },
  { day: "Wed", num: 23, topics: ["ODEs", "Models"], state: "completed" },
  { day: "Thu", num: 24, topics: ["Vectors", "Matrices"], state: "completed" },
  { day: "Fri", num: 25, topics: ["Eigenvalues", "Transforms"], state: "today" },
  { day: "Sat", num: 26, topics: ["Review", "Practice"], state: "upcoming" },
  { day: "Sun", num: 27, topics: ["Test Prep", "Mock"], state: "upcoming" },
];

const OUTLINE = [
  { title: "Introduction to Derivatives", state: "done" },
  { title: "Chain Rule Applications", state: "done" },
  { title: "Integration by Parts", state: "active" },
  { title: "Definite Integrals", state: "pending" },
  { title: "Practice Problems", state: "pending" },
];

const STUDENTS = [
  { name: "Aryan K.", initials: "AK", status: "watching" },
  { name: "Priya M.", initials: "PM", status: "watching" },
  { name: "Rahul S.", initials: "RS", status: "away" },
  { name: "Sana T.", initials: "ST", status: "watching" },
];

const VOICE_SAMPLES = [
  { name: "Sample 1 — Intro", dur: "0:32" },
  { name: "Sample 2 — Explanation", dur: "0:58" },
  { name: "Sample 3 — Conclusion", dur: "0:24" },
];

const TAB_LABELS = ["Dashboard", "Live Classes", "Lesson Plans", "My Voice", "Analytics"];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("4 weeks");
  const [level, setLevel] = useState("Intermediate");
  const [recording, setRecording] = useState(false);
  const [classStarted, setClassStarted] = useState(false);

  const generatePlan = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setGeneratedPlan(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: `Create a detailed ${duration} lesson plan for "${topic}" at ${level} level. Format it day by day for the first week with specific learning objectives, activities, and resources. Use clear headings and bullet points.` }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("\n") || "Could not generate plan.";
      setGeneratedPlan({ topic, text });
    } catch (e) {
      setGeneratedPlan({ topic, text: "Error generating plan. Please check your connection." });
    }
    setGenerating(false);
  };

  const renderMarkdown = (text) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("### ") || line.startsWith("## ") || line.startsWith("# ")) return <h3 key={i}>{line.replace(/^#+\s/, "")}</h3>;
      if (line.startsWith("- ") || line.startsWith("* ")) return <li key={i}>{line.slice(2)}</li>;
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} style={{margin:"2px 0"}}>{line}</p>;
    });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <nav className="nav">
          <div className="nav-logo">Teach<span>AI</span></div>
          <div className="nav-tabs">
            {TAB_LABELS.map((t, i) => (
              <button key={i} className={`nav-tab ${activeTab === i ? "active" : ""}`} onClick={() => setActiveTab(i)}>{t}</button>
            ))}
          </div>
          <div className="nav-badge">🎓 Pro</div>
        </nav>

        {activeTab === 0 && (
          <div className="hero">
            <div className="hero-eyebrow">AI-Powered Education Platform</div>
            <h1 className="hero-title">Your <em>AI Teacher</em> takes class — in your voice</h1>
            <p className="hero-sub">Generate lesson plans, let AI deliver live sessions using your cloned voice, and review student progress daily.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => setActiveTab(1)}>▶ Start Live Class</button>
              <button className="btn btn-outline" onClick={() => setActiveTab(2)}>📋 View Lesson Plans</button>
            </div>
            <div className="hero-stats">
              <div><div className="stat-num">4</div><div className="stat-label">Active Courses</div></div>
              <div><div className="stat-num">248</div><div className="stat-label">Students Enrolled</div></div>
              <div><div className="stat-num">62h</div><div className="stat-label">AI Classes Delivered</div></div>
              <div><div className="stat-num">94%</div><div className="stat-label">Satisfaction Rate</div></div>
            </div>
          </div>
        )}

        <div className="main">
          {activeTab === 0 && (
            <>
              <div className="section-header">
                <div className="section-title">Today's Schedule</div>
                <div className="section-link" onClick={() => setActiveTab(1)}>View all →</div>
              </div>
              <div className="schedule-list">
                {SCHEDULE.map((s, i) => (
                  <div key={i} className={`schedule-item ${s.isLive ? "live" : ""}`} onClick={() => setActiveTab(1)}>
                    <div className="schedule-time">{s.time}</div>
                    <div className="schedule-icon" style={{background: s.bg + "22"}}>{s.icon}</div>
                    <div className="schedule-info">
                      <div className="schedule-name">{s.name}</div>
                      <div className="schedule-detail">{s.topic} · AI Teacher active</div>
                    </div>
                    <button className={`schedule-action ${s.isLive ? "join" : "upcoming"}`}>
                      {s.isLive ? "🔴 Join Live" : "View"}
                    </button>
                  </div>
                ))}
              </div>
              <div className="section-header">
                <div className="section-title">Your Courses</div>
              </div>
              <div className="course-grid">
                {COURSES.map(c => (
                  <div key={c.id} className="course-card" onClick={() => setActiveTab(1)}>
                    <div className="course-thumb" style={{background: c.bg}}>
                      <span style={{fontSize:"3rem", position:"relative", zIndex:1}}>{c.emoji}</span>
                      <div className="course-thumb-overlay" />
                      {c.isLive && <div className="course-live-badge"><div className="live-dot"/>LIVE</div>}
                    </div>
                    <div className="course-body">
                      <div className="course-subject">{c.subject}</div>
                      <div className="course-name">{c.name}</div>
                      <div className="course-meta">{c.topics} · {c.lessons} lessons</div>
                      <div className="course-progress-bar">
                        <div className="course-progress-fill" style={{width: `${Math.round((c.done/c.lessons)*100)}%`}} />
                      </div>
                      <div className="course-progress-label">
                        <span>{c.done}/{c.lessons} lessons</span>
                        <span>{Math.round((c.done/c.lessons)*100)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 1 && (
            <>
              <div className="section-header">
                <div className="section-title">Live AI Classroom</div>
                <button className="btn btn-primary" style={{padding:'8px 20px',fontSize:'0.85rem'}} onClick={() => setClassStarted(!classStarted)}>
                  {classStarted ? "⏹ End Class" : "▶ Start Class"}
                </button>
              </div>
              <div className="classroom">
                <div className="classroom-header">
                  <div>
                    <div className="classroom-title">Advanced Mathematics — Integration by Parts</div>
                    <div className="classroom-meta">Lesson 15 of 24 · Fri, Apr 25 · 09:00 AM</div>
                  </div>
                  <div className="classroom-badges">
                    {classStarted && <div className="cbadge cbadge-live"><span style={{marginRight:4}}>●</span> LIVE</div>}
                    <div className="cbadge cbadge-rec">🎙 Voice Cloned</div>
                  </div>
                </div>
                <div className="classroom-body">
                  <div className="classroom-stage">
                    <div className="ai-teacher-avatar">
                      🧑‍🏫
                      {classStarted && <div className="avatar-ring" />}
                    </div>
                    {classStarted && (
                      <div className="speaking-waves">
                        {[1,2,3,4,5].map(i => <div key={i} className="wave-bar" />)}
                      </div>
                    )}
                    <div className="teacher-speech">
                      {classStarted ? '"Good morning class! Today we explore Integration by Parts — one of the most elegant techniques in calculus..."' : '"Click Start Class to begin the AI-powered session."'}
                    </div>
                  </div>
                  <div className="classroom-sidebar">
                    <div className="sidebar-section">
                      <div className="sidebar-label">Lesson Outline</div>
                      {OUTLINE.map((o, i) => (
                        <div key={i} className={`lesson-outline-item ${o.state}`}>
                          <div className={`outline-dot ${o.state}`} />
                          {o.title}
                        </div>
                      ))}
                    </div>
                    <div className="sidebar-section">
                      <div className="sidebar-label">Students Online ({STUDENTS.length})</div>
                      <div className="student-list">
                        {STUDENTS.map((s, i) => (
                          <div key={i} className="student-item">
                            <div className="student-avatar">{s.initials}</div>
                            <div className="student-name">{s.name}</div>
                            <div className="student-status">{s.status === "watching" ? "👁" : "💤"}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-header"><div className="section-title">Today's Schedule</div></div>
              <div className="schedule-list">
                {SCHEDULE.map((s, i) => (
                  <div key={i} className={`schedule-item ${s.isLive ? "live" : ""}`}>
                    <div className="schedule-time">{s.time}</div>
                    <div className="schedule-icon" style={{background: s.bg + "22"}}>{s.icon}</div>
                    <div className="schedule-info">
                      <div className="schedule-name">{s.name}</div>
                      <div className="schedule-detail">Topic: {s.topic}</div>
                    </div>
                    <button className={`schedule-action ${s.isLive ? "join" : "upcoming"}`}>
                      {s.isLive ? "🔴 Active" : "Scheduled"}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 2 && (
            <>
              <div className="generate-section">
                <div className="generate-title">✨ Generate AI Lesson Plan</div>
                <div className="generate-sub">Type any topic and let AI create a complete day-by-day lesson plan.</div>
                <div className="generate-form">
                  <input className="gen-input" placeholder="e.g. Real Numbers, Trigonometry, Python..." value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === "Enter" && generatePlan()} />
                  <select className="gen-select" value={duration} onChange={e => setDuration(e.target.value)}>
                    <option>1 week</option><option>2 weeks</option><option>4 weeks</option><option>8 weeks</option>
                  </select>
                  <select className="gen-select" value={level} onChange={e => setLevel(e.target.value)}>
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                  </select>
                  <button className="btn-generate" onClick={generatePlan} disabled={generating || !topic.trim()}>
                    {generating ? "Generating..." : "Generate →"}
                  </button>
                </div>
              </div>
              {generating && <div className="loading-dots"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}
              {generatedPlan && (
                <div className="generated-plan">
                  <div className="plan-header">
                    <div>
                      <div className="plan-header-title">📋 {generatedPlan.topic}</div>
                      <div className="plan-header-sub">{level} · {duration} · AI Generated</div>
                    </div>
                  </div>
                  <div className="plan-content">{renderMarkdown(generatedPlan.text)}</div>
                </div>
              )}
              <div className="section-header"><div className="section-title">This Week</div></div>
              <div className="lesson-plan-grid">
                {WEEK_DAYS.map((d, i) => (
                  <div key={i} className={`day-card ${d.state}`}>
                    <div className="day-label">{d.day}</div>
                    <div className="day-num">{d.num}</div>
                    <div className="day-topics">
                      {d.topics.map((t, j) => <div key={j} className="day-topic">{t}</div>)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 3 && (
            <>
              <div className="section-header"><div className="section-title">Voice Cloning Studio</div></div>
              <div className="voice-section">
                <div>
                  <div className="voice-title">🎙 Record Your Voice</div>
                  <div className="voice-sub">Record 3–5 samples of 30–60 seconds each. AI analyses your tone and rhythm to create a natural clone.</div>
                  <div className="voice-recorder">
                    <button className={`record-btn ${recording ? "recording" : ""}`} onClick={() => setRecording(!recording)}>
                      {recording ? "⏹" : "🎙"}
                    </button>
                    <div className="record-label">{recording ? "Recording... tap to stop" : "Tap to start recording"}</div>
                  </div>
                  <div className="voice-samples">
                    {VOICE_SAMPLES.map((s, i) => (
                      <div key={i} className="voice-sample">
                        <button className="sample-play">▶</button>
                        <div className="sample-info">
                          <div className="sample-name">{s.name}</div>
                          <div className="sample-dur">{s.dur}</div>
                        </div>
                        <div className="sample-wave" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="voice-preview">
                    <div className="preview-label">AI Voice Preview</div>
                    <div className="preview-avatar-row">
                      <div className="preview-avatar">🧑‍🏫</div>
                      <div>
                        <div className="preview-name">AI Teacher</div>
                        <div className="preview-role">Your cloned voice · Active</div>
                      </div>
                    </div>
                    <div className="preview-text">"Good morning everyone! Today we dive into the fascinating world of Real Numbers..."</div>
                    <div className="voice-waveform">
                      {Array.from({length: 40}, (_, i) => (
                        <div key={i} className="vwave" style={{height: `${8 + Math.sin(i * 0.5) * 10 + (i % 3) * 3}px`}} />
                      ))}
                    </div>
                  </div>
                  <div style={{marginTop:16, padding:'16px', background:'var(--cream)', borderRadius:12}}>
                    <div style={{fontSize:'0.8rem', fontWeight:600, marginBottom:8}}>Voice Quality Score</div>
                    <div style={{display:'flex', gap:8}}>
                      {[["Clarity","96%","var(--teal)"],["Natural","88%","var(--accent)"],["Expressive","91%","var(--gold)"]].map(([label, val, color], i) => (
                        <div key={i} style={{flex:1, textAlign:'center', background:'white', borderRadius:8, padding:'10px 8px'}}>
                          <div style={{fontWeight:800, fontSize:'1.1rem', color}}>{val}</div>
                          <div style={{fontSize:'0.72rem', color:'var(--muted)'}}>{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 4 && (
            <>
              <div className="section-header"><div className="section-title">Analytics</div></div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:16, marginBottom:32}}>
                {[["248","Total Students","👩‍🎓","var(--teal)"],["62h","AI Class Time","🤖","var(--accent)"],["94%","Engagement","💡","var(--gold)"],["18","This Week","📚","var(--slate)"]].map(([num, label, icon, color], i) => (
                  <div key={i} style={{background:'white', borderRadius:16, padding:'24px 20px', border:'1.5px solid var(--border)'}}>
                    <div style={{fontSize:'1.8rem', marginBottom:8}}>{icon}</div>
                    <div style={{fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'2rem', color}}>{num}</div>
                    <div style={{fontSize:'0.82rem', color:'var(--muted)', marginTop:4}}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{background:'white', borderRadius:16, padding:'28px', border:'1.5px solid var(--border)', marginBottom:32}}>
                <div style={{fontFamily:"'Syne',sans-serif", fontWeight:700, marginBottom:20}}>Weekly Attendance</div>
                <div style={{display:'flex', alignItems:'flex-end', gap:12, height:120}}>
                  {[["Mon",85],["Tue",92],["Wed",78],["Thu",96],["Fri",88],["Sat",45],["Sun",30]].map(([day, val], i) => (
                    <div key={i} style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6}}>
                      <div style={{fontSize:'0.72rem', color:'var(--muted)'}}>{val}%</div>
                      <div style={{width:'100%', borderRadius:'4px 4px 0 0', background: day === "Fri" ? "var(--accent)" : "var(--teal)", opacity: day === "Fri" ? 1 : 0.6, height:`${val}%`}} />
                      <div style={{fontSize:'0.72rem', color:'var(--muted)'}}>{day}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{background:'var(--ink)', borderRadius:16, padding:'28px', color:'var(--paper)'}}>
                <div style={{fontFamily:"'Syne',sans-serif", fontWeight:700, marginBottom:16}}>Course Progress</div>
                {COURSES.map((c, i) => (
                  <div key={i} style={{display:'flex', alignItems:'center', gap:14, padding:'12px 0', borderBottom:'1px solid rgba(245,242,235,0.08)'}}>
                    <div style={{fontSize:'1.4rem'}}>{c.emoji}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500, fontSize:'0.9rem'}}>{c.name}</div>
                      <div style={{fontSize:'0.78rem', color:'rgba(245,242,235,0.4)', marginTop:2}}>{c.done}/{c.lessons} lessons</div>
                    </div>
                    <div style={{fontFamily:"'Syne',sans-serif", fontWeight:700, color:'var(--gold)'}}>{Math.round((c.done/c.lessons)*100)}%</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
