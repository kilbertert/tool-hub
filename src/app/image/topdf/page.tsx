"use client";
import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "PDF 转图片", href: "/pdf/to-image/" },
  { name: "图片压缩", href: "/image/compress/" },
];

export default function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    setFiles(prev => [...prev, ...dropped]);
  }, []);

  const handleDownload = async () => {
    if (files.length === 0) return;
    // Simple approach: create a basic PDF with images
    // Using jsPDF would be better, but for now we'll create a multi-page canvas PDF
    const { PDFDocument } = await import("pdf-lib");
    const pdf = await PDFDocument.create();
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      let image;
      if (file.type === "image/png") image = await pdf.embedPng(bytes);
      else image = await pdf.embedJpg(bytes);
      const page = pdf.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    }
    const pdfBytes = await pdf.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "images.pdf";
    a.click();
  };

  return (
    <ToolPageLayout title="图片转 PDF" description="将多张图片合并为一个 PDF 文件" breadcrumbs={[{ label: "图片工具", href: "/image/compress/" }, { label: "图片转 PDF" }]} relatedTools={relatedTools}>
      <div className={dragOver ? "drag-over" : ""} style={{ border: '1px dashed #e0ddd6', padding: '40px', textAlign: 'center', cursor: 'pointer' }}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={onDrop}
        onClick={() => document.getElementById("fi")?.click()}>
        <input id="fi" type="file" accept="image/*" multiple hidden onChange={e => setFiles(prev => [...prev, ...Array.from(e.target.files || [])])} />
        <p style={{ color: '#9a9a9a', fontSize: '14px' }}>拖放图片或点击选择（可多选）</p>
      </div>
      {files.length > 0 && (
        <div style={{ marginTop: '24px' }} className="animate-fade-in">
          <p style={{ fontSize: '13px', color: '#5a5a5a', marginBottom: '16px' }}>{files.length} 张图片已选择</p>
          <button onClick={handleDownload} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em' }}>合并为 PDF 并下载</button>
        </div>
      )}
    </ToolPageLayout>
  );
}
