"use client";
import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "Base64 编解码", href: "/converter/base64/" },
  { name: "UUID 生成器", href: "/converter/uuid-generator/" },
];

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});

  const generate = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const algos = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
    const results: Record<string, string> = {};
    for (const algo of algos) {
      const hash = await crypto.subtle.digest(algo, data);
      results[algo] = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
    }
    setHashes(results);
  };

  const copy = (text: string) => navigator.clipboard.writeText(text);

  return (
    <ToolPageLayout title="哈希生成器" description="生成 SHA-1、SHA-256、SHA-384、SHA-512 哈希值" breadcrumbs={[{ label: "格式转换", href: "/converter/csv-to-json/" }, { label: "哈希生成器" }]} relatedTools={relatedTools}>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '8px' }}>输入文本</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={4}
          style={{ width: '100%', padding: '12px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '14px', outline: 'none', resize: 'vertical' }} />
      </div>
      <button onClick={generate} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em', marginBottom: '20px' }}>生成哈希</button>
      {Object.keys(hashes).length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <label style={{ fontSize: '12px', color: '#9a9a9a' }}>{algo}</label>
                <button onClick={() => copy(hash)} style={{ fontSize: '12px', color: '#6b705c', background: 'none', border: 'none', cursor: 'pointer' }}>复制</button>
              </div>
              <code style={{ display: 'block', padding: '8px 12px', border: '1px solid #e0ddd6', background: 'rgba(248,246,241,0.5)', color: '#2c2c2c', fontSize: '12px', fontFamily: 'monospace', wordBreak: 'break-all' }}>{hash}</code>
            </div>
          ))}
        </div>
      )}
    </ToolPageLayout>
  );
}
