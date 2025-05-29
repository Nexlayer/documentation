"use client";
import { motion } from "framer-motion";
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
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GuideStep } from "@/components/learn/guide-step";
import { ScrollStepSection } from "@/components/learn/scroll-step-section";
import { VideoPreview } from "@/components/learn/video-preview";
import { FeatureCard } from "@/components/learn/feature-card";
import { useState } from "react";
import { CodeTab } from "@/components/learn/code-tab"; // Import CodeTab here
import Image from "next/image";
import PernProjectImage from "@/components/assets/images/nexlayer-dashboard-pern-project.png";
import GithubIcon from "@/components/assets/svgs/github.svg";

export default function LearnPage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const renderTerminal = (command: string) => (
    <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm overflow-x-auto border border-[#333] relative group code-block">
      <span className="text-[#00aa88]">$ </span>
      <span className="text-white">{command}</span>
      <button
        onClick={() => copyToClipboard(command)}
        className="absolute right-2 top-2 p-1.5 rounded-md bg-[#222] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy command"
      >
        {copiedCommand === command ? (
          <Check className="h-4 w-4 text-[#22B4C8]" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-light mb-4 gradient-text">
              Learn Nexlayer Deployment
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              A step-by-step guide to deploying AI applications on Nexlayer with
              ready-to-use examples.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://nexlayer.com/playground"
                target="_blank"
                rel="noopener noreferrer"
              >
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
            className="mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-semibold tracking-tight text-white mb-10">
              Why Nexlayer Exists
            </h2>

            <div className="space-y-10 text-xl leading-loose text-gray-300">
              <p>
                <span className="block text-white font-medium">
                  With AI, building an app is easy now.
                </span>
                AI writes code.
                <br />
                Designs UIs.
                <br />
                Connects APIs.
                <br />
                In minutes, you have something that looks and feels{" "}
                <em>real</em>.
              </p>

              <p className="text-white font-semibold text-2xl">
                But the second you try to ship it — everything breaks.
              </p>

              <p>
                Getting it live — <strong>truly live</strong>, <br />
                <strong>production-ready</strong>, <br />
                <strong>scalable</strong> — is still broken.
              </p>

              <p>
                Most tools were designed for <em>development</em>, not delivery.
                <br />
                They assume you're testing, not shipping.
                <br />
                They generate beautiful code —
                <br />
                then leave you stranded.
                <br />
                Wiring up the backend.
                <br />
                The database.
                <br />
                The AI model…
                <span className="block text-white font-medium mt-2">
                  Alone.
                </span>
              </p>

              <p className="italic text-gray-400">
                That’s where momentum dies.
                <br />
                Where ideas stall.
                <br />
                Where creators burn out before launch.
              </p>

              <p className="text-white text-2xl font-semibold tracking-wide">
                Nexlayer exists to fix that.
              </p>

              <p>
                Not just another PaaS.
                <br />
                An execution layer where agents ship & scale any app.
                <br />
                Machine-readable. Agent-native. Engineered for scale.
              </p>

              <p className="text-white">
                No boilerplate.
                <br />
                No dead ends.
                <br />
                No busywork.
                <br />
                <span className="font-medium">
                  Just a clear path from prototype to product.
                </span>
              </p>

              <p>
                You define what your app <em>is</em>.
                <br />
                We handle the rest — infrastructure, scale, services —{" "}
                <span className="font-semibold">instantly.</span>
              </p>

              <p className="text-2xl text-white font-semibold leading-snug">
                Because execution is everything.
                <br />
                Ideas are cheap. Execution wins. The future belongs to those who
                ship fast.
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
      <section id="get-started" className="pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-light mb-4 text-white">
              Get Started in 3 Steps
            </h2>
            <p className="text-lg text-gray-300">
              Follow this simple guide to deploy your first application on
              Nexlayer.
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
                  <strong>Tip:</strong> The YAML file defines your entire
                  application stack. Pods can communicate with each other using{" "}
                  <code className="bg-[#222] px-1 py-0.5 rounded">
                    podname.pod
                  </code>{" "}
                  DNS naming.
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
2. Select template or build your own app launchfile
3. Click "Deploy" button
4. Watch your application deploy in real-time`,
                },
              ]}
            />
            <video
              controls
              autoPlay
              width="100%"
              className="rounded-lg border border-gray-700"
            >
              <source src="https://ik.imagekit.io/ahujh91zr/deployment-intelligence-nexlayer.mp4?updatedAt=1748527613599" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
              className="rounded-lg overflow-hidden border border-[#333] shadow-2xl my-8"
            >
              <Image
                src={PernProjectImage}
                alt="Nexlayer Dashboard showing a deployed MERN Todo App"
                width={1200}
                height={575}
                className="w-full max-h-[475px]"
              />
            </motion.div>
            <div className="bg-[#111] rounded-lg p-4 border border-[#333] my-6">
              <p className="text-sm text-gray-300 flex items-start">
                <span className="flex-shrink-0 mr-2">🔒</span>
                <span>
                  <strong>Note:</strong> All applications are deployed with
                  HTTPS by default. Custom domains can be configured in the
                  dashboard.
                </span>
              </p>
            </div>
          </ScrollStepSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-10 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light text-white mb-6">
              Ready to Deploy Your Application?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              Get started with Nexlayer today and experience the simplest way to
              deploy AI applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://app.nexlayer.io/#/signup">
                <Button className="bg-[#22B4C8] hover:bg-[#1DA3B6] text-black">
                  Sign Up Free
                </Button>
              </Link>
              <Link href="https://app.nexlayer.io/#/playground">
                <Button
                  variant="outline"
                  className="border-[#333] hover:border-[#22B4C8]"
                >
                  Try Playground
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Link
        href="https://github.com/Nexlayer/documentation/issues"
        target="_blank"
        rel="noopener noreferrer"
      >
        <section className="text-lg border border-gray-700 max-w-[290px] mx-auto bg-[#0c0e1a] rounded-xl p-4 mb-16 hover:border-[#26b6be]">
          <p>Was this article helps to you?</p>
          <div className="flex gap-3 items-center pt-1">
            <Image src={GithubIcon} alt="Github icon" width={30} height={30} />
            <p className="text-[#1ca3b7] font-semibold">Provide feedback</p>
          </div>
        </section>
      </Link>
    </div>
  );
}
