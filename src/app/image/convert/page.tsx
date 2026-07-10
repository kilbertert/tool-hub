"use client";
import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "图片压缩", href: "/image/compress/" },
  { name: "图片缩放", href: "/image/resize/" },
  { name: "图片裁剪", href: "/image/crop/" },
];

export default function ImageConvert() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState("png");
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (f: File) => setFile(f);
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = Array.from(e.dataTransfer.files).find(f => f.type.startsWith("image/"));
    if (f) handleFile(f);
  }, []);

  const handleConvert = () => {
    if (!file) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const mime = format === "png" ? "image/png" : format === "webp" ? "image/webp" : "image/jpeg";
      canvas.toBlob(blob => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file.name.replace(/\.[^.]+$/, `.${format}`);
        a.click();
      }, mime, 0.92);
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <ToolPageLayout title="格式转换" description="图片格式互转：PNG、JPG、WebP" breadcrumbs={[{ label: "图片工具", href: "/image/compress/" }, { label: "格式转换" }]} relatedTools={relatedTools}>
      <div className={dragOver ? "drag-over" : ""} style={{ border: '1px dashed #e0ddd6', padding: '40px', textAlign: 'center', cursor: 'pointer' }}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={onDrop}
        onClick={() => document.getElementById("fi")?.click()}>
        <input id="fi" type="file" accept="image/*" hidden onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <p style={{ color: '#9a9a9a', fontSize: '14px' }}>拖放图片或点击选择</p>
      </div>
      {file && (
        <div style={{ marginTop: '24px' }} className="animate-fade-in">
          <p style={{ fontSize: '13px', color: '#5a5a5a', marginBottom: '16px' }}>{file.name}</p>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            {["png", "jpg", "webp"].map(f => (
              <button key={f} onClick={() => setFormat(f)} style={{ padding: '8px 20px', border: `1px solid ${format === f ? '#6b705c' : '#e0ddd6'}`, background: 'transparent', color: format === f ? '#6b705c' : '#9a9a9a', cursor: 'pointer', fontSize: '13px', textTransform: 'uppercase' }}>{f}</button>
            ))}
          </div>
          <button onClick={handleConvert} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em' }}>转换并下载</button>
        </div>
      )}
    </ToolPageLayout>
  );
}
