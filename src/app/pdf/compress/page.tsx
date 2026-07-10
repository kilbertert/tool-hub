"use client";
import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { PDFDocument } from "pdf-lib";

const relatedTools = [
  { name: "Merge PDF", href: "/pdf/merge", icon: "📎" },
  { name: "Split PDF", href: "/pdf/split", icon: "✂️" },
  { name: "Rotate PDF", href: "/pdf/rotate", icon: "🔄" },
];

export default function CompressPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ original: number; compressed: number } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = Array.from(e.dataTransfer.files).find((f) => f.type === "application/pdf");
    if (f) { setFile(f); setResult(null); }
  }, []);

  const handleCompress = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { updateMetadata: false });
      // Remove metadata to reduce size
      pdf.setTitle("");
      pdf.setAuthor("");
      pdf.setSubject("");
      pdf.setKeywords([]);
      pdf.setProducer("");
      pdf.setCreator("");
      const compressed = await pdf.save({ useObjectStreams: true });
      // Use the download helper to avoid TypeScript issues
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([compressed as unknown as BlobPart], { type: "application/pdf" }));
      a.download = file.name.replace(".pdf", "-compressed.pdf");
      a.click();
      URL.revokeObjectURL(a.href);
      setResult({ original: file.size, compressed: compressed.length });
    } catch (err) { alert("Error: " + (err as Error).message); }
    setProcessing(false);
  };

  return (
    <ToolPageLayout
      title="Compress PDF"
      description="Reduce the file size of your PDF document."
      breadcrumbs={[{ label: "PDF Tools", href: "/pdf/merge" }, { label: "Compress PDF" }]}
      icon="📦"
      relatedTools={relatedTools}
      seoContent={
        <>
          <h2 className="mb-4 text-xl font-bold">How to Compress a PDF</h2>
          <div className="space-y-3 text-sm text-zinc-400">
            <p><strong>1. Upload</strong> — Drop your PDF file above.</p>
            <p><strong>2. Compress</strong> — Click the compress button. We remove unnecessary metadata and optimize the file structure.</p>
            <p><strong>3. Download</strong> — Get your compressed PDF instantly.</p>
          </div>
        </>
      }
    >
      <div
        className={`upload-zone cursor-pointer rounded-xl p-10 text-center transition ${dragOver ? "drag-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input id="file-input" type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} />
        <div className="text-4xl mb-3">📦</div>
        <p className="text-zinc-300">Drop a PDF file here or click to browse</p>
      </div>

      {file && (
        <div className="mt-6 animate-fade-in">
          <div className="mb-4 text-sm text-zinc-400">{file.name} ({(file.size / 1024).toFixed(0)} KB)</div>
          {result && (
            <div className="mb-4 rounded-lg border border-green-500/20 bg-green-500/5 p-4 text-sm">
              <p className="text-green-400">✓ Compressed: {(result.original / 1024).toFixed(0)} KB → {(result.compressed / 1024).toFixed(0)} KB</p>
              <p className="text-zinc-400">Saved {((1 - result.compressed / result.original) * 100).toFixed(1)}%</p>
            </div>
          )}
          <button onClick={handleCompress} disabled={processing} className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-40">
            {processing ? "Compressing..." : "Compress PDF"}
          </button>
        </div>
      )}
    </ToolPageLayout>
  );
}
