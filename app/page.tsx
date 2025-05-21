"use client"

import { Button } from "@/components/ui/button"
import { Terminal, Cloud, Code, Zap, Copy, MessageSquare } from "lucide-react"
import FeatureCard from "../components/feature-card"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Home() {
  const [copiedCommand, setCopiedCommand] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(text)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const handleCopy = () => {
    copyToClipboard("page content")
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          <div className="flex justify-between items-start mb-8">
            <p className="text-[#22B4C8] text-lg font-medium">Getting Started</p>
            <div className="relative">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#111] text-gray-300 border border-[#333] hover:bg-[#222] transition-colors"
              >
                <Copy className="h-4 w-4" />
                <span>{copiedCommand ? "Copied!" : "Copy page"}</span>
              </button>
            </div>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Quickstart</h1>
            <p className="text-xl text-gray-400 mb-8">Deploy your AI-powered product in minutes</p>

            <div className="space-y-8 text-gray-300">
              <p className="text-lg">
                This quickstart guide will walk you through the process of setting up and deploying your application in
                just a few minutes.
              </p>

              <p className="text-lg">
                By the end of this guide, you'll have your product live to share with the world.
              </p>

              <div className="bg-[#111] border border-[#333] rounded-lg p-6 my-8">
                <div className="flex items-start gap-3">
                  <div className="bg-[#333] rounded-full p-1 mt-1">
                    <span className="text-white text-sm">ℹ️</span>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Prerequisites:</p>
                    <p>
                      Before you begin:- ✅ Make sure{" "}
                      <a
                        href="https://www.docker.com/products/docker-desktop/"
                        className="underline text-[#22B4C8]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Docker Desktop
                      </a>{" "}
                      is <strong>installed</strong> and <strong>running</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4 gradient-text">From Hello World to Production in 4 Steps</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI-native cloud platform handles everything automatically, so you can focus on shipping delightful
              products users love.
            </p>
          </div>

          <div className="space-y-20 max-w-5xl mx-auto">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl font-medium mb-2 text-white"
                >
                  Step 1 — Deploy Your Frontend
                </motion.h3>
                <p className="text-sm text-[#22B4C8] mb-3">Tech: Next.js 15 + Tailwind + App Router</p>
                <p className="text-gray-300 mb-4">
                  Start with a modern frontend. Deploy your static or server-rendered Next.js site in seconds.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 255, 204, 0.1)" }}
                className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-300">Simple web pod YAML snippet</p>
                  <div className="flex space-x-2">
                    <button className="text-xs bg-[#222] text-gray-300 px-2 py-1 rounded hover:bg-[#333] transition-colors">
                      Copy
                    </button>
                    <button className="text-xs bg-[#222] text-gray-300 px-2 py-1 rounded hover:bg-[#333] transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
                <div className="bg-[#0a0a0a] text-[#d4d4d4] p-4 rounded-lg text-sm overflow-x-auto font-mono">
                  <div className="flex">
                    <span className="text-[#569cd6] mr-2">application:</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#9cdcfe] mr-2">name:</span>
                    <span className="text-[#ce9178]">"nexlayer-app"</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#9cdcfe] mr-2">pods:</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#d7ba7d] mr-2">-</span>
                    <span className="text-[#9cdcfe] mr-2">name:</span>
                    <span className="text-[#22B4C8]">prisma</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#9cdcfe] mr-2">image:</span>
                    <span className="text-[#ce9178]">"user-name/prisma:latest"</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#9cdcfe] mr-2">servicePorts:</span>
                  </div>
                  <div className="flex pl-12">
                    <span className="text-[#d7ba7d] mr-2">-</span>
                    <span className="text-[#b5cea8]">3000</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#9cdcfe] mr-2">vars:</span>
                  </div>
                  <div className="flex pl-12">
                    <span className="text-[#9cdcfe] mr-2">DATABASE_URL:</span>
                    <span className="text-[#22B4C8]">"postgresql://user:pass@db.pod:5432/mydb"</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl font-medium mb-2 text-white"
                >
                  Step 2 — Add Auth + Database
                </motion.h3>
                <p className="text-sm text-[#22B4C8] mb-3">Tech: Supabase (Auth + PostgreSQL)</p>
                <p className="text-gray-300 mb-4">
                  Add real users and persistent data using Supabase. Easily store accounts, profiles, and content.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 255, 204, 0.1)" }}
                className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-300">Add second pod for db, plus vars and secrets</p>
                  <div className="flex space-x-2">
                    <button className="text-xs bg-[#222] text-gray-300 px-2 py-1 rounded hover:bg-[#333] transition-colors">
                      Copy
                    </button>
                    <button className="text-xs bg-[#222] text-gray-300 px-2 py-1 rounded hover:bg-[#333] transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
                <div className="bg-[#0a0a0a] text-[#d4d4d4] p-4 rounded-lg text-sm overflow-x-auto font-mono">
                  <div className="flex">
                    <span className="text-[#569cd6] mr-2">pods:</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#d7ba7d] mr-2">-</span>
                    <span className="text-[#9cdcfe] mr-2">name:</span>
                    <span className="text-[#22B4C8]">db</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#9cdcfe] mr-2">image:</span>
                    <span className="text-[#ce9178]">"postgres:14"</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#9cdcfe] mr-2">servicePorts:</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#d7ba7d] mr-2">-</span>
                    <span className="text-[#b5cea8]">5432</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#9cdcfe] mr-2">vars:</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#9cdcfe] mr-2">POSTGRES_USER:</span>
                    <span className="text-[#22B4C8]">user</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#9cdcfe] mr-2">POSTGRES_PASSWORD:</span>
                    <span className="text-[#22B4C8]">pass</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#9cdcfe] mr-2">POSTGRES_DB:</span>
                    <span className="text-[#22B4C8]">appdb</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl font-medium mb-2 text-white"
                >
                  Step 3 — Use Prisma for Data Logic
                </motion.h3>
                <p className="text-sm text-[#22B4C8] mb-3">Tech: Prisma ORM</p>
                <p className="text-gray-300 mb-4">
                  Auto-generate your API with Prisma and define your database schema using elegant TypeScript models.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 255, 204, 0.1)" }}
                className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-300">New backend pod + volume + env for database</p>
                  <div className="flex space-x-2">
                    <button className="text-xs bg-[#222] text-gray-300 px-2 py-1 rounded hover:bg-[#333] transition-colors">
                      Copy
                    </button>
                    <button className="text-xs bg-[#222] text-gray-300 px-2 py-1 rounded hover:bg-[#333] transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
                <div className="bg-[#0a0a0a] text-[#d4d4d4] p-4 rounded-lg text-sm overflow-x-auto font-mono">
                  <div className="flex">
                    <span className="text-[#569cd6] mr-2">pods:</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#d7ba7d] mr-2">-</span>
                    <span className="text-[#9cdcfe] mr-2">name:</span>
                    <span className="text-[#22B4C8]">api</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#9cdcfe] mr-2">image:</span>
                    <span className="text-[#ce9178]">"ttl.sh/my-backend:1h"</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#9cdcfe] mr-2">path:</span>
                    <span className="text-[#ce9178]">/api</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#9cdcfe] mr-2">servicePorts:</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#d7ba7d] mr-2">-</span>
                    <span className="text-[#b5cea8]">4000</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#9cdcfe] mr-2">vars:</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#9cdcfe] mr-2">DATABASE_URL:</span>
                    <span className="text-[#22B4C8]">"postgresql://user:pass@db.pod:5432/appdb"</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl font-medium mb-2 text-white"
                >
                  Step 4 — Plug in OpenAI
                </motion.h3>
                <p className="text-sm text-[#22B4C8] mb-3">Tech: OpenAI API</p>
                <p className="text-gray-300 mb-4">
                  Let your users ask questions, summarize notes, or chat with their data — right inside your app.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 255, 204, 0.1)" }}
                className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-300">Add secret mount + env var for API key</p>
                  <div className="flex space-x-2">
                    <button className="text-xs bg-[#222] text-gray-300 px-2 py-1 rounded hover:bg-[#333] transition-colors">
                      Copy
                    </button>
                    <button className="text-xs bg-[#222] text-gray-300 px-2 py-1 rounded hover:bg-[#333] transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
                <div className="bg-[#0a0a0a] text-[#d4d4d4] p-4 rounded-lg text-sm overflow-x-auto font-mono">
                  <div className="flex pl-4">
                    <span className="text-gray-500"># 🤖 OpenAI API wrapper (proxy or backend integration)</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#d7ba7d] mr-2">-</span>
                    <span className="text-[#9cdcfe] mr-2">name:</span>
                    <span className="text-[#22B4C8]">openai</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#9cdcfe] mr-2">image:</span>
                    <span className="text-[#ce9178]">"user-name/openai:latest"</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#9cdcfe] mr-2">servicePorts:</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#d7ba7d] mr-2">-</span>
                    <span className="text-[#b5cea8]">3000</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#9cdcfe] mr-2">vars:</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#9cdcfe] mr-2">OPENAI_API_KEY_PATH:</span>
                    <span className="text-[#22B4C8]">"/var/secrets/openai/key.txt"</span>
                  </div>
                  <div className="flex pl-4">
                    <span className="text-[#9cdcfe] mr-2">secrets:</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#d7ba7d] mr-2">-</span>
                    <span className="text-[#9cdcfe] mr-2">name:</span>
                    <span className="text-[#22B4C8]">openai-key</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#9cdcfe] mr-2">data:</span>
                    <span className="text-[#22B4C8]">sk-......</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#9cdcfe] mr-2">mountPath:</span>
                    <span className="text-[#22B4C8]">"/var/secrets/openai"</span>
                  </div>
                  <div className="flex pl-8">
                    <span className="text-[#9cdcfe] mr-2">fileName:</span>
                    <span className="text-[#22B4C8]">key.txt</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA after steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#0a0a0a] rounded-xl p-10 text-center border border-[#333]"
            >
              <h3 className="text-2xl font-medium mb-6 text-white">Try This Stack</h3>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-[#22B4C8] hover:bg-[#1DA3B6] text-black px-8 py-6 rounded-full text-lg mb-4">
                  Try the playground
                </Button>
              </motion.div>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Prebuilt: Next.js frontend, Supabase auth, PostgreSQL DB, Prisma backend, and OpenAI agent — all live in
                minutes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4 gradient-text">Why Developers Love Nexlayer</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built for developers who want to ship faster, scale effortlessly, and skip the DevOps headaches.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Terminal className="h-8 w-8 text-[#22B4C8]" />}
              title="Zero DevOps"
              description="Write YAML, deploy, done. No infrastructure setup or configuration required."
            />
            <FeatureCard
              icon={<Cloud className="h-8 w-8 text-[#22B4C8]" />}
              title="Auto-Scaling"
              description="Handles traffic spikes automatically without any manual intervention."
            />
            <FeatureCard
              icon={<Code className="h-8 w-8 text-[#22B4C8]" />}
              title="Stack-Agnostic"
              description="Works with any tech stack, framework, or language. No vendor lock-in."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-[#22B4C8]" />}
              title="AI & ML Ready"
              description="Deploy AI models with zero friction. Built for modern AI applications."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0a0a0a] border-t border-[#333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light mb-6 gradient-text">Ready to simplify your deployment?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of developers who are shipping faster with Nexlayer.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-[#22B4C8] hover:bg-[#1DA3B6] text-black px-8 py-6 rounded-full text-lg">
              Get Started for Free
            </Button>
            <Button
              variant="outline"
              className="border-[#22B4C8] text-white hover:bg-[#111] hover:text-[#22B4C8] px-8 py-6 rounded-full text-lg"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Send Feedback
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
