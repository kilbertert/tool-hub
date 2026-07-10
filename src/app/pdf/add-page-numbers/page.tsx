"use client";
import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { addPageNumbers, downloadPdf } from "@/lib/pdf";

export default function AddPageNumbers() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<"bottom-center" | "bottom-right">("bottom-center");
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = Array.from(e.dataTransfer.files).find((f) => f.type === "application/pdf");
    if (f) setFile(f);
  }, []);

  const handleAdd = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const bytes = await addPageNumbers(await file.arrayBuffer(), position);
      downloadPdf(bytes, "numbered.pdf");
    } catch (err) { alert("Error: " + (err as Error).message); }
    setProcessing(false);
  };

  return (
    <ToolPageLayout
      title="Add Page Numbers"
      description="Add page numbers to every page of your PDF."
      breadcrumbs={[{ label: "PDF Tools", href: "/pdf/merge" }, { label: "Add Page Numbers" }]}
      icon="#️⃣"
      relatedTools={[
        { name: "Add Watermark", href: "/pdf/watermark", icon: "💧" },
        { name: "Merge PDF", href: "/pdf/merge", icon: "📎" },
      ]}
    >
      <div
        className={`upload-zone cursor-pointer rounded-xl p-10 text-center transition ${dragOver ? "drag-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input id="file-input" type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} />
        <div className="text-4xl mb-3">#️⃣</div>
        <p className="text-zinc-300">Drop a PDF file here or click to browse</p>
      </div>
      {file && (
        <div className="mt-6 animate-fade-in space-y-4">
          <div>
            <label className="mb-2 block text-sm text-zinc-300">Position</label>
            <div className="flex gap-3">
              <button onClick={() => setPosition("bottom-center")} className={`rounded-lg border px-4 py-2 text-sm ${position === "bottom-center" ? "border-indigo-500 bg-indigo-500/20 text-indigo-300" : "border-white/5 text-zinc-400"}`}>Bottom Center</button>
              <button onClick={() => setPosition("bottom-right")} className={`rounded-lg border px-4 py-2 text-sm ${position === "bottom-right" ? "border-indigo-500 bg-indigo-500/20 text-indigo-300" : "border-white/5 text-zinc-400"}`}>Bottom Right</button>
            </div>
          </div>
          <button onClick={handleAdd} disabled={processing} className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3.5 font-semibold text-white disabled:opacity-40">
            {processing ? "Adding numbers..." : "Download PDF with Page Numbers"}
          </button>
        </div>
      )}
    </ToolPageLayout>
  );
}
