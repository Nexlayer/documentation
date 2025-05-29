"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Terminal,
  Copy,
  Code,
  Server,
  Database,
  Layers,
  Cpu,
  Brain,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
// Import custom logos
import { ExpressLogo } from "@/components/custom-logos/express-logo";
import { NeonLogo } from "@/components/custom-logos/neon-logo";
import { MistralLogo } from "@/components/custom-logos/mistral-logo";
import { DeepseekLogo } from "@/components/custom-logos/deepseek-logo";
import { NextJsLogo } from "@/components/custom-logos/nextjs-logo";
import { RemixLogo } from "@/components/custom-logos/remix-logo";
import { ReactLogo } from "@/components/custom-logos/react-logo";
import { VueLogo } from "@/components/custom-logos/vue-logo";
import { AngularLogo } from "@/components/custom-logos/angular-logo";
import { SvelteLogo } from "@/components/custom-logos/svelte-logo";
import { NodeJsLogo } from "@/components/custom-logos/nodejs-logo";
import { DjangoLogo } from "@/components/custom-logos/django-logo";
import { FastApiLogo } from "@/components/custom-logos/fastapi-logo";
import { FlaskLogo } from "@/components/custom-logos/flask-logo";
import { ClaudeLogo } from "@/components/custom-logos/claude-logo";
import GithubIcon from "@/components/assets/svgs/github.svg";

import "../../styles/yaml-highlighter.css";

// Tech stack options
const techOptions = {
  frontend: [
    {
      name: "Next.js",
      icon: "nextjs",
      description: "React framework with SSR & file-based routing",
    },
    {
      name: "Remix",
      icon: "remix",
      description: "React framework focused on web fundamentals",
    },
    {
      name: "React",
      icon: "react",
      description: "Popular UI library for building interfaces",
    },
    {
      name: "Angular",
      icon: "angular",
      description: "Platform for building mobile & desktop apps",
    },
    {
      name: "Vue",
      icon: "vue",
      description: "Progressive JavaScript framework",
    },
    {
      name: "Svelte",
      icon: "svelte",
      description: "Compiler-based framework with no virtual DOM",
    },
  ],
  backend: [
    {
      name: "Express",
      icon: "express",
      description: "Fast, unopinionated web framework for Node.js",
    },
    {
      name: "Node",
      icon: "node",
      description: "JavaScript runtime built on Chrome's V8 engine",
    },
    {
      name: "Django",
      icon: "django",
      description: "High-level Python web framework",
    },
    {
      name: "FastAPI",
      icon: "fastapi",
      description: "Modern, fast Python web framework",
    },
    {
      name: "Flask",
      icon: "flask",
      description: "Lightweight Python web framework",
    },
  ],
  database: [
    {
      name: "PostgreSQL",
      icon: "postgresql",
      description: "Powerful, open source object-relational database",
    },
    {
      name: "MySQL",
      icon: "mysql",
      description: "Popular open source relational database",
    },
    {
      name: "MongoDB",
      icon: "mongodb",
      description: "Document-oriented NoSQL database",
    },
    {
      name: "Neon",
      icon: "neon",
      description: "Serverless Postgres with branching",
    },
    {
      name: "SQLite",
      icon: "sqlite",
      description: "Self-contained, serverless SQL database",
    },
  ],
  orm: [
    {
      name: "Prisma",
      icon: "prisma",
      description: "Next-generation ORM for Node.js & TypeScript",
    },
    {
      name: "TypeORM",
      icon: "typeorm",
      description: "ORM for TypeScript & JavaScript",
    },
    {
      name: "Drizzle",
      icon: "drizzle",
      description: "Lightweight TypeScript ORM",
    },
    {
      name: "SQLAlchemy",
      icon: "sqlalchemy",
      description: "Python SQL toolkit and ORM",
    },
    {
      name: "Django ORM",
      icon: "django",
      description: "ORM included with Django framework",
    },
  ],
  cache: [
    {
      name: "Redis",
      icon: "redis",
      description: "In-memory data structure store",
    },
    {
      name: "Memcached",
      icon: "memcached",
      description: "High-performance, distributed memory cache",
    },
    { name: "Valkey", icon: "valkey", description: "Modern Redis alternative" },
    {
      name: "Dragonfly",
      icon: "dragonfly",
      description: "Modern in-memory datastore",
    },
    {
      name: "KeyDB",
      icon: "keydb",
      description: "High performance fork of Redis",
    },
  ],
  vector: [
    {
      name: "Pinecone",
      icon: "pinecone",
      description: "Vector database for similarity search",
    },
    {
      name: "Qdrant",
      icon: "qdrant",
      description: "Vector similarity search engine",
    },
    {
      name: "Milvus",
      icon: "milvus",
      description: "Open-source vector database",
    },
    {
      name: "Chroma",
      icon: "chroma",
      description: "AI-native open-source embedding database",
    },
    {
      name: "Weaviate",
      icon: "weaviate",
      description: "Vector search engine and knowledge graph",
    },
  ],
  ai: [
    {
      name: "PyTorch",
      icon: "pytorch",
      description: "Open source machine learning framework",
    },
    {
      name: "TensorFlow",
      icon: "tensorflow",
      description: "End-to-end ML platform",
    },
    {
      name: "Hugging Face",
      icon: "huggingface",
      description: "AI community & model hub",
    },
    {
      name: "OpenAI API",
      icon: "openai",
      description: "API for accessing OpenAI models",
    },
    {
      name: "LangChain",
      icon: "langchain",
      description: "Framework for LLM applications",
    },
    {
      name: "Ollama",
      icon: "ollama",
      description: "Run open-source LLMs locally",
    },
    {
      name: "Deepseek",
      icon: "deepseek",
      description: "Advanced AI models for code & text",
    },
    {
      name: "Claude",
      icon: "claude",
      description: "Anthropic's conversational AI assistant",
    },
    {
      name: "Mistral",
      icon: "mistral",
      description: "Open-source large language models",
    },
    {
      name: "Perplexity",
      icon: "perplexity",
      description: "AI-powered answer engine",
    },
  ],
};

// Category icons and titles
const categories = [
  { id: "frontend", title: "Frontend", icon: <Code className="h-5 w-5" /> },
  { id: "backend", title: "Backend", icon: <Server className="h-5 w-5" /> },
  { id: "database", title: "Database", icon: <Database className="h-5 w-5" /> },
  { id: "orm", title: "ORM", icon: <Layers className="h-5 w-5" /> },
  { id: "cache", title: "Cache", icon: <Zap className="h-5 w-5" /> },
  { id: "vector", title: "Vector DB", icon: <Cpu className="h-5 w-5" /> },
  { id: "ai", title: "AI", icon: <Brain className="h-5 w-5" /> },
];

// Helper function to format YAML with syntax highlighting
const formatYamlWithHighlighting = (yamlString: string) => {
  if (!yamlString) return null;

  // Split the YAML into lines
  const lines = yamlString.split("\n");

  return (
    <div className="yaml-highlighter">
      {lines.map((line, index) => {
        // Determine indentation level
        const indentMatch = line.match(/^(\s*)/);
        const indent = indentMatch ? indentMatch[0].length : 0;

        // Check if line is a comment
        if (line.trim().startsWith("#")) {
          return (
            <div key={index} className="yaml-line">
              <span className="line-numbers">{index + 1}</span>
              <span
                style={{ paddingLeft: `${indent * 0.5}rem` }}
                className="yaml-comment"
              >
                {line}
              </span>
            </div>
          );
        }

        // Check if line contains a key-value pair
        const keyValueMatch = line.match(/^(\s*)([^:]+):(.*)/);
        if (keyValueMatch) {
          const [, space, key, value] = keyValueMatch;
          return (
            <div key={index} className="yaml-line">
              <span className="line-numbers">{index + 1}</span>
              <span style={{ paddingLeft: `${indent * 0.5}rem` }}>
                <span className="yaml-key">{key.trim()}</span>
                <span className="yaml-colon">:</span>
                {value.includes('"') ? (
                  <span className="yaml-string">{value}</span>
                ) : value.includes("pod:") ? (
                  <span className="yaml-pod-reference">{value}</span>
                ) : value.trim().match(/^[0-9]+$/) ? (
                  <span className="yaml-number">{value}</span>
                ) : (
                  <span className="yaml-value">{value}</span>
                )}
              </span>
            </div>
          );
        }

        // Check if line is a list item
        if (line.trim().startsWith("-")) {
          const listItemMatch = line.match(/^(\s*)(-)(\s*)(.*)/);
          if (listItemMatch) {
            const [, space, dash, spaceAfter, content] = listItemMatch;
            return (
              <div key={index} className="yaml-line">
                <span className="line-numbers">{index + 1}</span>
                <span style={{ paddingLeft: `${indent * 0.5}rem` }}>
                  <span className="yaml-dash">{dash}</span>
                  <span> {content}</span>
                </span>
              </div>
            );
          }
        }

        // Default case for lines that don't match specific patterns
        return (
          <div key={index} className="yaml-line">
            <span className="line-numbers">{index + 1}</span>
            <span style={{ paddingLeft: `${indent * 0.5}rem` }}>{line}</span>
          </div>
        );
      })}
    </div>
  );
};

// Helper function to get the appropriate logo component
const getTechLogo = (techName) => {
  const logoMap = {
    // Frontend
    "Next.js": NextJsLogo,
    React: ReactLogo,
    Remix: RemixLogo,
    Angular: AngularLogo,
    Vue: VueLogo,
    Svelte: SvelteLogo,

    // Backend
    Express: ExpressLogo,
    Node: NodeJsLogo,
    Django: DjangoLogo,
    FastAPI: FastApiLogo,
    Flask: FlaskLogo,

    // Database
    PostgreSQL: null,
    MySQL: null,
    MongoDB: null,
    SQLite: null,
    Neon: NeonLogo,

    // ORM
    Prisma: null,
    TypeORM: null,
    Drizzle: null,
    SQLAlchemy: null,
    "Django ORM": null,

    // Cache
    Redis: null,
    Memcached: null,
    Valkey: null,
    Dragonfly: null,
    KeyDB: null,

    // Vector DB
    Pinecone: null,
    Qdrant: null,
    Milvus: null,
    Chroma: null,
    Weaviate: null,

    // AI
    PyTorch: null,
    TensorFlow: null,
    "Hugging Face": null,
    "OpenAI API": null,
    LangChain: null,
    Ollama: null,
    Deepseek: DeepseekLogo,
    Claude: ClaudeLogo,
    Mistral: MistralLogo,
    Perplexity: null,
  };

  return logoMap[techName];
};

export default function DeployPage() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    frontend: null,
    backend: null,
    database: null,
    orm: null,
    cache: null,
    vector: null,
    ai: null,
  });
  const [appName, setAppName] = useState("my-ai-app");
  const [generatedYaml, setGeneratedYaml] = useState("");
  const [deploymentUrl, setDeploymentUrl] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [activeCategory, setActiveCategory] = useState("frontend");

  // Generate YAML based on selections
  useEffect(() => {
    if (step === 3) {
      let yaml = `application:
  name: "${appName}" # Required: Globally unique app name
  pods:
`;

      // Add frontend if selected
      if (selections.frontend) {
        yaml += `    # 🖥️ ${selections.frontend} — Frontend UI
    - name: frontend
      image: "user-name/${selections.frontend.toLowerCase()}:latest" # Public image — Nexlayer pulls this from Docker Hub
      path: "/"
      servicePorts:
        - 3000
      vars:
        ${
          selections.backend
            ? `API_URL: "http://backend.pod:8000" # Service discovery`
            : ""
        }
`;
      }

      // Add backend if selected
      if (selections.backend) {
        yaml += `    # 🔄 ${selections.backend} — Backend API
    - name: backend
      image: "user-name/${selections.backend.toLowerCase()}:latest" # Public image — Nexlayer pulls this from Docker Hub
      path: "/api"
      servicePorts:
        - 8000
      vars:
        ${
          selections.database
            ? `DATABASE_URL: "postgresql://postgres:password@database.pod:5432/mydb" # Service discovery`
            : ""
        }
        ${
          selections.vector
            ? `VECTOR_DB_URL: "http://vectordb.pod:6333" # Service discovery`
            : ""
        }
        ${
          selections.ai
            ? `AI_API_KEY: "<% SECRET_AI_API_KEY %>" # Environment variable from Nexlayer`
            : ""
        }
`;
      }

      // Add database if selected
      if (selections.database) {
        yaml += `    # 💾 ${selections.database} — Primary database
    - name: database
      image: "${selections.database.toLowerCase()}:latest" # Public image — Nexlayer pulls this from Docker Hub
      servicePorts:
        - 5432
      vars:
        ${
          selections.database === "PostgreSQL"
            ? 'POSTGRES_USER: "postgres"\n        POSTGRES_PASSWORD: "password"\n        POSTGRES_DB: "mydb"'
            : selections.database === "MySQL"
            ? 'MYSQL_ROOT_PASSWORD: "password"\n        MYSQL_DATABASE: "mydb"'
            : selections.database === "MongoDB"
            ? 'MONGO_INITDB_ROOT_USERNAME: "mongo"\n        MONGO_INITDB_ROOT_PASSWORD: "password"'
            : selections.database === "Neon"
            ? 'NEON_DB_NAME: "mydb"\n        NEON_DB_USER: "postgres"\n        NEON_DB_PASSWORD: "password"'
            : ""
        }
      volumes:
        - name: db-data
          size: "5Gi"
`;
      }

      // Add vector database if selected
      if (selections.vector) {
        yaml += `    # 🧠 ${selections.vector} — Vector database for embeddings
    - name: vectordb
      image: "${selections.vector.toLowerCase()}:latest" # Public image — Nexlayer pulls this from Docker Hub
      servicePorts:
        - 6333
      volumes:
        - name: vector-data
          size: "10Gi"
`;
      }

      // Add cache if selected
      if (selections.cache) {
        yaml += `    # ⚡ ${selections.cache} — Caching layer
    - name: cache
      image: "${selections.cache.toLowerCase()}:latest" # Public image — Nexlayer pulls this from Docker Hub
      servicePorts:
        - 6379
      volumes:
        - name: cache-data
          size: "1Gi"
`;
      }

      // Add AI component if selected
      if (selections.ai) {
        yaml += `    # 🤖 ${selections.ai} — AI model
    - name: ai
      image: "user-name/${selections.ai.toLowerCase()}:latest" # Public image — Nexlayer pulls this from Docker Hub
      servicePorts:
        - 8080
      vars:
        ${
          selections.ai === "OpenAI API"
            ? 'OPENAI_API_KEY: "<% SECRET_OPENAI_API_KEY %>" # Environment variable from Nexlayer'
            : ""
        }
`;
      }

      setGeneratedYaml(yaml);
    }
  }, [step, selections, appName]);

  const handleDeploy = () => {
    setIsDeploying(true);
    // Simulate deployment
    setTimeout(() => {
      setDeploymentUrl(`https://fantastic-fox-${appName}.nexlayer.ai`);
      setIsDeploying(false);
      setStep(4);
    }, 3000);
  };

  const handleSelection = (category, option) => {
    setSelections((prev) => ({
      ...prev,
      [category]: option.name,
    }));

    // Auto-advance to next category
    const currentIndex = categories.findIndex((cat) => cat.id === category);
    if (currentIndex < categories.length - 1) {
      setActiveCategory(categories[currentIndex + 1].id);
    }
  };

  const getCompletedSteps = () => {
    let count = 0;
    Object.values(selections).forEach((val) => {
      if (val) count++;
    });
    return count;
  };

  const renderTechOption = (category, option) => {
    const isSelected = selections[category] === option.name;

    // Get the appropriate logo component
    const LogoComponent = getTechLogo(option.name);

    return (
      <motion.div
        key={option.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all",
          isSelected
            ? "border-[#22B4C8] bg-[#22B4C8]/10 shadow-md"
            : "border-[#333] bg-[#0a0a0a] hover:border-[#22B4C8]/50 hover:bg-[#111]"
        )}
        onClick={() => handleSelection(category, option)}
      >
        <div className="w-12 h-12 mb-3 flex items-center justify-center bg-[#111] rounded-full border border-[#333]">
          {LogoComponent ? (
            <div className="w-6 h-6">
              <LogoComponent />
            </div>
          ) : (
            <span className="text-[#22B4C8] text-xl font-bold">
              {option.name.charAt(0)}
            </span>
          )}
        </div>
        <h3 className="text-white font-medium mb-1">{option.name}</h3>
        <p className="text-gray-400 text-xs text-center">
          {option.description}
        </p>
        {isSelected && (
          <div className="absolute top-2 right-2 bg-[#22B4C8] rounded-full p-1">
            <Check className="h-3 w-3 text-black" />
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-[#22B4C8] mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-light mb-4 gradient-text">
            Deploy Your AI Application
          </h1>
          <div className="flex items-center">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    s === step
                      ? "bg-[#22B4C8] text-black"
                      : s < step
                      ? "bg-[#1D9FB2] text-white"
                      : "bg-[#222] text-gray-400"
                  }`}
                >
                  {s < step ? <Check className="h-4 w-4" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-20 h-0.5 ${
                      s < step ? "bg-[#1D9FB2]" : "bg-[#333]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl font-medium mb-4 text-white">
              1. Choose Your Tech Stack
            </h2>
            <p className="text-gray-300 mb-6">
              Select the technologies you want to use for your AI application.
              You can skip any category that doesn't apply.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all",
                    activeCategory === category.id
                      ? "bg-[#22B4C8] text-black"
                      : selections[category.id]
                      ? "bg-[#1D9FB2]/20 text-white border border-[#1D9FB2]"
                      : "bg-[#0a0a0a] text-gray-300 border border-[#333] hover:border-[#22B4C8]/50"
                  )}
                >
                  <div className="flex flex-col items-center">
                    {category.icon}
                    <span className="text-sm mt-1">{category.title}</span>
                    {selections[category.id] && (
                      <span className="text-xs mt-1 truncate max-w-[80px]">
                        {selections[category.id]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333] mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white flex items-center">
                  {categories.find((c) => c.id === activeCategory).icon}
                  <span className="ml-2">
                    {categories.find((c) => c.id === activeCategory).title}
                  </span>
                </h3>
                <div className="text-sm text-gray-400">
                  {selections[activeCategory]
                    ? "Selected: " + selections[activeCategory]
                    : "None selected"}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {techOptions[activeCategory].map((option) =>
                  renderTechOption(activeCategory, option)
                )}
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#0a0a0a] rounded-xl p-4 border border-[#333] mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#22B4C8]/20 flex items-center justify-center mr-3">
                  <Check className="h-5 w-5 text-[#22B4C8]" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Your selections</h3>
                  <p className="text-gray-400 text-sm">
                    {getCompletedSteps()} of {categories.length} categories
                    selected
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 max-w-md">
                {Object.entries(selections).map(([category, value]) =>
                  value ? (
                    <div
                      key={category}
                      className="bg-[#111] px-2 py-1 rounded text-xs flex items-center border border-[#333]"
                    >
                      <span className="text-[#22B4C8] mr-1">
                        {categories.find((c) => c.id === category).title}:
                      </span>
                      <span className="text-white">{value}</span>
                    </div>
                  ) : null
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center mb-10">
              <section className="text-sm font-normal flex justify-center">
                <div>
                  <p>Was this article helpful to you?</p>
                  <div className="flex gap-2 items-center pt-1">
                    <Image
                      src={GithubIcon}
                      alt="Github icon"
                      width={24}
                      height={24}
                    />
                    <Link
                      href="https://github.com/Nexlayer/documentation/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-[#1ca3b7] underline">
                        Provide feedback
                      </p>
                    </Link>
                  </div>
                </div>
              </section>
              <Button
                onClick={() => setStep(2)}
                className="bg-[#22B4C8] hover:bg-[#1DA3B6] text-black"
                disabled={getCompletedSteps() === 0}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl font-medium mb-4 text-white">
              2. Configure Your Application
            </h2>
            <p className="text-gray-300 mb-6">
              Provide a name for your application and configure any additional
              settings.
            </p>

            <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333] mb-6">
              <h3 className="text-lg font-medium mb-4 text-white">
                Application Settings
              </h3>

              <div className="mb-4">
                <label
                  htmlFor="appName"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Application Name
                </label>
                <input
                  type="text"
                  id="appName"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full bg-[#111] border border-[#333] rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#22B4C8] focus:border-[#22B4C8]"
                  placeholder="my-ai-app"
                />
                <p className="mt-1 text-xs text-gray-400">
                  This will be used as your application identifier and in the
                  deployment URL.
                </p>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333] mb-6">
              <h3 className="text-lg font-medium mb-4 text-white">
                Selected Stack
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-[#111] rounded-lg p-4 border border-[#333]"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#0a0a0a] flex items-center justify-center mr-2 border border-[#333]">
                        {category.icon}
                      </div>
                      <h4 className="text-white font-medium">
                        {category.title}
                      </h4>
                    </div>
                    {selections[category.id] ? (
                      <div className="flex items-center text-[#22B4C8]">
                        <Check className="h-4 w-4 mr-1" />
                        {selections[category.id]}
                      </div>
                    ) : (
                      <div className="text-gray-500 italic text-sm">
                        None selected
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="border-[#333] hover:border-[#22B4C8]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="bg-[#22B4C8] hover:bg-[#1DA3B6] text-black"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl font-medium mb-4 text-white">
              3. Review and Deploy
            </h2>
            <p className="text-gray-300 mb-6">
              Review your configuration and deploy your application to Nexlayer.
            </p>

            <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333] mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">
                  Generated YAML
                </h3>
              </div>

              <div className="bg-[#0a0a0a] rounded-lg font-mono text-sm overflow-x-auto border border-[#333] relative">
                {formatYamlWithHighlighting(generatedYaml)}
                <button
                  className="yaml-copy-button"
                  onClick={() => navigator.clipboard.writeText(generatedYaml)}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </button>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333] mb-6">
              <h3 className="text-lg font-medium mb-4 text-white">
                Deployment Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-[#222]">
                  <span className="text-gray-400">Application Name</span>
                  <span className="text-white font-medium">{appName}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-[#222]">
                  <span className="text-gray-400">Components</span>
                  <span className="text-white font-medium">
                    {getCompletedSteps()} selected
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-[#222]">
                  <span className="text-gray-400">
                    Estimated Deployment Time
                  </span>
                  <span className="text-white font-medium">~2 minutes</span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Preview Duration</span>
                  <span className="text-white font-medium">
                    2 hours (extendable)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="border-[#333] hover:border-[#22B4C8]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleDeploy}
                className="bg-[#22B4C8] hover:bg-[#1DA3B6] text-black"
                disabled={isDeploying}
              >
                {isDeploying ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <Terminal className="mr-2 h-4 w-4" />
                    Deploy Now
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl font-medium mb-4 text-white">
              4. Your Application is Live!
            </h2>
            <p className="text-gray-300 mb-6">
              Congratulations! Your AI application is now deployed and running
              on Nexlayer.
            </p>

            <div className="bg-[#0a0a0a] border border-[#1D9FB2] rounded-xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-[#1D9FB2] text-white flex items-center justify-center mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-[#22B4C8]">
                  Deployment Successful
                </h3>
              </div>

              <p className="text-[#22B4C8] mb-4">
                Your application is now available at:
              </p>

              <a
                href={deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#111] border border-[#1D9FB2] p-4 rounded-lg font-mono text-sm text-[#22B4C8] hover:bg-[#0a0a0a] transition-colors"
              >
                {deploymentUrl}
              </a>
            </div>

            <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
              <h3 className="text-lg font-medium mb-4 text-white">
                What's Next?
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22B4C8] text-black flex items-center justify-center mr-2 mt-0.5 text-xs">
                    1
                  </div>
                  <span>
                    Monitor your application's performance in the Nexlayer
                    dashboard
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22B4C8] text-black flex items-center justify-center mr-2 mt-0.5 text-xs">
                    2
                  </div>
                  <span>Set up a custom domain for your application</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22B4C8] text-black flex items-center justify-center mr-2 mt-0.5 text-xs">
                    3
                  </div>
                  <span>Configure CI/CD for automatic deployments</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => (window.location.href = "/")}
                className="bg-[#22B4C8] hover:bg-[#1DA3B6] text-black"
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
