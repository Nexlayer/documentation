import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

type Selections = {
  [categoryId: string]: string | null;
};

interface StepDeployProps {
  categories: Category[];
  selections: Selections;
  setStep: (step: number) => void;
  appName: string;
  setAppName: (name: string) => void;
}

function stepDeploy2({
  appName,
  setAppName,
  categories,
  selections,
  setStep,
}: StepDeployProps) {
  return (
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
        <h3 className="text-lg font-medium mb-4 text-white">Selected Stack</h3>

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
                <h4 className="text-white font-medium">{category.title}</h4>
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
  );
}

export default stepDeploy2;
