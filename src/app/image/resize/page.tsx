"use client";
import { useState, useCallback, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "图片压缩", href: "/image/compress/" },
  { name: "图片裁剪", href: "/image/crop/" },
  { name: "格式转换", href: "/image/convert/" },
  { name: "图片旋转", href: "/image/rotate/" },
];

export default function ImageResize() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [originalW, setOriginalW] = useState(0);
  const [originalH, setOriginalH] = useState(0);
  const [lockRatio, setLockRatio] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    const url = URL.createObjectURL(f);
    setImageUrl(url);
    const img = new Image();
    img.onload = () => {
      setOriginalW(img.width);
      setOriginalH(img.height);
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = url;
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = Array.from(e.dataTransfer.files).find(f => f.type.startsWith("image/"));
    if (f) handleFile(f);
  }, []);

  const handleWidthChange = (v: number) => {
    setWidth(v);
    if (lockRatio && originalW > 0) setHeight(Math.round(v * originalH / originalW));
  };

  const handleHeightChange = (v: number) => {
    setHeight(v);
    if (lockRatio && originalH > 0) setWidth(Math.round(v * originalW / originalH));
  };

  const handleDownload = () => {
    if (!file || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    canvas.width = width;
    canvas.height = height;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(blob => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file.name.replace(/\.[^.]+$/, `-resized-${width}x${height}.png`);
        a.click();
      }, "image/png");
    };
    img.src = imageUrl;
  };

  return (
    <ToolPageLayout
      title="图片缩放"
      description="调整图片尺寸，支持等比缩放"
      breadcrumbs={[{ label: "图片工具", href: "/image/compress/" }, { label: "图片缩放" }]}
      relatedTools={relatedTools}
    >
      <div
        className={dragOver ? "drag-over" : ""}
        style={{ border: '1px dashed #e0ddd6', padding: '40px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input id="file-input" type="file" accept="image/*" hidden onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <p style={{ color: '#9a9a9a', fontSize: '14px' }}>拖放图片或点击选择</p>
      </div>

      {file && (
        <div style={{ marginTop: '24px' }} className="animate-fade-in">
          <div style={{ display: 'flex', gap: '24px', marginBottom: '20px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '6px' }}>宽度 (px)</label>
              <input type="number" value={width} onChange={e => handleWidthChange(parseInt(e.target.value) || 0)}
                style={{ width: '120px', padding: '8px 12px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '14px', outline: 'none' }} />
            </div>
            <div>
              <button onClick={() => setLockRatio(!lockRatio)} style={{ padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '16px' }}>
                {lockRatio ? "🔗" : "🔓"}
              </button>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '6px' }}>高度 (px)</label>
              <input type="number" value={height} onChange={e => handleHeightChange(parseInt(e.target.value) || 0)}
                style={{ width: '120px', padding: '8px 12px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '14px', outline: 'none' }} />
            </div>
          </div>
          <p style={{ fontSize: '12px', color: '#9a9a9a', marginBottom: '16px' }}>
            原始: {originalW}×{originalH} → {width}×{height}
          </p>
          <button onClick={handleDownload}
            style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em' }}>
            下载缩放后的图片
          </button>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      )}
    </ToolPageLayout>
  );
}
