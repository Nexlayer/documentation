"use client"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Terminal,
  Database,
  Server,
  Code,
  Layers,
  Cpu,
  Cloud,
  GitBranch,
  Copy,
  Check,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GuideStep } from "@/components/learn/guide-step"
import { ScrollStepSection } from "@/components/learn/scroll-step-section"
import { VideoPreview } from "@/components/learn/video-preview"
import { FeatureCard } from "@/components/learn/feature-card"
import { useState } from "react"
import { CodeTab } from "@/components/learn/code-tab" // Import CodeTab here
import Image from "next/image"

export default function LearnPage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(text)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const renderTerminal = (command: string) => (
    <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm overflow-x-auto border border-[#333] relative group code-block">
      <span className="text-[#00aa88]">$ </span>
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl font-light mb-4 gradient-text">Learn Nexlayer Deployment</h1>
            <p className="text-xl text-gray-300 mb-8">
              A step-by-step guide to deploying AI applications on Nexlayer with ready-to-use examples.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="https://nexlayer.com/playground" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#22B4C8] hover:bg-[#1DA3B6] text-black">
                  Open Playground
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-serif font-medium tracking-tight text-white mb-8">Why Nexlayer Exists</h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-300">
              <p>
                With AI, building an app is easy now. AI writes code. Designs UIs. Connects APIs. In minutes, you have
                something that looks and feels real.
              </p>

              <p>But the second you try to ship it — everything breaks.</p>

              <p>Getting it live — truly live, production-ready, and built to scale — is still broken.</p>

              <p>
                Most tools were designed for development, not for shipping high-quality product. They assume you're
                testing and debugging, not delivering. They generate beautiful code — then leave you stranded wiring up
                the backend, the database, the AI model… alone.
              </p>

              <p>
                That's where momentum dies. Where promising ideas stall. Where creators burn out before launching or
                securing funding.
              </p>

              <p className="font-semibold text-white">Nexlayer exists to fix that.</p>

              <p>
                It's a new kind of cloud. An intelligent layer built for the AI era. A machine-readable fabric — the
                cloud that AI agents can talk to.
              </p>

              <p>
                No boilerplate. No dead ends. No busywork. Just a clean, intelligent path from prototype to product.
              </p>

              <p>You define what your app is. We handle the rest — infrastructure, scale, services — instantly.</p>

              <p className="text-xl font-medium text-white">
                Because execution is everything.
                <br />
                And the future belongs to those who ship.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Server className="h-8 w-8" />}
              title="Full-Stack Control"
              description="Run frontend, backend, databases, queues, vector stores, and AI models — all in one deployment."
            />
            <FeatureCard
              icon={<Code className="h-8 w-8" />}
              title="Container-Native"
              description="Deploy any Docker image from any public or private registry."
            />
            <FeatureCard
              icon={<Cpu className="h-8 w-8" />}
              title="Always-Live Apps"
              description="No cold starts. Your pods are always up and ready for traffic — just like real production infra should be."
            />
            <FeatureCard
              icon={<Terminal className="h-8 w-8" />}
              title="AI Agent Ready"
              description="Purpose-built for autonomous agents to programmatically deploy, extend, claim, and manage cloud apps."
            />
            <FeatureCard
              icon={<GitBranch className="h-8 w-8" />}
              title="Persistent Environments"
              description="Claim and extend live environments in real-time — great for staging, previews, or AI-generated infra."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Production-Grade by Default"
              description="Robust networking, process isolation, and smart autoscaling come standard. What's considered 'enterprise' on other platforms is just 'default' on Nexlayer."
            />
            <FeatureCard
              icon={<Layers className="h-8 w-8" />}
              title="Declarative Deployments"
              description="Define your entire stack in a single YAML file. No complex configuration required."
            />
            <FeatureCard
              icon={<Cloud className="h-8 w-8" />}
              title="Instant Scaling"
              description="Scale your applications automatically based on demand without any manual intervention."
            />
            <FeatureCard
              icon={<Cpu className="h-8 w-8" />}
              title="AI-Optimized"
              description="Purpose-built for AI applications with GPU support and optimized resource allocation."
            />
            <FeatureCard
              icon={<Database className="h-8 w-8" />}
              title="Persistent Storage"
              description="Built-in volume management for databases and stateful applications."
            />
            <FeatureCard
              icon={<GitBranch className="h-8 w-8" />}
              title="CI/CD Integration"
              description="Seamlessly integrate with your existing CI/CD pipelines for automated deployments."
            />
            <FeatureCard
              icon={<Terminal className="h-8 w-8" />}
              title="CLI & API"
              description="Powerful CLI and API for automation and programmatic control."
            />
          </div>
        </div>
      </section>

      {/* Get Started Guide */}
      <section id="get-started" className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-light mb-4 text-white">Get Started in 3 Steps</h2>
            <p className="text-lg text-gray-300">
              Follow this simple guide to deploy your first application on Nexlayer.
            </p>
          </motion.div>

          <ScrollStepSection>
            <GuideStep
              step="1"
              title="Create your nexlayer.yaml file"
              description="Define your application structure in a simple YAML file. This describes your pods, images, and configuration."
            />
            <CodeTab
              tabs={[
                {
                  name: "nexlayer.yaml",
                  language: "yaml",
                  code: `application:
  name: "my-app"  # Required: Globally unique app name
  pods:
    - name: "web"
      image: "username/web-app:latest"  # Public image from Docker Hub
      servicePorts:
        - 3000  # Port your app listens on
      path: /  # Route path (optional)
      vars:
        NODE_ENV: "production"
        API_URL: "http://api.pod:8000"  # Inter-pod communication
        
    - name: "api"
      image: "username/api:latest"
      servicePorts:
        - 8000
      vars:
        DATABASE_URL: "postgresql://postgres:password@postgres.pod:5432/mydb"
        
    - name: "postgres"
      image: "postgres:14"
      servicePorts:
        - 5432
      vars:
        POSTGRES_USER: "postgres"
        POSTGRES_PASSWORD: "password"
        POSTGRES_DB: "mydb"
      volumes:
        - name: "pg-data"
          size: 10Gi
          mountPath: "/var/lib/postgresql/data"`,
                },
              ]}
            />
            <div className="bg-[#111] rounded-lg p-4 border border-[#333] my-6">
              <p className="text-sm text-gray-300 flex items-start">
                <span className="flex-shrink-0 mr-2">💡</span>
                <span>
                  <strong>Tip:</strong> The YAML file defines your entire application stack. Pods can communicate with
                  each other using <code className="bg-[#222] px-1 py-0.5 rounded">podname.pod</code> DNS naming.
                </span>
              </p>
            </div>
          </ScrollStepSection>

          <ScrollStepSection>
            <GuideStep
              step="2"
              title="Deploy your application"
              description="Choose your preferred deployment method: GUI, CLI, or API."
            />
            <CodeTab
              tabs={[
                {
                  name: "CLI",
                  language: "bash",
                  code: `# Install the Nexlayer CLI
npm install -g @nexlayer/cli

# Login to Nexlayer
nexlayer login

# Deploy your application
nexlayer deploy`,
                },
                {
                  name: "API",
                  language: "bash",
                  code: `# Deploy using curl
curl -X POST https://app.nexlayer.io/startUserDeployment \\
  -H "Content-Type: text/x-yaml" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  --data-binary @nexlayer.yaml`,
                },
                {
                  name: "CI/CD",
                  language: "yaml",
                  code: `# .github/workflows/deploy.yaml
name: Deploy to Nexlayer

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and Push Docker Image
        run: |
          docker build --platform=linux/amd64 -t ttl.sh/my-app:1h .
          docker push ttl.sh/my-app:1h

      - name: Deploy to Nexlayer
        run: |
          curl -X POST https://app.nexlayer.io/startUserDeployment \\
            -H "Content-Type: text/x-yaml" \\
            --data-binary @nexlayer.yaml`,
                },
                {
                  name: "GUI",
                  language: "text",
                  code: `1. Open https://nexlayer.com/playground
2. Paste your YAML in the editor
3. Click "Deploy" button
4. Watch your application deploy in real-time`,
                },
              ]}
            />
            <VideoPreview
              src="/videos/deployment-intelligence-nexlayer.mp4"
              alt="Nexlayer Deployment Intelligence Dashboard"
            />
          </ScrollStepSection>

          <ScrollStepSection>
            <GuideStep
              step="3"
              title="Access your application"
              description="Once deployed, your application is accessible via a unique URL. You can also configure custom domains."
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden border border-[#333] shadow-2xl my-8"
            >
              <Image
                src="/images/nexlayer-dashboard-pern-project.png"
                alt="Nexlayer Dashboard showing a deployed MERN Todo App"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </motion.div>
            <div className="bg-[#111] rounded-lg p-4 border border-[#333] my-6">
              <p className="text-sm text-gray-300 flex items-start">
                <span className="flex-shrink-0 mr-2">🔒</span>
                <span>
                  <strong>Note:</strong> All applications are deployed with HTTPS by default. Custom domains can be
                  configured in the dashboard.
                </span>
              </p>
            </div>
          </ScrollStepSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light text-white mb-6">Ready to Deploy Your Application?</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              Get started with Nexlayer today and experience the simplest way to deploy AI applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://app.nexlayer.io/#/signup">
                <Button className="bg-[#22B4C8] hover:bg-[#1DA3B6] text-black">Sign Up Free</Button>
              </Link>
              <Link href="https://app.nexlayer.io/#/playground">
                <Button variant="outline" className="border-[#333] hover:border-[#22B4C8]">
                  Try Playground
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
