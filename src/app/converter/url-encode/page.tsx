"use client";
import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "Base64 编解码", href: "/converter/base64/" },
  { name: "JSON 格式化", href: "/converter/json-formatter/" },
];

export default function UrlEncode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleConvert = () => {
    try {
      setOutput(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input));
    } catch (e) { setOutput("解码失败: 输入格式不正确"); }
  };

  const handleCopy = () => navigator.clipboard.writeText(output);

  return (
    <ToolPageLayout title="URL 编解码" description="URL 编码和解码" breadcrumbs={[{ label: "格式转换", href: "/converter/url-encode/" }, { label: "URL 编解码" }]} relatedTools={relatedTools}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <button onClick={() => setMode("encode")} style={{ padding: '8px 20px', border: `1px solid ${mode === "encode" ? '#6b705c' : '#e0ddd6'}`, background: 'transparent', color: mode === "encode" ? '#6b705c' : '#9a9a9a', cursor: 'pointer', fontSize: '13px' }}>编码</button>
        <button onClick={() => setMode("decode")} style={{ padding: '8px 20px', border: `1px solid ${mode === "decode" ? '#6b705c' : '#e0ddd6'}`, background: 'transparent', color: mode === "decode" ? '#6b705c' : '#9a9a9a', cursor: 'pointer', fontSize: '13px' }}>解码</button>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '8px' }}>输入</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={4}
          style={{ width: '100%', padding: '12px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '13px', fontFamily: 'monospace', outline: 'none' }} />
      </div>
      <button onClick={handleConvert} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em', marginBottom: '16px' }}>{mode === "encode" ? "编码" : "解码"}</button>
      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '12px', color: '#9a9a9a' }}>输出</label>
            <button onClick={handleCopy} style={{ fontSize: '12px', color: '#6b705c', background: 'none', border: 'none', cursor: 'pointer' }}>复制</button>
          </div>
          <pre style={{ padding: '12px', border: '1px solid #e0ddd6', background: 'rgba(248,246,241,0.5)', color: '#2c2c2c', fontSize: '13px', fontFamily: 'monospace', wordBreak: 'break-all' }}>{output}</pre>
        </div>
      )}
    </ToolPageLayout>
  );
}
