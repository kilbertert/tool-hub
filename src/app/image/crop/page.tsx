"use client";
import { useState, useCallback, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "图片缩放", href: "/image/resize/" },
  { name: "图片旋转", href: "/image/rotate/" },
  { name: "图片压缩", href: "/image/compress/" },
];

export default function ImageCrop() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (f: File) => {
    setFile(f);
    const url = URL.createObjectURL(f);
    setImageUrl(url);
    const img = new Image();
    img.onload = () => { setW(img.width); setH(img.height); };
    img.src = url;
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = Array.from(e.dataTransfer.files).find(f => f.type.startsWith("image/"));
    if (f) handleFile(f);
  }, []);

  const handleDownload = () => {
    if (!file) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = w;
    canvas.height = h;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
      canvas.toBlob(blob => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file.name.replace(/\.[^.]+$/, "-cropped.png");
        a.click();
      }, "image/png");
    };
    img.src = imageUrl;
  };

  return (
    <ToolPageLayout title="图片裁剪" description="裁剪图片指定区域" breadcrumbs={[{ label: "图片工具", href: "/image/compress/" }, { label: "图片裁剪" }]} relatedTools={relatedTools}>
      <div className={dragOver ? "drag-over" : ""} style={{ border: '1px dashed #e0ddd6', padding: '40px', textAlign: 'center', cursor: 'pointer' }}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={onDrop}
        onClick={() => document.getElementById("fi")?.click()}>
        <input id="fi" type="file" accept="image/*" hidden onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <p style={{ color: '#9a9a9a', fontSize: '14px' }}>拖放图片或点击选择</p>
      </div>
      {file && (
        <div style={{ marginTop: '24px' }} className="animate-fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div><label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '4px' }}>X</label><input type="number" value={x} onChange={e => setX(parseInt(e.target.value)||0)} style={{ width: '100%', padding: '8px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '13px', outline: 'none' }} /></div>
            <div><label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '4px' }}>Y</label><input type="number" value={y} onChange={e => setY(parseInt(e.target.value)||0)} style={{ width: '100%', padding: '8px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '13px', outline: 'none' }} /></div>
            <div><label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '4px' }}>宽度</label><input type="number" value={w} onChange={e => setW(parseInt(e.target.value)||0)} style={{ width: '100%', padding: '8px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '13px', outline: 'none' }} /></div>
            <div><label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '4px' }}>高度</label><input type="number" value={h} onChange={e => setH(parseInt(e.target.value)||0)} style={{ width: '100%', padding: '8px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '13px', outline: 'none' }} /></div>
          </div>
          <button onClick={handleDownload} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em' }}>裁剪并下载</button>
        </div>
      )}
    </ToolPageLayout>
  );
}
