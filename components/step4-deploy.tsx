import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface StepDeploy4Props {
  deploymentUrl: string;
}

function stepDeploy4({deploymentUrl}:StepDeploy4Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-xl font-medium mb-4 text-white">
        4. Your Application is Live!
      </h2>
      <p className="text-gray-300 mb-6">
        Congratulations! Your AI application is now deployed and running on
        Nexlayer.
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
        <h3 className="text-lg font-medium mb-4 text-white">What's Next?</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22B4C8] text-black flex items-center justify-center mr-2 mt-0.5 text-xs">
              1
            </div>
            <span>
              Monitor your application's performance in the Nexlayer dashboard
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
  );
}

export default stepDeploy4;
