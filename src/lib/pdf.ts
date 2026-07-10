import { PDFDocument } from "pdf-lib";

export async function loadPdf(bytes: ArrayBuffer): Promise<PDFDocument> {
  return PDFDocument.load(bytes);
}

export async function mergePdfs(files: ArrayBuffer[]): Promise<Uint8Array> {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const pdf = await PDFDocument.load(file);
    const pages = await merged.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
  }
  return merged.save();
}

export async function splitPdf(file: ArrayBuffer, pageIndices: number[]): Promise<Uint8Array> {
  const src = await PDFDocument.load(file);
  const result = await PDFDocument.create();
  const pages = await result.copyPages(src, pageIndices);
  pages.forEach((page) => result.addPage(page));
  return result.save();
}

export async function rotatePdf(file: ArrayBuffer, rotations: Record<number, number>): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(file);
  const pages = pdf.getPages();
  for (const [idx, deg] of Object.entries(rotations)) {
    const page = pages[parseInt(idx)];
    if (page) {
      // Convert degrees to radians for pdf-lib
      const radians = (deg as number) * (Math.PI / 180);
      page.setRotation({ angle: radians, type: "radians" });
    }
  }
  return pdf.save();
}

export async function addWatermark(file: ArrayBuffer, text: string, opacity = 0.3, fontSize = 50): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(file);
  const pages = pdf.getPages();
  const font = await pdf.embedFont("Helvetica-Bold");
  for (const page of pages) {
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: width / 2 - (text.length * fontSize * 0.3),
      y: height / 2,
      size: fontSize,
      font,
      opacity,
      rotate: { angle: -45, type: "degrees" },
    });
  }
  return pdf.save();
}

export async function addPageNumbers(file: ArrayBuffer, position: "bottom-center" | "bottom-right" = "bottom-center"): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(file);
  const pages = pdf.getPages();
  const font = await pdf.embedFont("Helvetica");
  pages.forEach((page, i) => {
    const { width } = page.getSize();
    const text = `${i + 1}`;
    const textWidth = font.widthOfTextAtSize(text, 12);
    const x = position === "bottom-center" ? width / 2 - textWidth / 2 : width - 50;
    page.drawText(text, { x, y: 30, size: 12, font, opacity: 0.5 });
  });
  return pdf.save();
}

export async function extractText(file: ArrayBuffer): Promise<string[]> {
  const pdf = await PDFDocument.load(file);
  // pdf-lib doesn't support text extraction directly
  // Return page count info instead
  return pdf.getPages().map((_, i) => `Page ${i + 1}: (text extraction requires server-side processing)`);
}

export async function removePages(file: ArrayBuffer, indicesToRemove: number[]): Promise<Uint8Array> {
  const src = await PDFDocument.load(file);
  const allIndices = src.getPageIndices();
  const keepIndices = allIndices.filter((i) => !indicesToRemove.includes(i));
  const result = await PDFDocument.create();
  const pages = await result.copyPages(src, keepIndices);
  pages.forEach((page) => result.addPage(page));
  return result.save();
}

export async function getPdfInfo(file: ArrayBuffer) {
  const pdf = await PDFDocument.load(file);
  return {
    pageCount: pdf.getPageCount(),
    title: pdf.getTitle() || "Untitled",
    author: pdf.getAuthor() || "Unknown",
  };
}

export function downloadPdf(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
