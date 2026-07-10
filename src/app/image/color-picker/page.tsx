"use client";
import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "HEX 转 RGB", href: "/converter/hex-rgb/" },
  { name: "图片压缩", href: "/image/compress/" },
];

export default function ColorPicker() {
  const [color, setColor] = useState("#6b705c");

  const hex = color;
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  const hsl = rgbToHsl(r, g, b);

  function rgbToHsl(r: number, g: number, b: number) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`;
  }

  const copy = (text: string) => navigator.clipboard.writeText(text);

  return (
    <ToolPageLayout title="颜色选择器" description="选取颜色，获取 HEX、RGB、HSL 值" breadcrumbs={[{ label: "图片工具", href: "/image/compress/" }, { label: "颜色选择器" }]} relatedTools={relatedTools}>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        <div>
          <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: '120px', height: '120px', border: 'none', cursor: 'pointer', background: 'transparent' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { label: "HEX", value: hex },
            { label: "RGB", value: `rgb(${r}, ${g}, ${b})` },
            { label: "HSL", value: hsl },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '12px', color: '#9a9a9a', width: '32px' }}>{item.label}</span>
              <code style={{ fontSize: '14px', color: '#2c2c2c', fontFamily: 'monospace', padding: '4px 8px', border: '1px solid #e0ddd6', background: 'rgba(248,246,241,0.5)' }}>{item.value}</code>
              <button onClick={() => copy(item.value)} style={{ fontSize: '12px', color: '#6b705c', background: 'none', border: 'none', cursor: 'pointer' }}>复制</button>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <div style={{ width: '48px', height: '48px', background: color, border: '1px solid #e0ddd6' }} />
            <div style={{ width: '48px', height: '48px', background: `rgb(${r}, ${g}, ${b})`, border: '1px solid #e0ddd6', opacity: 0.7 }} />
            <div style={{ width: '48px', height: '48px', background: `rgb(${r}, ${g}, ${b})`, border: '1px solid #e0ddd6', opacity: 0.4 }} />
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
