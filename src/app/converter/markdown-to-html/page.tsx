"use client";
import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "JSON 格式化", href: "/converter/json-formatter/" },
  { name: "Base64 编解码", href: "/converter/base64/" },
];

export default function MarkdownToHtml() {
  const [input, setInput] = useState("# Hello\n\nThis is **bold** and *italic*.\n\n- Item 1\n- Item 2");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    // Simple markdown to HTML conversion
    let html = input
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\n\n/gim, '</p><p>')
      .replace(/\n/gim, '<br>');
    html = '<p>' + html + '</p>';
    setOutput(html);
  };

  const handleCopy = () => navigator.clipboard.writeText(output);

  return (
    <ToolPageLayout title="Markdown 转 HTML" description="将 Markdown 文本转换为 HTML" breadcrumbs={[{ label: "格式转换", href: "/converter/markdown-to-html/" }, { label: "Markdown 转 HTML" }]} relatedTools={relatedTools}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '8px' }}>Markdown</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={12}
            style={{ width: '100%', padding: '12px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '13px', fontFamily: 'monospace', outline: 'none', resize: 'vertical' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '12px', color: '#9a9a9a' }}>HTML</label>
            {output && <button onClick={handleCopy} style={{ fontSize: '12px', color: '#6b705c', background: 'none', border: 'none', cursor: 'pointer' }}>复制</button>}
          </div>
          <pre style={{ padding: '12px', border: '1px solid #e0ddd6', background: 'rgba(248,246,241,0.5)', color: '#2c2c2c', fontSize: '13px', fontFamily: 'monospace', overflow: 'auto', height: 'calc(100% - 32px)', whiteSpace: 'pre-wrap' }}>{output || "点击转换..."}</pre>
        </div>
      </div>
      <button onClick={handleConvert} style={{ marginTop: '16px', padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em' }}>转换</button>
    </ToolPageLayout>
  );
}
