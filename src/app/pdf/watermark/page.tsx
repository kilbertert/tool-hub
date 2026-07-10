"use client";
import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { addWatermark, downloadPdf } from "@/lib/pdf";

const relatedTools = [
  { name: "Protect PDF", href: "/pdf/protect", icon: "🔒" },
  { name: "Merge PDF", href: "/pdf/merge", icon: "📎" },
  { name: "Rotate PDF", href: "/pdf/rotate", icon: "🔄" },
];

export default function WatermarkPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(0.3);
  const [fontSize, setFontSize] = useState(50);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = Array.from(e.dataTransfer.files).find((f) => f.type === "application/pdf");
    if (f) setFile(f);
  }, []);

  const handleWatermark = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const bytes = await addWatermark(await file.arrayBuffer(), text, opacity, fontSize);
      downloadPdf(bytes, "watermarked.pdf");
    } catch (err) { alert("Error: " + (err as Error).message); }
    setProcessing(false);
  };

  return (
    <ToolPageLayout
      title="Add Watermark"
      description="Add a text watermark to every page of your PDF."
      breadcrumbs={[{ label: "PDF Tools", href: "/pdf/merge" }, { label: "Add Watermark" }]}
      icon="💧"
      relatedTools={relatedTools}
    >
      <div
        className={`upload-zone cursor-pointer rounded-xl p-10 text-center transition ${dragOver ? "drag-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input id="file-input" type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} />
        <div className="text-4xl mb-3">💧</div>
        <p className="text-zinc-300">Drop a PDF file here or click to browse</p>
      </div>

      {file && (
        <div className="mt-6 animate-fade-in space-y-4">
          <div className="text-sm text-zinc-400">{file.name} ({(file.size / 1024).toFixed(0)} KB)</div>
          <div>
            <label className="mb-2 block text-sm text-zinc-300">Watermark Text</label>
            <input value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-indigo-500/50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm text-zinc-300">Opacity: {opacity}</label>
              <input type="range" min="0.1" max="1" step="0.1" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-zinc-300">Font Size: {fontSize}</label>
              <input type="range" min="20" max="100" step="5" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full" />
            </div>
          </div>
          <button onClick={handleWatermark} disabled={processing} className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-40">
            {processing ? "Adding watermark..." : "Download Watermarked PDF"}
          </button>
        </div>
      )}
    </ToolPageLayout>
  );
}
