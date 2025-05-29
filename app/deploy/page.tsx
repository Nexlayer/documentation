"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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
import { categories, techOptions } from "@/constants/templates-data";
import "../../styles/yaml-highlighter.css";
import StepDeploy from "@/components/step1-deploy";
import StepDeploy2 from "@/components/step2-deploy";
import StepDeploy3 from "@/components/step3-deploy";
import StepDeploy4 from "@/components/step4-deploy";
import { technologies } from "@/constants/technologies";
import { Technology } from "@/constants/technologies";

const generateTechYamlBlock = (tech: Technology): string => {
  let yaml = `    ${tech.comment || `# ${tech.name}`}\n`;
  yaml += `    - name: ${tech.name.toLowerCase().replace(/\s+/g, "-")}\n`;
  yaml += `      image: "${tech.image}"\n`;

  if (tech.path) yaml += `      path: "${tech.path}"\n`;
  if (tech.servicePorts?.length) {
    yaml += `      servicePorts:\n`;
    tech.servicePorts.forEach((port) => {
      yaml += `        - ${port}\n`;
    });
  }

  if (tech.vars) {
    yaml += `      vars:\n`;
    Object.entries(tech.vars).forEach(([key, value]) => {
      yaml += `        ${key}: "${value}"\n`;
    });
  }

  if (tech.volumes) {
    yaml += `      volumes:\n`;
    tech.volumes.forEach((vol) => {
      yaml += `        - name: ${vol.name}\n`;
      yaml += `          size: "${vol.size}"\n`;
      yaml += `          mountPath: "${vol.mountPath}"\n`;
    });
  }

  if (tech.secrets) {
    yaml += `      secrets:\n`;
    tech.secrets.forEach((secret) => {
      yaml += `        - name: ${secret.name}\n`;
      yaml += `          data: "${secret.data}"\n`;
      yaml += `          mountPath: "${secret.mountPath}"\n`;
      if (secret.fileName) {
        yaml += `          fileName: "${secret.fileName}"\n`;
      }
    });
  }

  return yaml + `\n`;
};

const formatYamlWithHighlighting = (yamlString: string) => {
  if (!yamlString) return null;

  const lines = yamlString.split("\n");

  return (
    <div className="yaml-highlighter">
      {lines.map((line, index) => {
        const indentMatch = line.match(/^(\s*)/);
        const indent = indentMatch ? indentMatch[0].length : 0;

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

const getTechLogo = (techName: any) => {
  const logoMap = {
    "Next.js": NextJsLogo,
    React: ReactLogo,
    Remix: RemixLogo,
    Angular: AngularLogo,
    Vue: VueLogo,
    Svelte: SvelteLogo,

    Express: ExpressLogo,
    Node: NodeJsLogo,
    Django: DjangoLogo,
    FastAPI: FastApiLogo,
    Flask: FlaskLogo,

    PostgreSQL: null,
    MySQL: null,
    MongoDB: null,
    SQLite: null,
    Neon: NeonLogo,

    Prisma: null,
    TypeORM: null,
    Drizzle: null,
    SQLAlchemy: null,
    "Django ORM": null,

    Redis: null,
    Memcached: null,
    Valkey: null,
    Dragonfly: null,
    KeyDB: null,

    Pinecone: null,
    Qdrant: null,
    Milvus: null,
    Chroma: null,
    Weaviate: null,

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

  useEffect(() => {
    if (step === 3) {
      let yaml = `application:\n  name: "${appName}" # Required: Globally unique app name\n  pods:\n`;

      const selectedTechs = Object.values(selections)
        .filter(Boolean)
        .map((id) => technologies[id as string])
        .filter((t) => t);

      selectedTechs.forEach((tech) => {
        yaml += generateTechYamlBlock(tech);
      });

      setGeneratedYaml(yaml);
    }
  }, [step, selections, appName]);

  const findMatchingTechnology = (techId: string | null): Technology | null => {
  if (!techId) return null;
  return technologies[techId] || null;
};

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setDeploymentUrl(`https://fantastic-fox-${appName}.nexlayer.ai`);
      setIsDeploying(false);
      setStep(4);
    }, 3000);
  };

  const handleSelection = (category: any, option: any) => {
    setSelections((prev) => ({
      ...prev,
      [category]: option.id, // use ID instead of name
    }));

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

  const renderTechOption = (category: any, option: any) => {
    const isSelected = selections[category] === option.id;

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
          <StepDeploy
            categories={categories}
            selections={selections}
            setStep={setStep}
            getCompletedSteps={getCompletedSteps}
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
            techOptions={techOptions}
            renderTechOption={renderTechOption}
          />
        )}

        {step === 2 && (
          <StepDeploy2
            appName={appName}
            setAppName={setAppName}
            categories={categories}
            selections={selections}
            setStep={setStep}
          />
        )}

        {step === 3 && (
          <StepDeploy3
            formatYamlWithHighlighting={formatYamlWithHighlighting}
            findMatchingTechnology={findMatchingTechnology}
            generatedYaml={generatedYaml}
            appName={appName}
            getCompletedSteps={getCompletedSteps}
            setStep={setStep}
            handleDeploy={handleDeploy}
            isDeploying={isDeploying}
            selections={selections}
            technologies={technologies}
            generateTechYamlBlock={generateTechYamlBlock}
          />
        )}

        {step === 4 && <StepDeploy4 deploymentUrl={deploymentUrl} />}
      </div>
    </div>
  );
}
