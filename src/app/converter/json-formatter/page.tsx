"use client";
import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "CSV 转 JSON", href: "/converter/csv-to-json/" },
  { name: "JSON 转 CSV", href: "/converter/json-to-csv/" },
];

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const handleFormat = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e) { setError("JSON 格式错误: " + (e as Error).message); }
  };

  const handleMinify = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e) { setError("JSON 格式错误: " + (e as Error).message); }
  };

  const handleCopy = () => navigator.clipboard.writeText(output);

  return (
    <ToolPageLayout title="JSON 格式化" description="JSON 美化、压缩、验证" breadcrumbs={[{ label: "格式转换", href: "/converter/json-formatter/" }, { label: "JSON 格式化" }]} relatedTools={relatedTools}>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '8px' }}>输入 JSON</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={8}
          style={{ width: '100%', padding: '12px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '13px', fontFamily: 'monospace', outline: 'none', resize: 'vertical' }} />
      </div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
        <button onClick={handleFormat} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em' }}>格式化</button>
        <button onClick={handleMinify} style={{ padding: '10px 24px', border: '1px solid #e0ddd6', background: 'transparent', color: '#5a5a5a', cursor: 'pointer', fontSize: '14px' }}>压缩</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          <label style={{ fontSize: '12px', color: '#9a9a9a' }}>缩进:</label>
          <select value={indent} onChange={e => setIndent(parseInt(e.target.value))} style={{ padding: '4px 8px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '12px' }}>
            <option value={2}>2 空格</option>
            <option value={4}>4 空格</option>
            <option value={1}>Tab</option>
          </select>
        </div>
      </div>
      {error && <p style={{ color: '#8b4049', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '12px', color: '#9a9a9a' }}>输出</label>
            <button onClick={handleCopy} style={{ fontSize: '12px', color: '#6b705c', background: 'none', border: 'none', cursor: 'pointer' }}>复制</button>
          </div>
          <pre style={{ padding: '12px', border: '1px solid #e0ddd6', background: 'rgba(248,246,241,0.5)', color: '#2c2c2c', fontSize: '13px', fontFamily: 'monospace', overflow: 'auto', maxHeight: '400px', whiteSpace: 'pre-wrap' }}>{output}</pre>
        </div>
      )}
    </ToolPageLayout>
  );
}
