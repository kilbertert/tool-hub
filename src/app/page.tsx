import Link from "next/link";

const categories = [
  { name: "PDF Tools", desc: "Merge, split, compress, convert PDFs", href: "/pdf/merge", icon: "📄", count: 12, color: "from-red-500/20 to-orange-500/20" },
  { name: "Image Tools", desc: "Compress, resize, convert images", href: "#", icon: "🖼️", count: 8, color: "from-blue-500/20 to-cyan-500/20", soon: true },
  { name: "Video Tools", desc: "Compress, convert, extract audio", href: "#", icon: "🎬", count: 6, color: "from-purple-500/20 to-pink-500/20", soon: true },
  { name: "Converters", desc: "CSV, JSON, Excel, XML conversion", href: "#", icon: "🔄", count: 10, color: "from-green-500/20 to-emerald-500/20", soon: true },
  { name: "AI Writer", desc: "Generate, rewrite, summarize text", href: "#", icon: "✍️", count: 5, color: "from-yellow-500/20 to-amber-500/20", soon: true },
  { name: "More Tools", desc: "Coming soon — we add new tools weekly", href: "#", icon: "⚡", count: 0, color: "from-zinc-500/20 to-zinc-500/20", soon: true },
];

const pdfTools = [
  { name: "Merge PDF", desc: "Combine multiple PDFs into one", href: "/pdf/merge", icon: "📎" },
  { name: "Split PDF", desc: "Extract pages from a PDF", href: "/pdf/split", icon: "✂️" },
  { name: "Compress PDF", desc: "Reduce PDF file size", href: "/pdf/compress", icon: "📦" },
  { name: "Rotate PDF", desc: "Rotate PDF pages", href: "/pdf/rotate", icon: "🔄" },
  { name: "Add Watermark", desc: "Add text watermark to PDF", href: "/pdf/watermark", icon: "💧" },
  { name: "Protect PDF", desc: "Add password to PDF", href: "/pdf/protect", icon: "🔒" },
  { name: "Extract Text", desc: "Extract text from PDF", href: "/pdf/extract-text", icon: "📝" },
  { name: "Add Page Numbers", desc: "Add page numbers to PDF", href: "/pdf/add-page-numbers", icon: "#️⃣" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-sm text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            200+ tools — Free forever
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            Free Online Tools
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">No Signup Required</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400">
            PDF, image, video, and AI tools. Open browser, upload file, download result.
            <br />No registration, no limits, no watermarks.
          </p>
          <div className="mx-auto max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools... (e.g. merge pdf)"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-zinc-500 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
              />
              <svg className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <h2 className="mb-8 text-2xl font-bold">Tool Categories</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href} className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br ${cat.color} p-6 transition hover:border-white/10 hover:scale-[1.02] ${cat.soon ? 'pointer-events-none opacity-60' : ''}`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl">{cat.icon}</span>
                  <h3 className="mt-3 text-lg font-semibold">{cat.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{cat.desc}</p>
                </div>
                {cat.soon && <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500">Soon</span>}
                {!cat.soon && <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-400">{cat.count} tools</span>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular PDF Tools */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Popular PDF Tools</h2>
          <Link href="/pdf/merge" className="text-sm text-indigo-400 hover:text-indigo-300">View all →</Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pdfTools.map((tool) => (
            <Link key={tool.name} href={tool.href} className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-indigo-500/30 hover:bg-white/[0.04]">
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <h3 className="text-sm font-medium transition group-hover:text-indigo-400">{tool.name}</h3>
                <p className="text-xs text-zinc-500">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "🆓", title: "100% Free", desc: "No hidden fees, no freemium tricks" },
            { icon: "🚫", title: "No Signup", desc: "Start using tools immediately" },
            { icon: "🔒", title: "Private", desc: "Files processed in your browser" },
            { icon: "⚡", title: "Fast", desc: "Instant processing, no waiting" },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center">
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
