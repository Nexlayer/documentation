"use client"

import { useState } from "react"
import { YamlHighlighter } from "@/components/YamlHighlighter"

export default function YamlDemoPage() {
  const [showLineNumbers, setShowLineNumbers] = useState(true)

  // Example YAML that matches the structure in the screenshot
  const exampleYaml = `application:
  name: "langfuse-app"
  pods:
    # 🔄 Langfuse Worker — background processing
    - name: langfuse-worker
      image: "langfuse/langfuse-worker:2.95.1"
      servicePorts:
        - 3030 # Main service port
      vars:
        DATABASE_URL: "postgresql://postgres:postgres@postgres.pod:5432/postgres" # Service discovery
        SALT: "mysalt"
        ENCRYPTION_KEY: "0000000000000000000000000000000000000000000000000000000000000000"
        TELEMETRY_ENABLED: "true"
        LANGFUSE_ENABLE_EXPERIMENTAL_FEATURES: "true"
        CLICKHOUSE_MIGRATION_URL: "clickhouse://clickhouse.pod:9000"
        CLICKHOUSE_URL: "http://clickhouse.pod:8123" # Service discovery
        CLICKHOUSE_USER: "clickhouse"
        CLICKHOUSE_PASSWORD: "clickhouse"
        LANGFUSE_S3_EVENT_UPLOAD_BUCKET: "langfuse"
        LANGFUSE_S3_MEDIA_UPLOAD_BUCKET: "langfuse"
        LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT: "http://minio.pod:9000" # Service discovery
        REDIS_HOST: "redis.pod" # Service discovery
        REDIS_PORT: "6379"
        REDIS_AUTH: "myredissecret"
    
    # 🌐 Langfuse Web — frontend UI
    - name: langfuse-web
      image: "langfuse/langfuse:2.95.1"
      path: "/" # Root path for public access
      servicePorts:
        - 3000 # Main service port
      vars:
        DATABASE_URL: "postgresql://postgres:postgres@postgres.pod:5432/postgres" # Service discovery
        DIRECT_URL: "postgresql://postgres:postgres@postgres.pod:5432/postgres" # Service discovery
        SALT: "mysalt"
        ENCRYPTION_KEY: "0000000000000000000000000000000000000000000000000000000000000000"
        TELEMETRY_ENABLED: "true"
        NEXTAUTH_URL: <% URL %> # Load from template variable
        NEXTAUTH_SECRET: "mysecret"
        CLICKHOUSE_CLUSTER_ENABLED: "false"
        CLICKHOUSE_MIGRATION_URL: "clickhouse://clickhouse.pod:9000" # Service discovery
        CLICKHOUSE_URL: "http://clickhouse.pod:8123" # Service discovery
        CLICKHOUSE_USER: "clickhouse"
        CLICKHOUSE_PASSWORD: "clickhouse"
        REDIS_HOST: "redis.pod" # Service discovery
        REDIS_PORT: "6379"
        REDIS_AUTH: "myredissecret"
    
    # 📊 ClickHouse — analytics database
    - name: clickhouse
      image: "clickhouse/clickhouse-server:25.2"
      servicePorts:
        - 8123
        - 9000
      vars:
        CLICKHOUSE_DB: "default"
        CLICKHOUSE_USER: "clickhouse"
        CLICKHOUSE_PASSWORD: "clickhouse"
      volumes:
        - name: clickhouse-data
          size: 10Gi
          mountPath: "/var/lib/clickhouse"
        - name: clickhouse-logs
          size: 1Gi
          mountPath: "/var/log/clickhouse-server"`

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">YAML Syntax Highlighter Demo</h1>
      <p className="mb-4">
        This demo shows the YAML syntax highlighter with the exact colors from the Nexlayer playground.
      </p>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showLineNumbers}
            onChange={() => setShowLineNumbers(!showLineNumbers)}
            className="mr-2"
          />
          Show Line Numbers
        </label>
      </div>

      <div className="mb-8 border border-gray-700 rounded-lg overflow-hidden">
        <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
          <h3 className="text-white font-medium">Langfuse App YAML</h3>
          <div className="text-xs bg-gray-700 px-2 py-1 rounded">Exact Colors</div>
        </div>
        <YamlHighlighter code={exampleYaml} showLineNumbers={showLineNumbers} />
      </div>

      <h2 className="text-2xl font-bold mb-4">Color Reference</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 border border-gray-700 rounded-lg">
          <div className="w-full h-6 mb-2 rounded" style={{ backgroundColor: "#569cd6" }}></div>
          <div className="text-sm">Keys: #569cd6</div>
        </div>
        <div className="p-4 border border-gray-700 rounded-lg">
          <div className="w-full h-6 mb-2 rounded" style={{ backgroundColor: "#6a9955" }}></div>
          <div className="text-sm">Values/Comments: #6a9955</div>
        </div>
        <div className="p-4 border border-gray-700 rounded-lg">
          <div className="w-full h-6 mb-2 rounded" style={{ backgroundColor: "#ce9178" }}></div>
          <div className="text-sm">Quoted Strings: #ce9178</div>
        </div>
        <div className="p-4 border border-gray-700 rounded-lg">
          <div className="w-full h-6 mb-2 rounded" style={{ backgroundColor: "#b5cea8" }}></div>
          <div className="text-sm">Numbers: #b5cea8</div>
        </div>
        <div className="p-4 border border-gray-700 rounded-lg">
          <div className="w-full h-6 mb-2 rounded" style={{ backgroundColor: "#d7ba7d" }}></div>
          <div className="text-sm">List Dashes: #d7ba7d</div>
        </div>
        <div className="p-4 border border-gray-700 rounded-lg">
          <div className="w-full h-6 mb-2 rounded" style={{ backgroundColor: "#1e1e1e" }}></div>
          <div className="text-sm">Background: #1e1e1e</div>
        </div>
      </div>
    </div>
  )
}
