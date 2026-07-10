"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface Breadcrumb { label: string; href?: string; }

interface Props {
  title: string;
  description: string;
  breadcrumbs: Breadcrumb[];
  icon: string;
  children: ReactNode;
  relatedTools?: { name: string; href: string; icon: string }[];
  seoContent?: ReactNode;
}

export default function ToolPageLayout({
  title, description, breadcrumbs, icon, children, relatedTools, seoContent,
}: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">Home</Link>
        {breadcrumbs.map((b, i) => (
          <span key={i} className="flex items-center gap-2">
            <span>/</span>
            {b.href ? <Link href={b.href} className="hover:text-zinc-300">{b.label}</Link> : <span className="text-zinc-300">{b.label}</span>}
          </span>
        ))}
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{icon}</span>
              <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="mt-1 text-zinc-400">{description}</p>
              </div>
            </div>
          </div>

          {/* Tool area */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            {children}
          </div>

          {/* SEO content */}
          {seoContent && (
            <div className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-8">
              {seoContent}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Related tools */}
          {relatedTools && relatedTools.length > 0 && (
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h3 className="mb-4 text-sm font-semibold text-zinc-300">Related Tools</h3>
              <div className="flex flex-col gap-2">
                {relatedTools.map((tool) => (
                  <Link key={tool.name} href={tool.href} className="flex items-center gap-3 rounded-lg p-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white">
                    <span>{tool.icon}</span>
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Info card */}
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <h3 className="mb-3 text-sm font-semibold text-zinc-300">Why ToolHub?</h3>
            <div className="space-y-3 text-sm text-zinc-500">
              <p>✓ 100% free, no limits</p>
              <p>✓ No signup required</p>
              <p>✓ Files stay in your browser</p>
              <p>✓ No watermarks added</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
