"use client";
import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { PDFDocument } from "pdf-lib";

const relatedTools = [
  { name: "Add Watermark", href: "/pdf/watermark", icon: "💧" },
  { name: "Merge PDF", href: "/pdf/merge", icon: "📎" },
  { name: "Rotate PDF", href: "/pdf/rotate", icon: "🔄" },
];

export default function ProtectPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = Array.from(e.dataTransfer.files).find((f) => f.type === "application/pdf");
    if (f) setFile(f);
  }, []);

  const handleProtect = async () => {
    if (!file || !password) return;
    setProcessing(true);
    try {
      // Note: pdf-lib doesn't support encryption directly
      // This is a placeholder - real implementation needs server-side processing
      alert("PDF password protection requires server-side processing. This feature will be available soon!");
    } catch (err) { alert("Error: " + (err as Error).message); }
    setProcessing(false);
  };

  return (
    <ToolPageLayout
      title="Protect PDF"
      description="Add password protection to your PDF document."
      breadcrumbs={[{ label: "PDF Tools", href: "/pdf/merge" }, { label: "Protect PDF" }]}
      icon="🔒"
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
        <div className="text-4xl mb-3">🔒</div>
        <p className="text-zinc-300">Drop a PDF file here or click to browse</p>
      </div>

      {file && (
        <div className="mt-6 animate-fade-in space-y-4">
          <div className="text-sm text-zinc-400">{file.name}</div>
          <div>
            <label className="mb-2 block text-sm text-zinc-300">Set Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-indigo-500/50" />
          </div>
          <button onClick={handleProtect} disabled={!password || processing} className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-40">
            {processing ? "Protecting..." : "Protect PDF"}
          </button>
        </div>
      )}
    </ToolPageLayout>
  );
}
