"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface Breadcrumb { label: string; href?: string; }

interface Props {
  title: string;
  description: string;
  breadcrumbs: Breadcrumb[];
  children: ReactNode;
  relatedTools?: { name: string; href: string }[];
  seoContent?: ReactNode;
}

export default function ToolPageLayout({
  title, description, breadcrumbs, children, relatedTools, seoContent,
}: Props) {
  return (
    <div className="mx-auto max-w-[960px] px-6 py-10">
      {/* 面包屑 */}
      <nav className="mb-8 flex items-center gap-2" style={{ fontSize: '12px', color: '#9a9a9a', letterSpacing: '0.05em' }}>
        <Link href="/" style={{ color: '#9a9a9a', textDecoration: 'none' }}>首页</Link>
        {breadcrumbs.map((b, i) => (
          <span key={i} className="flex items-center gap-2">
            <span style={{ color: '#e0ddd6' }}>/</span>
            {b.href ? <Link href={b.href} style={{ color: '#9a9a9a', textDecoration: 'none' }}>{b.label}</Link> : <span style={{ color: '#5a5a5a' }}>{b.label}</span>}
          </span>
        ))}
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
        {/* 主内容 */}
        <div className="lg:col-span-3">
          {/* 标题 */}
          <div className="mb-8">
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: 300, 
              color: '#2c2c2c',
              letterSpacing: '0.1em',
              marginBottom: '8px',
            }}>
              {title}
            </h1>
            <p style={{ fontSize: '14px', color: '#9a9a9a', letterSpacing: '0.03em' }}>
              {description}
            </p>
            {/* 分隔线 */}
            <div style={{ 
              width: '24px', 
              height: '1px', 
              background: '#6b705c', 
              marginTop: '16px' 
            }} />
          </div>

          {/* 工具区域 */}
          <div style={{ 
            border: '1px solid #e0ddd6',
            padding: '32px',
            background: 'rgba(248,246,241,0.5)',
          }}>
            {children}
          </div>

          {/* SEO 内容 */}
          {seoContent && (
            <div style={{ 
              marginTop: '60px',
              paddingTop: '40px',
              borderTop: '1px solid #eae7e0',
            }}>
              {seoContent}
            </div>
          )}
        </div>

        {/* 侧边栏 */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 相关工具 */}
          {relatedTools && relatedTools.length > 0 && (
            <div style={{ borderLeft: '1px solid #e0ddd6', paddingLeft: '20px' }}>
              <h3 style={{ fontSize: '12px', color: '#9a9a9a', letterSpacing: '0.15em', marginBottom: '16px', fontWeight: 400 }}>
                相关工具
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {relatedTools.map((tool) => (
                  <Link key={tool.name} href={tool.href} style={{ fontSize: '13px', color: '#5a5a5a', textDecoration: 'none', letterSpacing: '0.03em' }}>
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 说明 */}
          <div style={{ borderLeft: '1px solid #e0ddd6', paddingLeft: '20px' }}>
            <h3 style={{ fontSize: '12px', color: '#9a9a9a', letterSpacing: '0.15em', marginBottom: '16px', fontWeight: 400 }}>
              关于此工具
            </h3>
            <div style={{ fontSize: '13px', color: '#9a9a9a', lineHeight: 2 }}>
              <p>✓ 完全免费</p>
              <p>✓ 无需注册</p>
              <p>✓ 文件本地处理</p>
              <p>✓ 无水印</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
