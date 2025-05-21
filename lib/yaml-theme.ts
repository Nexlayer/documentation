// Simplified YAML theme that matches the Nexlayer color palette
export const yamlTheme = {
  'code[class*="language-"]': {
    color: "#d4d4d4",
    fontFamily: "Fira Code, monospace",
    fontSize: "0.875rem",
    lineHeight: "1.5",
    background: "#000000",
  },
  'pre[class*="language-"]': {
    color: "#d4d4d4",
    fontFamily: "Fira Code, monospace",
    fontSize: "0.875rem",
    lineHeight: "1.5",
    padding: "1em",
    margin: "0.5em 0",
    overflow: "auto",
    background: "#000000",
  },
  comment: { color: "#6a9955" },
  prolog: { color: "#6a9955" },
  doctype: { color: "#6a9955" },
  cdata: { color: "#6a9955" },
  punctuation: { color: "#d4d4d4" },
  property: { color: "#699edb" },
  tag: { color: "#699edb" },
  boolean: { color: "#c084fc" },
  number: { color: "#f471b5" },
  constant: { color: "#c084fc" },
  symbol: { color: "#c084fc" },
  selector: { color: "#699edb" },
  "attr-name": { color: "#699edb" },
  string: { color: "#49de80" },
  char: { color: "#49de80" },
  builtin: { color: "#c084fc" },
  operator: { color: "#d4d4d4" },
  entity: { color: "#c084fc" },
  url: { color: "#49de80" },
  atrule: { color: "#699edb" },
  "attr-value": { color: "#49de80" },
  keyword: { color: "#699edb" },
  function: { color: "#c084fc" },
  regex: { color: "#c084fc" },
  important: { color: "#c084fc" },
  variable: { color: "#d4d4d4" },
}

// Style for line numbers
export const lineNumberStyle = {
  minWidth: "2.5em",
  paddingRight: "1em",
  textAlign: "right" as const,
  userSelect: "none" as const,
  color: "#555",
}

// Style for the code block container
export const codeBlockStyle = {
  position: "relative" as const,
  marginBottom: "1.5rem",
}
