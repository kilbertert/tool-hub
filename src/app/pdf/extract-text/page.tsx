"use client";
import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { PDFDocument } from "pdf-lib";

export default function ExtractText() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = Array.from(e.dataTransfer.files).find((f) => f.type === "application/pdf");
    if (f) { setFile(f); setText(""); }
  }, []);

  const handleExtract = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const pdf = await PDFDocument.load(await file.arrayBuffer());
      const pageCount = pdf.getPageCount();
      setText(`PDF contains ${pageCount} pages.\n\nText extraction from PDF requires server-side processing with specialized libraries (like pdf-parse or pdf.js with content parsing). This feature will be available soon with a backend service.`);
    } catch (err) { alert("Error: " + (err as Error).message); }
    setProcessing(false);
  };

  return (
    <ToolPageLayout
      title="Extract Text"
      description="Extract text content from a PDF document."
      breadcrumbs={[{ label: "PDF Tools", href: "/pdf/merge" }, { label: "Extract Text" }]}
      icon="📝"
      relatedTools={[
        { name: "Merge PDF", href: "/pdf/merge", icon: "📎" },
        { name: "Compress PDF", href: "/pdf/compress", icon: "📦" },
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
        <div className="text-4xl mb-3">📝</div>
        <p className="text-zinc-300">Drop a PDF file here or click to browse</p>
      </div>
      {file && (
        <div className="mt-6 animate-fade-in">
          <button onClick={handleExtract} disabled={processing} className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-3.5 font-semibold text-white disabled:opacity-40">
            {processing ? "Extracting..." : "Extract Text"}
          </button>
          {text && (
            <div className="mt-4 rounded-lg border border-white/5 bg-white/[0.03] p-4">
              <pre className="whitespace-pre-wrap text-sm text-zinc-300">{text}</pre>
            </div>
          )}
        </div>
      )}
    </ToolPageLayout>
  );
}
