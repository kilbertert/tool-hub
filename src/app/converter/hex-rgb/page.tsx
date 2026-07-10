"use client";
import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "颜色选择器", href: "/image/color-picker/" },
  { name: "JSON 格式化", href: "/converter/json-formatter/" },
];

export default function HexRgb() {
  const [hex, setHex] = useState("#6b705c");
  const [r, setR] = useState(107);
  const [g, setG] = useState(112);
  const [b, setB] = useState(92);
  const [mode, setMode] = useState<"hex2rgb" | "rgb2hex">("hex2rgb");

  const hexToRgb = () => {
    const m = hex.replace("#", "");
    if (m.length === 6) {
      setR(parseInt(m.slice(0,2), 16));
      setG(parseInt(m.slice(2,4), 16));
      setB(parseInt(m.slice(4,6), 16));
    }
  };

  const rgbToHex = () => {
    setHex("#" + [r, g, b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join(""));
  };

  const copy = (text: string) => navigator.clipboard.writeText(text);

  return (
    <ToolPageLayout title="HEX ↔ RGB" description="颜色值 HEX 和 RGB 互转" breadcrumbs={[{ label: "格式转换", href: "/converter/csv-to-json/" }, { label: "HEX ↔ RGB" }]} relatedTools={relatedTools}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button onClick={() => setMode("hex2rgb")} style={{ padding: '8px 20px', border: `1px solid ${mode === "hex2rgb" ? '#6b705c' : '#e0ddd6'}`, background: 'transparent', color: mode === "hex2rgb" ? '#6b705c' : '#9a9a9a', cursor: 'pointer', fontSize: '13px' }}>HEX → RGB</button>
        <button onClick={() => setMode("rgb2hex")} style={{ padding: '8px 20px', border: `1px solid ${mode === "rgb2hex" ? '#6b705c' : '#e0ddd6'}`, background: 'transparent', color: mode === "rgb2hex" ? '#6b705c' : '#9a9a9a', cursor: 'pointer', fontSize: '13px' }}>RGB → HEX</button>
      </div>
      {mode === "hex2rgb" ? (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '6px' }}>HEX</label>
            <input value={hex} onChange={e => setHex(e.target.value)} style={{ width: '200px', padding: '8px 12px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '14px', fontFamily: 'monospace', outline: 'none' }} />
          </div>
          <button onClick={hexToRgb} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', marginBottom: '16px' }}>转换</button>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', background: hex, border: '1px solid #e0ddd6' }} />
            <code style={{ fontSize: '14px', fontFamily: 'monospace', color: '#2c2c2c' }}>rgb({r}, {g}, {b})</code>
            <button onClick={() => copy(`rgb(${r}, ${g}, ${b})`)} style={{ fontSize: '12px', color: '#6b705c', background: 'none', border: 'none', cursor: 'pointer' }}>复制</button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div><label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '4px' }}>R</label><input type="number" value={r} onChange={e => setR(parseInt(e.target.value)||0)} style={{ width: '80px', padding: '8px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '4px' }}>G</label><input type="number" value={g} onChange={e => setG(parseInt(e.target.value)||0)} style={{ width: '80px', padding: '8px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '14px', outline: 'none' }} /></div>
            <div><label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '4px' }}>B</label><input type="number" value={b} onChange={e => setB(parseInt(e.target.value)||0)} style={{ width: '80px', padding: '8px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '14px', outline: 'none' }} /></div>
          </div>
          <button onClick={rgbToHex} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', marginBottom: '16px' }}>转换</button>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', background: hex, border: '1px solid #e0ddd6' }} />
            <code style={{ fontSize: '14px', fontFamily: 'monospace', color: '#2c2c2c' }}>{hex}</code>
            <button onClick={() => copy(hex)} style={{ fontSize: '12px', color: '#6b705c', background: 'none', border: 'none', cursor: 'pointer' }}>复制</button>
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}
