"use client";
import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "UUID 生成器", href: "/converter/uuid-generator/" },
  { name: "哈希生成器", href: "/converter/hash-generator/" },
];

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(1);

  const generate = () => {
    let chars = "";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) return;
    const passwords = Array.from({ length: count }, () =>
      Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
    );
    setPassword(passwords.join("\n"));
  };

  const copy = () => navigator.clipboard.writeText(password);

  return (
    <ToolPageLayout title="密码生成器" description="生成安全随机密码" breadcrumbs={[{ label: "格式转换", href: "/converter/csv-to-json/" }, { label: "密码生成器" }]} relatedTools={relatedTools}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '6px' }}>长度: {length}</label>
          <input type="range" min="4" max="64" value={length} onChange={e => setLength(parseInt(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '6px' }}>数量: {count}</label>
          <input type="range" min="1" max="20" value={count} onChange={e => setCount(parseInt(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        {[
          { label: "大写 A-Z", value: useUpper, set: setUseUpper },
          { label: "小写 a-z", value: useLower, set: setUseLower },
          { label: "数字 0-9", value: useNumbers, set: setUseNumbers },
          { label: "符号 !@#", value: useSymbols, set: setUseSymbols },
        ].map(opt => (
          <label key={opt.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#5a5a5a', cursor: 'pointer' }}>
            <input type="checkbox" checked={opt.value} onChange={e => opt.set(e.target.checked)} />
            {opt.label}
          </label>
        ))}
      </div>
      <button onClick={generate} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em', marginBottom: '16px' }}>生成密码</button>
      {password && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '12px', color: '#9a9a9a' }}>生成的密码</label>
            <button onClick={copy} style={{ fontSize: '12px', color: '#6b705c', background: 'none', border: 'none', cursor: 'pointer' }}>复制全部</button>
          </div>
          <pre style={{ padding: '12px', border: '1px solid #e0ddd6', background: 'rgba(248,246,241,0.5)', color: '#2c2c2c', fontSize: '13px', fontFamily: 'monospace', maxHeight: '200px', overflow: 'auto' }}>{password}</pre>
        </div>
      )}
    </ToolPageLayout>
  );
}
