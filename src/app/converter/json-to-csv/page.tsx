"use client";
import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "CSV 转 JSON", href: "/converter/csv-to-json/" },
  { name: "JSON 格式化", href: "/converter/json-formatter/" },
];

export default function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    try {
      const data = JSON.parse(input);
      const arr = Array.isArray(data) ? data : [data];
      if (arr.length === 0) throw new Error("空数组");
      const headers = [...new Set(arr.flatMap(Object.keys))];
      const csv = [headers.join(","), ...arr.map(row => headers.map(h => {
        const v = row[h] ?? "";
        return typeof v === "string" && v.includes(",") ? `"${v}"` : v;
      }).join(","))].join("\n");
      setOutput(csv);
    } catch (e) { setError((e as Error).message); }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "converted.csv";
    a.click();
  };

  return (
    <ToolPageLayout title="JSON 转 CSV" description="将 JSON 数据转换为 CSV 表格" breadcrumbs={[{ label: "格式转换", href: "/converter/json-to-csv/" }, { label: "JSON 转 CSV" }]} relatedTools={relatedTools}>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '8px' }}>输入 JSON</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={8} placeholder='[{"name":"Alice","age":30},{"name":"Bob","age":25}]'
          style={{ width: '100%', padding: '12px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '13px', fontFamily: 'monospace', outline: 'none', resize: 'vertical' }} />
      </div>
      <button onClick={handleConvert} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em', marginBottom: '16px' }}>转换</button>
      {error && <p style={{ color: '#8b4049', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '12px', color: '#9a9a9a' }}>CSV 输出</label>
            <button onClick={handleDownload} style={{ fontSize: '12px', color: '#6b705c', background: 'none', border: 'none', cursor: 'pointer' }}>下载</button>
          </div>
          <pre style={{ padding: '12px', border: '1px solid #e0ddd6', background: 'rgba(248,246,241,0.5)', color: '#2c2c2c', fontSize: '13px', fontFamily: 'monospace', overflow: 'auto' }}>{output}</pre>
        </div>
      )}
    </ToolPageLayout>
  );
}
