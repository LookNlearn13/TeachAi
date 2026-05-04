import { useState } from "react";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,400&family=Cabinet+Grotesk:wght@400;500;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f7f4ef;
    --ink: #111010;
    --card: #ffffff;
    --accent: #d94f2b;
    --accent2: #2b6cb0;
    --gold: #b8860b;
    --green: #276749;
    --border: #e2ddd6;
    --muted: #7a7570;
    --light: #ede9e2;
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Cabinet Grotesk', sans-serif; background: var(--bg); color: var(--ink); min-height: 100vh; }

  /* ── NAV ── */
  .nav {
    position: sticky; top: 0; z-index: 200;
    background: rgba(247,244,239,0.92); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 64px;
  }
  .nav-brand {
    font-family: 'Fraunces', serif; font-size: 1.5rem; font-weight: 900;
    letter-spacing: -0.03em; color: var(--ink);
  }
  .nav-brand span { color: var(--accent); }
  .nav-links { display: flex; gap: 2px; }
  .nav-btn {
    background: none; border: none; cursor: pointer;
    font-family: 'Cabinet Grotesk', sans-serif; font-size: 0.88rem; font-weight: 500;
    color: var(--muted); padding: 8px 16px; border-radius: 8px; transition: all 0.18s;
  }
  .nav-btn:hover { color: var(--ink); background: var(--light); }
  .nav-btn.active { color: var(--ink); background: var(--light); font-weight: 700; }
  .nav-cta {
    background: var(--ink); color: white; border: none; cursor: pointer;
    font-family: 'Cabinet Grotesk', sans-serif; font-size: 0.88rem; font-weight: 700;
    padding: 9px 20px; border-radius: 8px; transition: all 0.18s;
  }
  .nav-cta:hover { background: var(--accent); }

  /* ── HERO ── */
  .hero {
    min-height: 88vh; display: flex; align-items: center;
    padding: 80px 40px 60px; position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background:
      radial-gradient(ellipse 60% 50% at 80% 50%, rgba(217,79,43,0.07) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 10% 80%, rgba(43,108,176,0.06) 0%, transparent 70%);
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 48px 48px; opacity: 0.4;
  }
  .hero-inner { position: relative; z-index: 1; max-width: 760px; }
  .hero-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 100px; padding: 6px 14px 6px 8px;
    font-size: 0.8rem; font-weight: 600; color: var(--muted);
    margin-bottom: 28px;
  }
  .hero-pill-dot { width: 8px; height: 8px; background: var(--green); border-radius: 50%; animation: blink 2s infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .hero-title {
    font-family: 'Fraunces', serif; font-size: clamp(3rem, 7vw, 5.5rem);
    font-weight: 900; line-height: 1.02; letter-spacing: -0.03em;
    margin-bottom: 24px; color: var(--ink);
  }
  .hero-title em { font-style: italic; color: var(--accent); }
  .hero-sub {
    font-size: 1.15rem; color: var(--muted); line-height: 1.65;
    max-width: 520px; margin-bottom: 40px; font-weight: 400;
  }
  .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
  .btn-main {
    background: var(--ink); color: white; border: none; cursor: pointer;
    font-family: 'Cabinet Grotesk', sans-serif; font-weight: 700; font-size: 1rem;
    padding: 14px 32px; border-radius: 10px; transition: all 0.2s;
  }
  .btn-main:hover { background: var(--accent); transform: translateY(-2px); }
  .btn-sec {
    background: transparent; color: var(--ink);
    border: 1.5px solid var(--border); cursor: pointer;
    font-family: 'Cabinet Grotesk', sans-serif; font-weight: 600; font-size: 1rem;
    padding: 14px 32px; border-radius: 10px; transition: all 0.2s;
  }
  .btn-sec:hover { border-color: var(--ink); background: var(--light); }

  /* ── SECTION ── */
  .section { padding: 80px 40px; max-width: 1200px; margin: 0 auto; }
  .section-tag {
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 10px;
  }
  .section-title {
    font-family: 'Fraunces', serif; font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 900; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 8px;
  }
  .section-sub { color: var(--muted); font-size: 1rem; margin-bottom: 48px; max-width: 480px; }

  /* ── UPCOMING COURSES ── */
  .courses-empty {
    text-align: center; padding: 80px 40px;
    background: var(--card); border-radius: 20px; border: 1.5px dashed var(--border);
  }
  .courses-empty-icon { font-size: 3rem; margin-bottom: 16px; }
  .courses-empty-title { font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 700; margin-bottom: 8px; }
  .courses-empty-sub { color: var(--muted); font-size: 0.95rem; max-width: 360px; margin: 0 auto 24px; }

  .courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
  .course-card {
    background: var(--card); border-radius: 16px; border: 1.5px solid var(--border);
    overflow: hidden; transition: all 0.22s; cursor: pointer;
  }
  .course-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(17,16,16,0.1); border-color: var(--accent); }
  .course-banner {
    height: 130px; display: flex; align-items: center; justify-content: center;
    font-size: 2.8rem; position: relative;
  }
  .course-status {
    position: absolute; top: 12px; right: 12px;
    font-size: 0.7rem; font-weight: 700; padding: 4px 10px; border-radius: 20px;
    letter-spacing: 0.06em;
  }
  .status-upcoming { background: rgba(43,108,176,0.15); color: var(--accent2); border: 1px solid rgba(43,108,176,0.2); }
  .status-open { background: rgba(39,103,73,0.15); color: var(--green); border: 1px solid rgba(39,103,73,0.2); }
  .course-body { padding: 20px; }
  .course-tag { font-size: 0.72rem; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; }
  .course-name { font-family: 'Fraunces', serif; font-size: 1.15rem; font-weight: 700; margin-bottom: 6px; line-height: 1.3; }
  .course-desc { font-size: 0.85rem; color: var(--muted); margin-bottom: 16px; line-height: 1.5; }
  .course-meta { display: flex; gap: 12px; flex-wrap: wrap; }
  .course-meta-item { font-size: 0.8rem; color: var(--muted); display: flex; align-items: center; gap: 4px; }
  .course-footer { padding: 14px 20px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .course-price { font-family: 'Fraunces', serif; font-size: 1.1rem; font-weight: 700; }
  .course-enroll { background: var(--ink); color: white; border: none; cursor: pointer; font-family: 'Cabinet Grotesk', sans-serif; font-weight: 700; font-size: 0.82rem; padding: 8px 18px; border-radius: 7px; transition: all 0.18s; }
  .course-enroll:hover { background: var(--accent); }

  /* ── CLASSROOM ── */
  .classroom-wrap { background: var(--ink); border-radius: 24px; overflow: hidden; }
  .classroom-top { padding: 24px 32px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .classroom-top-title { font-family: 'Fraunces', serif; color: white; font-size: 1.2rem; font-weight: 700; }
  .classroom-top-sub { font-size: 0.82rem; color: rgba(255,255,255,0.4); margin-top: 2px; }
  .live-badge { display: flex; align-items: center; gap: 6px; background: rgba(217,79,43,0.2); color: #ff7c5c; border: 1px solid rgba(217,79,43,0.3); padding: 6px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; }
  .live-dot { width: 7px; height: 7px; background: #ff7c5c; border-radius: 50%; animation: blink 1s infinite; }
  .classroom-stage { padding: 60px 40px; display: flex; flex-direction: column; align-items: center; gap: 24px; }
  .ai-avatar { width: 110px; height: 110px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--gold)); display: flex; align-items: center; justify-content: center; font-size: 2.8rem; position: relative; }
  .ai-ring { position: absolute; inset: -7px; border-radius: 50%; border: 2px solid rgba(217,79,43,0.4); animation: ringPulse 2s ease-in-out infinite; }
  @keyframes ringPulse { 0%,100%{transform:scale(1);opacity:0.4} 50%{transform:scale(1.08);opacity:0.8} }
  .waves { display: flex; gap: 4px; align-items: center; }
  .wv { width: 4px; background: var(--accent); border-radius: 3px; animation: wv 0.7s ease-in-out infinite; }
  .wv:nth-child(1){height:10px;animation-delay:0s}
  .wv:nth-child(2){height:22px;animation-delay:0.1s}
  .wv:nth-child(3){height:34px;animation-delay:0.2s}
  .wv:nth-child(4){height:22px;animation-delay:0.3s}
  .wv:nth-child(5){height:10px;animation-delay:0.4s}
  @keyframes wv { 0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(1)} }
  .speech-bubble { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 18px 24px; max-width: 500px; text-align: center; color: rgba(255,255,255,0.8); font-size: 0.95rem; line-height: 1.65; font-style: italic; }
  .class-controls { display: flex; gap: 10px; }
  .ctrl-btn { padding: 10px 22px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.7); font-family: 'Cabinet Grotesk', sans-serif; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.18s; }
  .ctrl-btn:hover { background: rgba(255,255,255,0.12); color: white; }
  .ctrl-btn.primary { background: var(--accent); border-color: var(--accent); color: white; }
  .ctrl-btn.primary:hover { background: #c0421e; }

  /* ── STUDENT LOGIN ── */
  .login-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
  .login-left {}
  .login-form { background: var(--card); border: 1.5px solid var(--border); border-radius: 20px; padding: 36px; }
  .login-form-title { font-family: 'Fraunces', serif; font-size: 1.5rem; font-weight: 900; margin-bottom: 4px; }
  .login-form-sub { color: var(--muted); font-size: 0.88rem; margin-bottom: 28px; }
  .field { margin-bottom: 16px; }
  .field label { display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 6px; color: var(--ink); }
  .field input {
    width: 100%; background: var(--bg); border: 1.5px solid var(--border);
    border-radius: 10px; padding: 12px 14px; font-family: 'Cabinet Grotesk', sans-serif;
    font-size: 0.9rem; color: var(--ink); outline: none; transition: border-color 0.18s;
  }
  .field input:focus { border-color: var(--ink); background: white; }
  .field input::placeholder { color: var(--muted); }
  .login-submit {
    width: 100%; background: var(--ink); color: white; border: none; cursor: pointer;
    font-family: 'Cabinet Grotesk', sans-serif; font-weight: 700; font-size: 1rem;
    padding: 13px; border-radius: 10px; margin-top: 8px; transition: all 0.2s;
  }
  .login-submit:hover { background: var(--accent); }
  .login-divider { text-align: center; color: var(--muted); font-size: 0.82rem; margin: 16px 0; }
  .login-google {
    width: 100%; background: white; color: var(--ink); border: 1.5px solid var(--border); cursor: pointer;
    font-family: 'Cabinet Grotesk', sans-serif; font-weight: 600; font-size: 0.9rem;
    padding: 11px; border-radius: 10px; transition: all 0.2s;
  }
  .login-google:hover { border-color: var(--ink); }
  .login-info { display: flex; flex-direction: column; gap: 20px; }
  .info-card { background: var(--card); border: 1.5px solid var(--border); border-radius: 14px; padding: 20px; }
  .info-card-icon { font-size: 1.8rem; margin-bottom: 10px; }
  .info-card-title { font-family: 'Fraunces', serif; font-weight: 700; font-size: 1rem; margin-bottom: 4px; }
  .info-card-sub { font-size: 0.85rem; color: var(--muted); line-height: 1.5; }

  /* ── VOICE STUDIO ── */
  .voice-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
  .voice-card { background: var(--card); border: 1.5px solid var(--border); border-radius: 20px; padding: 28px; }
  .voice-card-title { font-family: 'Fraunces', serif; font-size: 1.1rem; font-weight: 700; margin-bottom: 6px; }
  .voice-card-sub { font-size: 0.85rem; color: var(--muted); margin-bottom: 24px; line-height: 1.5; }
  .record-area { background: var(--light); border-radius: 14px; padding: 32px; text-align: center; border: 2px dashed var(--border); }
  .rec-btn { width: 76px; height: 76px; border-radius: 50%; background: var(--accent); border: none; cursor: pointer; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; transition: all 0.2s; }
  .rec-btn:hover { transform: scale(1.08); background: #c0421e; }
  .rec-btn.on { animation: recPulse 0.9s ease-in-out infinite; }
  @keyframes recPulse { 0%,100%{box-shadow:0 0 0 0 rgba(217,79,43,0.3)} 50%{box-shadow:0 0 0 18px rgba(217,79,43,0)} }
  .rec-label { font-size: 0.85rem; color: var(--muted); font-weight: 500; }
  .step-list { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
  .step-item { display: flex; align-items: flex-start; gap: 12px; }
  .step-num { width: 26px; height: 26px; border-radius: 50%; background: var(--ink); color: white; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .step-text { font-size: 0.88rem; color: var(--muted); line-height: 1.5; }
  .preview-card { background: var(--ink); border-radius: 14px; padding: 24px; color: white; margin-top: 20px; }
  .preview-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .preview-av { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--gold)); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; }
  .preview-name { font-weight: 700; font-size: 0.95rem; }
  .preview-role { font-size: 0.78rem; color: rgba(255,255,255,0.45); }
  .preview-quote { font-size: 0.88rem; color: rgba(255,255,255,0.65); font-style: italic; line-height: 1.6; margin-bottom: 14px; }
  .waveform { display: flex; align-items: center; gap: 2px; height: 28px; }
  .wf-bar { width: 3px; background: var(--accent); border-radius: 2px; opacity: 0.6; }

  /* ── ANALYTICS ── */
  .analytics-empty { text-align: center; padding: 80px 40px; background: var(--card); border-radius: 20px; border: 1.5px dashed var(--border); }
  .stat-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; margin-bottom: 32px; }
  .stat-card { background: var(--card); border: 1.5px solid var(--border); border-radius: 14px; padding: 22px 20px; }
  .stat-icon { font-size: 1.6rem; margin-bottom: 10px; }
  .stat-num { font-family: 'Fraunces', serif; font-size: 2rem; font-weight: 900; line-height: 1; }
  .stat-label { font-size: 0.8rem; color: var(--muted); margin-top: 4px; }

  /* ── FOOTER ── */
  .footer { background: var(--ink); color: rgba(255,255,255,0.5); text-align: center; padding: 28px 40px; font-size: 0.85rem; margin-top: 80px; }
  .footer strong { color: white; font-family: 'Fraunces', serif; }

  /* ── TOAST ── */
  .toast { position: fixed; bottom: 24px; right: 24px; background: var(--ink); color: white; padding: 14px 20px; border-radius: 12px; font-size: 0.88rem; font-weight: 600; z-index: 999; animation: slideUp 0.3s ease; box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
  @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }

  /* ── RESPONSIVE ── */
  @media(max-width:768px){
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .hero { padding: 60px 20px 40px; min-height: auto; }
    .section { padding: 48px 20px; }
    .login-wrap { grid-template-columns: 1fr; }
    .voice-grid { grid-template-columns: 1fr; }
    .classroom-top { flex-direction: column; align-items: flex-start; gap: 12px; }
  }
`;

// ── UPCOMING COURSES DATA (add real ones here later) ──
const COURSES = [
  {
    id: 1,
    emoji: "🧮",
    bg: "#1a1a2e",
    subject: "Mathematics",
    name: "Class 10 CBSE Maths — Real Numbers to Polynomials",
    desc: "Complete chapter-by-chapter coverage of Class 10 CBSE Maths. Audio lessons daily, DPP sheets, and board exam practice.",
    startDate: "June 10, 2026",
    duration: "4 months",
    lessons: 80,
    price: "₹999",
    status: "open",
  },
];

const NAV_ITEMS = ["Home", "Live Class", "Student Login", "Voice Studio", "Analytics"];

export default function App() {
  const [tab, setTab] = useState(0);
  const [classOn, setClassOn] = useState(false);
  const [recording, setRecording] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      <style>{S}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-brand">Teach<span>AI</span></div>
        <div className="nav-links">
          {NAV_ITEMS.map((n, i) => (
            <button key={i} className={`nav-btn ${tab === i ? "active" : ""}`} onClick={() => setTab(i)}>{n}</button>
          ))}
        </div>
        <button className="nav-cta" onClick={() => setTab(2)}>Student Login →</button>
      </nav>

      {/* ══ HOME ══ */}
      {tab === 0 && (
        <>
          {/* HERO */}
          <div className="hero">
            <div className="hero-bg" />
            <div className="hero-grid" />
            <div className="hero-inner">
              <div className="hero-pill">
                <div className="hero-pill-dot" />
                Now enrolling — Class 10 CBSE Maths 2026–27
              </div>
              <h1 className="hero-title">
                Learn smarter.<br />
                With an <em>AI teacher</em><br />
                in your pocket.
              </h1>
              <p className="hero-sub">
                Daily audio lessons, AI-generated notes, and board-exam focused practice — designed for Class 10 CBSE students who want to score high without the chaos.
              </p>
              <div className="hero-actions">
                <button className="btn-main" onClick={() => setTab(0)}>Browse Courses ↓</button>
                <button className="btn-sec" onClick={() => setTab(2)}>Student Login</button>
              </div>
            </div>
          </div>

          {/* UPCOMING COURSES */}
          <div className="section">
            <div className="section-tag">Courses</div>
            <div className="section-title">Upcoming & Open Courses</div>
            <div className="section-sub">Enroll early — batch sizes are limited for personal attention.</div>

            {COURSES.length === 0 ? (
              <div className="courses-empty">
                <div className="courses-empty-icon">🚀</div>
                <div className="courses-empty-title">Courses Coming Soon</div>
                <div className="courses-empty-sub">We're preparing something great. Drop your email and we'll notify you the moment enrollment opens.</div>
                <div style={{display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap'}}>
                  <input placeholder="your@email.com" style={{padding:'11px 16px', borderRadius:9, border:'1.5px solid var(--border)', fontFamily:'Cabinet Grotesk', fontSize:'0.9rem', outline:'none', minWidth:220}} />
                  <button className="btn-main" style={{padding:'11px 24px', fontSize:'0.9rem'}} onClick={() => showToast("✅ You're on the waitlist!")}>Notify Me</button>
                </div>
              </div>
            ) : (
              <div className="courses-grid">
                {COURSES.map(c => (
                  <div key={c.id} className="course-card">
                    <div className="course-banner" style={{background: c.bg}}>
                      <span>{c.emoji}</span>
                      <div className={`course-status ${c.status === "open" ? "status-open" : "status-upcoming"}`}>
                        {c.status === "open" ? "✅ Enrolling" : "🔜 Upcoming"}
                      </div>
                    </div>
                    <div className="course-body">
                      <div className="course-tag">{c.subject}</div>
                      <div className="course-name">{c.name}</div>
                      <div className="course-desc">{c.desc}</div>
                      <div className="course-meta">
                        <div className="course-meta-item">📅 Starts {c.startDate}</div>
                        <div className="course-meta-item">⏱ {c.duration}</div>
                        <div className="course-meta-item">🎧 {c.lessons} lessons</div>
                      </div>
                    </div>
                    <div className="course-footer">
                      <div className="course-price">{c.price}</div>
                      <button className="course-enroll" onClick={() => showToast("🎉 Enrollment coming soon!")}>Enroll Now</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* HOW IT WORKS */}
          <div style={{background: 'var(--ink)', padding: '80px 40px', marginTop: 0}}>
            <div style={{maxWidth: 1100, margin: '0 auto'}}>
              <div style={{fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--accent)', marginBottom:10}}>How it works</div>
              <div style={{fontFamily:"'Fraunces',serif", fontSize:'clamp(1.8rem,4vw,2.6rem)', fontWeight:900, color:'white', marginBottom:48, letterSpacing:'-0.02em'}}>Simple. Daily. Effective.</div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:20}}>
                {[
                  ["🎧","Listen Daily","Short 20–30 min audio lessons each morning. No video, no data, just pure learning."],
                  ["📄","Get Notes","AI-generated notes and DPP sheets shared after every class. Print or read on phone."],
                  ["✍️","Practice","Daily practice questions — board exam style. Teacher solves some, you solve the rest."],
                  ["📊","Track Progress","See how many lessons done, chapters covered, and exam readiness score."],
                ].map(([icon, title, desc], i) => (
                  <div key={i} style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:'24px 20px'}}>
                    <div style={{fontSize:'1.8rem', marginBottom:12}}>{icon}</div>
                    <div style={{fontFamily:"'Fraunces',serif", fontWeight:700, color:'white', fontSize:'1rem', marginBottom:6}}>{title}</div>
                    <div style={{fontSize:'0.85rem', color:'rgba(255,255,255,0.5)', lineHeight:1.6}}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══ LIVE CLASS ══ */}
      {tab === 1 && (
        <div className="section">
          <div className="section-tag">Live Classroom</div>
          <div className="section-title">AI Teacher — Live Session</div>
          <div className="section-sub">Start a live session. The AI teacher delivers your lesson using your cloned voice.</div>
          <div className="classroom-wrap">
            <div className="classroom-top">
              <div>
                <div className="classroom-top-title">No active class scheduled</div>
                <div className="classroom-top-sub">Add a course and schedule a lesson to begin</div>
              </div>
              {classOn && <div className="live-badge"><div className="live-dot" /> LIVE NOW</div>}
            </div>
            <div className="classroom-stage">
              <div className="ai-avatar">
                🧑‍🏫
                {classOn && <div className="ai-ring" />}
              </div>
              {classOn && (
                <div className="waves">
                  {[1,2,3,4,5].map(i => <div key={i} className="wv" />)}
                </div>
              )}
              <div className="speech-bubble">
                {classOn
                  ? '"Good morning, students! Let\'s begin today\'s lesson. Please have your notebooks ready..."'
                  : '"Click Start Session below to begin an AI-powered live class. Your cloned voice will teach the lesson."'}
              </div>
              <div className="class-controls">
                <button className={`ctrl-btn primary`} onClick={() => { setClassOn(!classOn); showToast(classOn ? "⏹ Class ended" : "▶ Class started!"); }}>
                  {classOn ? "⏹ End Session" : "▶ Start Session"}
                </button>
                {classOn && <button className="ctrl-btn" onClick={() => showToast("⏸ Class paused")}>⏸ Pause</button>}
                {classOn && <button className="ctrl-btn" onClick={() => showToast("❓ Q&A mode on")}>❓ Q&A Mode</button>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ STUDENT LOGIN ══ */}
      {tab === 2 && (
        <div className="section">
          <div className="section-tag">Student Portal</div>
          <div className="section-title">Welcome back</div>
          <div className="section-sub">Login to access your courses, lessons and DPP sheets.</div>
          <div className="login-wrap">
            <div className="login-form">
              <div className="login-form-title">Student Login</div>
              <div className="login-form-sub">Enter your details to access your dashboard</div>
              <div className="field">
                <label>Email Address</label>
                <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} />
              </div>
              <button className="login-submit" onClick={() => showToast("🔐 Student login coming soon!")}>Login →</button>
              <div className="login-divider">or</div>
              <button className="login-google" onClick={() => showToast("🔐 Google login coming soon!")}>🔵 Continue with Google</button>
              <div style={{textAlign:'center', marginTop:16, fontSize:'0.82rem', color:'var(--muted)'}}>
                Don't have an account? <span style={{color:'var(--accent)', cursor:'pointer', fontWeight:700}} onClick={() => showToast("📝 Registration opens soon!")}>Enroll in a course</span>
              </div>
            </div>
            <div className="login-info">
              {[
                ["🎧", "Audio Lessons", "Access daily audio lessons from your enrolled courses anytime, anywhere."],
                ["📄", "Notes & DPP", "Download AI-generated notes and daily practice question sheets."],
                ["📊", "Your Progress", "Track chapter completion, practice scores and exam readiness."],
              ].map(([icon, title, desc], i) => (
                <div key={i} className="info-card">
                  <div className="info-card-icon">{icon}</div>
                  <div className="info-card-title">{title}</div>
                  <div className="info-card-sub">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ VOICE STUDIO ══ */}
      {tab === 3 && (
        <div className="section">
          <div className="section-tag">Voice Studio</div>
          <div className="section-title">Clone Your Voice</div>
          <div className="section-sub">Record a few samples and let AI replicate your voice for all future lessons.</div>
          <div className="voice-grid">
            <div className="voice-card">
              <div className="voice-card-title">🎙 Record Samples</div>
              <div className="voice-card-sub">Record 3 to 5 voice samples of 30–60 seconds each for best results. Speak naturally as if explaining to a student.</div>
              <div className="record-area">
                <button className={`rec-btn ${recording ? "on" : ""}`} onClick={() => { setRecording(!recording); showToast(recording ? "⏹ Recording saved!" : "🔴 Recording started..."); }}>
                  {recording ? "⏹" : "🎙"}
                </button>
                <div className="rec-label">{recording ? "Recording... tap to stop" : "Tap mic to start recording"}</div>
              </div>
              <div className="step-list">
                {[
                  "Record yourself speaking for 30–60 seconds naturally",
                  "Aim for 3 to 5 different recordings",
                  "Speak clearly — imagine explaining to a student",
                  "Submit samples and wait for AI to clone your voice",
                ].map((s, i) => (
                  <div key={i} className="step-item">
                    <div className="step-num">{i + 1}</div>
                    <div className="step-text">{s}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="voice-card">
              <div className="voice-card-title">🔊 Voice Preview</div>
              <div className="voice-card-sub">Once your voice is cloned, hear a preview of how your AI teacher will sound to students.</div>
              <div className="preview-card">
                <div className="preview-row">
                  <div className="preview-av">🧑‍🏫</div>
                  <div>
                    <div className="preview-name">AI Teacher</div>
                    <div className="preview-role">Awaiting voice clone · Not active</div>
                  </div>
                </div>
                <div className="preview-quote">"Good morning everyone! Today we are going to understand Real Numbers — one of the most important chapters for your board exams..."</div>
                <div className="waveform">
                  {Array.from({length:44}, (_, i) => (
                    <div key={i} className="wf-bar" style={{height:`${6 + Math.abs(Math.sin(i*0.45)*14)}px`}} />
                  ))}
                </div>
                <button style={{marginTop:16, width:'100%', background:'var(--accent)', color:'white', border:'none', borderRadius:9, padding:'11px', fontFamily:"'Cabinet Grotesk',sans-serif", fontWeight:700, cursor:'pointer', fontSize:'0.9rem'}} onClick={() => showToast("🎙 Record samples first to unlock preview!")}>
                  ▶ Play Preview
                </button>
              </div>
              <div style={{marginTop:16, background:'var(--light)', borderRadius:12, padding:'16px'}}>
                <div style={{fontSize:'0.8rem', fontWeight:700, marginBottom:10}}>Quality Score — after cloning</div>
                <div style={{display:'flex', gap:8}}>
                  {[["Clarity","—","var(--muted)"],["Natural","—","var(--muted)"],["Expressive","—","var(--muted)"]].map(([l,v,c], i) => (
                    <div key={i} style={{flex:1, textAlign:'center', background:'white', borderRadius:8, padding:'10px 6px'}}>
                      <div style={{fontWeight:800, fontSize:'1.1rem', color:c}}>{v}</div>
                      <div style={{fontSize:'0.72rem', color:'var(--muted)'}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ ANALYTICS ══ */}
      {tab === 4 && (
        <div className="section">
          <div className="section-tag">Analytics</div>
          <div className="section-title">Your Dashboard</div>
          <div className="section-sub">Track students, lessons delivered, and engagement — all in one place.</div>
          <div className="analytics-empty">
            <div style={{fontSize:'3rem', marginBottom:16}}>📊</div>
            <div style={{fontFamily:"'Fraunces',serif", fontSize:'1.4rem', fontWeight:700, marginBottom:8}}>No Data Yet</div>
            <div style={{color:'var(--muted)', fontSize:'0.95rem', maxWidth:380, margin:'0 auto 24px', lineHeight:1.6}}>
              Analytics will appear here once you have enrolled students and active lessons. Launch your first course to get started.
            </div>
            <button className="btn-main" style={{padding:'12px 28px', fontSize:'0.9rem'}} onClick={() => setTab(0)}>View Courses →</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="footer">
        <strong>TeachAI</strong> · AI-Powered Education Platform · Built for CBSE Class 10 · 2026–27
      </div>

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
