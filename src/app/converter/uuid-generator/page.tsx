"use client";
import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "密码生成器", href: "/converter/password-generator/" },
  { name: "哈希生成器", href: "/converter/hash-generator/" },
];

export default function UuidGenerator() {
  const [uuids, setUuids] = useState("");
  const [count, setCount] = useState(5);
  const [version, setVersion] = useState(4);

  const generate = () => {
    const v4 = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
    setUuids(Array.from({ length: count }, v4).join("\n"));
  };

  const copy = () => navigator.clipboard.writeText(uuids);

  return (
    <ToolPageLayout title="UUID 生成器" description="生成随机 UUID" breadcrumbs={[{ label: "格式转换", href: "/converter/csv-to-json/" }, { label: "UUID 生成器" }]} relatedTools={relatedTools}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'center' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '6px' }}>数量: {count}</label>
          <input type="range" min="1" max="50" value={count} onChange={e => setCount(parseInt(e.target.value))} style={{ width: '120px' }} />
        </div>
        <button onClick={generate} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em' }}>生成</button>
      </div>
      {uuids && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '12px', color: '#9a9a9a' }}>UUID v{version}</label>
            <button onClick={copy} style={{ fontSize: '12px', color: '#6b705c', background: 'none', border: 'none', cursor: 'pointer' }}>复制</button>
          </div>
          <pre style={{ padding: '12px', border: '1px solid #e0ddd6', background: 'rgba(248,246,241,0.5)', color: '#2c2c2c', fontSize: '13px', fontFamily: 'monospace', maxHeight: '300px', overflow: 'auto' }}>{uuids}</pre>
        </div>
      )}
    </ToolPageLayout>
  );
}
