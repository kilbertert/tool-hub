import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ToolHub — Free Online Tools | No Signup Required",
  description: "200+ free online tools for PDF, images, video, and more. No signup, no limits. Process files directly in your browser.",
  keywords: "free online tools, pdf tools, image tools, video converter, file converter, no signup",
  openGraph: {
    title: "ToolHub — Free Online Tools",
    description: "200+ free online tools. No signup required.",
    type: "website",
    url: "https://upscaleimage.xyz",
  },
};

const navLinks = [
  { href: "/pdf/merge/", label: "PDF Tools" },
  { href: "#", label: "Image Tools", soon: true },
  { href: "#", label: "Video Tools", soon: true },
  { href: "#", label: "Converters", soon: true },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ToolHub",
              url: "https://upscaleimage.xyz",
              description: "Free online tools for PDF, images, video, and more.",
              applicationCategory: "UtilitiesApplication",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
      </head>
      <body>
        {/* Navigation */}
        <nav className="sticky top-0 z-50" style={{ background: 'rgba(8,9,10,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
              <div className="h-7 w-7 rounded-md" style={{ background: 'linear-gradient(135deg, #5e6ad2, #7170ff)' }} />
              <span className="text-[15px] font-medium tracking-tight" style={{ color: '#f7f8f8' }}>
                Tool<span style={{ color: '#7170ff' }}>Hub</span>
              </span>
            </Link>
            <div className="hidden items-center gap-7 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[13px] transition-colors"
                  style={{
                    color: link.soon ? '#62666d' : '#d0d6e0',
                    fontWeight: 500,
                    letterSpacing: '-0.13px',
                    pointerEvents: link.soon ? 'none' : 'auto',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[12px]" style={{ color: '#62666d' }}>100% Free</span>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="mx-auto max-w-[1200px] px-6 py-16">
            <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
              <div>
                <h4 className="mb-4 text-[12px] font-medium uppercase tracking-wider" style={{ color: '#8a8f98' }}>PDF Tools</h4>
                <div className="flex flex-col gap-2.5">
                  {["Merge PDF", "Split PDF", "Compress PDF", "Rotate PDF"].map((t) => (
                    <Link key={t} href={`/pdf/${t.split(" ")[0].toLowerCase()}/`} className="text-[13px]" style={{ color: '#62666d', textDecoration: 'none' }}>{t}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-4 text-[12px] font-medium uppercase tracking-wider" style={{ color: '#8a8f98' }}>Image Tools</h4>
                <p className="text-[13px]" style={{ color: '#3e3e44' }}>Coming soon</p>
              </div>
              <div>
                <h4 className="mb-4 text-[12px] font-medium uppercase tracking-wider" style={{ color: '#8a8f98' }}>Video Tools</h4>
                <p className="text-[13px]" style={{ color: '#3e3e44' }}>Coming soon</p>
              </div>
              <div>
                <h4 className="mb-4 text-[12px] font-medium uppercase tracking-wider" style={{ color: '#8a8f98' }}>About</h4>
                <p className="text-[13px] leading-relaxed" style={{ color: '#62666d' }}>Free online tools. No signup, no limits. Your files never leave your browser.</p>
              </div>
            </div>
            <div className="mt-16 pt-8 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-[12px]" style={{ color: '#3e3e44' }}>© 2025 ToolHub. Files processed locally in your browser.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
