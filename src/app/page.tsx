import Link from "next/link";

const categories = [
  { name: "PDF 工具", desc: "合并、拆分、压缩、转换", href: "/pdf/merge/", count: 8 },
  { name: "图片工具", desc: "压缩、缩放、旋转、格式转换", href: "/image/compress/", count: 8 },
  { name: "格式转换", desc: "CSV、JSON、Base64、哈希、密码", href: "/converter/csv-to-json/", count: 12 },
  { name: "视频工具", desc: "压缩、转码、提取音频", href: "#", soon: true },
  { name: "AI 写作", desc: "生成、改写、摘要、翻译", href: "#", soon: true },
  { name: "更多工具", desc: "每周更新", href: "#", soon: true },
];

const pdfTools = [
  { name: "合并 PDF", desc: "多个 PDF 合为一个", href: "/pdf/merge/" },
  { name: "拆分 PDF", desc: "提取指定页面", href: "/pdf/split/" },
  { name: "压缩 PDF", desc: "减小文件体积", href: "/pdf/compress/" },
  { name: "旋转 PDF", desc: "调整页面方向", href: "/pdf/rotate/" },
  { name: "添加水印", desc: "文字水印叠加", href: "/pdf/watermark/" },
  { name: "PDF 加密", desc: "设置密码保护", href: "/pdf/protect/" },
  { name: "提取文字", desc: "导出文本内容", href: "/pdf/extract-text/" },
  { name: "页码标注", desc: "自动添加页码", href: "/pdf/add-page-numbers/" },
];

const imageTools = [
  { name: "图片压缩", desc: "减小文件体积", href: "/image/compress/" },
  { name: "图片缩放", desc: "调整图片尺寸", href: "/image/resize/" },
  { name: "格式转换", desc: "PNG/JPG/WebP 互转", href: "/image/convert/" },
  { name: "图片旋转", desc: "旋转和翻转", href: "/image/rotate/" },
  { name: "图片裁剪", desc: "裁剪指定区域", href: "/image/crop/" },
  { name: "图片翻转", desc: "水平/垂直翻转", href: "/image/flip/" },
  { name: "图片转 PDF", desc: "多图合并为 PDF", href: "/image/topdf/" },
  { name: "颜色选择器", desc: "HEX/RGB/HSL", href: "/image/color-picker/" },
];

const converterTools = [
  { name: "CSV 转 JSON", desc: "表格数据转 JSON", href: "/converter/csv-to-json/" },
  { name: "JSON 转 CSV", desc: "JSON 转表格数据", href: "/converter/json-to-csv/" },
  { name: "JSON 格式化", desc: "美化、压缩、验证", href: "/converter/json-formatter/" },
  { name: "Markdown 转 HTML", desc: "Markdown 渲染", href: "/converter/markdown-to-html/" },
  { name: "Base64 编解码", desc: "文本 Base64 转换", href: "/converter/base64/" },
  { name: "URL 编解码", desc: "URL 编码解码", href: "/converter/url-encode/" },
  { name: "HEX ↔ RGB", desc: "颜色值互转", href: "/converter/hex-rgb/" },
  { name: "字数统计", desc: "字符/单词/行数", href: "/converter/word-counter/" },
  { name: "密码生成器", desc: "随机安全密码", href: "/converter/password-generator/" },
  { name: "UUID 生成器", desc: "随机 UUID", href: "/converter/uuid-generator/" },
  { name: "哈希生成器", desc: "SHA-1/256/512", href: "/converter/hash-generator/" },
  { name: "Lorem Ipsum", desc: "占位文本生成", href: "/converter/lorem-ipsum/" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="mx-auto max-w-[960px] px-6 text-center">
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, #9a9a9a, transparent)', margin: '0 auto 32px' }} />
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300, color: '#2c2c2c', lineHeight: 1.4, letterSpacing: '0.15em', marginBottom: '20px' }}>
            免费在线工具
          </h1>
          <p style={{ fontSize: '15px', color: '#9a9a9a', maxWidth: '480px', margin: '0 auto 48px', lineHeight: 2, letterSpacing: '0.05em' }}>
            无需注册，无限使用
            <br />
            PDF · 图片 · 格式转换 · 视频
          </p>
          <div className="mx-auto max-w-[400px]">
            <input type="text" placeholder="搜索工具..."
              style={{ width: '100%', padding: '10px 16px', fontSize: '14px', background: 'transparent', border: '1px solid #e0ddd6', color: '#2c2c2c', outline: 'none', letterSpacing: '0.05em' }} />
          </div>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, #c8c8c8, transparent)', margin: '48px auto 0' }} />
        </div>
      </section>

      {/* 工具分类 */}
      <section className="mx-auto max-w-[960px] px-6" style={{ paddingBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '12px', color: '#9a9a9a', letterSpacing: '0.2em' }}>工具分类</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href}
              style={{ display: 'block', padding: '24px', border: '1px solid #e0ddd6', textDecoration: 'none', transition: 'all 0.2s', opacity: cat.soon ? 0.4 : 1, pointerEvents: cat.soon ? 'none' : 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c', letterSpacing: '0.05em', marginBottom: '6px' }}>{cat.name}</h3>
                  <p style={{ fontSize: '13px', color: '#9a9a9a' }}>{cat.desc}</p>
                </div>
                {cat.soon
                  ? <span style={{ fontSize: '11px', color: '#c8c8c8' }}>即将</span>
                  : <span style={{ fontSize: '11px', color: '#6b705c' }}>{cat.count} 项</span>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PDF 工具 */}
      <section className="mx-auto max-w-[960px] px-6" style={{ paddingBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '12px', color: '#9a9a9a', letterSpacing: '0.2em' }}>PDF 工具</span>
          <Link href="/pdf/merge/" style={{ fontSize: '13px', color: '#6b705c', textDecoration: 'none' }}>查看全部 →</Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pdfTools.map((tool) => (
            <Link key={tool.name} href={tool.href}
              style={{ display: 'block', padding: '16px 20px', borderBottom: '1px solid #eae7e0', textDecoration: 'none' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#2c2c2c', letterSpacing: '0.05em', marginBottom: '4px' }}>{tool.name}</h3>
              <p style={{ fontSize: '12px', color: '#9a9a9a' }}>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 图片工具 */}
      <section className="mx-auto max-w-[960px] px-6" style={{ paddingBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '12px', color: '#9a9a9a', letterSpacing: '0.2em' }}>图片工具</span>
          <Link href="/image/compress/" style={{ fontSize: '13px', color: '#6b705c', textDecoration: 'none' }}>查看全部 →</Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {imageTools.map((tool) => (
            <Link key={tool.name} href={tool.href}
              style={{ display: 'block', padding: '16px 20px', borderBottom: '1px solid #eae7e0', textDecoration: 'none' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#2c2c2c', letterSpacing: '0.05em', marginBottom: '4px' }}>{tool.name}</h3>
              <p style={{ fontSize: '12px', color: '#9a9a9a' }}>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 格式转换 */}
      <section className="mx-auto max-w-[960px] px-6" style={{ paddingBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '12px', color: '#9a9a9a', letterSpacing: '0.2em' }}>格式转换</span>
          <Link href="/converter/csv-to-json/" style={{ fontSize: '13px', color: '#6b705c', textDecoration: 'none' }}>查看全部 →</Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {converterTools.map((tool) => (
            <Link key={tool.name} href={tool.href}
              style={{ display: 'block', padding: '16px 20px', borderBottom: '1px solid #eae7e0', textDecoration: 'none' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#2c2c2c', letterSpacing: '0.05em', marginBottom: '4px' }}>{tool.name}</h3>
              <p style={{ fontSize: '12px', color: '#9a9a9a' }}>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 特性 */}
      <section className="mx-auto max-w-[960px] px-6" style={{ paddingBottom: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#e0ddd6', border: '1px solid #e0ddd6' }}>
          {[{ title: "完全免费", desc: "无隐藏收费" }, { title: "无需注册", desc: "即开即用" }, { title: "本地处理", desc: "文件不上传" }, { title: "无限使用", desc: "无次数限制" }].map((f) => (
            <div key={f.title} style={{ padding: '28px 20px', background: '#f8f6f1', textAlign: 'center' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#2c2c2c', letterSpacing: '0.08em', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '12px', color: '#9a9a9a' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', paddingBottom: '40px' }}>
        <span style={{ fontSize: '20px', color: '#e0ddd6', letterSpacing: '0.5em' }}>· · ·</span>
      </div>
    </div>
  );
}
