"use client";
import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { splitPdf, downloadPdf, getPdfInfo } from "@/lib/pdf";

const relatedTools = [
  { name: "Merge PDF", href: "/pdf/merge", icon: "📎" },
  { name: "Compress PDF", href: "/pdf/compress", icon: "📦" },
  { name: "Rotate PDF", href: "/pdf/rotate", icon: "🔄" },
];

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (f: File) => {
    setFile(f);
    const info = await getPdfInfo(await f.arrayBuffer());
    setPageCount(info.pageCount);
    setSelectedPages([]);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = Array.from(e.dataTransfer.files).find((f) => f.type === "application/pdf");
    if (f) handleFile(f);
  }, []);

  const togglePage = (i: number) => {
    setSelectedPages((prev) => prev.includes(i) ? prev.filter((p) => p !== i) : [...prev, i].sort());
  };

  const selectAll = () => setSelectedPages(Array.from({ length: pageCount }, (_, i) => i));

  const handleSplit = async () => {
    if (!file || selectedPages.length === 0) return;
    setProcessing(true);
    try {
      const bytes = await splitPdf(await file.arrayBuffer(), selectedPages);
      downloadPdf(bytes, "split.pdf");
    } catch (err) { alert("Error: " + (err as Error).message); }
    setProcessing(false);
  };

  return (
    <ToolPageLayout
      title="Split PDF"
      description="Extract specific pages from a PDF document."
      breadcrumbs={[{ label: "PDF Tools", href: "/pdf/merge" }, { label: "Split PDF" }]}
      icon="✂️"
      relatedTools={relatedTools}
    >
      <div
        className={`upload-zone cursor-pointer rounded-xl p-10 text-center transition ${dragOver ? "drag-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input id="file-input" type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <div className="text-4xl mb-3">✂️</div>
        <p className="text-zinc-300">Drop a PDF file here or click to browse</p>
      </div>

      {file && pageCount > 0 && (
        <div className="mt-6 animate-fade-in">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-zinc-400">{file.name} — {pageCount} pages</span>
            <button onClick={selectAll} className="text-sm text-indigo-400 hover:text-indigo-300">Select all</button>
          </div>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => togglePage(i)}
                className={`rounded-lg border p-2 text-sm transition ${selectedPages.includes(i) ? "border-indigo-500 bg-indigo-500/20 text-indigo-300" : "border-white/5 bg-white/[0.03] text-zinc-400 hover:border-white/10"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleSplit}
            disabled={selectedPages.length === 0 || processing}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
          >
            {processing ? "Extracting..." : `Extract ${selectedPages.length} page(s)`}
          </button>
        </div>
      )}
    </ToolPageLayout>
  );
}
