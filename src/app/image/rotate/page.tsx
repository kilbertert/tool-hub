"use client";
import { useState, useCallback, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "图片缩放", href: "/image/resize/" },
  { name: "图片裁剪", href: "/image/crop/" },
  { name: "格式转换", href: "/image/convert/" },
];

export default function ImageRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (f: File) => setFile(f);
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = Array.from(e.dataTransfer.files).find(f => f.type.startsWith("image/"));
    if (f) handleFile(f);
  }, []);

  const handleDownload = () => {
    if (!file) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      const rad = rotation * Math.PI / 180;
      const sin = Math.abs(Math.sin(rad));
      const cos = Math.abs(Math.cos(rad));
      canvas.width = Math.round(img.width * cos + img.height * sin);
      canvas.height = Math.round(img.width * sin + img.height * cos);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      canvas.toBlob(blob => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file.name.replace(/\.[^.]+$/, "-rotated.png");
        a.click();
      }, "image/png");
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <ToolPageLayout title="图片旋转" description="旋转和翻转图片" breadcrumbs={[{ label: "图片工具", href: "/image/compress/" }, { label: "图片旋转" }]} relatedTools={relatedTools}>
      <div className={dragOver ? "drag-over" : ""} style={{ border: '1px dashed #e0ddd6', padding: '40px', textAlign: 'center', cursor: 'pointer' }}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={onDrop}
        onClick={() => document.getElementById("fi")?.click()}>
        <input id="fi" type="file" accept="image/*" hidden onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <p style={{ color: '#9a9a9a', fontSize: '14px' }}>拖放图片或点击选择</p>
      </div>
      {file && (
        <div style={{ marginTop: '24px' }} className="animate-fade-in">
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <button onClick={() => setRotation(r => (r - 90) % 360)} style={{ padding: '8px 16px', border: '1px solid #e0ddd6', background: 'transparent', color: '#5a5a5a', cursor: 'pointer', fontSize: '13px' }}>↺ 左转90°</button>
            <button onClick={() => setRotation(r => (r + 90) % 360)} style={{ padding: '8px 16px', border: '1px solid #e0ddd6', background: 'transparent', color: '#5a5a5a', cursor: 'pointer', fontSize: '13px' }}>↻ 右转90°</button>
            <button onClick={() => setFlipH(!flipH)} style={{ padding: '8px 16px', border: `1px solid ${flipH ? '#6b705c' : '#e0ddd6'}`, background: 'transparent', color: flipH ? '#6b705c' : '#5a5a5a', cursor: 'pointer', fontSize: '13px' }}>↔ 水平翻转</button>
            <button onClick={() => setFlipV(!flipV)} style={{ padding: '8px 16px', border: `1px solid ${flipV ? '#6b705c' : '#e0ddd6'}`, background: 'transparent', color: flipV ? '#6b705c' : '#5a5a5a', cursor: 'pointer', fontSize: '13px' }}>↕ 垂直翻转</button>
          </div>
          <p style={{ fontSize: '12px', color: '#9a9a9a', marginBottom: '16px' }}>旋转: {rotation}° {flipH ? '· 水平翻转' : ''} {flipV ? '· 垂直翻转' : ''}</p>
          <button onClick={handleDownload} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em' }}>下载处理后的图片</button>
        </div>
      )}
    </ToolPageLayout>
  );
}
