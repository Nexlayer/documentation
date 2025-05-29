import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GithubIcon from "@/components/assets/svgs/github.svg";

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
  getCompletedSteps: () => number;
  setActiveCategory: (categoryId: string) => void;
  activeCategory: string;
  techOptions: {
    [categoryId: string]: any[]; 
  };
  renderTechOption: (categoryId: string, option: any) => React.ReactNode;
}


function stepDeploy({
  categories,
  selections,
  setStep,
  getCompletedSteps,
  setActiveCategory,
  activeCategory,
  techOptions,
  renderTechOption,
}: StepDeployProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-xl font-medium mb-4 text-white">
        1. Choose Your Tech Stack
      </h2>
      <p className="text-gray-300 mb-6">
        Select the technologies you want to use for your AI application. You can
        skip any category that doesn't apply.
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
            {categories.find((c) => c.id === activeCategory)?.icon}
            <span className="ml-2">
              {categories.find((c) => c.id === activeCategory)?.title}
            </span>
          </h3>
          <div className="text-sm text-gray-400">
            {selections[activeCategory]
              ? "Selected: " + selections[activeCategory]
              : "None selected"}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {techOptions[activeCategory].map((option:any) =>
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
              {getCompletedSteps()} of {categories.length} categories selected
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
                  {categories.find((c: any) => c.id === category)?.title}:
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
                <p className="text-[#1ca3b7] underline">Provide feedback</p>
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
  );
}

export default stepDeploy;
