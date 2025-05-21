"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, ArrowRight, Terminal, Copy, Check, Code, Zap, Database, Server, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { YamlRenderer } from "@/components/yaml-renderer"

export default function CliPage() {
  // Removed activeTab state as tabs are no longer needed
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const [installationStep, setInstallationStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])

  const installCommand =
    "curl -sSL https://raw.githubusercontent.com/Nexlayer/nexlayer-cli/main/direct_install.sh | bash"
  const deployCommands = ["cd my-project", "nexlayer init", "nexlayer deploy"]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(text)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const installationSteps = [
    { text: "🚀 Installing Nexlayer CLI...", color: "#22B4C8" },
    { text: "⬇️  Downloading binary for darwin/arm64...", color: "#8A2BE2" },
    {
      text: "🔗 Downloading from: https://github.com/Nexlayer/nexlayer-cli/releases/download/v1.1.15/nexlayer-darwin-arm64",
      color: "#8A2BE2",
    },
    { text: "📦 Installing to /usr/local/bin...", color: "#8A2BE2" },
    { text: "🔍 Verifying installation...", color: "#8A2BE2" },
    { text: "✅ Binary exists at /usr/local/bin/nexlayer", color: "#4CAF50" },
    { text: "✅ Binary is executable", color: "#4CAF50" },
    { text: "✅ Nexlayer CLI installed successfully!", color: "#4CAF50" },
    { text: "✅ Nexlayer CLI version v1.1.15", color: "#4CAF50" },
    { text: "✅ 'nexlayer' command is in your PATH", color: "#4CAF50" },
    { text: "", color: "#FFFFFF" },
    { text: "🚀 Quick Start:", color: "#22B4C8" },
    { text: "   nexlayer templates   # Deploy a template app", color: "#22B4C8" },
    { text: "   nexlayer init        # Initialize in existing project", color: "#22B4C8" },
    { text: "   nexlayer deploy      # Deploy your prepared project", color: "#22B4C8" },
    { text: "", color: "#FFFFFF" },
    { text: "✨ NEW: Enjoy our vibey UI experience with simplified output!", color: "#FFD700" },
    { text: "   (Use --verbose for detailed technical information)", color: "#FFD700" },
    { text: "", color: "#FFFFFF" },
    { text: "💡 Run nexlayer --help to see all available commands", color: "#FFFFFF" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setInstallationStep((prev) => {
        if (prev >= installationSteps.length - 1) {
          // Reset after showing all steps
          setTimeout(() => {
            setInstallationStep(0)
          }, 3000)
          return prev
        }
        return prev + 1
      })
    }, 300)

    return () => clearInterval(timer)
  }, [installationSteps.length])

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-[#22B4C8]" />,
      title: "Ship in hours, not weeks",
      description: "Deploy complex AI architectures with a single command",
    },
    {
      icon: <Server className="h-8 w-8 text-[#22B4C8]" />,
      title: "Scale without thinking",
      description: "Automatically adjust resources as your user base grows",
    },
    {
      icon: <Code className="h-8 w-8 text-[#22B4C8]" />,
      title: "Focus on innovation",
      description: "Let Nexlayer handle infrastructure while you build what matters",
    },
    {
      icon: <Database className="h-8 w-8 text-[#22B4C8]" />,
      title: "Integrate any AI model",
      description: "Seamless support for OpenAI, Anthropic, Hugging Face, and more",
    },
    {
      icon: <Shield className="h-8 w-8 text-[#22B4C8]" />,
      title: "Optimize for performance",
      description: "AI-specific infrastructure tuning for maximum throughput",
    },
  ]

  const deploymentSteps = [
    {
      title: "Install Nexlayer CLI",
      description: "Get started with a single command",
      code: installCommand,
      animation: "terminal",
    },
    {
      title: "Navigate to your project",
      description: "Change to your project directory",
      code: "cd my-project",
      animation: "folder",
    },
    {
      title: "Initialize your project",
      description: "Nexlayer analyzes your project and creates configuration",
      code: "nexlayer init",
      animation: "config",
    },
    {
      title: "Deploy to production",
      description: "Your app is live in seconds",
      code: "nexlayer deploy",
      animation: "deploy",
    },
  ]

  const commonCommands = [
    { command: "nexlayer templates", description: "Start from a template" },
    { command: "nexlayer init", description: "Set up your existing project" },
    { command: "nexlayer deploy", description: "Put your app online" },
    { command: "nexlayer install", description: "Update to latest version" },
  ]

  const tabs = [{ id: "overview", label: "Overview" }]

  const renderTerminal = (command: string, showPrompt = true) => (
    <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm overflow-x-auto border border-[#333] relative group">
      {showPrompt && <span className="text-[#00aa88]">$ </span>}
      <span className="text-white">{command}</span>
      <button
        onClick={() => copyToClipboard(command)}
        className="absolute right-2 top-2 p-1.5 rounded-md bg-[#222] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy command"
      >
        {copiedCommand === command ? <Check className="h-4 w-4 text-[#22B4C8]" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )

  const renderCodeBlock = (code: string, language = "yaml") => (
    <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm overflow-x-auto border border-[#333] relative group">
      <pre className="text-white">
        {language === "yaml" ? (
          <>
            <YamlRenderer
              yamlContent={`application:
  name: "my-ai-app"
  pods:
    - name: "web"
      servicePorts:
        - 3000`}
            />
          </>
        ) : (
          code
        )}
      </pre>
      <button
        onClick={() => copyToClipboard(code)}
        className="absolute right-2 top-2 p-1.5 rounded-md bg-[#222] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copiedCommand === code ? <Check className="h-4 w-4 text-[#22B4C8]" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )

  const renderAnimatedTerminal = () => (
    <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm overflow-hidden border border-[#333] h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-400">terminal</div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="text-[#22B4C8] mb-2">Welcome to Nexlayer CLI</div>
        <pre className="text-[#22B4C8] mb-4 whitespace-pre overflow-x-auto">
          {`███╗   ██╗███████╗██╗  ██╗██╗      █████╗ ██╗   ██╗███████╗██████╗ 
████╗  ██║██╔════╝╚██╗██╔╝██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗
██╔██╗ ██║█████╗   ╚███╔╝ ██║     ███████║ ╚████╔╝ █████╗  ██████╔╝
██║╚██╗██║██╔══╝   ██╔██╗ ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗
██║ ╚████║███████╗██╔╝ ██╗███████╗██║  ██║   ██║   ███████╗██║  ██║
╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝`}
        </pre>
        <div className="text-[#22B4C8] mb-4">From prompt to production — Ship AI products that scale faster.</div>

        <div className="space-y-1">
          {installationSteps.slice(0, installationStep + 1).map((step, index) => (
            <div key={step.text + index} className="flex">
              <span style={{ color: step.color }}>{step.text}</span>
              {index === installationStep && step.text && <span className="animate-pulse ml-1">|</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 p-6 bg-amber-100 dark:bg-amber-900 border-l-4 border-amber-500 rounded-md">
          <h2 className="flex items-center text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Research Preview Beta
          </h2>
          <p className="text-amber-800 dark:text-amber-200 font-medium">
            This CLI is part of an early Research Preview Beta. We're sharing it now to learn — from real use, real
            feedback, and real-world edge cases.
          </p>
          <p className="text-amber-800 dark:text-amber-200 font-medium mt-2">
            It's not perfect yet. You may notice bugs or unfinished edges. That's by design.
          </p>
          <p className="text-amber-800 dark:text-amber-200 font-medium mt-2">
            Your experience will help shape what comes next.
          </p>
        </div>
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-[#22B4C8] mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-light mb-4 gradient-text">Nexlayer CLI</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Deploy AI apps to production in seconds with our powerful command-line interface.
          </p>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-light mb-6 text-white">
              <span className="gradient-text">Zero to deployed</span> in 5 minutes
            </h2>
            <p className="text-gray-300 mb-8">
              Nexlayer CLI transforms the complex process of deploying AI-powered applications into a single command,
              giving developers the ability to ship production-grade applications in minutes rather than weeks.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#22B4C8] hover:bg-[#1DA3B6] text-black">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-[#333] hover:border-[#22B4C8]">
                View Documentation
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
              <div className="flex items-center mb-4">
                <Terminal className="h-5 w-5 text-[#22B4C8] mr-2" />
                <h3 className="text-lg font-medium text-white">Quick Install</h3>
              </div>
              {renderTerminal(installCommand)}
              <div className="mt-6">
                <div className="flex items-center mb-4">
                  <Zap className="h-5 w-5 text-[#22B4C8] mr-2" />
                  <h3 className="text-lg font-medium text-white">Deploy Your Project</h3>
                </div>
                <div className="space-y-2">
                  {deployCommands.map((cmd) => (
                    <div key={cmd}>{renderTerminal(cmd)}</div>
                  ))}
                  <p className="text-[#22B4C8] mt-2 text-center">That's it! Your app is live 🚀</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-16">
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: features.findIndex(f => f.title === feature.title) * 0.1 }}
                  className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333] hover:border-[#22B4C8] transition-colors"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-medium mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-light mb-6 text-white">Common Commands</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {commonCommands.map((cmd) => (
                  <div
                    key={cmd.command}
                    className="bg-[#0a0a0a] rounded-lg p-4 border border-[#333] flex justify-between items-center"
                  >
                    <div className="font-mono text-[#22B4C8]">{cmd.command}</div>
                    <div className="text-gray-300 text-sm">{cmd.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-light mb-6 text-white">Interactive Demo</h2>
              {renderAnimatedTerminal()}
            </div>
          </div>
        </div>

        {/* Deployment Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-8 text-center gradient-text">From Zero to Production in 4 Steps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deploymentSteps.map((step) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: deploymentSteps.findIndex(s => s.title === step.title) * 0.1 }}
                className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333] relative"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#22B4C8] text-black flex items-center justify-center font-medium">
                  {deploymentSteps.findIndex(s => s.title === step.title) + 1}
                </div>
                <h3 className="text-lg font-medium mb-2 text-white mt-2">{step.title}</h3>
                <p className="text-gray-400 mb-4">{step.description}</p>
                {renderTerminal(step.code, false)}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#0a0a0a] rounded-xl p-8 border border-[#333] mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-light mb-4 gradient-text">Ready to simplify your AI deployments?</h2>
            <p className="text-gray-300 mb-6">
              Get started with Nexlayer CLI today and deploy your AI applications to production in seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://github.com/Nexlayer/nexlayer-cli" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#22B4C8] hover:bg-[#1DA3B6] text-black">
                  Install Nexlayer CLI
                  <Terminal className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-2xl font-light mb-6 text-white">Support</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
              <h3 className="text-xl font-medium mb-4 text-white">Community Support</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22B4C8] text-black flex items-center justify-center mr-2 mt-0.5 text-xs">
                    •
                  </div>
                  <span>
                    <strong>Documentation:</strong>{" "}
                    <a href="#" className="text-[#22B4C8] hover:underline">
                      docs.nexlayer.io
                    </a>
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22B4C8] text-black flex items-center justify-center mr-2 mt-0.5 text-xs">
                    •
                  </div>
                  <span>
                    <strong>GitHub:</strong>{" "}
                    <a href="#" className="text-[#22B4C8] hover:underline">
                      github.com/Nexlayer/nexlayer-cli
                    </a>
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22B4C8] text-black flex items-center justify-center mr-2 mt-0.5 text-xs">
                    •
                  </div>
                  <span>
                    <strong>Community Forum:</strong>{" "}
                    <a href="#" className="text-[#22B4C8] hover:underline">
                      community.nexlayer.io
                    </a>
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
              <h3 className="text-xl font-medium mb-4 text-white">Enterprise Support</h3>
              <p className="text-gray-300 mb-4">
                For enterprise support options, dedicated resources, and SLAs, please contact our enterprise team.
              </p>
              <Button variant="outline" className="border-[#333] hover:border-[#22B4C8] w-full">
                Contact Enterprise Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
