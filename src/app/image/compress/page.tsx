"use client";
import { useState, useCallback, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "图片缩放", href: "/image/resize/" },
  { name: "格式转换", href: "/image/convert/" },
  { name: "图片裁剪", href: "/image/crop/" },
];

export default function ImageCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [result, setResult] = useState<{orig: number; comp: number} | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (f: File) => { setFile(f); setResult(null); };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = Array.from(e.dataTransfer.files).find(f => f.type.startsWith("image/"));
    if (f) handleFile(f);
  }, []);

  const handleCompress = () => {
    if (!file) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        if (!blob) return;
        setResult({ orig: file.size, comp: blob.size });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file.name.replace(/\.[^.]+$/, "-compressed.jpg");
        a.click();
      }, "image/jpeg", quality / 100);
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <ToolPageLayout title="图片压缩" description="减小图片文件体积，支持质量调节" breadcrumbs={[{ label: "图片工具", href: "/image/compress/" }, { label: "图片压缩" }]} relatedTools={relatedTools}>
      <div className={dragOver ? "drag-over" : ""} style={{ border: '1px dashed #e0ddd6', padding: '40px', textAlign: 'center', cursor: 'pointer' }}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={onDrop}
        onClick={() => document.getElementById("fi")?.click()}>
        <input id="fi" type="file" accept="image/*" hidden onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <p style={{ color: '#9a9a9a', fontSize: '14px' }}>拖放图片或点击选择</p>
      </div>
      {file && (
        <div style={{ marginTop: '24px' }} className="animate-fade-in">
          <p style={{ fontSize: '13px', color: '#5a5a5a', marginBottom: '16px' }}>{file.name} ({(file.size/1024).toFixed(0)} KB)</p>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#9a9a9a' }}>质量: {quality}%</label>
            <input type="range" min="10" max="100" value={quality} onChange={e => setQuality(parseInt(e.target.value))} style={{ width: '100%', marginTop: '8px' }} />
          </div>
          {result && <p style={{ fontSize: '13px', color: '#6b705c', marginBottom: '16px' }}>压缩: {(result.orig/1024).toFixed(0)}KB → {(result.comp/1024).toFixed(0)}KB (节省 {((1-result.comp/result.orig)*100).toFixed(0)}%)</p>}
          <button onClick={handleCompress} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em' }}>压缩并下载</button>
        </div>
      )}
    </ToolPageLayout>
  );
}
