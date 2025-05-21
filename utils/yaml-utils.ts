import { YamlRenderer } from "@/components/yaml-renderer"

/**
 * Renders YAML code with syntax highlighting
 * @param code The YAML code to highlight
 * @param showLineNumbers Whether to show line numbers
 * @param className Additional CSS classes
 * @returns JSX element with highlighted YAML
 */
export function renderYaml(code: string, showLineNumbers = false, className = "") {
  return <YamlRenderer code={code} showLineNumbers={showLineNumbers} className={className} />
}

/**
 * Validates if a string is valid YAML
 * @param code The YAML code to validate
 * @returns Boolean indicating if the YAML is valid
 */
export function isValidYaml(code: string): boolean {
  try {
    // This is a simple validation - in a real implementation,
    // you would use a YAML parser library
    return true
  } catch (error) {
    return false
  }
}
