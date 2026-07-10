"use client";
import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "JSON 格式化", href: "/converter/json-formatter/" },
  { name: "Base64 编解码", href: "/converter/base64/" },
];

export default function WordCounter() {
  const [text, setText] = useState("");

  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split("\n").length : 0;
  const paragraphs = text.trim() ? text.trim().split(/\n\n+/).length : 0;
  const sentences = text.trim() ? text.trim().split(/[.!?]+/).filter(s => s.trim()).length : 0;

  return (
    <ToolPageLayout title="字数统计" description="统计字符、单词、行数、段落数" breadcrumbs={[{ label: "格式转换", href: "/converter/csv-to-json/" }, { label: "字数统计" }]} relatedTools={relatedTools}>
      <textarea value={text} onChange={e => setText(e.target.value)} rows={10} placeholder="在此输入或粘贴文本..."
        style={{ width: '100%', padding: '12px', border: '1px solid #e0ddd6', background: 'transparent', color: '#2c2c2c', fontSize: '14px', outline: 'none', resize: 'vertical', marginBottom: '20px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#e0ddd6', border: '1px solid #e0ddd6' }}>
        {[
          { label: "字符", value: chars },
          { label: "字符(不含空格)", value: charsNoSpace },
          { label: "单词", value: words },
          { label: "行数", value: lines },
          { label: "段落", value: paragraphs },
          { label: "句子", value: sentences },
        ].map(item => (
          <div key={item.label} style={{ padding: '16px', background: '#f8f6f1', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 300, color: '#2c2c2c' }}>{item.value}</div>
            <div style={{ fontSize: '12px', color: '#9a9a9a', marginTop: '4px' }}>{item.label}</div>
          </div>
        ))}
      </div>
    </ToolPageLayout>
  );
}
