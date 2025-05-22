import React from 'react';

interface YamlHighlighterProps {
  code: string;
  showLineNumbers?: boolean;
}

export const YamlHighlighter: React.FC<YamlHighlighterProps> = ({ code, showLineNumbers = true }) => {
  const lines = code.split('\n');
  return (
    <pre className="yaml-highlighter">
      {lines.map((line, idx) => (
        <div key={idx} className="yaml-line">
          {showLineNumbers && <span className="line-numbers">{idx + 1}</span>}
          <span>{line}</span>
        </div>
      ))}
    </pre>
  );
}; 