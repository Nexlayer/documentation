"use client"
import { useState } from "react"
import { Copy, Check, HelpCircle } from "lucide-react"
import { PodVisualization } from "./pod-visualization"
import "../../styles/yaml-highlighter.css"

type CodeTabProps = {
  tabs: {
    name: string
    language: string
    code: string
  }[]
}

export const CodeTab = ({ tabs }: CodeTabProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const [selectedPod, setSelectedPod] = useState<string | null>(null)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tabs[activeTab].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-[#0a0a0a] border border-[#333] rounded-lg overflow-hidden mb-12 code-block">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#111] border-b border-[#333]">
        {tabs.map((tab, i) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(i)}
            className={`text-sm px-3 py-1 rounded-md transition-colors ${
              i === activeTab ? "bg-[#22B4C8] text-black font-medium" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.name}
          </button>
        ))}
        {activeTab === 0 && tabs[0].language === "yaml" && (
          <button
            onClick={() => window.open("https://github.com/Nexlayer/nexlayer-deployment-yaml", "_blank")}
            className="text-sm px-3 py-1 rounded-md transition-colors text-gray-400 hover:text-white"
            aria-label="YAML Help"
          >
            <HelpCircle className="h-4 w-4 inline mr-1" />
            Help
          </button>
        )}
        <button
          onClick={copyToClipboard}
          className="ml-auto text-gray-400 hover:text-white p-1.5 rounded-md"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>

      {activeTab === 0 && tabs[0].language === "yaml" ? (
        <div className="flex flex-col md:flex-row">
          <div className="yaml-highlighter md:w-1/2 border-r border-[#333]">
            <div className={`yaml-line ${selectedPod ? "opacity-70" : ""} transition-opacity duration-200`}>
              <span className="yaml-key">application</span>
              <span className="yaml-colon">:</span>
            </div>
            <div className="yaml-line">
              <span className="yaml-key">name</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-string">"PERN App"</span>
            </div>
            <div className="yaml-line">
              <span className="yaml-key">pods</span>
              <span className="yaml-colon">:</span>
            </div>

            <div
              className={`yaml-line ${selectedPod === "postgres" ? "bg-gradient-to-r from-amber-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-dash"> - </span>
              <span className="yaml-key">name</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">postgres</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "postgres" ? "bg-gradient-to-r from-amber-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> image</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">katieharris/pern-postgres-todo:latest</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "postgres" ? "bg-gradient-to-r from-amber-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> vars</span>
              <span className="yaml-colon">:</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "postgres" ? "bg-gradient-to-r from-amber-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> POSTGRES_USER</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">postgres</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "postgres" ? "bg-gradient-to-r from-amber-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> POSTGRES_PASSWORD</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">passw0rd</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "postgres" ? "bg-gradient-to-r from-amber-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> POSTGRES_DB</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">todo</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "postgres" ? "bg-gradient-to-r from-amber-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> PGDATA</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">/var/lib/postgresql/data</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "postgres" ? "bg-gradient-to-r from-amber-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> servicePorts</span>
              <span className="yaml-colon">:</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "postgres" ? "bg-gradient-to-r from-amber-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-dash"> - </span>
              <span className="yaml-number">5432</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "postgres" ? "bg-gradient-to-r from-amber-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> volumes</span>
              <span className="yaml-colon">:</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "postgres" ? "bg-gradient-to-r from-amber-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-dash"> - </span>
              <span className="yaml-key">name</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">pg-data-volume</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "postgres" ? "bg-gradient-to-r from-amber-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> size</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">2Gi</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "postgres" ? "bg-gradient-to-r from-amber-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> mountPath</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">/var/lib/postgresql</span>
            </div>

            <div
              className={`yaml-line ${selectedPod === "express" ? "bg-gradient-to-r from-green-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-dash"> - </span>
              <span className="yaml-key">name</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">express</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "express" ? "bg-gradient-to-r from-green-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> image</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">katieharris/pern-express-todo:latest</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "express" ? "bg-gradient-to-r from-green-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> vars</span>
              <span className="yaml-colon">:</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "express" ? "bg-gradient-to-r from-green-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> POSTGRES_HOST</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-pod-reference">postgres.pod</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "express" ? "bg-gradient-to-r from-green-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> POSTGRES_USERNAME</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">postgres</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "express" ? "bg-gradient-to-r from-green-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> POSTGRES_PASSWORD</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">passw0rd</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "express" ? "bg-gradient-to-r from-green-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> POSTGRES_DB</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">todo</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "express" ? "bg-gradient-to-r from-green-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> servicePorts</span>
              <span className="yaml-colon">:</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "express" ? "bg-gradient-to-r from-green-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-dash"> - </span>
              <span className="yaml-number">3000</span>
            </div>

            <div
              className={`yaml-line ${selectedPod === "react" ? "bg-gradient-to-r from-blue-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-dash"> - </span>
              <span className="yaml-key">name</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">react</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "react" ? "bg-gradient-to-r from-blue-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> path</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">/</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "react" ? "bg-gradient-to-r from-blue-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> image</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-value">katieharris/pern-react-todo:latest</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "react" ? "bg-gradient-to-r from-blue-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> vars</span>
              <span className="yaml-colon">:</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "react" ? "bg-gradient-to-r from-blue-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> EXPRESS_URL</span>
              <span className="yaml-colon">:</span>
              <span className="yaml-pod-reference">http://express.pod:3000</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "react" ? "bg-gradient-to-r from-blue-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-key"> servicePorts</span>
              <span className="yaml-colon">:</span>
            </div>
            <div
              className={`yaml-line ${selectedPod === "react" ? "bg-gradient-to-r from-blue-500/20 to-transparent" : ""} transition-all duration-200`}
            >
              <span className="yaml-dash"> - </span>
              <span className="yaml-number">80</span>
            </div>
          </div>
          <div className="md:w-1/2 p-4 relative">
            <PodVisualization onPodSelect={setSelectedPod} selectedPod={selectedPod} />
          </div>
        </div>
      ) : tabs[activeTab].name === "CLI" ? (
        <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300 whitespace-pre">
          {`# Install the Nexlayer CLI
curl -sSL https://raw.githubusercontent.com/Nexlayer/nexlayer-cli/main/direct_install.sh | bash

# Navigate to your app directory
cd my-app  # assuming you've already created your app

# Initialize Nexlayer configuration
nexlayer init

# Deploy your application
nexlayer deploy`}
        </pre>
      ) : tabs[activeTab].name === "API" ? (
        <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300 whitespace-pre">
          {`# Deploy using the Nexlayer API
curl -X POST https://api.nexlayer.io/v1/deployments \\
  -H "Content-Type: application/yaml" \\
  --data-binary @nexlayer.yaml`}
        </pre>
      ) : (
        <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300 whitespace-pre">{tabs[activeTab].code}</pre>
      )}
    </div>
  )
}
