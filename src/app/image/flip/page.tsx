"use client";
import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "图片旋转", href: "/image/rotate/" },
  { name: "图片缩放", href: "/image/resize/" },
];

export default function ImageFlip() {
  const [file, setFile] = useState<File | null>(null);
  const [horizontal, setHorizontal] = useState(true);
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
      canvas.width = img.width;
      canvas.height = img.height;
      if (horizontal) { ctx.translate(img.width, 0); ctx.scale(-1, 1); }
      else { ctx.translate(0, img.height); ctx.scale(1, -1); }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file.name.replace(/\.[^.]+$/, "-flipped.png");
        a.click();
      }, "image/png");
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <ToolPageLayout title="图片翻转" description="水平或垂直翻转图片" breadcrumbs={[{ label: "图片工具", href: "/image/compress/" }, { label: "图片翻转" }]} relatedTools={relatedTools}>
      <div className={dragOver ? "drag-over" : ""} style={{ border: '1px dashed #e0ddd6', padding: '40px', textAlign: 'center', cursor: 'pointer' }}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={onDrop}
        onClick={() => document.getElementById("fi")?.click()}>
        <input id="fi" type="file" accept="image/*" hidden onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <p style={{ color: '#9a9a9a', fontSize: '14px' }}>拖放图片或点击选择</p>
      </div>
      {file && (
        <div style={{ marginTop: '24px' }} className="animate-fade-in">
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <button onClick={() => setHorizontal(true)} style={{ padding: '8px 20px', border: `1px solid ${horizontal ? '#6b705c' : '#e0ddd6'}`, background: 'transparent', color: horizontal ? '#6b705c' : '#9a9a9a', cursor: 'pointer', fontSize: '13px' }}>↔ 水平翻转</button>
            <button onClick={() => setHorizontal(false)} style={{ padding: '8px 20px', border: `1px solid ${!horizontal ? '#6b705c' : '#e0ddd6'}`, background: 'transparent', color: !horizontal ? '#6b705c' : '#9a9a9a', cursor: 'pointer', fontSize: '13px' }}>↕ 垂直翻转</button>
          </div>
          <button onClick={handleDownload} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em' }}>翻转并下载</button>
        </div>
      )}
    </ToolPageLayout>
  );
}
