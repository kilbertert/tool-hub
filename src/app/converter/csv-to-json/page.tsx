"use client";
import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "JSON 转 CSV", href: "/converter/json-to-csv/" },
  { name: "JSON 格式化", href: "/converter/json-formatter/" },
];

export default function CsvToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    try {
      const lines = input.trim().split("\n");
      if (lines.length < 2) throw new Error("至少需要表头和一行数据");
      const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
      const result = lines.slice(1).map(line => {
        const values = line.split(",").map(v => v.trim().replace(/^"|"$/g, ""));
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => obj[h] = values[i] || "");
        return obj;
      });
      setOutput(JSON.stringify(result, null, 2));
    } catch (e) { setError((e as Error).message); }
  };

  const handleCopy = () => navigator.clipboard.writeText(output);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) f.text().then(t => setInput(t));
  };

  return (
    <ToolPageLayout title="CSV 转 JSON" description="将 CSV 表格数据转换为 JSON 格式" breadcrumbs={[{ label: "格式转换", href: "/converter/csv-to-json/" }, { label: "CSV 转 JSON" }]} relatedTools={relatedTools}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <label style={{ fontSize: '12px', color: '#9a9a9a' }}>输入 CSV</label>
          <label style={{ fontSize: '12px', color: '#6b705c', cursor: 'pointer' }}>
            上传文件 <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
          </label>
        </div>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={8} placeholder="name,age,city\nAlice,30,Beijing\nBob,25,Shanghai"
          style={{ width: '100%', padding: '12px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '13px', fontFamily: 'monospace', outline: 'none', resize: 'vertical' }} />
      </div>
      <button onClick={handleConvert} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em', marginBottom: '16px' }}>转换</button>
      {error && <p style={{ color: '#8b4049', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '12px', color: '#9a9a9a' }}>JSON 输出</label>
            <button onClick={handleCopy} style={{ fontSize: '12px', color: '#6b705c', background: 'none', border: 'none', cursor: 'pointer' }}>复制</button>
          </div>
          <pre style={{ padding: '12px', border: '1px solid #e0ddd6', background: 'rgba(248,246,241,0.5)', color: '#2c2c2c', fontSize: '13px', fontFamily: 'monospace', overflow: 'auto', maxHeight: '300px' }}>{output}</pre>
        </div>
      )}
    </ToolPageLayout>
  );
}
