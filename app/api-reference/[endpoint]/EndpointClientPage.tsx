"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

// Custom components for documentation
const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <pre className="p-4 overflow-auto rounded-lg bg-[#0a0a0a] text-[#d4d4d4] text-sm font-mono">
        <code>
          {code === "json"
            ? `{
  "message": "Deployment started successfully",
  "url": "https://compassionate-parrot-morphic-stack.alpha.nexlayer.ai",
  "sessionToken": "JdWLZE4TIWLl",
  "applicationName": "morphic-stack",
  "status": {
    "environment": "This environment will expire in 120 minutes.",
    "pods": [
      {
        "name": "morphic",
        "status": "Running"
      },
      {
        "name": "redis",
        "status": "Pending"
      },
      {
        "name": "searxng",
        "status": "Pending"
      },
      {
        "name": "ollama",
        "status": "Running"
      }
    ]
  },
  "extend": {
    "message": "To extend your environment for another 120 minutes, post the sessionToken and applicationName given in this response to the /extendDeployment endpoint. You have 3 extensions remaining.",
    "extendURL": "curl -X POST https://app.nexlayer.io/extendDeployment -H \\"Content-type: application/json\\" -d '{\\"sessionToken\\": <sessionToken>, \\"applicationName\\": <applicationName>}'"
  },
  "claim": {
    "message": "To claim this environment, post the sessionToken and applicationName given in this response to the /claimDeployment endpoint.",
    "claimURL": "curl -X POST https://app.nexlayer.io/claimDeployment -H \\"Content-type: application/json\\" -d '{\\"sessionToken\\": <sessionToken>, \\"applicationName\\": <applicationName>}'"
  },
  "info": "Your sessionToken will be used for authentication and your applicationName will be used to identify your deployment. Please save these items for future use."
}`
            : code}
        </code>
      </pre>

      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 p-1.5 rounded-md bg-[#222] text-gray-400 hover:bg-[#333] transition-colors"
      >
        {copied ? <Check className="h-4 w-4 text-[#22B4C8]" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}

const Endpoint = ({ method, path, description }) => (
  <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333] mb-6">
    <div className="flex items-center mb-4">
      <span
        className={`inline-block text-sm font-bold mr-3 py-1 px-3 rounded-full ${
          method === "GET"
            ? "bg-[#004d40] text-[#22B4C8]"
            : method === "POST"
              ? "bg-[#004d40] text-[#22B4C8]"
              : method === "PUT"
                ? "bg-[#4d3500] text-[#ffcc00]"
                : "bg-[#4d0000] text-[#ff6b6b]"
        }`}
      >
        {method}
      </span>
      <h3 className="text-xl font-medium text-white">{path}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </div>
)

// Documentation content for each endpoint
const endpointDocs = {
  startUserDeployment: {
    title: "Start User Deployment",
    method: "POST",
    path: "/startUserDeployment",
    description: "Deploy a new application using a YAML configuration file.",
    content: (
      <>
        <Endpoint
          method="POST"
          path="/startUserDeployment"
          description="Deploy a new application using a YAML configuration file."
        />

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Headers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-[#111]">
                <tr>
                  <th className="px-4 py-2">Header</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#333]">
                  <td className="px-4 py-2 font-medium text-white">Content-Type</td>
                  <td className="px-4 py-2 text-gray-300">text/x-yaml</td>
                  <td className="px-4 py-2 text-gray-300">YAML configuration file format</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request</h3>
          <p className="text-gray-300 mb-4">This endpoint accepts a YAML file as input.</p>

          <h4 className="text-md font-medium mb-2 text-white">Example YAML</h4>
          <CodeBlock
            language="yaml"
            code={`application:
  name: "my-app"
  pods:
    - name: "web"
      servicePorts:
        - 3000`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Example</h3>
          <CodeBlock
            language="bash"
            code={`curl -X POST "https://app.nexlayer.io/startUserDeployment" \\
  -H "Content-Type: text/x-yaml" \\
  --data-binary @nexlayer.yaml`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Response</h3>
          <CodeBlock
            language="json"
            code={`{
  "message": "Deployment started successfully",
  "url": "https://fantastic-fox-my-mern-app.alpha.nexlayer.ai",
  "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0",
  "applicationName": "My Mern App",
  "status": {
    "environment": "Initializing deployment environment"
  },
  "extend": {
    "message": "Your deployment will expire in 120 minutes. You can extend it up to 3 times.",
    "extendURL": "curl -X POST https://app.nexlayer.io/extendDeployment -H \\"Content-Type: application/json\\" -d '{\\"applicationName\\":\\"My Mern App\\",\\"sessionToken\\":\\"nx_tkn_f8a9b2c3d4e5f6g7h8i9j0\\"}'"
  },
  "claim": {
    "message": "Claim this deployment to make it permanent",
    "claimURL": "curl -X POST https://app.nexlayer.io/claimDeployment -H \\"Content-Type: application/json\\" -d '{\\"applicationName\\":\\"My Mern App\\",\\"sessionToken\\":\\"nx_tkn_f8a9b2c3d4e5f6g7h8i9j0\\"}'"
  },
  "info": "Your application is being deployed and will be available shortly"
}`}
          />
        </div>
      </>
    ),
  },
  extendDeployment: {
    title: "Extend Deployment",
    method: "POST",
    path: "/extendDeployment",
    description: "Extend the lifetime of a temporary deployment.",
    content: (
      <>
        <Endpoint method="POST" path="/extendDeployment" description="Extend the lifetime of a temporary deployment." />

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Headers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-[#111]">
                <tr>
                  <th className="px-4 py-2">Header</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#333]">
                  <td className="px-4 py-2 font-medium text-white">Content-Type</td>
                  <td className="px-4 py-2 text-gray-300">application/json</td>
                  <td className="px-4 py-2 text-gray-300">JSON request format</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Body</h3>
          <CodeBlock
            language="json"
            code={`{
  "applicationName": "My MERN App",
  "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"
}`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Example</h3>
          <CodeBlock
            language="bash"
            code={`curl -X POST "https://app.nexlayer.io/extendDeployment" \\
  -H "Content-Type: application/json" \\
  -d '{"applicationName": "My MERN App", "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"}'`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Response</h3>
          <CodeBlock
            language="json"
            code={`{
  "message": "Application My MERN App has been extended. Environment will expire in 120 minutes. 2 extension(s) remaining."
}`}
          />
        </div>
      </>
    ),
  },
  getPodsStatus: {
    title: "Get Pods Status",
    method: "POST",
    path: "/getPodsStatus",
    description: "Get the status of all pods in a deployment.",
    content: (
      <>
        <Endpoint method="POST" path="/getPodsStatus" description="Get the status of all pods in a deployment." />

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Headers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-[#111]">
                <tr>
                  <th className="px-4 py-2">Header</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#333]">
                  <td className="px-4 py-2 font-medium text-white">Content-Type</td>
                  <td className="px-4 py-2 text-gray-300">application/json</td>
                  <td className="px-4 py-2 text-gray-300">JSON request format</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Body</h3>
          <CodeBlock
            language="json"
            code={`{
  "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0",
  "applicationName": "My Mern App"
}`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Example</h3>
          <CodeBlock
            language="bash"
            code={`curl -X POST "https://app.nexlayer.io/getPodsStatus" \\
  -H "Content-Type: application/json" \\
  -d '{"applicationName": "My MERN App", "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"}'`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Response</h3>
          <CodeBlock
            language="json"
            code={`{
  "pods": [
    {
      "name": "web",
      "status": "running"
    },
    {
      "name": "api",
      "status": "running"
    },
    {
      "name": "database",
      "status": "pending"
    }
  ]
}`}
          />
        </div>
      </>
    ),
  },
  feedback: {
    title: "Feedback",
    method: "POST",
    path: "/feedback",
    description: "Sends feedback about your Nexlayer experience.",
    content: (
      <>
        <Endpoint method="POST" path="/feedback" description="Sends feedback about your Nexlayer experience." />

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Headers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-[#111]">
                <tr>
                  <th className="px-4 py-2">Header</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#333]">
                  <td className="px-4 py-2 font-medium text-white">Content-Type</td>
                  <td className="px-4 py-2 text-gray-300">application/json</td>
                  <td className="px-4 py-2 text-gray-300">JSON request format</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Body</h3>
          <CodeBlock
            language="json"
            code={`{
  "text": "Your detailed feedback message here"
}`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Example</h3>
          <CodeBlock
            language="bash"
            code={`curl -X POST "https://app.nexlayer.io/feedback" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "I love how easy it is to deploy my AI models with Nexlayer!"}'`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Response</h3>
          <CodeBlock
            language="json"
            code={`{
  "message": "Thank you for your feedback!"
}`}
          />
        </div>
      </>
    ),
  },
  claimDeployment: {
    title: "Claim Deployment",
    method: "POST",
    path: "/claimDeployment",
    description: "Converts a temporary deployment into a permanent one associated with your account.",
    content: (
      <>
        <Endpoint
          method="POST"
          path="/claimDeployment"
          description="Converts a temporary deployment into a permanent one associated with your account."
        />

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Headers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-[#111]">
                <tr>
                  <th className="px-4 py-2">Header</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#333]">
                  <td className="px-4 py-2 font-medium text-white">Content-Type</td>
                  <td className="px-4 py-2 text-gray-300">application/json</td>
                  <td className="px-4 py-2 text-gray-300">JSON request format</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Body</h3>
          <CodeBlock
            language="json"
            code={`{
  "applicationName": "My Mern App",
  "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"
}`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Example</h3>
          <CodeBlock
            language="bash"
            code={`curl -X POST "https://app.nexlayer.io/claimDeployment" \\
  -H "Content-Type: application/json" \\
  -d '{"applicationName": "My Mern App", "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"}'`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Response</h3>
          <CodeBlock
            language="json"
            code={`{
  "message": "You're almost there! Visit https://app.nexlayer.io/claim/nx_claim_a1b2c3d4e5 to finalize your deployment.",
  "claimURL": "https://app.nexlayer.io/claim/nx_claim_a1b2c3d4e5",
  "claimToken": "nx_claim_a1b2c3d4e5"
}`}
          />
          <p className="text-gray-300 mt-4 text-sm">
            <strong>Note:</strong> After receiving the claim token, you must visit the provided URL or use the token
            within 30 minutes to finalize the claim process.
          </p>
        </div>
      </>
    ),
  },
  addDeploymentReservation: {
    title: "Add Deployment Reservation",
    method: "POST",
    path: "/addDeploymentReservation",
    description: "Reserves a deployment to prevent automatic cleanup.",
    content: (
      <>
        <Endpoint
          method="POST"
          path="/addDeploymentReservation"
          description="Reserves a deployment to prevent automatic cleanup."
        />

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Headers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-[#111]">
                <tr>
                  <th className="px-4 py-2">Header</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#333]">
                  <td className="px-4 py-2 font-medium text-white">Content-Type</td>
                  <td className="px-4 py-2 text-gray-300">application/json</td>
                  <td className="px-4 py-2 text-gray-300">JSON request format</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Body</h3>
          <CodeBlock
            language="json"
            code={`{
  "applicationName": "My Mern App",
  "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"
}`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Example</h3>
          <CodeBlock
            language="bash"
            code={`curl -X POST "https://app.nexlayer.io/addDeploymentReservation" \\
  -H "Content-Type: application/json" \\
  -d '{"applicationName": "My Mern App", "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"}'`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Response</h3>
          <CodeBlock
            language="json"
            code={`{
  "message": "Application My MERN App reservation has been added."
}`}
          />
        </div>
      </>
    ),
  },
  removeDeploymentReservation: {
    title: "Remove Deployment Reservation",
    method: "POST",
    path: "/removeDeploymentReservation",
    description: "Removes a reservation from a deployment, allowing it to be cleaned up automatically.",
    content: (
      <>
        <Endpoint
          method="POST"
          path="/removeDeploymentReservation"
          description="Removes a reservation from a deployment, allowing it to be cleaned up automatically."
        />

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Headers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-[#111]">
                <tr>
                  <th className="px-4 py-2">Header</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#333]">
                  <td className="px-4 py-2 font-medium text-white">Content-Type</td>
                  <td className="px-4 py-2 text-gray-300">application/json</td>
                  <td className="px-4 py-2 text-gray-300">JSON request format</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Body</h3>
          <CodeBlock
            language="json"
            code={`{
  "applicationName": "My Mern App",
  "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"
}`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Example</h3>
          <CodeBlock
            language="bash"
            code={`curl -X POST "https://app.nexlayer.io/removeDeploymentReservation" \\
  -H "Content-Type: application/json" \\
  -d '{"applicationName": "My Mern App", "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"}'`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Response</h3>
          <CodeBlock
            language="json"
            code={`{
  "message": "Application My MERN App reservation has been removed. Application site will be removed within the next 10 minutes."
}`}
          />
        </div>
      </>
    ),
  },
  removeReservations: {
    title: "Remove All Reservations",
    method: "POST",
    path: "/removeReservations",
    description: "Removes all reservations associated with your session token.",
    content: (
      <>
        <Endpoint
          method="POST"
          path="/removeReservations"
          description="Removes all reservations associated with your session token."
        />

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Headers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-[#111]">
                <tr>
                  <th className="px-4 py-2">Header</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#333]">
                  <td className="px-4 py-2 font-medium text-white">Content-Type</td>
                  <td className="px-4 py-2 text-gray-300">application/json</td>
                  <td className="px-4 py-2 text-gray-300">JSON request format</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Body</h3>
          <CodeBlock
            language="json"
            code={`{
  "sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"
}`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Example</h3>
          <CodeBlock
            language="bash"
            code={`curl -X POST "https://app.nexlayer.io/removeReservations" \\
  -H "Content-Type: application/json" \\
  -d '{"sessionToken": "nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"}'`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Response</h3>
          <CodeBlock
            language="json"
            code={`{
  "message": "All reservations have been removed. Application sites will be removed within the next 10 minutes."
}`}
          />
        </div>
      </>
    ),
  },
  getReservations: {
    title: "Get All Reservations",
    method: "GET",
    path: "/getReservations",
    description: "Retrieves all active reservations associated with your session token.",
    content: (
      <>
        <Endpoint
          method="GET"
          path="/getReservations"
          description="Retrieves all active reservations associated with your session token."
        />

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Parameters</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-[#111]">
                <tr>
                  <th className="px-4 py-2">Parameter</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Required</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#333]">
                  <td className="px-4 py-2 font-medium text-white">sessionToken</td>
                  <td className="px-4 py-2 text-gray-300">string</td>
                  <td className="px-4 py-2 text-gray-300">Yes</td>
                  <td className="px-4 py-2 text-gray-300">Your session token</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Example</h3>
          <CodeBlock
            language="bash"
            code={`curl -X GET "https://app.nexlayer.io/getReservations?sessionToken=nx_tkn_f8a9b2c3d4e5f6g7h8i9j0"`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Response</h3>
          <CodeBlock
            language="json"
            code={`{
  "reservedDeployments": [
    {
      "applicationName": "My Mern App",
      "url": "https://fantastic-fox-my-mern-app.alpha.nexlayer.ai"
    },
    {
      "applicationName": "My Python Service",
      "url": "https://graceful-gazelle-my-python-service.alpha.nexlayer.ai"
    }
  ]
}`}
          />
        </div>
      </>
    ),
  },
  schema: {
    title: "Get Schema",
    method: "GET",
    path: "/schema",
    description:
      "Returns the JSON Schema for defining container-based application deployments on the Nexlayer AI Cloud Platform.",
    content: (
      <>
        <Endpoint
          method="GET"
          path="/schema"
          description="Returns the JSON Schema for defining container-based application deployments on the Nexlayer AI Cloud Platform."
        />

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Description</h3>
          <p className="text-gray-300 mb-4">
            This endpoint returns a JSON Schema document that validates Nexlayer application deployment configurations.
            The schema defines the structure and validation rules for your nexlayer.yaml files.
          </p>
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Example</h3>
          <CodeBlock language="bash" code={`curl -X GET "https://app.nexlayer.io/schema"`} />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Response</h3>
          <p className="text-gray-300 mb-4">
            Returns a JSON Schema document that defines the structure of valid Nexlayer YAML files. The schema includes
            definitions for application properties, pod configurations, volume mounts, and more.
          </p>
          <p className="text-gray-300 mb-4">
            <strong>Note:</strong> The complete schema is extensive. Below is a simplified example of the schema
            structure:
          </p>
          <CodeBlock
            language="json"
            code={`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Nexlayer YAML Schema",
  "description": "Schema for validating Nexlayer application deployment configurations",
  "type": "object",
  "required": ["application"],
  "additionalProperties": false,
  "properties": {
    "application": {
      "type": "object",
      "required": ["name", "pods"],
      "properties": {
        "name": {
          "type": "string",
          "description": "Globally unique application identifier"
        },
        "url": {
          "type": "string",
          "description": "Custom domain for production deployments"
        },
        "registryLogin": {
          "type": "object",
          "description": "Authentication for private registries",
          "properties": {
            "registry": { "type": "string" },
            "username": { "type": "string" },
            "personalAccessToken": { "type": "string" }
          }
        },
        "pods": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["name", "image", "servicePorts"],
            "properties": {
              "name": { "type": "string" },
              "image": { "type": "string" },
              "path": { "type": "string" },
              "servicePorts": {
                "type": "array",
                "items": { "type": "integer" }
              }
              // Additional pod properties...
            }
          }
        }
      }
    }
  }
}`}
          />
        </div>
      </>
    ),
  },
  validate: {
    title: "Validate Configuration",
    method: "POST",
    path: "/validate",
    description: "Validates a nexlayer.yaml file without deploying it.",
    content: (
      <>
        <Endpoint method="POST" path="/validate" description="Validates a nexlayer.yaml file without deploying it." />

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Headers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-[#111]">
                <tr>
                  <th className="px-4 py-2">Header</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#333]">
                  <td className="px-4 py-2 font-medium text-white">Content-Type</td>
                  <td className="px-4 py-2 text-gray-300">application/json</td>
                  <td className="px-4 py-2 text-gray-300">JSON request format</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Request Body</h3>
          <p className="text-gray-300 mb-4">Your nexlayer application configuration as a JSON object.</p>
          <CodeBlock
            language="json"
            code={`{
  "application": {
    "name": "my-app",
    "pods": [
      {
        "name": "web",
        "image": "nginx:latest",
        "path": "/",
        "servicePorts": [80]
      }
    ]
  }
}`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Example</h3>
          <CodeBlock
            language="bash"
            code={`curl -X POST "https://app.nexlayer.io/validate" \\
  -H "Content-Type: application/json" \\
  -d '{"application": {"name": "my-app", "pods": [{"name": "web", "image": "nginx:latest", "path": "/", "servicePorts": [80]}]}}'`}
          />
        </div>

        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-white">Response</h3>
          <p className="text-gray-300 mb-4">If the configuration is valid:</p>
          <CodeBlock
            language="json"
            code={`{
  "message": "Nexlayer YAML file is valid."
}`}
          />
          <p className="text-gray-300 mt-4 mb-4">If the configuration is invalid:</p>
          <CodeBlock
            language="json"
            code={`{
  "error": "Validation failed",
  "details": [
    {
      "path": "application.pods[0].image",
      "message": "Required field missing"
    }
  ]
}`}
          />
        </div>
      </>
    ),
  },
  // Add more endpoints as needed
}

// This is now a client component that uses static data
export default function EndpointPage({ params }: { params: { endpoint: string } }) {
  const { endpoint } = params
  const docContent = endpointDocs[endpoint as keyof typeof endpointDocs]

  if (!docContent) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/api-reference" className="inline-flex items-center text-gray-400 hover:text-[#22B4C8] mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to API Reference
          </Link>

          <div className="bg-[#0a0a0a] rounded-xl p-8 border border-[#333] text-center">
            <h2 className="text-2xl font-light mb-4 text-white">Documentation Not Found</h2>
            <p className="text-gray-300 mb-6">We couldn't find documentation for this endpoint.</p>
            <Link href="/api-reference" passHref>
              <Button className="bg-[#22B4C8] hover:bg-[#1DA3B6] text-black">Return to API Reference</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/api-reference" className="inline-flex items-center text-gray-400 hover:text-[#22B4C8] mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to API Reference
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-light mb-4 gradient-text">{docContent.title}</h1>
        </div>

        {docContent.content}
      </div>
    </div>
  )
}
