function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "800px", margin: "auto" }}>
      
      {/* HERO */}
      <h1 style={{ textAlign: "center" }}>
        Class 10 Maths AI Course (2026–27)
      </h1>

      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Daily lessons • Audio teaching • Practice questions • Doubt support
      </p>

      {/* CTA */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button style={btnPrimary}>Start Free Day 1</button>
        <button style={btnSecondary}>Join WhatsApp Class</button>
      </div>

      {/* COURSE INFO */}
      <h2>📘 What You Get</h2>
      <ul>
        <li>Daily structured lessons</li>
        <li>Audio explanation (teacher-guided)</li>
        <li>NCERT + PYQ practice questions</li>
        <li>WhatsApp doubt support</li>
      </ul>

      {/* CHAPTER PREVIEW */}
      <h2>📖 Chapter 1: Real Numbers</h2>
      <ul>
        <li>Day 1 – HCF (Division Method)</li>
        <li>Day 2 – Prime Factorisation</li>
        <li>Day 3 – Applications (Word Problems)</li>
        <li>Day 4 – Irrational Numbers + Decimal Expansion</li>
      </ul>

      {/* PRICING */}
      <h2>💰 Pricing</h2>
      <p>First 5 Days Free</p>
      <p>₹199/month</p>
      <p>₹499 Full Course</p>

      {/* CTA */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button style={btnPrimary}>Start Learning Now</button>
      </div>

      {/* FOOTER */}
      <p style={{ textAlign: "center", marginTop: "40px", color: "gray" }}>
        Batch Starting Soon • Limited Students
      </p>

    </div>
  );
}

const btnPrimary = {
  padding: "10px 20px",
  margin: "10px",
  backgroundColor: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const btnSecondary = {
  padding: "10px 20px",
  margin: "10px",
  backgroundColor: "white",
  color: "#4f46e5",
  border: "1px solid #4f46e5",
  borderRadius: "8px",
  cursor: "pointer"
};

export default App;
