import React, { useState, useRef, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  
  if (page === "live") {
    return <LiveClass onBack={() => setPage("home")} />;
  }

  return <HomePage onStart={() => setPage("live")} />;
}

function HomePage({ onStart }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <div style={{ background: "white", padding: "20px 40px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <h1 style={{ margin: 0 }}>Teach<span style={{ color: "#d94f2b" }}>AI</span></h1>
      </div>

      <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2>Class 10 CBSE Mathematics 2026–27</h2>
        <p style={{ color: "#666" }}>Live AI Classes with Voice & Animated Blackboard</p>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "20px",
          marginTop: "40px"
        }}>
          <div style={{ 
            background: "white", 
            border: "2px solid #e0e0e0", 
            borderRadius: "12px", 
            overflow: "hidden"
          }}>
            <div style={{ 
              height: "120px", 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px"
            }}>
              🧮
            </div>
            <div style={{ padding: "20px" }}>
              <h3 style={{ margin: "0 0 8px 0" }}>Real Numbers</h3>
              <p style={{ color: "#666", fontSize: "14px", margin: "0 0 16px 0" }}>
                Complete 2026-27 curriculum with voice narration
              </p>
              <div style={{ 
                display: "inline-block", 
                background: "#dc3545", 
                color: "white", 
                padding: "4px 10px", 
                borderRadius: "4px", 
                fontSize: "11px",
                fontWeight: "bold",
                marginBottom: "16px"
              }}>
                🔴 LIVE NOW
              </div>
              <button
                onClick={onStart}
                style={{
                  width: "100%",
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ▶ Join Live Class
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveClass({ onBack }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [lines, setLines] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  const slides = [
    {
      title: "REAL NUMBERS - DAY 1",
      lines: [
        "Welcome to Class 10 CBSE Mathematics!",
        "",
        "Today we explore: REAL NUMBERS",
        "",
        "Topics covered:",
        "✓ Number System Hierarchy",
        "✓ Rational Numbers",
        "✓ Irrational Numbers",
        "✓ Board Exam Patterns",
        "",
        "Let's begin!"
      ],
      text: "Welcome to Class 10 CBSE Mathematics! Today we explore Real Numbers. We will cover the Number System Hierarchy, Rational Numbers, Irrational Numbers, and Board Exam Patterns. Let us begin!"
    },
    {
      title: "NUMBER HIERARCHY",
      lines: [
        "Natural Numbers (ℕ)",
        "{1, 2, 3, 4, ...}",
        "",
        "Whole Numbers (W)",
        "{0, 1, 2, 3, ...}",
        "",
        "Integers (ℤ)",
        "{..., -2, -1, 0, 1, 2, ...}",
        "",
        "Rational Numbers (ℚ)",
        "Any number as p/q",
        "",
        "Real Numbers (ℝ)",
        "Everything on the line!"
      ],
      text: "Let us understand the number hierarchy. Natural Numbers are 1, 2, 3, 4. Whole Numbers are 0, 1, 2, 3. Integers include negative numbers: negative 2, negative 1, 0, 1, 2. Rational Numbers are any number expressed as p divided by q. Real Numbers include everything on the number line!"
    },
    {
      title: "RATIONAL NUMBERS",
      lines: [
        "Definition: p/q where q ≠ 0",
        "",
        "Examples:",
        "• 1/2 = 0.5 (Terminating)",
        "• 1/3 = 0.333... (Repeating)",
        "• 22/7 ≈ 3.14 (Pi approximation)",
        "• -5/2 = -2.5 (Negative)",
        "",
        "Key Fact:",
        "ALL integers are rational!",
        "Example: 5 = 5/1"
      ],
      text: "Rational Numbers are defined as p divided by q where q is not zero. Examples include one half equals zero point five, which is terminating. One third equals zero point three repeating. Twenty-two sevenths approximates pi. Negative five halves equals negative two point five. Important: All integers are rational! For example, 5 can be written as 5 divided by 1."
    },
    {
      title: "IRRATIONAL NUMBERS",
      lines: [
        "Cannot be expressed as p/q",
        "",
        "Examples:",
        "• √2 = 1.41421356...",
        "• √3 = 1.73205080...",
        "• π = 3.14159265...",
        "• e = 2.71828182...",
        "",
        "Characteristics:",
        "✓ Non-terminating decimal",
        "✓ Non-repeating pattern",
        "✓ Infinite decimal expansion"
      ],
      text: "Irrational Numbers cannot be expressed as p divided by q. Examples are square root of 2, square root of 3, pi, and e. These have non-terminating decimals that never repeat and have infinite decimal expansion."
    },
    {
      title: "REAL NUMBERS DEFINED",
      lines: [
        "Real Numbers = Rational + Irrational",
        "",
        "Every point on the number line",
        "is a Real Number!",
        "",
        "The Number Line:",
        "←————————0————————→",
        "  -∞      +∞",
        "",
        "Includes:",
        "✓ All Naturals",
        "✓ All Integers",
        "✓ All Rationals",
        "✓ All Irrationals"
      ],
      text: "Real Numbers are the union of rational and irrational numbers. Every point on the number line is a real number. The number line extends from negative infinity to positive infinity with zero in the middle. Real numbers include all natural numbers, all integers, all rational numbers, and all irrational numbers."
    },
    {
      title: "2026-27 BOARD EXAM FOCUS",
      lines: [
        "1 Mark Questions:",
        "Identify and classify numbers",
        "",
        "2 Mark Questions:",
        "Prove irrationality of numbers",
        "Simplify square roots",
        "",
        "3 Mark Questions:",
        "HCF and LCM problems",
        "Convert decimal to fraction",
        "",
        "4 Mark Questions:",
        "Case studies and applications"
      ],
      text: "For the 2026-27 board exam, one mark questions will ask you to identify and classify numbers. Two mark questions will require you to prove irrationality and simplify square roots. Three mark questions focus on HCF, LCM, and converting decimals to fractions. Four mark questions involve case studies and applications."
    },
    {
      title: "KEY TAKEAWAYS",
      lines: [
        "Remember the hierarchy:",
        "ℕ ⊂ W ⊂ ℤ ⊂ ℚ ⊂ ℝ",
        "",
        "Critical Facts:",
        "1. √prime numbers = irrational",
        "2. p/q form (q≠0) = rational",
        "3. Non-repeating decimal = irrational",
        "4. All number line points = real",
        "",
        "Next Chapter: Polynomials!",
        "Work hard! Success awaits! 📚"
      ],
      text: "Remember the hierarchy: Natural numbers are a subset of whole numbers, which are a subset of integers, which are a subset of rational numbers, which are a subset of real numbers. Critical facts: square root of prime numbers are irrational. P divided by Q form where Q is not zero equals rational. Non-repeating decimals are irrational. All points on the number line are real. The next chapter is Polynomials. Work hard and success awaits!"
    }
  ];

  // Auto-play current slide
  useEffect(() => {
    if (!isPlaying || slideIndex >= slides.length) return;

    const slide = slides[slideIndex];
    setLines([]);
    
    let lineIdx = 0;
    
    // Start speech
    const synth = window.speechSynthesis;
    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(slide.text);
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Line animation every 400ms
    const lineTimer = setInterval(() => {
      if (lineIdx < slide.lines.length) {
        setLines(prev => [...prev, slide.lines[lineIdx]]);
        lineIdx++;
      }
    }, 400);

    synth.speak(utterance);

    utterance.onend = () => {
      clearInterval(lineTimer);
      setTimeout(() => {
        if (slideIndex < slides.length - 1) {
          setSlideIndex(slideIndex + 1);
        }
      }, 1500);
    };

    return () => {
      clearInterval(lineTimer);
      synth.cancel();
    };
  }, [slideIndex, isPlaying, slides]);

  useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { type: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 100,
          messages: [{
            role: "user",
            content: `You are a CBSE Class 10 Math teacher. Student asks about Real Numbers: "${input}". Reply in 1-2 sentences. Use emoji.`
          }]
        })
      });

      const data = await response.json();
      const aiMsg = data.content?.[0]?.text || "Great question! Keep learning!";
      
      setMessages(prev => [...prev, { type: "ai", text: aiMsg }]);

      // Speak response
      const synth = window.speechSynthesis;
      const reply = new SpeechSynthesisUtterance(aiMsg);
      reply.rate = 0.9;
      synth.speak(reply);
    } catch (err) {
      setMessages(prev => [...prev, { type: "ai", text: "Great question! 📚" }]);
    }
    
    setLoading(false);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", height: "100vh", background: "#000", gap: 0 }}>
      {/* Main Area */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Blackboard */}
        <div style={{ 
          flex: 1, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          padding: "20px",
          overflow: "hidden"
        }}>
          <div style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, #0d4620, #1a5c2e)",
            border: "5px solid #654321",
            borderRadius: "10px",
            padding: "40px",
            color: "#FFE5B4",
            fontFamily: "'Courier New', monospace",
            fontSize: "18px",
            lineHeight: "1.8",
            overflowY: "auto",
            boxSizing: "border-box"
          }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#FFD700", marginBottom: "20px", borderBottom: "3px solid #FFD700", paddingBottom: "10px" }}>
              {slides[slideIndex].title}
            </div>
            {lines.map((line, i) => (
              <div key={i} style={{ marginBottom: "10px", minHeight: "20px" }}>
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Bar */}
        <div style={{
          height: "120px",
          background: "linear-gradient(to right, #1a1a1a, #0a0a0a)",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "0 30px",
          borderTop: "2px solid #333",
          color: "white"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #d94f2b, #ff6b4a)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            flexShrink: 0,
            position: "relative"
          }}>
            🧑‍🏫
            <div style={{
              position: "absolute",
              bottom: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "15px",
              height: "8px",
              background: "#8B4513",
              borderRadius: "50%",
              animation: isPlaying ? "mouth 0.2s infinite" : "none"
            }}></div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "bold", fontSize: "14px" }}>AI Teacher - Real Numbers</div>
            <div style={{ fontSize: "12px", color: "#aaa" }}>
              {isPlaying ? "🔊 Teaching now..." : "Paused"} | Slide {slideIndex + 1}/{slides.length}
            </div>
          </div>

          <button
            onClick={() => {
              if (slideIndex < slides.length - 1) {
                setSlideIndex(slideIndex + 1);
              }
            }}
            style={{
              background: "#28a745",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              marginRight: "10px"
            }}
          >
            ▶ Next
          </button>

          <button
            onClick={onBack}
            style={{
              background: "#333",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ← Exit
          </button>
        </div>
      </div>

      {/* Chat Panel */}
      <div style={{ display: "flex", flexDirection: "column", background: "#1a1a1a", borderLeft: "1px solid #333" }}>
        <div style={{ padding: "16px", borderBottom: "1px solid #333", color: "white", fontWeight: "bold" }}>
          💬 Questions
        </div>
        
        <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                padding: "8px",
                borderRadius: "6px",
                fontSize: "12px",
                background: m.type === "user" ? "rgba(217, 79, 43, 0.25)" : "#276749",
                color: "white",
                marginLeft: m.type === "user" ? "20px" : 0,
                marginRight: m.type === "user" ? 0 : "20px",
                textAlign: m.type === "user" ? "right" : "left"
              }}
            >
              {m.text}
            </div>
          ))}
          <div ref={messagesRef} />
        </div>

        <div style={{ padding: "10px", borderTop: "1px solid #333" }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask a question..."
            style={{
              width: "100%",
              background: "#2a2a2a",
              border: "1px solid #444",
              borderRadius: "6px",
              padding: "8px",
              color: "white",
              fontSize: "12px",
              resize: "none",
              outline: "none"
            }}
            rows="2"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              width: "100%",
              background: "#d94f2b",
              color: "white",
              border: "none",
              padding: "8px",
              marginTop: "6px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "12px"
            }}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes mouth {
          0%, 100% { height: 8px; }
          50% { height: 14px; }
        }
      `}</style>
    </div>
  );
}
