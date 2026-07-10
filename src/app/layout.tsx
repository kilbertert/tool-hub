import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ToolHub — 免费在线工具",
  description: "200+ 免费在线工具。无需注册，无限使用。PDF、图片、视频、格式转换，一站搞定。",
  keywords: "free online tools, pdf tools, image tools, 免费工具, 在线工具",
};

const navLinks = [
  { href: "/pdf/merge/", label: "PDF 工具" },
  { href: "#", label: "图片工具", soon: true },
  { href: "#", label: "视频工具", soon: true },
  { href: "#", label: "格式转换", soon: true },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ToolHub",
              description: "免费在线工具箱",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
      </head>
      <body>
        {/* 导航 */}
        <nav style={{ 
          borderBottom: '1px solid #e0ddd6',
          background: 'rgba(248,246,241,0.92)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <div className="mx-auto flex h-12 max-w-[960px] items-center justify-between px-6">
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* 印章风格logo */}
              <div style={{
                width: '24px',
                height: '24px',
                border: '1.5px solid #8b4049',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                color: '#8b4049',
                fontWeight: 600,
                letterSpacing: '-0.5px',
              }}>
                工
              </div>
              <span style={{ 
                fontSize: '16px', 
                fontWeight: 500, 
                color: '#2c2c2c',
                letterSpacing: '0.05em',
              }}>
                工具集
              </span>
            </Link>
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: '13px',
                    color: link.soon ? '#c8c8c8' : '#5a5a5a',
                    textDecoration: 'none',
                    letterSpacing: '0.08em',
                    pointerEvents: link.soon ? 'none' : 'auto',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <main>{children}</main>

        {/* 页脚 */}
        <footer style={{ 
          borderTop: '1px solid #e0ddd6',
          marginTop: '80px',
        }}>
          <div className="mx-auto max-w-[960px] px-6 py-16">
            <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
              <div>
                <h4 style={{ fontSize: '12px', color: '#9a9a9a', marginBottom: '16px', letterSpacing: '0.1em', fontWeight: 400 }}>PDF 工具</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {["合并 PDF", "拆分 PDF", "压缩 PDF", "旋转 PDF"].map((t) => (
                    <Link key={t} href={`/pdf/${t.split(" ")[1] === "PDF" ? t.split(" ")[0] === "合并" ? "merge" : t.split(" ")[0] === "拆分" ? "split" : t.split(" ")[0] === "压缩" ? "compress" : "rotate" : ""}/`} 
                      style={{ fontSize: '13px', color: '#9a9a9a', textDecoration: 'none' }}>{t}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '12px', color: '#9a9a9a', marginBottom: '16px', letterSpacing: '0.1em', fontWeight: 400 }}>图片工具</h4>
                <p style={{ fontSize: '13px', color: '#c8c8c8' }}>即将上线</p>
              </div>
              <div>
                <h4 style={{ fontSize: '12px', color: '#9a9a9a', marginBottom: '16px', letterSpacing: '0.1em', fontWeight: 400 }}>视频工具</h4>
                <p style={{ fontSize: '13px', color: '#c8c8c8' }}>即将上线</p>
              </div>
              <div>
                <h4 style={{ fontSize: '12px', color: '#9a9a9a', marginBottom: '16px', letterSpacing: '0.1em', fontWeight: 400 }}>关于</h4>
                <p style={{ fontSize: '13px', color: '#9a9a9a', lineHeight: 1.8 }}>免费在线工具。无需注册，文件在浏览器本地处理，不上传服务器。</p>
              </div>
            </div>
            <div style={{ marginTop: '60px', paddingTop: '24px', borderTop: '1px solid #eae7e0', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: '#c8c8c8', letterSpacing: '0.05em' }}>© 2025 工具集 · 文件仅在浏览器本地处理</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
