"use client";
import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { mergePdfs, downloadPdf } from "@/lib/pdf";

const relatedTools = [
  { name: "Split PDF", href: "/pdf/split", icon: "✂️" },
  { name: "Compress PDF", href: "/pdf/compress", icon: "📦" },
  { name: "Rotate PDF", href: "/pdf/rotate", icon: "🔄" },
  { name: "Add Watermark", href: "/pdf/watermark", icon: "💧" },
  { name: "Protect PDF", href: "/pdf/protect", icon: "🔒" },
];

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...dropped]);
  }, []);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (from: number, to: number) => {
    setFiles((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setProcessing(true);
    try {
      const buffers = await Promise.all(files.map((f) => f.arrayBuffer()));
      const merged = await mergePdfs(buffers);
      downloadPdf(merged, "merged.pdf");
    } catch (err) {
      alert("Error merging PDFs: " + (err as Error).message);
    }
    setProcessing(false);
  };

  return (
    <ToolPageLayout
      title="Merge PDF"
      description="Combine multiple PDF files into a single document. Drag to reorder."
      breadcrumbs={[{ label: "PDF Tools", href: "/pdf/merge" }, { label: "Merge PDF" }]}
      icon="📎"
      relatedTools={relatedTools}
      seoContent={
        <>
          <h2 className="mb-4 text-xl font-bold">How to Merge PDFs</h2>
          <div className="space-y-3 text-sm text-zinc-400">
            <p><strong>1. Upload files</strong> — Click or drag & drop 2 or more PDF files above.</p>
            <p><strong>2. Reorder</strong> — Drag the files into the order you want them merged.</p>
            <p><strong>3. Download</strong> — Click &quot;Merge PDF&quot; and download your combined file.</p>
          </div>
          <h3 className="mb-3 mt-6 text-lg font-semibold">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm text-zinc-400">
            <div><p className="font-medium text-zinc-200">Is there a file size limit?</p><p>No hard limit. Very large files (100MB+) may be slower depending on your device.</p></div>
            <div><p className="font-medium text-zinc-200">Are my files uploaded to a server?</p><p>No. All processing happens in your browser using JavaScript. Your files never leave your device.</p></div>
            <div><p className="font-medium text-zinc-200">Is it really free?</p><p>Yes, 100% free with no limits on the number of merges.</p></div>
          </div>
        </>
      }
    >
      {/* Drop zone */}
      <div
        className={`upload-zone cursor-pointer rounded-xl p-10 text-center transition ${dragOver ? "drag-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input id="file-input" type="file" accept=".pdf" multiple className="hidden" onChange={onFileSelect} />
        <div className="text-4xl mb-3">📎</div>
        <p className="text-zinc-300">Drop PDF files here or click to browse</p>
        <p className="mt-1 text-sm text-zinc-500">Select 2 or more PDF files</p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-6 animate-fade-in">
          <div className="mb-4 text-sm text-zinc-400">{files.length} file(s) selected</div>
          <div className="space-y-2">
            {files.map((file, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-zinc-500">{i + 1}</span>
                  <span className="text-sm text-zinc-200">{file.name}</span>
                  <span className="text-xs text-zinc-500">({(file.size / 1024).toFixed(0)} KB)</span>
                </div>
                <div className="flex items-center gap-2">
                  {i > 0 && <button onClick={() => moveFile(i, i - 1)} className="text-zinc-500 hover:text-white px-1">↑</button>}
                  {i < files.length - 1 && <button onClick={() => moveFile(i, i + 1)} className="text-zinc-500 hover:text-white px-1">↓</button>}
                  <button onClick={() => removeFile(i)} className="text-zinc-500 hover:text-red-400 px-1">✕</button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleMerge}
            disabled={files.length < 2 || processing}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
          >
            {processing ? "Merging..." : `Merge ${files.length} PDFs`}
          </button>
        </div>
      )}
    </ToolPageLayout>
  );
}
