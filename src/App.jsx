import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=Cabinet+Grotesk:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #f7f4ef; --ink: #111010; --card: #fff; --accent: #d94f2b; 
    --green: #276749; --border: #e2ddd6; --muted: #7a7570; --light: #ede9e2;
  }
  body { font-family: 'Cabinet Grotesk', sans-serif; background: var(--bg); color: var(--ink); }
  .nav { position: sticky; top: 0; z-index: 200; background: rgba(247,244,239,.95); 
    border-bottom: 1px solid var(--border); display: flex; align-items: center; 
    justify-content: space-between; padding: 0 40px; height: 64px; }
  .nav-brand { font-family: 'Fraunces', serif; font-size: 1.5rem; font-weight: 900; }
  .nav-brand span { color: var(--accent); }
  .nav-right { display: flex; align-items: center; gap: 16px; }
  .nav-user { font-size: .85rem; color: var(--muted); }
  .logout-btn { background: var(--accent); color: #fff; border: none; cursor: pointer; 
    font-family: 'Cabinet Grotesk', sans-serif; font-weight: 600; font-size: .85rem; 
    padding: 10px 20px; border-radius: 8px; }
  .login-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; 
    padding: 40px 20px; background: linear-gradient(135deg, rgba(217,79,43,.08), rgba(43,108,176,.08)); }
  .login-box { background: var(--card); border-radius: 20px; border: 1.5px solid var(--border); 
    padding: 40px; max-width: 420px; width: 100%; }
  .login-title { font-family: 'Fraunces', serif; font-size: 1.8rem; font-weight: 900; margin-bottom: 8px; }
  .login-sub { color: var(--muted); font-size: .9rem; margin-bottom: 28px; }
  .field { margin-bottom: 16px; }
  .field label { display: block; font-size: .82rem; font-weight: 700; margin-bottom: 6px; }
  .field input { width: 100%; background: var(--bg); border: 1.5px solid var(--border); 
    border-radius: 10px; padding: 12px 14px; font-family: 'Cabinet Grotesk', sans-serif; 
    font-size: .9rem; outline: none; }
  .field input:focus { border-color: var(--ink); background: #fff; }
  .btn-login { width: 100%; background: var(--ink); color: #fff; border: none; cursor: pointer; 
    font-family: 'Cabinet Grotesk', sans-serif; font-weight: 700; font-size: 1rem; padding: 13px; 
    border-radius: 10px; margin-bottom: 16px; }
  .btn-login:hover { background: var(--accent); }
  .demo-section { text-align: center; padding-top: 16px; border-top: 1px solid var(--border); 
    font-size: .82rem; color: var(--muted); }
  .demo-btn { background: var(--light); color: var(--ink); border: none; cursor: pointer; 
    font-family: 'Cabinet Grotesk', sans-serif; font-weight: 600; font-size: .85rem; 
    padding: 8px 16px; border-radius: 8px; margin-top: 8px; margin-right: 4px; }
  .dashboard { padding: 40px; max-width: 1100px; margin: 0 auto; }
  .dash-title { font-family: 'Fraunces', serif; font-size: 1.8rem; font-weight: 900; margin-bottom: 32px; }
  .course-wrap { background: var(--card); border: 1.5px solid var(--border); border-radius: 16px; padding: 28px; }
  .course-head { display: flex; align-items: center; gap: 20px; margin-bottom: 28px; }
  .course-icon { font-size: 2.4rem; }
  .course-info h2 { font-family: 'Fraunces', serif; font-size: 1.35rem; font-weight: 900; margin-bottom: 4px; }
  .course-info p { color: var(--muted); font-size: .85rem; }
  .progress-bar { width: 100%; height: 6px; background: var(--light); border-radius: 3px; margin-bottom: 8px; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), #c0421e); border-radius: 3px; }
  .progress-text { font-size: .8rem; color: var(--muted); text-align: right; margin-bottom: 24px; }
  .chapters-tag { font-size: .72rem; font-weight: 700; text-transform: uppercase; color: var(--accent); 
    margin-bottom: 14px; letter-spacing: .1em; }
  .chapter-item { background: var(--light); border-radius: 12px; padding: 16px 18px; margin-bottom: 10px; 
    cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: all .15s; }
  .chapter-item:hover { background: var(--border); transform: translateX(3px); }
  .chapter-name { flex: 1; }
  .chapter-title { font-weight: 700; font-size: .95rem; }
  .chapter-topics { font-size: .78rem; color: var(--muted); margin-top: 3px; }
  .chapter-count { font-size: .8rem; font-weight: 600; color: var(--accent); }
  .lessons { padding-left: 20px; margin-bottom: 8px; display: flex; flex-direction: column; gap: 8px; }
  .lesson { background: #fff; border: 1.5px solid var(--border); border-radius: 10px; padding: 14px 16px; 
    display: flex; align-items: center; justify-content: space-between; }
  .lesson-left { flex: 1; }
  .lesson-num { font-size: .75rem; font-weight: 700; color: var(--muted); text-transform: uppercase; }
  .lesson-title { font-weight: 700; font-size: .9rem; margin: 2px 0; }
  .lesson-dur { font-size: .75rem; color: var(--muted); }
  .lesson-btn { background: var(--accent); color: #fff; border: none; cursor: pointer; 
    font-family: 'Cabinet Grotesk', sans-serif; font-weight: 600; font-size: .8rem; 
    padding: 7px 14px; border-radius: 6px; }
  .lesson-btn.soon { background: var(--light); color: var(--muted); cursor: not-allowed; }
  .toast { position: fixed; bottom: 24px; right: 24px; background: var(--ink); color: #fff; 
    padding: 12px 18px; border-radius: 10px; font-size: .85rem; font-weight: 600; z-index: 999; 
    animation: slideUp .25s ease; }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @media(max-width:768px) { .nav { padding: 0 20px; } .dashboard { padding: 20px; } }
`;

const CHAPTERS = [
  { id: 1, num: 1, title: "Real Numbers", topics: "HCF, LCM, Fundamental Theorem", lessons: 4, 
    lessons_data: [
      { id: 1, title: "What are Real Numbers?", duration: "25 min", url: "" },
      { id: 2, title: "Fundamental Theorem of Arithmetic", duration: "28 min", url: "" },
      { id: 3, title: "Proof of Irrationality", duration: "30 min", url: "" },
      { id: 4, title: "Revision & Practice", duration: "20 min", url: "" }
    ]
  },
  { id: 2, num: 2, title: "Polynomials", topics: "Zeros, Coefficients", lessons: 3, 
    lessons_data: [
      { id: 1, title: "Understanding Polynomials", duration: "25 min", url: "" },
      { id: 2, title: "Zeros and Coefficients", duration: "28 min", url: "" },
      { id: 3, title: "Practice Problems", duration: "22 min", url: "" }
    ]
  },
  { id: 3, num: 3, title: "Pair of Linear Equations", topics: "Graphical & Algebraic", lessons: 4, 
    lessons_data: [
      { id: 1, title: "Linear Equations Basics", duration: "26 min", url: "" },
      { id: 2, title: "Graphical Method", duration: "24 min", url: "" },
      { id: 3, title: "Algebraic Methods", duration: "28 min", url: "" },
      { id: 4, title: "Word Problems & Revision", duration: "25 min", url: "" }
    ]
  },
  { id: 4, num: 4, title: "Quadratic Equations", topics: "Factorization, Formula", lessons: 4, 
    lessons_data: [
      { id: 1, title: "Quadratic Equations Introduction", duration: "25 min", url: "" },
      { id: 2, title: "Solving by Factorization", duration: "27 min", url: "" },
      { id: 3, title: "Quadratic Formula & Roots", duration: "29 min", url: "" },
      { id: 4, title: "Word Problems & Practice", duration: "24 min", url: "" }
    ]
  },
  { id: 5, num: 5, title: "Arithmetic Progressions", topics: "Nth Term, Sum", lessons: 4, 
    lessons_data: [
      { id: 1, title: "Understanding AP", duration: "24 min", url: "" },
      { id: 2, title: "Nth Term Formula", duration: "26 min", url: "" },
      { id: 3, title: "Sum of N Terms", duration: "28 min", url: "" },
      { id: 4, title: "Applications & Practice", duration: "23 min", url: "" }
    ]
  },
  { id: 6, num: 6, title: "Triangles", topics: "Similarity, Criteria", lessons: 5, 
    lessons_data: [
      { id: 1, title: "Similarity Concept", duration: "25 min", url: "" },
      { id: 2, title: "AA & SSS Criteria", duration: "27 min", url: "" },
      { id: 3, title: "SAS & BPT Theorem", duration: "28 min", url: "" },
      { id: 4, title: "Area Theorem", duration: "24 min", url: "" },
      { id: 5, title: "Proofs & Problems", duration: "26 min", url: "" }
    ]
  },
  { id: 7, num: 7, title: "Coordinate Geometry", topics: "Distance, Section", lessons: 4, 
    lessons_data: [
      { id: 1, title: "Distance Formula", duration: "24 min", url: "" },
      { id: 2, title: "Section Formula", duration: "26 min", url: "" },
      { id: 3, title: "Area of Triangle", duration: "27 min", url: "" },
      { id: 4, title: "Problems & Applications", duration: "22 min", url: "" }
    ]
  },
  { id: 8, num: 8, title: "Introduction to Trigonometry", topics: "Ratios, Identities", lessons: 4, 
    lessons_data: [
      { id: 1, title: "Trigonometric Ratios", duration: "26 min", url: "" },
      { id: 2, title: "Standard Angles", duration: "25 min", url: "" },
      { id: 3, title: "Trigonometric Identities", duration: "28 min", url: "" },
      { id: 4, title: "Complementary Angles", duration: "24 min", url: "" }
    ]
  },
  { id: 9, num: 9, title: "Applications of Trigonometry", topics: "Heights, Distances", lessons: 3, 
    lessons_data: [
      { id: 1, title: "Elevation & Depression", duration: "25 min", url: "" },
      { id: 2, title: "Heights and Distances", duration: "27 min", url: "" },
      { id: 3, title: "Complex Problems", duration: "24 min", url: "" }
    ]
  },
  { id: 10, num: 10, title: "Circles", topics: "Tangents, Theorems", lessons: 4, 
    lessons_data: [
      { id: 1, title: "Circle Basics & Tangents", duration: "24 min", url: "" },
      { id: 2, title: "Tangent Theorems", duration: "26 min", url: "" },
      { id: 3, title: "Number of Tangents", duration: "27 min", url: "" },
      { id: 4, title: "Proofs & Problems", duration: "25 min", url: "" }
    ]
  },
  { id: 11, num: 11, title: "Areas Related to Circles", topics: "Sector, Segment", lessons: 4, 
    lessons_data: [
      { id: 1, title: "Area & Circumference", duration: "24 min", url: "" },
      { id: 2, title: "Sector & Arc", duration: "25 min", url: "" },
      { id: 3, title: "Segment Area", duration: "28 min", url: "" },
      { id: 4, title: "Complex Problems", duration: "26 min", url: "" }
    ]
  },
  { id: 12, num: 12, title: "Surface Areas and Volumes", topics: "Solids, Combinations", lessons: 4, 
    lessons_data: [
      { id: 1, title: "Cylinder: SA & Volume", duration: "24 min", url: "" },
      { id: 2, title: "Cone & Sphere", duration: "26 min", url: "" },
      { id: 3, title: "Combinations", duration: "28 min", url: "" },
      { id: 4, title: "Complex Problems", duration: "25 min", url: "" }
    ]
  },
  { id: 13, num: 13, title: "Statistics", topics: "Mean, Median, Mode", lessons: 3, 
    lessons_data: [
      { id: 1, title: "Mean of Grouped Data", duration: "24 min", url: "" },
      { id: 2, title: "Median & Mode", duration: "26 min", url: "" },
      { id: 3, title: "Cumulative Frequency", duration: "25 min", url: "" }
    ]
  },
  { id: 14, num: 14, title: "Probability", topics: "Sample Space, Events", lessons: 3, 
    lessons_data: [
      { id: 1, title: "Probability Basics", duration: "23 min", url: "" },
      { id: 2, title: "Card & Dice Problems", duration: "25 min", url: "" },
      { id: 3, title: "Complex Problems", duration: "24 min", url: "" }
    ]
  },
];

const DEMO = [
  { email: "student1@test.com", pass: "demo123", name: "Aryan Kumar" },
  { email: "student2@test.com", pass: "demo123", name: "Priya Sharma" },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const handleLogin = () => {
    const found = DEMO.find(d => d.email === email && d.pass === pass);
    if (found) {
      setLoggedIn(true);
      setUser(found);
      showToast(`✅ Welcome ${found.name}!`);
    } else {
      showToast("❌ Incorrect email or password");
    }
  };

  const handleDemoLogin = (d) => {
    setEmail(d.email);
    setPass(d.pass);
    setTimeout(() => handleLogin(), 100);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    setEmail("");
    setPass("");
    showToast("👋 Logged out");
  };

  const handlePlayLesson = (chId, lId) => {
    const ch = CHAPTERS.find(c => c.id === chId);
    const lesson = ch.lessons_data.find(l => l.id === lId);
    if (lesson.url) {
      showToast(`🎧 Playing: ${lesson.title}`);
    } else {
      showToast("⏳ Audio coming soon!");
    }
  };

  if (!loggedIn) {
    return (
      <>
        <style>{styles}</style>
        <div className="login-container">
          <div className="login-box">
            <div style={{ fontSize: '1.6rem', marginBottom: 10 }}>🎓</div>
            <div className="login-title">TeachAI</div>
            <div className="login-sub">Class 10 CBSE Maths — Student Portal</div>
            
            <div className="field">
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} />
            </div>
            
            <button className="btn-login" onClick={handleLogin}>Login →</button>
            
            <div className="demo-section">
              Try demo login:
              {DEMO.map((d, i) => (
                <button key={i} className="demo-btn" onClick={() => handleDemoLogin(d)}>
                  {d.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        {toast && <div className="toast">{toast}</div>}
      </>
    );
  }

  const totalLessons = CHAPTERS.reduce((sum, ch) => sum + ch.lessons, 0);
  const completedLessons = 0;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  return (
    <>
      <style>{styles}</style>
      <nav className="nav">
        <div className="nav-brand">Teach<span>AI</span></div>
        <div className="nav-right">
          <div className="nav-user">👋 {user.name}</div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard">
        <div className="dash-title">Class 10 CBSE Mathematics 2026–27</div>

        <div className="course-wrap">
          <div className="course-head">
            <div className="course-icon">🧮</div>
            <div className="course-info">
              <h2>Complete CBSE Maths Curriculum</h2>
              <p>14 chapters, 52+ lessons, board exam focused. New lessons added daily.</p>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="progress-text">{completedLessons} of {totalLessons} lessons completed · {progressPercent}%</div>
          </div>

          <div className="chapters">
            <div className="chapters-tag">📚 All Chapters</div>
            {CHAPTERS.map(ch => (
              <div key={ch.id}>
                <div className="chapter-item" onClick={() => setExpandedChapter(expandedChapter === ch.id ? null : ch.id)}>
                  <div className="chapter-name">
                    <div className="chapter-title">Chapter {ch.num} — {ch.title}</div>
                    <div className="chapter-topics">{ch.topics}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="chapter-count">0/{ch.lessons}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{expandedChapter === ch.id ? "▼" : "▶"}</div>
                  </div>
                </div>

                {expandedChapter === ch.id && (
                  <div className="lessons">
                    {ch.lessons_data.map(l => (
                      <div key={l.id} className="lesson">
                        <div className="lesson-left">
                          <div className="lesson-num">Lesson {l.id}</div>
                          <div className="lesson-title">{l.title}</div>
                          <div className="lesson-dur">{l.duration}</div>
                        </div>
                        <button className={`lesson-btn ${l.url ? "" : "soon"}`} onClick={() => handlePlayLesson(ch.id, l.id)}>
                          {l.url ? "▶ Play" : "🔜 Coming"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 28, padding: '18px', background: 'var(--light)', borderRadius: 12, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          <strong>💡 How it works:</strong> Click on any chapter to expand and see lessons. New audio lessons added daily!
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
   }
            
