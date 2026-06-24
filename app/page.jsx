'use client';
// v2 - fixed landing page


export default function Home() {
  return (
    <div style={{ background: '#0A0A0F', color: '#E8E8F0', fontFamily: "'Inter', system-ui, sans-serif", minHeight: '100vh' }}>
      {/* NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 40px', borderBottom: '1px solid #1E1E2E', position: 'sticky', top: 0, background: '#0A0A0Fee', backdropFilter: 'blur(12px)', zIndex: 100 }}>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.5px' }}>
          ⚡ Content<span style={{ color: '#7C6AF7' }}>Forge</span>
        </div>
        <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}>
          <li><a href="#features" style={{ color: '#6C6C8A', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Features</a></li>
          <li><a href="#pricing" style={{ color: '#6C6C8A', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Pricing</a></li>
          <li><a href="#faq" style={{ color: '#6C6C8A', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>FAQ</a></li>
        </ul>
        <a href="/generate" style={{ background: '#7C6AF7', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
          Start Free Trial
        </a>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '100px 40px 80px', maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7C6AF7', background: '#7C6AF711', border: '1px solid #7C6AF733', borderRadius: 20, padding: '5px 14px', marginBottom: 28 }}>
          AI Content for B2B Companies
        </div>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, letterSpacing: '-2.5px', lineHeight: 1.04, marginBottom: 24, margin: '0 0 24px' }}>
          Stop writing content.<br />
          <span style={{ color: '#7C6AF7' }}>Start publishing it.</span>
        </h1>
        <p style={{ fontSize: 19, color: '#6C6C8A', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.65 }}>
          ContentForge turns a 2-line brief into a publish-ready blog post, LinkedIn thread, email sequence, or ad copy in under 30 seconds — powered by Claude AI.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/generate" style={{ background: '#7C6AF7', color: '#fff', border: 'none', borderRadius: 10, padding: '16px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
            Start Free Trial →
          </a>
          <a href="#demo" style={{ background: 'transparent', color: '#C0C0D8', border: '1px solid #1E1E2E', borderRadius: 10, padding: '16px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
            See it in action
          </a>
        </div>
      </section>

      {/* PROOF BAR */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, flexWrap: 'wrap', padding: '32px 40px', borderTop: '1px solid #1E1E2E', borderBottom: '1px solid #1E1E2E' }}>
        {[
          { num: '10x', label: 'Faster than writing manually' },
          { num: '6', label: 'Content formats supported' },
          { num: '$0', label: 'To get started today' },
          { num: '30s', label: 'Average generation time' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>{item.num}</div>
            <div style={{ fontSize: 13, color: '#6C6C8A' }}>{item.label}</div>
            {i < 3 && <div style={{ width: 1, height: 36, background: '#1E1E2E' }} />}
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section style={{ padding: '80px 40px', maxWidth: 900, margin: '0 auto' }} id="features">
        <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6C6C8A', marginBottom: 16 }}>
          Everything You Need
        </div>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 48, margin: '0 0 48px' }}>
          One tool. Six content types.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {[
            { icon: '✍️', title: 'Blog Posts', desc: 'SEO-optimized long-form articles with H2 structure, hooks, and CTAs.' },
            { icon: '💼', title: 'LinkedIn Posts', desc: 'Thought leadership content that builds authority and drives engagement.' },
            { icon: '📧', title: 'Email Sequences', desc: '3-part nurture sequences with subject lines and conversion CTAs.' },
            { icon: '🐦', title: 'Twitter Threads', desc: '10-tweet threads engineered for virality and engagement.' },
            { icon: '🎯', title: 'Ad Copy', desc: 'Facebook and Google ad variants with headlines and descriptions.' },
            { icon: '📊', title: 'Case Studies', desc: 'Customer success stories with challenge, solution, and results.' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#0F0F1A', border: '1px solid #1E1E2E', borderRadius: 14, padding: '28px 24px' }}>
              <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 14, color: '#6C6C8A', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: '80px 40px', maxWidth: 780, margin: '0 auto' }} id="pricing">
        <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6C6C8A', marginBottom: 16 }}>
          Simple Pricing
        </div>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 48, margin: '0 0 48px' }}>
          Start free. Scale when ready.
        </h2>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { name: 'Starter', price: 99, features: ['50 generations/month', 'All 6 content types', '1 brand voice', 'Copy & export', 'Email support'] },
            { name: 'Pro', price: 299, features: ['Unlimited generations', 'All 6 content types', '5 brand voices', 'Team collab (3 seats)', 'Priority support', 'Early access'], badge: 'Most Popular' },
          ].map((plan, i) => (
            <div key={i} style={{ background: '#0F0F1A', border: plan.badge ? '1px solid #7C6AF766' : '1px solid #1E1E2E', borderRadius: 16, padding: '36px 28px', flex: '1 1 280px', maxWidth: 320, position: 'relative' }}>
              {plan.badge && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#7C6AF7', fontSize: 11, fontWeight: 700, color: '#fff', padding: '4px 14px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                  {plan.badge}
                </div>
              )}
              <div style={{ fontSize: 13, fontWeight: 700, color: '#6C6C8A', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                {plan.name}
              </div>
              <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-2px', lineHeight: 1 }}>
                ${plan.price}
              </div>
              <div style={{ fontSize: 15, color: '#6C6C8A', marginTop: 4, marginBottom: 20 }}>/month</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ fontSize: 14, color: '#C0C0D8', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#10B981', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/generate" style={{ display: 'block', width: '100%', textAlign: 'center', textDecoration: 'none', background: plan.badge ? '#7C6AF7' : '#0F0F1A', color: plan.badge ? '#fff' : '#E8E8F0', border: plan.badge ? 'none' : '1px solid #1E1E2E', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 40px', maxWidth: 680, margin: '0 auto' }} id="faq">
        <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6C6C8A', marginBottom: 16 }}>
          FAQ
        </div>
        <h2 style={{ textAlign: 'left', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 40, margin: '0 0 40px' }}>
          Common questions
        </h2>
        {[
          { q: 'How is this different from ChatGPT?', a: 'ContentForge is purpose-built for B2B content. It understands business audiences, uses proven frameworks, and produces publish-ready output. ChatGPT requires you to be a prompt engineer.' },
          { q: 'Will the content sound like me?', a: 'You control the tone and company context. The more detail you provide, the more on-brand the output. Most users spend 5–15 minutes editing rather than hours writing.' },
          { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no questions asked. Cancel from your billing portal in 30 seconds.' },
          { q: 'Is there a free trial?', a: 'Yes — start with a 7-day free trial on either plan. No credit card required to sign up.' },
          { q: 'What industries does it work for?', a: 'ContentForge is designed for B2B companies — SaaS, fintech, consulting, marketing, legal tech, HR tech, and more.' },
        ].map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid #1E1E2E', padding: '24px 0' }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{item.q}</div>
            <div style={{ fontSize: 15, color: '#6C6C8A', lineHeight: 1.7 }}>{item.a}</div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '80px 40px 100px', maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: 20 }}>
          Your competitors<br />are already publishing.
        </h2>
        <p style={{ fontSize: 18, color: '#6C6C8A', marginBottom: 36 }}>
          Join the B2B teams using ContentForge to outpublish, outrank, and outsell.
        </p>
        <a href="/generate" style={{ background: '#7C6AF7', color: '#fff', border: 'none', borderRadius: 10, padding: '18px 40px', fontSize: 17, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
          Start Free Trial →
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #1E1E2E', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, fontSize: 13, color: '#6C6C8A' }}>
        <div style={{ fontSize: 18, fontWeight: 800 }}>⚡ ContentForge</div>
        <div>© 2026 ContentForge. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ color: '#6C6C8A', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: '#6C6C8A', textDecoration: 'none' }}>Terms</a>
          <a href="#" style={{ color: '#6C6C8A', textDecoration: 'none' }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
