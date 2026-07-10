import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
  { href: "/pdf/merge", label: "PDF Tools" },
  { href: "/tools/image", label: "Image Tools" },
  { href: "/tools/video", label: "Video Tools" },
  { href: "/tools/converter", label: "Converters" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
      <body className={inter.className}>
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a1a]/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500" />
              <span>Tool<span className="text-indigo-400">Hub</span></span>
            </Link>
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-zinc-400 transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="text-sm text-zinc-500">100% Free</div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-white/5 bg-[#0a0a1a]">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <h4 className="mb-4 text-sm font-semibold text-white">PDF Tools</h4>
                <div className="flex flex-col gap-2">
                  <Link href="/pdf/merge" className="text-sm text-zinc-500 hover:text-zinc-300">Merge PDF</Link>
                  <Link href="/pdf/split" className="text-sm text-zinc-500 hover:text-zinc-300">Split PDF</Link>
                  <Link href="/pdf/compress" className="text-sm text-zinc-500 hover:text-zinc-300">Compress PDF</Link>
                  <Link href="/pdf/rotate" className="text-sm text-zinc-500 hover:text-zinc-300">Rotate PDF</Link>
                </div>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold text-white">Image Tools</h4>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-zinc-600">Coming soon</span>
                </div>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold text-white">Video Tools</h4>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-zinc-600">Coming soon</span>
                </div>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold text-white">About</h4>
                <p className="text-sm text-zinc-500">Free online tools. No signup, no limits. Your files never leave your browser.</p>
              </div>
            </div>
            <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-zinc-600">
              © 2025 ToolHub. All rights reserved. Files processed locally in your browser.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
