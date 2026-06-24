'use client';

import { useState } from "react";

const CONTENT_TYPES = [
  { id: "blog", label: "Blog Post", icon: "✍️", desc: "Long-form SEO article", tokens: 1200 },
  { id: "linkedin", label: "LinkedIn Post", icon: "💼", desc: "Thought leadership post", tokens: 400 },
  { id: "email", label: "Email Sequence", icon: "📧", desc: "3-part nurture sequence", tokens: 800 },
  { id: "twitter", label: "Twitter/X Thread", icon: "🐦", desc: "10-tweet viral thread", tokens: 500 },
  { id: "ad", label: "Ad Copy", icon: "🎯", desc: "Facebook/Google ad variants", tokens: 300 },
  { id: "case_study", label: "Case Study", icon: "📊", desc: "Customer success story", tokens: 900 },
];

const TONES = ["Professional", "Conversational", "Bold & Edgy", "Educational", "Storytelling"];

const INDUSTRIES = [
  "B2B SaaS", "Fintech", "E-commerce", "Healthcare Tech",
  "Marketing Agency", "Consulting", "Real Estate", "Legal"
];

export default function ContentForge() {
  const [step, setStep] = useState("home");
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    company: "",
    industry: "",
    topic: "",
    audience: "",
    tone: "Professional",
    keywords: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleGenerate = async () => {
    if (!formData.company || !formData.topic || !formData.audience) {
      setError("Please fill in Company, Topic, and Target Audience.");
      return;
    }
    setError("");
    setLoading(true);
    setResult("");
    setStep("result");

    const typeInfo = CONTENT_TYPES.find(t => t.id === selectedType);

    const prompt = `You are an expert B2B content strategist and copywriter. Generate high-quality ${typeInfo.label} content for the following brief:

Company: ${formData.company}
Industry: ${formData.industry || "B2B Technology"}
Topic/Subject: ${formData.topic}
Target Audience: ${formData.audience}
Tone: ${formData.tone}
SEO Keywords to include: ${formData.keywords || "none specified"}

Content Type Instructions:
${selectedType === "blog" ? "Write a complete, SEO-optimized blog post with: a compelling headline, introduction hook, 4-5 sections with H2 headers, actionable insights, and a clear CTA. Aim for ~800 words." : ""}
${selectedType === "linkedin" ? "Write a LinkedIn post that hooks in the first line, shares a genuine insight or story, uses short punchy paragraphs, and ends with a question to drive comments. Include 3-5 relevant hashtags." : ""}
${selectedType === "email" ? "Write a 3-part email nurture sequence. Email 1: Problem awareness. Email 2: Solution education. Email 3: CTA/offer. Include subject lines for each." : ""}
${selectedType === "twitter" ? "Write a 10-tweet thread. Tweet 1 must be a bold hook. Tweets 2-9 deliver value. Tweet 10 is a summary + CTA. Number each tweet." : ""}
${selectedType === "ad" ? "Write 3 ad copy variants (A/B/C). Each with: Headline (max 30 chars), Description (max 90 chars), and CTA. Also include a Primary Text version (max 125 chars)." : ""}
${selectedType === "case_study" ? "Write a case study with: Customer background, The challenge they faced, The solution implemented, Measurable results (use realistic metrics), and a customer quote. Format professionally." : ""}

Make it genuinely useful, specific, and avoid generic filler. Write as if this is going to a real client.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      setResult(text);
      setWordCount(text.split(/\s+/).filter(Boolean).length);
    } catch (err) {
      setResult("");
      setError("Something went wrong generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setStep("home");
    setSelectedType(null);
    setResult("");
    setError("");
    setFormData({ company: "", industry: "", topic: "", audience: "", tone: "Professional", keywords: "" });
  };

  if (step === "home") return (
    <div style={styles.shell}>
      <div style={styles.nav}>
        <span style={styles.logo}>⚡ ContentForge</span>
        <span style={styles.navTag}>AI Content Engine</span>
      </div>

      <div style={styles.hero}>
        <div style={styles.heroEyebrow}>For B2B Companies</div>
        <h1 style={styles.heroTitle}>
          Content that converts,<br />
          <span style={styles.heroAccent}>in seconds.</span>
        </h1>
        <p style={styles.heroSub}>
          Pick a format, describe your business, get publish-ready content powered by Claude AI.
          No prompting skills required.
        </p>
      </div>

      <div style={styles.typeGrid}>
        {CONTENT_TYPES.map(type => (
          <button
            key={type.id}
            style={{
              ...styles.typeCard,
              ...(selectedType === type.id ? styles.typeCardActive : {})
            }}
            onClick={() => setSelectedType(type.id)}
          >
            <span style={styles.typeIcon}>{type.icon}</span>
            <span style={styles.typeLabel}>{type.label}</span>
            <span style={styles.typeDesc}>{type.desc}</span>
          </button>
        ))}
      </div>

      {selectedType && (
        <div style={styles.ctaRow}>
          <button style={styles.primaryBtn} onClick={() => setStep("generate")}>
            Create {CONTENT_TYPES.find(t => t.id === selectedType)?.label} →
          </button>
        </div>
      )}
    </div>
  );

  if (step === "generate") {
    const typeInfo = CONTENT_TYPES.find(t => t.id === selectedType);
    return (
      <div style={styles.shell}>
        <div style={styles.nav}>
          <button style={styles.backBtn} onClick={() => setStep("home")}>← Back</button>
          <span style={styles.logo}>⚡ ContentForge</span>
          <span style={styles.navTag}>{typeInfo.icon} {typeInfo.label}</span>
        </div>

        <div style={styles.formWrap}>
          <h2 style={styles.formTitle}>Tell us about your business</h2>
          <p style={styles.formSub}>The more specific you are, the better your content.</p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Company Name <span style={styles.req}>*</span></label>
            <input
              style={styles.input}
              placeholder="e.g. Acme Corp"
              value={formData.company}
              onChange={e => setFormData(f => ({ ...f, company: e.target.value }))}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Industry</label>
            <select
              style={styles.input}
              value={formData.industry}
              onChange={e => setFormData(f => ({ ...f, industry: e.target.value }))}
            >
              <option value="">Select industry…</option>
              {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Topic / Subject <span style={styles.req}>*</span></label>
            <input
              style={styles.input}
              placeholder="e.g. How AI reduces customer churn for SaaS companies"
              value={formData.topic}
              onChange={e => setFormData(f => ({ ...f, topic: e.target.value }))}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Target Audience <span style={styles.req}>*</span></label>
            <input
              style={styles.input}
              placeholder="e.g. VP of Marketing at Series B SaaS startups"
              value={formData.audience}
              onChange={e => setFormData(f => ({ ...f, audience: e.target.value }))}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Tone</label>
            <div style={styles.toneRow}>
              {TONES.map(t => (
                <button
                  key={t}
                  style={{
                    ...styles.toneChip,
                    ...(formData.tone === t ? styles.toneChipActive : {})
                  }}
                  onClick={() => setFormData(f => ({ ...f, tone: t }))}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>SEO Keywords <span style={styles.optional}>(optional)</span></label>
            <input
              style={styles.input}
              placeholder="e.g. customer retention, SaaS metrics, churn reduction"
              value={formData.keywords}
              onChange={e => setFormData(f => ({ ...f, keywords: e.target.value }))}
            />
          </div>

          <button style={styles.primaryBtn} onClick={handleGenerate}>
            Generate {typeInfo.label} ⚡
          </button>
        </div>
      </div>
    );
  }

  const typeInfo = CONTENT_TYPES.find(t => t.id === selectedType);
  return (
    <div style={styles.shell}>
      <div style={styles.nav}>
        <button style={styles.backBtn} onClick={() => setStep("generate")}>← Edit Brief</button>
        <span style={styles.logo}>⚡ ContentForge</span>
        {!loading && result && (
          <span style={styles.navTag}>{wordCount} words</span>
        )}
      </div>

      <div style={styles.resultWrap}>
        <div style={styles.resultHeader}>
          <div>
            <div style={styles.heroEyebrow}>{typeInfo.icon} {typeInfo.label}</div>
            <h2 style={styles.resultTitle}>{formData.company} — {formData.topic}</h2>
          </div>
          {!loading && result && (
            <div style={styles.actionRow}>
              <button style={styles.copyBtn} onClick={handleCopy}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
              <button style={styles.ghostBtn} onClick={reset}>
                New Content
              </button>
            </div>
          )}
        </div>

        {loading && (
          <div style={styles.loadingBox}>
            <div style={styles.loadingDots}>
              <span style={{ ...styles.dot, animationDelay: "0s" }} />
              <span style={{ ...styles.dot, animationDelay: "0.2s" }} />
              <span style={{ ...styles.dot, animationDelay: "0.4s" }} />
            </div>
            <p style={styles.loadingText}>Writing your {typeInfo.label}…</p>
          </div>
        )}

        {error && !loading && (
          <div style={styles.errorBox}>{error}</div>
        )}

        {result && !loading && (
          <div style={styles.resultContent}>
            {result.split("\n").map((line, i) => {
              if (!line.trim()) return <br key={i} />;
              if (line.startsWith("# ")) return <h1 key={i} style={styles.rH1}>{line.slice(2)}</h1>;
              if (line.startsWith("## ")) return <h2 key={i} style={styles.rH2}>{line.slice(3)}</h2>;
              if (line.startsWith("### ")) return <h3 key={i} style={styles.rH3}>{line.slice(4)}</h3>;
              if (line.startsWith("**") && line.endsWith("**")) return <p key={i} style={styles.rBold}>{line.slice(2, -2)}</p>;
              if (line.match(/^\d+\./)) return <p key={i} style={styles.rListItem}>{line}</p>;
              if (line.startsWith("- ") || line.startsWith("• ")) return <p key={i} style={styles.rBullet}>{line}</p>;
              return <p key={i} style={styles.rPara}>{line}</p>;
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  shell: {
    minHeight: "100vh",
    background: "#0A0A0F",
    color: "#E8E8F0",
    fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
    paddingBottom: 80,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 32px",
    borderBottom: "1px solid #1E1E2E",
    position: "sticky",
    top: 0,
    background: "#0A0A0F",
    zIndex: 10,
  },
  logo: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "-0.5px",
    color: "#E8E8F0",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  navTag: {
    fontSize: 12,
    color: "#6C6C8A",
    background: "#141420",
    border: "1px solid #2A2A3E",
    borderRadius: 20,
    padding: "4px 12px",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#6C6C8A",
    cursor: "pointer",
    fontSize: 14,
    padding: 0,
    fontFamily: "inherit",
  },
  hero: {
    maxWidth: 640,
    margin: "0 auto",
    padding: "64px 32px 40px",
    textAlign: "center",
  },
  heroEyebrow: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.1em",
    color: "#7C6AF7",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: "clamp(32px, 5vw, 52px)",
    fontWeight: 800,
    letterSpacing: "-1.5px",
    lineHeight: 1.1,
    margin: "0 0 20px",
    color: "#E8E8F0",
  },
  heroAccent: {
    color: "#7C6AF7",
  },
  heroSub: {
    fontSize: 17,
    color: "#8888A8",
    lineHeight: 1.6,
    margin: 0,
  },
  typeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: 12,
    maxWidth: 780,
    margin: "0 auto",
    padding: "0 32px",
  },
  typeCard: {
    background: "#0F0F1A",
    border: "1px solid #1E1E2E",
    borderRadius: 12,
    padding: "20px 16px",
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    transition: "all 0.15s ease",
    color: "#E8E8F0",
    fontFamily: "inherit",
  },
  typeCardActive: {
    border: "1px solid #7C6AF7",
    background: "#13112A",
    boxShadow: "0 0 0 1px #7C6AF7",
  },
  typeIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: "#E8E8F0",
  },
  typeDesc: {
    fontSize: 12,
    color: "#6C6C8A",
  },
  ctaRow: {
    display: "flex",
    justifyContent: "center",
    padding: "36px 32px 0",
  },
  primaryBtn: {
    background: "#7C6AF7",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px 28px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    width: "100%",
    maxWidth: 360,
    letterSpacing: "-0.3px",
    fontFamily: "inherit",
  },
  formWrap: {
    maxWidth: 560,
    margin: "0 auto",
    padding: "40px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 800,
    letterSpacing: "-0.8px",
    margin: 0,
    color: "#E8E8F0",
  },
  formSub: {
    fontSize: 14,
    color: "#6C6C8A",
    margin: "-16px 0 0",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#A0A0C0",
    letterSpacing: "0.02em",
  },
  req: {
    color: "#7C6AF7",
    marginLeft: 2,
  },
  optional: {
    color: "#4A4A6A",
    fontWeight: 400,
    fontSize: 11,
    marginLeft: 4,
  },
  input: {
    background: "#0F0F1A",
    border: "1px solid #1E1E2E",
    borderRadius: 8,
    padding: "11px 14px",
    fontSize: 14,
    color: "#E8E8F0",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  toneRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  toneChip: {
    background: "#0F0F1A",
    border: "1px solid #1E1E2E",
    borderRadius: 20,
    padding: "6px 14px",
    fontSize: 13,
    color: "#8888A8",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  toneChipActive: {
    border: "1px solid #7C6AF7",
    color: "#7C6AF7",
    background: "#13112A",
  },
  errorBox: {
    background: "#1A0A0A",
    border: "1px solid #3E1E1E",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 13,
    color: "#F78A8A",
  },
  resultWrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "32px",
  },
  resultHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 32,
    gap: 16,
    flexWrap: "wrap",
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 700,
    margin: "8px 0 0",
    color: "#E8E8F0",
    letterSpacing: "-0.5px",
    maxWidth: 440,
  },
  actionRow: {
    display: "flex",
    gap: 10,
    flexShrink: 0,
  },
  copyBtn: {
    background: "#7C6AF7",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 18px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  ghostBtn: {
    background: "none",
    color: "#6C6C8A",
    border: "1px solid #1E1E2E",
    borderRadius: 8,
    padding: "10px 18px",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  loadingBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 0",
    gap: 20,
  },
  loadingDots: {
    display: "flex",
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#7C6AF7",
    display: "inline-block",
    animation: "bounce 1.2s ease-in-out infinite",
  },
  loadingText: {
    color: "#6C6C8A",
    fontSize: 14,
    margin: 0,
  },
  resultContent: {
    background: "#0F0F1A",
    border: "1px solid #1E1E2E",
    borderRadius: 12,
    padding: "32px",
    lineHeight: 1.75,
  },
  rH1: { fontSize: 26, fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.8px", color: "#E8E8F0" },
  rH2: { fontSize: 20, fontWeight: 700, margin: "28px 0 12px", letterSpacing: "-0.5px", color: "#E8E8F0", borderTop: "1px solid #1E1E2E", paddingTop: 24 },
  rH3: { fontSize: 16, fontWeight: 700, margin: "20px 0 8px", color: "#C8C8E0" },
  rPara: { margin: "0 0 12px", fontSize: 15, color: "#C0C0D8", lineHeight: 1.75 },
  rBold: { margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "#E8E8F0" },
  rBullet: { margin: "0 0 8px", fontSize: 15, color: "#C0C0D8", paddingLeft: 8 },
  rListItem: { margin: "0 0 8px", fontSize: 15, color: "#C0C0D8", paddingLeft: 8 },
};
