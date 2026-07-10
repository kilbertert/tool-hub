import Link from "next/link";

const categories = [
  { name: "PDF Tools", desc: "Merge, split, compress, convert PDFs", href: "/pdf/merge/", count: 8, color: "#5e6ad2" },
  { name: "Image Tools", desc: "Compress, resize, convert images", href: "#", count: 0, soon: true },
  { name: "Video Tools", desc: "Compress, convert, extract audio", href: "#", count: 0, soon: true },
  { name: "Converters", desc: "CSV, JSON, Excel, XML conversion", href: "#", count: 0, soon: true },
  { name: "AI Writer", desc: "Generate, rewrite, summarize text", href: "#", count: 0, soon: true },
  { name: "More Tools", desc: "New tools added weekly", href: "#", count: 0, soon: true },
];

const pdfTools = [
  { name: "Merge PDF", desc: "Combine multiple PDFs into one", href: "/pdf/merge/" },
  { name: "Split PDF", desc: "Extract pages from a PDF", href: "/pdf/split/" },
  { name: "Compress PDF", desc: "Reduce PDF file size", href: "/pdf/compress/" },
  { name: "Rotate PDF", desc: "Rotate PDF pages", href: "/pdf/rotate/" },
  { name: "Add Watermark", desc: "Add text watermark to PDF", href: "/pdf/watermark/" },
  { name: "Protect PDF", desc: "Add password to PDF", href: "/pdf/protect/" },
  { name: "Extract Text", desc: "Extract text from PDF", href: "/pdf/extract-text/" },
  { name: "Page Numbers", desc: "Add page numbers to PDF", href: "/pdf/add-page-numbers/" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-medium" style={{ background: 'rgba(94,106,210,0.08)', border: '1px solid rgba(94,106,210,0.2)', color: '#7170ff' }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#7170ff', animation: 'pulse-soft 2s ease-in-out infinite' }} />
            200+ tools — Free forever
          </div>
          <h1 className="mb-5 font-medium leading-[1.0] tracking-[-1.584px]" style={{ fontSize: 'clamp(36px, 5vw, 72px)', color: '#f7f8f8' }}>
            Free Online Tools
            <br />
            <span style={{ color: '#7170ff' }}>No Signup Required</span>
          </h1>
          <p className="mx-auto mb-10 max-w-[560px] text-[17px] leading-[1.6]" style={{ color: '#8a8f98', letterSpacing: '-0.165px' }}>
            PDF, image, video, and AI tools. Open browser, upload file, download result. No registration, no limits, no watermarks.
          </p>
          <div className="mx-auto max-w-[420px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full rounded-lg px-4 py-3 text-[15px] outline-none"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#f7f8f8',
                }}
              />
              <svg className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: '#62666d' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1200px] px-6" style={{ paddingBottom: '80px' }}>
        <h2 className="mb-8 text-[20px] font-medium tracking-[-0.24px]" style={{ color: '#f7f8f8' }}>Tool Categories</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative rounded-lg p-5 transition-colors"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                pointerEvents: cat.soon ? 'none' : 'auto',
                opacity: cat.soon ? 0.5 : 1,
                textDecoration: 'none',
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[15px] font-medium" style={{ color: '#f7f8f8', letterSpacing: '-0.165px' }}>{cat.name}</h3>
                  <p className="mt-1 text-[13px]" style={{ color: '#8a8f98' }}>{cat.desc}</p>
                </div>
                {cat.soon ? (
                  <span className="rounded-full px-2 py-0.5 text-[11px] font-medium" style={{ background: 'rgba(255,255,255,0.05)', color: '#62666d', border: '1px solid rgba(255,255,255,0.05)' }}>Soon</span>
                ) : (
                  <span className="rounded-full px-2 py-0.5 text-[11px] font-medium" style={{ background: 'rgba(94,106,210,0.1)', color: '#7170ff' }}>{cat.count} tools</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PDF Tools */}
      <section className="mx-auto max-w-[1200px] px-6" style={{ paddingBottom: '80px' }}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[20px] font-medium tracking-[-0.24px]" style={{ color: '#f7f8f8' }}>PDF Tools</h2>
          <Link href="/pdf/merge/" className="text-[13px] font-medium" style={{ color: '#7170ff', textDecoration: 'none' }}>View all →</Link>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {pdfTools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group flex items-center gap-3 rounded-lg px-4 py-3 transition-colors"
              style={{ textDecoration: 'none', border: '1px solid transparent' }}
            >
              <div>
                <h3 className="text-[14px] font-medium transition-colors" style={{ color: '#d0d6e0', letterSpacing: '-0.13px' }}>{tool.name}</h3>
                <p className="text-[12px]" style={{ color: '#62666d' }}>{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-[1200px] px-6" style={{ paddingBottom: '120px' }}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "100% Free", desc: "No hidden fees, no freemium tricks" },
            { title: "No Signup", desc: "Start using tools immediately" },
            { title: "Private", desc: "Files processed in your browser" },
            { title: "Fast", desc: "Instant processing, no waiting" },
          ].map((f) => (
            <div key={f.title} className="rounded-lg p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 className="text-[14px] font-medium" style={{ color: '#f7f8f8' }}>{f.title}</h3>
              <p className="mt-1 text-[13px]" style={{ color: '#8a8f98' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
