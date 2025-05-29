import { Code, Server, Database, Layers, Cpu, Brain, Zap } from "lucide-react";

export const techOptions = {
  frontend: [
    {
      id: "nextjs",
      name: "Next.js",
      icon: "nextjs",
      description: "React framework with SSR & file-based routing",
    },
    // {
    //   id: "remix",
    //   name: "Remix",
    //   icon: "remix",
    //   description: "React framework focused on web fundamentals",
    // },
    {
      id: "react",
      name: "React",
      icon: "react",
      description: "Popular UI library for building interfaces",
    },
    {
      id: "angular",
      name: "Angular",
      icon: "angular",
      description: "Platform for building mobile & desktop apps",
    },
    {
      id: "vue",
      name: "Vue",
      icon: "vue",
      description: "Progressive JavaScript framework",
    },
    // {
    //   id: "svelte"
    //   name: "Svelte",
    //   icon: "svelte",
    //   description: "Compiler-based framework with no virtual DOM",
    // },
  ],
  backend: [
    {
      id: "express",
      name: "Express",
      icon: "express",
      description: "Fast, unopinionated web framework for Node.js",
    },
    {
      id: "node",
      name: "Node",
      icon: "node",
      description: "JavaScript runtime built on Chrome's V8 engine",
    },
    // {
    //   id: "django"
    //   name: "Django",
    //   icon: "django",
    //   description: "High-level Python web framework",
    // },
    {
      id: "fastapi",
      name: "FastAPI",
      icon: "fastapi",
      description: "Modern, fast Python web framework",
    },
    // {
    //   flask: "flask"
    //   name: "Flask",
    //   icon: "flask",
    //   description: "Lightweight Python web framework",
    // },
  ],
  database: [
    {
      id: "postgresql",
      name: "PostgreSQL",
      icon: "postgresql",
      description: "Powerful, open source object-relational database",
    },
    {
      id: "mysql",
      name: "MySQL",
      icon: "mysql",
      description: "Popular open source relational database",
    },
    {
      id: "mongodb",
      name: "MongoDB",
      icon: "mongodb",
      description: "Document-oriented NoSQL database",
    },
    {
      id: "neon",
      name: "Neo4j",
      icon: "neon",
      description: "Serverless Postgres with branching",
    },
    // {
    //   id: "sqlite"
    //   name: "SQLite",
    //   icon: "sqlite",
    //   description: "Self-contained, serverless SQL database",
    // },
  ],
  orm: [
    {
      id: "prisma",
      name: "Prisma",
      icon: "prisma",
      description: "Next-generation ORM for Node.js & TypeScript",
    },
    {
      id: "typeorm",
      name: "TypeORM",
      icon: "typeorm",
      description: "ORM for TypeScript & JavaScript",
    },
    {
      id: "drizzle",
      name: "Drizzle",
      icon: "drizzle",
      description: "Lightweight TypeScript ORM",
    },
    {
      id: "sqlalchemy",
      name: "SQLAlchemy",
      icon: "sqlalchemy",
      description: "Python SQL toolkit and ORM",
    },
    {
      id: "django",
      name: "Django ORM",
      icon: "django",
      description: "ORM included with Django framework",
    },
  ],
  cache: [
    {
      id: "redis",
      name: "Redis",
      icon: "redis",
      description: "In-memory data structure store",
    },
    {
      id: "memdached",
      name: "Memcached",
      icon: "memcached",
      description: "High-performance, distributed memory cache",
    },
    {
      id: "valkey",
      name: "Valkey",
      icon: "valkey",
      description: "Modern Redis alternative",
    },
    {
      id: "dragonfly",
      name: "Dragonfly",
      icon: "dragonfly",
      description: "Modern in-memory datastore",
    },
    {
      id: "keydb",
      name: "KeyDB",
      icon: "keydb",
      description: "High performance fork of Redis",
    },
  ],
  vector: [
    {
      id: "pinecone",
      name: "Pinecone",
      icon: "pinecone",
      description: "Vector database for similarity search",
    },
    {
      id: "qdrant",
      name: "Qdrant",
      icon: "qdrant",
      description: "Vector similarity search engine",
    },
    {
      id: "qdrant",
      name: "Milvus",
      icon: "milvus",
      description: "Open-source vector database",
    },
    {
      id: "chroma",
      name: "Chroma",
      icon: "chroma",
      description: "AI-native open-source embedding database",
    },
    {
      id: "weaviate",
      name: "Weaviate",
      icon: "weaviate",
      description: "Vector search engine and knowledge graph",
    },
  ],
  ai: [
    {
      id: "pytorch",
      name: "PyTorch",
      icon: "pytorch",
      description: "Open source machine learning framework",
    },
    {
      id: "tensorflow",
      name: "TensorFlow",
      icon: "tensorflow",
      description: "End-to-end ML platform",
    },
    {
      id: "huggingface",
      name: "Hugging Face",
      icon: "huggingface",
      description: "AI community & model hub",
    },
    {
      id: "openai",
      name: "OpenAI API",
      icon: "openai",
      description: "API for accessing OpenAI models",
    },
    {
      id: "langchain",
      name: "LangChain",
      icon: "langchain",
      description: "Framework for LLM applications",
    },
    {
      id: "ollama",
      name: "Ollama",
      icon: "ollama",
      description: "Run open-source LLMs locally",
    },
    {
      id: "deepseek",
      name: "Deepseek",
      icon: "deepseek",
      description: "Advanced AI models for code & text",
    },
    {
      id: "claude",
      name: "Claude",
      icon: "claude",
      description: "Anthropic's conversational AI assistant",
    },
    {
      id: "mistral",
      name: "Mistral",
      icon: "mistral",
      description: "Open-source large language models",
    },
    {
      id: "perplexity",
      name: "Perplexity",
      icon: "perplexity",
      description: "AI-powered answer engine",
    },
  ],
};

export const categories = [
  { id: "frontend", title: "Frontend", icon: <Code className="h-5 w-5" /> },
  { id: "backend", title: "Backend", icon: <Server className="h-5 w-5" /> },
  { id: "database", title: "Database", icon: <Database className="h-5 w-5" /> },
  { id: "orm", title: "ORM", icon: <Layers className="h-5 w-5" /> },
  { id: "cache", title: "Cache", icon: <Zap className="h-5 w-5" /> },
  { id: "vector", title: "Vector DB", icon: <Cpu className="h-5 w-5" /> },
  { id: "ai", title: "AI", icon: <Brain className="h-5 w-5" /> },
];
