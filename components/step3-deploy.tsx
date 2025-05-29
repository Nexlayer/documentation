import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, ArrowLeft, Terminal } from "lucide-react";
import { Technology } from "@/constants/technologies";

interface StepDeployProps {
  setStep: (step: number) => void;
  getCompletedSteps: () => number;
  formatYamlWithHighlighting: (yaml: string) => React.ReactNode;
  generatedYaml: string;
  appName: string;
  handleDeploy: () => void;
  isDeploying: boolean;
  selections: Record<string, string | null>;
  technologies: Record<string, Technology>;
  generateTechYamlBlock: (tech: Technology) => string;
}

function StepDeploy3({
  formatYamlWithHighlighting,
  generateTechYamlBlock,
  generatedYaml,
  appName,
  getCompletedSteps,
  setStep,
  handleDeploy,
  isDeploying,
  selections,
  technologies,
}: StepDeployProps) {
  // Get all selected technologies with their category
  const selectedTechnologies = Object.entries(selections)
    .filter(([_, techId]) => techId !== null)
    .map(([category, techId]) => {
      const tech = technologies[techId as string];
      return { ...tech, category };
    });

  return (
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
          <h3 className="text-lg font-medium text-white">Generated YAML</h3>
          <button
            className="flex items-center text-sm text-gray-400 hover:text-[#22B4C8]"
            onClick={() => navigator.clipboard.writeText(generatedYaml)}
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy Full YAML
          </button>
        </div>

        <div className="bg-[#0a0a0a] rounded-lg font-mono text-sm overflow-x-auto border border-[#333] relative">
          {formatYamlWithHighlighting(generatedYaml)}
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
            <span className="text-gray-400">Estimated Deployment Time</span>
            <span className="text-white font-medium">~2 minutes</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-400">Preview Duration</span>
            <span className="text-white font-medium">2 hours (extendable)</span>
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
  );
}

export default StepDeploy3;