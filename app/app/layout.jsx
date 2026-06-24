export const metadata = {
  title: 'ContentForge - AI Content Engine for B2B',
  description: 'Generate publish-ready content in 30 seconds',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'Inter', system-ui, sans-serif", background: '#0A0A0F', color: '#E8E8F0' }}>
        {children}
      </body>
    </html>
  );
}
