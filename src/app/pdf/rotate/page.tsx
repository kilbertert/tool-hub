"use client";
import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { rotatePdf, downloadPdf, getPdfInfo } from "@/lib/pdf";

const relatedTools = [
  { name: "Merge PDF", href: "/pdf/merge", icon: "📎" },
  { name: "Split PDF", href: "/pdf/split", icon: "✂️" },
  { name: "Compress PDF", href: "/pdf/compress", icon: "📦" },
];

export default function RotatePdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [rotations, setRotations] = useState<Record<number, number>>({});
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (f: File) => {
    setFile(f); setRotations({});
    const info = await getPdfInfo(await f.arrayBuffer());
    setPageCount(info.pageCount);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = Array.from(e.dataTransfer.files).find((f) => f.type === "application/pdf");
    if (f) handleFile(f);
  }, []);

  const rotatePage = (i: number, deg: number) => {
    setRotations((prev) => ({ ...prev, [i]: ((prev[i] || 0) + deg) % 360 }));
  };

  const handleRotate = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const bytes = await rotatePdf(await file.arrayBuffer(), rotations);
      downloadPdf(bytes, "rotated.pdf");
    } catch (err) { alert("Error: " + (err as Error).message); }
    setProcessing(false);
  };

  return (
    <ToolPageLayout
      title="Rotate PDF"
      description="Rotate individual pages or all pages in a PDF."
      breadcrumbs={[{ label: "PDF Tools", href: "/pdf/merge" }, { label: "Rotate PDF" }]}
      icon="🔄"
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
        <div className="text-4xl mb-3">🔄</div>
        <p className="text-zinc-300">Drop a PDF file here or click to browse</p>
      </div>

      {file && pageCount > 0 && (
        <div className="mt-6 animate-fade-in">
          <div className="mb-4 text-sm text-zinc-400">{file.name} — {pageCount} pages</div>
          <div className="space-y-2">
            {Array.from({ length: pageCount }, (_, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3">
                <span className="text-sm">Page {i + 1}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500">{rotations[i] || 0}°</span>
                  <button onClick={() => rotatePage(i, 90)} className="rounded bg-white/5 px-2 py-1 text-xs hover:bg-white/10">↻ 90°</button>
                  <button onClick={() => rotatePage(i, -90)} className="rounded bg-white/5 px-2 py-1 text-xs hover:bg-white/10">↺ 90°</button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleRotate} disabled={processing} className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-40">
            {processing ? "Rotating..." : "Download Rotated PDF"}
          </button>
        </div>
      )}
    </ToolPageLayout>
  );
}
