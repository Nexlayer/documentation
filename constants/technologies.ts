export type TechCategory = "frontend" | "backend" | "database" | "orm" | "cache" | "vector" | "ai"

export interface Technology {
  id: string
  name: string
  category: TechCategory
  image: string
  path?: string
  servicePorts: number[]
  vars?: Record<string, string>
  volumes?: {
    name: string
    size: string
    mountPath: string
  }[]
  secrets?: {
    name: string
    data: string
    mountPath: string
    fileName?: string
  }[]
  description?: string
  comment?: string
  aliases?: string[]
}

export interface ValidationError {
  path: string
  message: string
  severity: "error" | "warning" | "info"
}

export const technologies: Record<string, Technology> = {
  nextjs: {
    id: "nextjs",
    name: "nextjs",
    category: "frontend",
    image: "nexlayerplatform/hello-world-nextjs:latest",
    path: "/",
    servicePorts: [80],
    description: "Next.js frontend served on port 80 via nginx",
    comment: "# 🚀 Frontend built with Next.js (port 80 via nginx) — publicly accessible",
    aliases: ["next.js", "next js", "next"],
  },
  // remix: {
  //   id: "remix",
  //   name: "remix",
  //   category: "frontend",
  //   image: "user-name/remix:latest",
  //   path: "/",
  //   servicePorts: [3000],
  //   vars: {
  //     API_URL: "http://backend.pod:8000",
  //   },
  //   description: "Remix frontend served on port 3000",
  //   comment: "# 🚀 Frontend built with Remix (port 3000) — publicly accessible",
  //   aliases: ["remix.run", "remix run"],
  // },
  react: {
    id: "react",
    name: "react",
    category: "frontend",
    image: "nexlayerplatform/pern-react-todo:v0.01",
    path: "/",
    servicePorts: [80],
    vars: {
      EXPRESS_URL: "http://express.pod:3000",
    },
    description: "React frontend served on port 80 via nginx",
    comment: "# 🚀 Frontend built with React (port 80 via nginx) — publicly accessible",
    aliases: ["react.js", "reactjs"],
  },
  angular: {
    id: "angular",
    name: "angular",
    category: "frontend",
    image: "nexlayerplatform/mnfa-angular-user-store:v0.01",
    path: "/",
    servicePorts: [80],
    vars: {
      FASTAPI_URL: "http://fastapi.pod:8080",
    },
    description: "Angular frontend served on port 80 via nginx",
    comment: "# 🚀 Frontend built with Angular (port 80 via nginx) — publicly accessible",
    aliases: ["angular.js", "angularjs"],
  },
  vue: {
    id: "vue",
    name: "vue",
    category: "frontend",
    image: "nexlayerplatform/mevn-vue-todo:v0.01",
    path: "/",
    servicePorts: [80],
    vars: {
      EXPRESS_URL: "http://node.pod:3000",
    },
    description: "Vue frontend served on port 80 via nginx",
    comment: "# 🚀 Frontend built with Vue (port 80 via nginx) — publicly accessible",
    aliases: ["vue.js", "vuejs"],
  },
  // svelte: {
  //   id: "svelte",
  //   name: "svelte",
  //   category: "frontend",
  //   image: "user-name/svelte:latest",
  //   path: "/",
  //   servicePorts: [5173],
  //   vars: {
  //     API_URL: "http://backend.pod:8000",
  //   },
  //   description: "Svelte frontend served on port 5173",
  //   comment: "# 🚀 Frontend built with Svelte (port 5173) — publicly accessible",
  //   aliases: [],
  // },

  // Backend technologies
  express: {
    id: "express",
    name: "express",
    category: "backend",
    image: "nexlayerplatform/pern-express-todo:v0.01",
    servicePorts: [3000],
    vars: {
      POSTGRES_USERNAME: "postgres",
      POSTGRES_PASSWORD: "wT8#pL2v!sQ9@dX4",
      POSTGRES_DB: "store",
      POSTGRES_HOST: "postgres.pod"
    },
    description: "Express.js backend API served on port 3000",
    comment: "# 🔌 Backend API built with Express.js (port 3000) — connects to PostgreSQL database",
  },
  node: {
    id: "node",
    name: "node",
    category: "backend",
    image: "nexlayerplatform/mevn-express-todo:v0.01",
    servicePorts: [3000],
    vars: {
      MONGO_URL: "mongodb://admin:T9m!eR7q@vX2$zLp@mongodb.pod:27017/store",
    },
    description: "Node.js backend API served on port 3000",
    comment: "# 🔌 Backend API built with Node.js (port 3000) — connects to database",
    aliases: ["node.js", "nodejs"],
  },
  // django: {
  //   id: "django",
  //   name: "django",
  //   category: "backend",
  //   image: "user-name/django:latest",
  //   servicePorts: [8000],
  //   vars: {
  //     DATABASE_URL: "postgresql://postgres:wT8#pL2v!sQ9@dX4@database.pod:5432/store",
  //   },
  //   description: "Django backend API served on port 8000",
  //   comment: "# 🔌 Backend API built with Django (port 8000) — connects to database",
  // },
  fastapi: {
    id: "fastapi",
    name: "fastapi",
    category: "backend",
    image: "nexlayerplatform/mnfa-fastapi-user-store:v0.01",
    servicePorts: [8080],
    vars: {
      MONGO_URL: "mongodb://admin:T9m!eR7q@vX2$zLp@mongodb.pod:27017",
      MONGO_DB: "store",
      NEO4J_URL: "neo4j://neo4j.pod:7687",
      NEO4J_USERNAME: "neo4j",
      NEO4J_PASSWORD: "r5t#yTRs!sQ9@dX4"
    },
    description: "FastAPI backend API served on port 8000",
    comment: "# 🔌 Backend API built with FastAPI (port 8000) — connects to database",
    aliases: ["fast api"],
  },
  // flask: {
  //   id: "flask",
  //   name: "flask",
  //   category: "backend",
  //   image: "user-name/flask:latest",
  //   servicePorts: [5000],
  //   vars: {
  //     DATABASE_URL: "postgresql://postgres:wT8#pL2v!sQ9@dX4@database.pod:5432/store",
  //   },
  //   description: "Flask backend API served on port 5000",
  //   comment: "# 🔌 Backend API built with Flask (port 5000) — connects to database",
  //   aliases: [],
  // },

  // Database technologies
  postgres: {
    id: "postgres",
    name: "postgres",
    category: "database",
    image: "nexlayerplatform/pern-postgres-todo:v0.01",
    servicePorts: [5432],
    vars: {
      POSTGRES_USER: "postgres",
      POSTGRES_PASSWORD: "wT8#pL2v!sQ9@dX4",
      POSTGRES_DB: "store",
      PGDATA: "/var/lib/postgresql/data",
    },
    volumes: [
      {
        name: "postgres-data",
        size: "1Gi",
        mountPath: "/var/lib/postgresql",
      },
    ],
    description: "PostgreSQL database with persistent storage",
    comment: "# 🗄️ Postgres database (port 5432) with 1Gi persistent volume",
    aliases: ["postgresql", "postgre sql", "postgre-sql"],
  },
  mysql: {
    id: "mysql",
    name: "mysql",
    category: "database",
    image: "mysql:9.3",
    servicePorts: [3306],
    vars: {
      MYSQL_ROOT_PASSWORD: "jY3$mK6r!xP1#bZ7",
      MYSQL_DATABASE: "mydb",
      MYSQL_USER: "admin",
      MYSQL_PASSWORD: "xZ2!kP9w@bN5#gT3"
    },
    volumes: [
      {
        name: "mysql-data",
        size: "1Gi",
        mountPath: "/var/lib/mysql",
      },
    ],
    description: "MySQL database with persistent storage",
    comment: "# 🗄️ MySQL database (port 3306) with 1Gi persistent volume",
  },
  mongodb: {
    id: "mongodb",
    name: "mongodb",
    category: "database",
    image: "nexlayerplatform/mongo:latest",
    servicePorts: [27017],
    vars: {
      MONGO_INITDB_ROOT_USERNAME: "admin",
      MONGO_INITDB_ROOT_PASSWORD: "T9m!eR7q@vX2$zLp",
      MONGO_INITDB_DATABASE: "store",
    },
    volumes: [
      {
        name: "mongo-data",
        size: "1Gi",
        mountPath: "/data/db",
      },
    ],
    description: "MongoDB database with persistent storage",
    comment: "# 🗄️ MongoDB database (port 27017) with 1Gi persistent volume",
  },
  neo4j: {
    id: "neo4j",
    name: "neo4j",
    category: "database",
    image: "neo4j:5.23.0",
    servicePorts: [7474, 7687],
    vars: {
      NEO4J_AUTH: "neo4j/r5t#yTRs!sQ9@dX4"
    },
    volumes: [
      {
        name: "neo4j-data",
        size: "1Gi",
        mountPath: "/data",
      },
    ],
    description: "Neo4j graph database with persistent storage",
    comment: "# 🗄️ Neo4j graph database (ports 7474 and 7687) with 1Gi persistent volume",
  },
  // neon: {
  //   id: "neon",
  //   name: "neon",
  //   category: "database",
  //   image: "user-name/neon:latest",
  //   servicePorts: [5432],
  //   vars: {
  //     NEON_PROJECT_ID: "<% SECRET_NEON_PROJECT_ID %>",
  //     NEON_API_KEY: "<% SECRET_NEON_API_KEY %>",
  //   },
  //   description: "Neon serverless Postgres database",
  //   comment: "# 🗄️ Neon serverless Postgres database (port 5432) — requires API key",
  // },
  // sqlite: {
  //   id: "sqlite",
  //   name: "sqlite",
  //   category: "database",
  //   image: "alpine/sqlite:3.48.0",
  //   servicePorts: [],
  //   vars: {},
  //   volumes: [
  //     {
  //       name: "sqlite-data",
  //       size: "1Gi",
  //       mountPath: "/data",
  //     },
  //   ],
  //   description: "SQLite database with persistent storage",
  //   comment: "# 🗄️ SQLite database with 1Gi persistent volume — lightweight and portable",
  // },

  // ORM technologies
  prisma: {
    id: "prisma",
    name: "prisma",
    category: "orm",
    image: "user-name/prisma:latest",
    servicePorts: [],
    vars: {
      DATABASE_URL: "postgresql://postgres:password@database.pod:5432/mydb",
    },
    description: "Prisma ORM for database access",
    comment: "# 🔄 Prisma ORM — type-safe database access layer",
  },
  typeorm: {
    id: "typeorm",
    name: "typeorm",
    category: "orm",
    image: "user-name/typeorm:latest",
    servicePorts: [],
    vars: {
      DATABASE_URL: "postgresql://postgres:password@database.pod:5432/mydb",
    },
    description: "TypeORM for database access",
    comment: "# 🔄 TypeORM — object-relational mapping for TypeScript",
  },
  drizzle: {
    id: "drizzle",
    name: "drizzle",
    category: "orm",
    image: "user-name/drizzle:latest",
    servicePorts: [],
    vars: {
      DATABASE_URL: "postgresql://postgres:password@database.pod:5432/mydb",
    },
    description: "Drizzle ORM for database access",
    comment: "# 🔄 Drizzle ORM — lightweight TypeScript ORM",
  },
  sqlalchemy: {
    id: "sqlalchemy",
    name: "sqlalchemy",
    category: "orm",
    image: "user-name/sqlalchemy:latest",
    servicePorts: [],
    vars: {
      DATABASE_URL: "postgresql://postgres:password@database.pod:5432/mydb",
    },
    description: "SQLAlchemy ORM for Python database access",
    comment: "# 🔄 SQLAlchemy — Python SQL toolkit and ORM",
  },
  djangoorm: {
    id: "djangoorm",
    name: "django orm",
    category: "orm",
    image: "user-name/djangoorm:latest",
    servicePorts: [],
    vars: {
      DATABASE_URL: "postgresql://postgres:password@database.pod:5432/mydb",
    },
    description: "Django ORM for database access",
    comment: "# 🔄 Django ORM — integrated database access layer",
  },

  // Cache technologies
  redis: {
    id: "redis",
    name: "redis",
    category: "cache",
    image: "user-name/redis:latest",
    servicePorts: [6379],
    vars: {},
    volumes: [
      {
        name: "redis-data",
        size: "1Gi",
        mountPath: "/data",
      },
    ],
    description: "Redis in-memory data store",
    comment: "# 💾 Redis in-memory data store (port 6379) — for caching and pub/sub",
  },
  memcached: {
    id: "memcached",
    name: "memcached",
    category: "cache",
    image: "user-name/memcached:latest",
    servicePorts: [11211],
    vars: {},
    description: "Memcached distributed memory caching",
    comment: "# 💾 Memcached distributed memory caching (port 11211)",
  },
  valkey: {
    id: "valkey",
    name: "valkey",
    category: "cache",
    image: "user-name/valkey:latest",
    servicePorts: [6379],
    vars: {},
    volumes: [
      {
        name: "valkey-data",
        size: "1Gi",
        mountPath: "/data",
      },
    ],
    description: "Valkey in-memory data store",
    comment: "# 💾 Valkey in-memory data store (port 6379) — Redis-compatible",
  },
  dragonfly: {
    id: "dragonfly",
    name: "dragonfly",
    category: "cache",
    image: "user-name/dragonfly:latest",
    servicePorts: [6379],
    vars: {},
    volumes: [
      {
        name: "dragonfly-data",
        size: "1Gi",
        mountPath: "/data",
      },
    ],
    description: "Dragonfly in-memory data store",
    comment: "# 💾 Dragonfly in-memory data store (port 6379) — high-performance Redis alternative",
  },
  keydb: {
    id: "keydb",
    name: "keydb",
    category: "cache",
    image: "user-name/keydb:latest",
    servicePorts: [6379],
    vars: {},
    volumes: [
      {
        name: "keydb-data",
        size: "1Gi",
        mountPath: "/data",
      },
    ],
    description: "KeyDB in-memory data store",
    comment: "# 💾 KeyDB in-memory data store (port 6379) — multithreaded Redis alternative",
  },

  // Vector technologies
  pinecone: {
    id: "pinecone",
    name: "pinecone",
    category: "vector",
    image: "user-name/pinecone:latest",
    servicePorts: [8080],
    vars: {
      PINECONE_API_KEY: "<% SECRET_PINECONE_API_KEY %>",
    },
    description: "Pinecone vector database",
    comment: "# 🧠 Pinecone vector database (port 8080) — for similarity search",
  },
  qdrant: {
    id: "qdrant",
    name: "qdrant",
    category: "vector",
    image: "user-name/qdrant:latest",
    servicePorts: [6333],
    vars: {},
    volumes: [
      {
        name: "qdrant-data",
        size: "5Gi",
        mountPath: "/qdrant/storage",
      },
    ],
    description: "Qdrant vector database with persistent storage",
    comment: "# 🧠 Qdrant vector database (port 6333) — for similarity search with 5Gi storage",
  },
  milvus: {
    id: "milvus",
    name: "milvus",
    category: "vector",
    image: "user-name/milvus:latest",
    servicePorts: [19530],
    vars: {},
    volumes: [
      {
        name: "milvus-data",
        size: "5Gi",
        mountPath: "/var/lib/milvus",
      },
    ],
    description: "Milvus vector database with persistent storage",
    comment: "# 🧠 Milvus vector database (port 19530) — for similarity search with 5Gi storage",
  },
  chroma: {
    id: "chroma",
    name: "chroma",
    category: "vector",
    image: "user-name/chroma:latest",
    servicePorts: [8000],
    vars: {},
    volumes: [
      {
        name: "chroma-data",
        size: "5Gi",
        mountPath: "/chroma/data",
      },
    ],
    description: "Chroma vector database with persistent storage",
    comment: "# 🧠 Chroma vector database (port 8000) — for similarity search with 5Gi storage",
  },
  weaviate: {
    id: "weaviate",
    name: "weaviate",
    category: "vector",
    image: "user-name/weaviate:latest",
    servicePorts: [8080],
    vars: {},
    volumes: [
      {
        name: "weaviate-data",
        size: "5Gi",
        mountPath: "/var/lib/weaviate",
      },
    ],
    description: "Weaviate vector database with persistent storage",
    comment: "# 🧠 Weaviate vector database (port 8080) — for similarity search with 5Gi storage",
  },

  // AI technologies
  pytorch: {
    id: "pytorch",
    name: "pytorch",
    category: "ai",
    image: "user-name/pytorch:latest",
    servicePorts: [5000],
    vars: {
      MODEL_PATH: "/models",
    },
    volumes: [
      {
        name: "model-storage",
        size: "5Gi",
        mountPath: "/models",
      },
    ],
    description: "PyTorch AI framework with model storage",
    comment: "# 🤖 PyTorch AI framework (port 5000) — with 5Gi model storage",
  },
  tensorflow: {
    id: "tensorflow",
    name: "tensorflow",
    category: "ai",
    image: "user-name/tensorflow:latest",
    servicePorts: [5000],
    vars: {
      MODEL_PATH: "/models",
    },
    volumes: [
      {
        name: "model-storage",
        size: "5Gi",
        mountPath: "/models",
      },
    ],
    description: "TensorFlow AI framework with model storage",
    comment: "# 🤖 TensorFlow AI framework (port 5000) — with 5Gi model storage",
  },
  huggingface: {
    id: "huggingface",
    name: "hugging face transformers",
    category: "ai",
    image: "user-name/huggingface:latest",
    servicePorts: [8000],
    vars: {
      HF_TOKEN: "<% SECRET_HF_TOKEN %>",
      MODEL_PATH: "/models",
    },
    volumes: [
      {
        name: "hf-model-storage",
        size: "10Gi",
        mountPath: "/models",
      },
    ],
    description: "Hugging Face Transformers with model storage",
    comment: "# 🤖 Hugging Face Transformers (port 8000) — with 10Gi model storage",
  },
  openai: {
    id: "openai",
    name: "openai api",
    category: "ai",
    image: "user-name/openai:latest",
    servicePorts: [3000],
    vars: {
      OPENAI_API_KEY: "<% SECRET_OPENAI_API_KEY %>",
    },
    description: "OpenAI API integration",
    comment: "# 🤖 OpenAI API integration (port 3000) — requires API key",
  },
  langchain: {
    id: "langchain",
    name: "langchain",
    category: "ai",
    image: "user-name/langchain:latest",
    servicePorts: [8000],
    vars: {
      OPENAI_API_KEY: "<% SECRET_OPENAI_API_KEY %>",
      LANGCHAIN_API_KEY: "<% SECRET_LANGCHAIN_API_KEY %>",
      MODEL_PATH: "/models",
    },
    volumes: [
      {
        name: "langchain-data",
        size: "5Gi",
        mountPath: "/models",
      },
    ],
    description: "LangChain AI framework with model storage",
    comment: "# 🤖 LangChain AI framework (port 8000) — with 5Gi model storage",
  },
  ollama: {
    id: "ollama",
    name: "ollama",
    category: "ai",
    image: "user-name/ollama:latest",
    servicePorts: [11434],
    vars: {
      MODEL_NAME: "llama3",
      OLLAMA_HOST: "0.0.0.0",
      OLLAMA_PORT: "11434",
    },
    volumes: [
      {
        name: "ollama-models",
        size: "10Gi",
        mountPath: "/root/.ollama",
      },
    ],
    description: "Ollama for running local AI models",
    comment: "# 🤖 Ollama for running local AI models (port 11434) — with 10Gi model storage",
  },
  deepseek: {
    id: "deepseek",
    name: "deepseek 1",
    category: "ai",
    image: "user-name/deepseek:latest",
    servicePorts: [8000],
    vars: {
      DEEPSEEK_API_KEY: "<% SECRET_DEEPSEEK_API_KEY %>",
      MODEL_NAME: "deepseek-1-chat",
    },
    description: "Deepseek AI model integration",
    comment: "# 🤖 Deepseek AI model integration (port 8000) — requires API key",
  },
  claude: {
    id: "claude",
    name: "claude",
    category: "ai",
    image: "user-name/claude:latest",
    servicePorts: [3000],
    vars: {
      ANTHROPIC_API_KEY: "<% SECRET_ANTHROPIC_API_KEY %>",
      MODEL_NAME: "claude-3-opus",
    },
    description: "Claude AI model integration",
    comment: "# 🤖 Claude AI model integration (port 3000) — requires Anthropic API key",
  },
  mistral: {
    id: "mistral",
    name: "mistral",
    category: "ai",
    image: "user-name/mistral:latest",
    servicePorts: [8000],
    vars: {
      MISTRAL_API_KEY: "<% SECRET_MISTRAL_API_KEY %>",
      MODEL_NAME: "mistral-large",
    },
    description: "Mistral AI model integration",
    comment: "# 🤖 Mistral AI model integration (port 8000) — requires API key",
  },
  perplexity: {
    id: "perplexity",
    name: "perplexity",
    category: "ai",
    image: "user-name/perplexity:latest",
    servicePorts: [3000],
    vars: {
      PERPLEXITY_API_KEY: "<% SECRET_PERPLEXITY_API_KEY %>",
      MODEL_NAME: "sonar-medium-online",
    },
    description: "Perplexity AI model integration",
    comment: "# 🤖 Perplexity AI model integration (port 3000) — requires API key",
  },
}
