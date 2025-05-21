import { Button } from "@/components/ui/button"
import { ArrowLeft, Copy } from "lucide-react"
import Link from "next/link"

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="mb-12">
          <h1 className="text-3xl font-light text-gray-900 mb-4">Nexlayer API Reference</h1>
          <p className="text-xl text-gray-600">Programmatically deploy and manage your applications.</p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-6">API Endpoints</h2>

            <div className="space-y-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Deploy Application</h3>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">POST</div>
                </div>

                <p className="text-gray-600 mb-4">Deploy a new application using a YAML configuration file.</p>

                <div className="bg-black text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                  <p>POST https://app.nexlayer.io/startUserDeployment</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Content-Type: text/x-yaml</span>
                  <button className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                    <Copy className="mr-1 h-3 w-3" />
                    Copy
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Extend Deployment</h3>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">POST</div>
                </div>

                <p className="text-gray-600 mb-4">Extend the lifetime of a temporary deployment.</p>

                <div className="bg-black text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                  <p>POST https://app.nexlayer.io/extendDeployment</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Content-Type: application/json</span>
                  <button className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                    <Copy className="mr-1 h-3 w-3" />
                    Copy
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Get Pods Status</h3>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">POST</div>
                </div>

                <p className="text-gray-600 mb-4">Get the status of all pods in a deployment.</p>

                <div className="bg-black text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                  <p>POST https://app.nexlayer.io/getPodsStatus</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Content-Type: application/json</span>
                  <button className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                    <Copy className="mr-1 h-3 w-3" />
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-6">Example: Deploy with cURL</h2>

            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-600 mb-4">Here's how to deploy an application using cURL:</p>

              <div className="bg-black text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <p>curl -X POST "https://app.nexlayer.io/startUserDeployment" \</p>
                <p>-H "Content-Type: text/x-yaml" --data-binary @nexlayer.yaml</p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Response</h3>
                <div className="bg-black text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <p>{`{`}</p>
                  <p>{`  "message": "Deployment started successfully",`}</p>
                  <p>{`  "url": "https://fantastic-fox-my-app.nexlayer.ai",`}</p>
                  <p>{`  "sessionToken": "<token>",`}</p>
                  <p>{`  "applicationName": "my-app",`}</p>
                  <p>{`  "status": {`}</p>
                  <p>{`    "environment": "preview"`}</p>
                  <p>{`  }`}</p>
                  <p>{`}`}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Need more detailed API documentation?</p>
          <Button variant="outline">View Full API Reference</Button>
        </div>
      </div>
    </div>
  )
}
