import { useState, useRef, useEffect } from "react";

const S = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=Cabinet+Grotesk:wght@400;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}:root{--bg:#f7f4ef;--ink:#111010;--card:#fff;--accent:#d94f2b;--green:#276749;--border:#e2ddd6;--muted:#7a7570;--light:#ede9e2}.nav{position:sticky;top:0;z-index:200;background:rgba(247,244,239,.95);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:64px}body{font-family:'Cabinet Grotesk',sans-serif;background:var(--bg);color:var(--ink)}.nav-brand{font-family:'Fraunces',serif;font-size:1.5rem;font-weight:900}.nav-brand span{color:var(--accent)}.nav-right{display:flex;align-items:center;gap:16px}.nav-user{font-size:.85rem;color:var(--muted)}.logout-btn{background:var(--accent);color:#fff;border:none;cursor:pointer;font-family:'Cabinet Grotesk',sans-serif;font-weight:600;font-size:.85rem;padding:10px 20px;border-radius:8px}.nav-tabs{display:flex;gap:6px;background:var(--light);padding:4px;border-radius:10px}.nav-tab{background:0;border:none;cursor:pointer;font-family:'Cabinet Grotesk',sans-serif;font-weight:600;font-size:.8rem;padding:8px 14px;border-radius:7px;color:var(--muted);transition:all .15s}.nav-tab.active{background:var(--card);color:var(--ink)}.login-container{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 20px;background:linear-gradient(135deg,rgba(217,79,43,.08),rgba(43,108,176,.08))}.login-box{background:var(--card);border-radius:20px;border:1.5px solid var(--border);padding:40px;max-width:420px;width:100%}.login-title{font-family:'Fraunces',serif;font-size:1.8rem;font-weight:900;margin-bottom:8px}.login-sub{color:var(--muted);font-size:.9rem;margin-bottom:28px}.field{margin-bottom:16px}.field label{display:block;font-size:.82rem;font-weight:700;margin-bottom:6px}.field input{width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:10px;padding:12px 14px;font-family:'Cabinet Grotesk',sans-serif;font-size:.9rem;outline:0}.field input:focus{border-color:var(--ink);background:#fff}.btn-login{width:100%;background:var(--ink);color:#fff;border:none;cursor:pointer;font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:1rem;padding:13px;border-radius:10px;margin-bottom:16px}.btn-login:hover{background:var(--accent)}.demo-section{text-align:center;padding-top:16px;border-top:1px solid var(--border);font-size:.82rem;color:var(--muted)}.demo-btn{background:var(--light);color:var(--ink);border:none;cursor:pointer;font-family:'Cabinet Grotesk',sans-serif;font-weight:600;font-size:.85rem;padding:8px 16px;border-radius:8px;margin-top:8px;margin-right:4px}.dashboard{padding:40px;max-width:1100px;margin:0 auto}.dash-title{font-family:'Fraunces',serif;font-size:1.8rem;font-weight:900;margin-bottom:32px}.course-wrap{background:var(--card);border:1.5px solid var(--border);border-radius:16px;padding:28px}.course-head{display:flex;align-items:center;gap:20px;margin-bottom:28px}.course-icon{font-size:2.4rem}.course-info h2{font-family:'Fraunces',serif;font-size:1.35rem;font-weight:900;margin-bottom:4px}.course-info p{color:var(--muted);font-size:.85rem}.progress-bar{width:100%;height:6px;background:var(--light);border-radius:3px;margin-bottom:8px}.progress-fill{height:100%;background:linear-gradient(90deg,var(--accent),#c0421e);border-radius:3px}.progress-text{font-size:.8rem;color:var(--muted);text-align:right;margin-bottom:24px}.chapters-tag{font-size:.72rem;font-weight:700;text-transform:uppercase;color:var(--accent);margin-bottom:14px;letter-spacing:.1em}.chapter-item{background:var(--light);border-radius:12px;padding:16px 18px;margin-bottom:10px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:all .15s}.chapter-item:hover{background:var(--border);transform:translateX(3px)}.chapter-name{flex:1}.chapter-title{font-weight:700;font-size:.95rem}.chapter-topics{font-size:.78rem;color:var(--muted);margin-top:3px}.chapter-count{font-size:.8rem;font-weight:600;color:var(--accent)}.lessons{padding-left:20px;margin-bottom:8px;display:flex;flex-direction:column;gap:8px}.lesson{background:#fff;border:1.5px solid var(--border);border-radius:10px;padding:14px 16px;display:flex;align-items:center;justify-content:space-between}.lesson-left{flex:1}.lesson-num{font-size:.75rem;font-weight:700;color:var(--muted);text-transform:uppercase}.lesson-title{font-weight:700;font-size:.9rem;margin:2px 0}.lesson-dur{font-size:.75rem;color:var(--muted)}.lesson-btn{background:var(--accent);color:#fff;border:none;cursor:pointer;font-family:'Cabinet Grotesk',sans-serif;font-weight:600;font-size:.8rem;padding:7px 14px;border-radius:6px}.lesson-btn.soon{background:var(--light);color:var(--muted);cursor:not-allowed}.toast{position:fixed;bottom:24px;right:24px;background:var(--ink);color:#fff;padding:12px 18px;border-radius:10px;font-size:.85rem;font-weight:600;z-index:999;animation:slideUp .25s ease}@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}.lesson-player{max-width:1000px;margin:40px auto;padding:40px 20px}.player-header{text-align:center;margin-bottom:40px}.player-title{font-family:'Fraunces',serif;font-size:2rem;font-weight:900;margin-bottom:8px}.player-subtitle{color:var(--muted);font-size:1rem}.player-badge{display:inline-block;background:var(--accent);color:#fff;padding:6px 14px;border-radius:20px;font-size:.75rem;font-weight:700;margin-bottom:16px}.video-container{background:var(--ink);border-radius:20px;overflow:hidden;margin-bottom:32px;aspect-ratio:16/9}.video-inner{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;background:linear-gradient(135deg,#1a1a2e,#16213e)}.lesson-display{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 40px;text-align:center;color:#fff}.section-title{font-family:'Fraunces',serif;font-size:2.5rem;font-weight:900;margin-bottom:20px;animation:fadeIn .5s ease}.section-content{font-size:1.1rem;line-height:1.8;max-width:700px;animation:slideUp .6s ease}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}.controls{background:var(--card);border-radius:16px;padding:24px;margin-bottom:32px;display:flex;align-items:center;gap:16px;box-shadow:0 4px 12px rgba(0,0,0,.08)}.play-btn{width:56px;height:56px;border-radius:50%;background:var(--accent);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.4rem;transition:all .2s;flex-shrink:0}.play-btn:hover{background:#c0421e;transform:scale(1.08)}.play-btn.playing{background:#c0421e}.timeline-wrapper{flex:1}.timeline{width:100%;height:6px;background:var(--light);border-radius:3px;cursor:pointer}.timeline-fill{height:100%;background:linear-gradient(90deg,var(--accent),#c0421e);border-radius:3px}.time-display{display:flex;gap:8px;font-size:.85rem;color:var(--muted);font-weight:600;min-width:100px}.volume-control{display:flex;align-items:center;gap:8px}.volume-slider{width:100px;cursor:pointer}.lesson-info{background:var(--light);border-radius:16px;padding:28px;margin-bottom:32px}.lesson-info h3{font-family:'Fraunces',serif;font-size:1.2rem;font-weight:900;margin-bottom:12px}.lesson-info p{color:var(--muted);line-height:1.6;margin-bottom:8px}.sections-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-top:20px}.section-badge{background:var(--card);border:1.5px solid var(--border);padding:12px 16px;border-radius:10px;font-size:.85rem;font-weight:600;cursor:pointer;transition:all .18s;text-align:center}.section-badge:hover{border-color:var(--accent)}.section-badge.active{background:var(--accent);color:#fff;border-color:var(--accent)}.tip-box{background:rgba(39,103,73,.1);border-left:4px solid #276749;padding:16px;border-radius:8px;margin-top:24px}.tip-box strong{color:#276749}audio{display:none}@media(max-width:768px){.nav{padding:0 20px}.nav-tabs{display:none}.dashboard{padding:20px}.lesson-player{padding:20px}}`;

const CHAPTERS = [
  {id:1,num:1,title:"Real Numbers",topics:"HCF, LCM, Fundamental Theorem",lessons:4,lessons_data:[{id:1,title:"What are Real Numbers?",duration:"25 min",url:""},{id:2,title:"Fundamental Theorem of Arithmetic",duration:"28 min",url:""},{id:3,title:"Proof of Irrationality",duration:"30 min",url:""},{id:4,title:"Revision & Practice",duration:"20 min",url:""}]},
  {id:2,num:2,title:"Polynomials",topics:"Zeros, Coefficients",lessons:3,lessons_data:[{id:1,title:"Understanding Polynomials",duration:"25 min",url:""},{id:2,title:"Zeros and Coefficients",duration:"28 min",url:""},{id:3,title:"Practice Problems",duration:"22 min",url:""}]},
  {id:3,num:3,title:"Pair of Linear Equations",topics:"Graphical & Algebraic",lessons:4,lessons_data:[{id:1,title:"Linear Equations Basics",duration:"26 min",url:""},{id:2,title:"Graphical Method",duration:"24 min",url:""},{id:3,title:"Algebraic Methods",duration:"28 min",url:""},{id:4,title:"Word Problems & Revision",duration:"25 min",url:""}]},
  {id:4,num:4,title:"Quadratic Equations",topics:"Factorization, Formula",lessons:4,lessons_data:[{id:1,title:"Quadratic Equations Introduction",duration:"25 min",url:""},{id:2,title:"Solving by Factorization",duration:"27 min",url:""},{id:3,title:"Quadratic Formula & Roots",duration:"29 min",url:""},{id:4,title:"Word Problems & Practice",duration:"24 min",url:""}]},
  {id:5,num:5,title:"Arithmetic Progressions",topics:"Nth Term, Sum",lessons:4,lessons_data:[{id:1,title:"Understanding AP",duration:"24 min",url:""},{id:2,title:"Nth Term Formula",duration:"26 min",url:""},{id:3,title:"Sum of N Terms",duration:"28 min",url:""},{id:4,title:"Applications & Practice",duration:"23 min",url:""}]},
  {id:6,num:6,title:"Triangles",topics:"Similarity, Criteria",lessons:5,lessons_data:[{id:1,title:"Similarity Concept",duration:"25 min",url:""},{id:2,title:"AA & SSS Criteria",duration:"27 min",url:""},{id:3,title:"SAS & BPT Theorem",duration:"28 min",url:""},{id:4,title:"Area Theorem",duration:"24 min",url:""},{id:5,title:"Proofs & Problems",duration:"26 min",url:""}]},
  {id:7,num:7,title:"Coordinate Geometry",topics:"Distance, Section",lessons:4,lessons_data:[{id:1,title:"Distance Formula",duration:"24 min",url:""},{id:2,title:"Section Formula",duration:"26 min",url:""},{id:3,title:"Area of Triangle",duration:"27 min",url:""},{id:4,title:"Problems & Applications",duration:"22 min",url:""}]},
  {id:8,num:8,title:"Introduction to Trigonometry",topics:"Ratios, Identities",lessons:4,lessons_data:[{id:1,title:"Trigonometric Ratios",duration:"26 min",url:""},{id:2,title:"Standard Angles",duration:"25 min",url:""},{id:3,title:"Trigonometric Identities",duration:"28 min",url:""},{id:4,title:"Complementary Angles",duration:"24 min",url:""}]},
  {id:9,num:9,title:"Applications of Trigonometry",topics:"Heights, Distances",lessons:3,lessons_data:[{id:1,title:"Elevation & Depression",duration:"25 min",url:""},{id:2,title:"Heights and Distances",duration:"27 min",url:""},{id:3,title:"Complex Problems",duration:"24 min",url:""}]},
  {id:10,num:10,title:"Circles",topics:"Tangents, Theorems",lessons:4,lessons_data:[{id:1,title:"Circle Basics & Tangents",duration:"24 min",url:""},{id:2,title:"Tangent Theorems",duration:"26 min",url:""},{id:3,title:"Number of Tangents",duration:"27 min",url:""},{id:4,title:"Proofs & Problems",duration:"25 min",url:""}]},
  {id:11,num:11,title:"Areas Related to Circles",topics:"Sector, Segment",lessons:4,lessons_data:[{id:1,title:"Area & Circumference",duration:"24 min",url:""},{id:2,title:"Sector & Arc",duration:"25 min",url:""},{id:3,title:"Segment Area",duration:"28 min",url:""},{id:4,title:"Complex Problems",duration:"26 min",url:""}]},
  {id:12,num:12,title:"Surface Areas and Volumes",topics:"Solids, Combinations",lessons:4,lessons_data:[{id:1,title:"Cylinder: SA & Volume",duration:"24 min",url:""},{id:2,title:"Cone & Sphere",duration:"26 min",url:""},{id:3,title:"Combinations",duration:"28 min",url:""},{id:4,title:"Complex Problems",duration:"25 min",url:""}]},
  {id:13,num:13,title:"Statistics",topics:"Mean, Median, Mode",lessons:3,lessons_data:[{id:1,title:"Mean of Grouped Data",duration:"24 min",url:""},{id:2,title:"Median & Mode",duration:"26 min",url:""},{id:3,title:"Cumulative Frequency",duration:"25 min",url:""}]},
  {id:14,num:14,title:"Probability",topics:"Sample Space, Events",lessons:3,lessons_data:[{id:1,title:"Probability Basics",duration:"23 min",url:""},{id:2,title:"Card & Dice Problems",duration:"25 min",url:""},{id:3,title:"Complex Problems",duration:"24 min",url:""}]},
];

const DEMO = [
  {email:"student1@test.com",pass:"demo123",name:"Aryan Kumar"},
  {email:"student2@test.com",pass:"demo123",name:"Priya Sharma"},
];

// ── AUDIOVISUAL LESSON PLAYER COMPONENT ──
const LESSON_SECTIONS = [
  {id:1,time:0,title:"Opening",content:"REAL NUMBERS — What exactly are they?",duration:60},
  {id:2,time:60,title:"Learning Objectives",content:"By end of this lesson:\n✓ Understand the number system family\n✓ Know what makes a number real\n✓ Learn the different types",duration:45},
  {id:3,time:105,title:"Natural Numbers",content:"Natural Numbers (ℕ)\n{1, 2, 3, 4, ...}\nCounting numbers",duration:30},
  {id:4,time:135,title:"Whole Numbers",content:"Whole Numbers (W)\n{0, 1, 2, 3, ...}\nIncludes ZERO!",duration:30},
  {id:5,time:165,title:"Integers",content:"Integers (ℤ)\n{..., -2, -1, 0, 1, 2, ...}\nIncludes NEGATIVE numbers",duration:30},
  {id:6,time:195,title:"Rational Numbers",content:"Rational Numbers (ℚ)\nCan be written as p/q\nExamples: 1/2, 3/4, -5/3, 0.5, 0.75",duration:45},
  {id:7,time:240,title:"Irrational Numbers",content:"Irrational Numbers\nCannot be written as p/q\nExamples: √2, √3, π, e\n√2 = 1.41421356... (never repeats!)",duration:45},
];

function AudiovisualLessonPlayer() {
  const audioRef=useRef(null);
  const[isPlaying,setIsPlaying]=useState(false);
  const[currentTime,setCurrentTime]=useState(0);
  const[duration,setDuration]=useState(0);
  const[volume,setVolume]=useState(1);
  const[currentSection,setCurrentSection]=useState(1);

  useEffect(()=>{
    const audio=audioRef.current;
    if(!audio)return;
    const updateTime=()=>setCurrentTime(audio.currentTime);
    const updateDuration=()=>setDuration(audio.duration);
    const handleEnded=()=>setIsPlaying(false);
    audio.addEventListener("timeupdate",updateTime);
    audio.addEventListener("loadedmetadata",updateDuration);
    audio.addEventListener("ended",handleEnded);
    return()=>{
      audio.removeEventListener("timeupdate",updateTime);
      audio.removeEventListener("loadedmetadata",updateDuration);
      audio.removeEventListener("ended",handleEnded);
    };
  },[]);

  useEffect(()=>{
    const section=LESSON_SECTIONS.find((s,i)=>{
      const nextSection=LESSON_SECTIONS[i+1];
      return currentTime>=s.time&&(!nextSection||currentTime<nextSection.time);
    });
    if(section)setCurrentSection(section.id);
  },[currentTime]);

  const togglePlay=()=>{
    if(isPlaying){audioRef.current?.pause();}else{audioRef.current?.play();}
    setIsPlaying(!isPlaying);
  };

  const handleTimelineClick=(e)=>{
    const timeline=e.currentTarget;
    const rect=timeline.getBoundingClientRect();
    const percent=(e.clientX-rect.left)/rect.width;
    const newTime=percent*duration;
    audioRef.current.currentTime=newTime;
  };

  const jumpToSection=(sectionTime)=>{
    audioRef.current.currentTime=sectionTime;
    setIsPlaying(true);
    audioRef.current?.play();
  };

  const section=LESSON_SECTIONS.find(s=>s.id===currentSection)||LESSON_SECTIONS[0];
  const progressPercent=duration?(currentTime/duration)*100:0;
  const formatTime=(seconds)=>{if(!seconds||isNaN(seconds))return"0:00";const mins=Math.floor(seconds/60);const secs=Math.floor(seconds%60);return`${mins}:${secs.toString().padStart(2,"0")}`;};

  return(
    <div className="lesson-player">
      <div className="player-header">
        <div className="player-badge">🧮 INTERACTIVE LESSON</div>
        <div className="player-title">Real Numbers — Day 1</div>
        <div className="player-subtitle">CBSE Class 10 Maths | What are Real Numbers?</div>
      </div>
      <div className="video-container">
        <div className="video-inner">
          <div className="lesson-display">
            <div className="section-title">{section.title}</div>
            <div className="section-content" style={{whiteSpace:"pre-wrap"}}>{section.content}</div>
          </div>
        </div>
      </div>
      <div className="controls">
        <button className={`play-btn ${isPlaying?"playing":""}`} onClick={togglePlay}>{isPlaying?"⏸":"▶"}</button>
        <div className="timeline-wrapper">
          <div className="timeline" onClick={handleTimelineClick}>
            <div className="timeline-fill" style={{width:`${progressPercent}%`}}></div>
          </div>
        </div>
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="volume-control">
          <span style={{fontSize:"1.2rem"}}>🔊</span>
          <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e)=>{setVolume(e.target.value);audioRef.current.volume=e.target.value;}} className="volume-slider"/>
        </div>
      </div>
      <div className="lesson-info">
        <h3>📚 Lesson Overview</h3>
        <p><strong>Duration:</strong> ~4 minutes (incomplete version)</p>
        <p><strong>Topics Covered:</strong> Number system family, Natural numbers, Whole numbers, Integers, Rational numbers, Irrational numbers</p>
        <h3 style={{marginTop:20,marginBottom:12}}>Jump to Section:</h3>
        <div className="sections-list">
          {LESSON_SECTIONS.map(s=>(<div key={s.id} className={`section-badge ${currentSection===s.id?"active":""}`} onClick={()=>jumpToSection(s.time)}>{s.title}</div>))}
        </div>
        <div className="tip-box"><strong>💡 Pro Tip:</strong> Click on any section above to jump to that part. Use the play/pause button to control audio.</div>
      </div>
      <audio ref={audioRef}><source src="/Real_numbers_1.mp3" type="audio/mpeg"/></audio>
    </div>
  );
}

export default function App(){
  const[loggedIn,setLoggedIn]=useState(false);
  const[user,setUser]=useState(null);
  const[email,setEmail]=useState("");
  const[pass,setPass]=useState("");
  const[expandedChapter,setExpandedChapter]=useState(null);
  const[toast,setToast]=useState(null);
  const[tab,setTab]=useState(1);

  const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(null),2800);};

  const handleLogin=()=>{
    const found=DEMO.find(d=>d.email===email&&d.pass===pass);
    if(found){setLoggedIn(true);setUser(found);showToast(`✅ Welcome ${found.name}!`);}else{showToast("❌ Incorrect email or password");}
  };

  const handleDemoLogin=(d)=>{setEmail(d.email);setPass(d.pass);setTimeout(()=>handleLogin(),100);};
  const handleLogout=()=>{setLoggedIn(false);setUser(null);setEmail("");setPass("");showToast("👋 Logged out");};
  const handlePlayLesson=(chId,lId)=>{const ch=CHAPTERS.find(c=>c.id===chId);const lesson=ch.lessons_data.find(l=>l.id===lId);if(lesson.url){showToast(`🎧 Playing: ${lesson.title}`);}else{showToast("⏳ Audio coming soon!");}};

  if(!loggedIn){
    return(
      <>
        <style>{S}</style>
        <div className="login-container">
          <div className="login-box">
            <div style={{fontSize:'1.6rem',marginBottom:10}}>🎓</div>
            <div className="login-title">TeachAI</div>
            <div className="login-sub">Class 10 CBSE Maths — Student Portal</div>
            <div className="field">
              <label>Email Address</label>
      
