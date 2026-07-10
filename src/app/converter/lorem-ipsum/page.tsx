"use client";
import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const relatedTools = [
  { name: "密码生成器", href: "/converter/password-generator/" },
  { name: "字数统计", href: "/converter/word-counter/" },
];

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState("");

  const generate = () => {
    const result = Array.from({ length: paragraphs }, (_, i) => {
      const start = (i * 7) % LOREM.length;
      return LOREM.slice(start) + LOREM.slice(0, start);
    }).join("\n\n");
    setOutput(result);
  };

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <ToolPageLayout title="Lorem Ipsum 生成器" description="生成占位文本" breadcrumbs={[{ label: "格式转换", href: "/converter/csv-to-json/" }, { label: "Lorem Ipsum" }]} relatedTools={relatedTools}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'center' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#9a9a9a', display: 'block', marginBottom: '6px' }}>段落数: {paragraphs}</label>
          <input type="range" min="1" max="20" value={paragraphs} onChange={e => setParagraphs(parseInt(e.target.value))} style={{ width: '120px' }} />
        </div>
        <button onClick={generate} style={{ padding: '10px 24px', border: '1px solid #6b705c', background: 'transparent', color: '#6b705c', cursor: 'pointer', fontSize: '14px', letterSpacing: '0.05em' }}>生成</button>
      </div>
      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '12px', color: '#9a9a9a' }}>结果</label>
            <button onClick={copy} style={{ fontSize: '12px', color: '#6b705c', background: 'none', border: 'none', cursor: 'pointer' }}>复制</button>
          </div>
          <pre style={{ padding: '12px', border: '1px solid #e0ddd6', background: 'rgba(248,246,241,0.5)', color: '#2c2c2c', fontSize: '14px', lineHeight: 1.8, maxHeight: '400px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>{output}</pre>
        </div>
      )}
    </ToolPageLayout>
  );
}
