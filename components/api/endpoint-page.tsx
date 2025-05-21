"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { type Endpoint, resolveSchema, getSchemaExample } from "@/lib/openapi"
import { CodeBlock } from "./code-block"
import { SchemaViewer } from "./schema-viewer"

interface EndpointPageProps {
  endpoint: Endpoint
}

export function EndpointPage({ endpoint }: EndpointPageProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const sections = document.querySelectorAll(".api-section")

    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          delay: index * 0.1,
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [endpoint])

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "bg-emerald-950 text-emerald-400 border-emerald-800"
      case "POST":
        return "bg-blue-950 text-blue-400 border-blue-800"
      case "PUT":
        return "bg-amber-950 text-amber-400 border-amber-800"
      case "DELETE":
        return "bg-red-950 text-red-400 border-red-800"
      case "PATCH":
        return "bg-purple-950 text-purple-400 border-purple-800"
      default:
        return "bg-zinc-950 text-zinc-400 border-zinc-800"
    }
  }

  const generateCodeExamples = () => {
    const baseUrl = "https://app.nexlayer.io"
    const path = endpoint.path
    const method = endpoint.method

    // Prepare request body if needed
    let requestBody: any = null
    let requestBodyContentType = ""

    if (endpoint.requestBody?.content) {
      const contentTypes = Object.keys(endpoint.requestBody.content)
      requestBodyContentType = contentTypes[0]

      const schema = endpoint.requestBody.content[requestBodyContentType].schema
      if (schema) {
        const resolvedSchema = resolveSchema(schema)
        if (resolvedSchema) {
          requestBody = getSchemaExample(resolvedSchema)
        }
      }
    }

    // Prepare parameters if needed
    const queryParams: Record<string, string> = {}
    const pathParams: Record<string, string> = {}

    if (endpoint.parameters) {
      endpoint.parameters.forEach((param) => {
        if (param.in === "query") {
          queryParams[param.name] = param.schema.example || "value"
        } else if (param.in === "path") {
          pathParams[param.name] = param.schema.example || "value"
        }
      })
    }

    // Replace path parameters in URL
    let url = path
    Object.entries(pathParams).forEach(([name, value]) => {
      url = url.replace(`{${name}}`, String(value))
    })

    // Add query parameters to URL
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&")

    if (queryString) {
      url += `?${queryString}`
    }

    // Full URL
    const fullUrl = `${baseUrl}${url}`

    // Generate code examples for different languages
    const examples: Record<string, string> = {
      curl: generateCurlExample(fullUrl, method, requestBodyContentType, requestBody),
      javascript: generateJavaScriptExample(fullUrl, method, requestBodyContentType, requestBody),
      python: generatePythonExample(fullUrl, method, requestBodyContentType, requestBody),
      go: generateGoExample(fullUrl, method, requestBodyContentType, requestBody),
      java: generateJavaExample(fullUrl, method, requestBodyContentType, requestBody),
    }

    // Add YAML example if the request body is YAML
    if (requestBodyContentType === "text/x-yaml" && typeof requestBody === "string") {
      examples.yaml = requestBody
    }

    // Add JSON example for the response
    const successResponse = endpoint.responses["200"]
    if (successResponse?.content?.["application/json"]?.schema) {
      const responseSchema = successResponse.content["application/json"].schema
      const example = getSchemaExample(responseSchema)
      if (example) {
        examples.json = JSON.stringify(example, null, 2)
      }
    }

    return examples
  }

  const generateCurlExample = (url: string, method: string, contentType: string, body: any) => {
    let curl = `curl -X ${method} "${url}"`

    if (contentType && body) {
      curl += ` \\
  -H "Content-Type: ${contentType}"`

      if (contentType === "application/json") {
        curl += ` \\
  -d '${JSON.stringify(body)}'`
      } else if (contentType === "text/x-yaml") {
        curl += ` \\
  --data-binary @nexlayer.yaml`
      }
    }

    return curl
  }

  const generateJavaScriptExample = (url: string, method: string, contentType: string, body: any) => {
    let code = `// Using fetch API
const response = await fetch("${url}", {
 method: "${method}",`

    if (contentType && body) {
      code += `
 headers: {
   "Content-Type": "${contentType}"
 },`

      if (contentType === "application/json") {
        code += `
 body: JSON.stringify(${JSON.stringify(body, null, 2)})`
      } else if (contentType === "text/x-yaml") {
        code += `
 body: yamlContent // Your YAML content as string`
      }
    }

    code += `
});

const data = await response.json();
console.log(data);`

    return code
  }

  const generatePythonExample = (url: string, method: string, contentType: string, body: any) => {
    let code = `import requests

`

    if (contentType === "text/x-yaml") {
      code += `# Read YAML file
with open('nexlayer.yaml', 'r') as file:
   yaml_content = file.read()

`
    }

    code += `response = requests.${method.toLowerCase()}(
   "${url}",`

    if (contentType && body) {
      code += `
   headers={"Content-Type": "${contentType}"},`

      if (contentType === "application/json") {
        code += `
   json=${JSON.stringify(body, null, 4)}`
      } else if (contentType === "text/x-yaml") {
        code += `
   data=yaml_content`
      }
    }

    code += `
)

print(response.json())`

    return code
  }

  const generateGoExample = (url: string, method: string, contentType: string, body: any) => {
    let code = `package main

import (
"fmt"
"net/http"
"strings"
"io/ioutil"
)

func main() {`

    if (contentType === "text/x-yaml") {
      code += `
// Read YAML file
yamlContent, err := ioutil.ReadFile("nexlayer.yaml")
if err != nil {
	fmt.Println("Error reading YAML file:", err)
	return
}

`
    }

    code += `	client := &http.Client{}
`

    if (contentType && body) {
      if (contentType === "application/json") {
        code += `	var requestBody = strings.NewReader(\`${JSON.stringify(body, null, 2)}\`)
`
      } else if (contentType === "text/x-yaml") {
        code += `	var requestBody = strings.NewReader(string(yamlContent))
`
      }
    }

    code += `	req, err := http.NewRequest("${method}", "${url}", ${contentType && body ? "requestBody" : "nil"})
if err != nil {
	fmt.Println("Error creating request:", err)
	return
}
`

    if (contentType) {
      code += `	req.Header.Set("Content-Type", "${contentType}")
`
    }

    code += `
resp, err := client.Do(req)
if err != nil {
	fmt.Println("Error sending request:", err)
	return
}
defer resp.Body.Close()

body, err := ioutil.ReadAll(resp.Body)
if err != nil {
	fmt.Println("Error reading response:", err)
	return
}

fmt.Println(string(body))
}`

    return code
  }

  const generateJavaExample = (url: string, method: string, contentType: string, body: any) => {
    let code = `import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;

public class NexlayerApiExample {
   public static void main(String[] args) {
       try {
           HttpClient client = HttpClient.newHttpClient();`

    if (contentType === "text/x-yaml") {
      code += `

           // Read YAML file
           String yamlContent = Files.readString(Paths.get("nexlayer.yaml"));`
    }

    code += `

           HttpRequest request = HttpRequest.newBuilder()
               .uri(URI.create("${url}"))
               .method("${method}", `

    if (contentType && body) {
      if (contentType === "application/json") {
        code += `HttpRequest.BodyPublishers.ofString(
                   ${JSON.stringify(JSON.stringify(body, null, 4))}
               ))`
      } else if (contentType === "text/x-yaml") {
        code += `HttpRequest.BodyPublishers.ofString(yamlContent))`
      }
    } else {
      code += `HttpRequest.BodyPublishers.noBody())`
    }

    if (contentType) {
      code += `
               .header("Content-Type", "${contentType}")`
    }

    code += `
               .build();

           HttpResponse<String> response = client.send(request, 
               HttpResponse.BodyHandlers.ofString());
           
           System.out.println(response.statusCode());
           System.out.println(response.body());
           
       } catch (IOException | InterruptedException e) {
           e.printStackTrace();
       }
   }
}`

    return code
  }

  const codeExamples = generateCodeExamples()

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center space-x-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getMethodColor(endpoint.method)}`}>
            {endpoint.method}
          </span>
          <h1 className="text-2xl font-mono text-white">{endpoint.path}</h1>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">{endpoint.summary}</h2>
        <p className="text-zinc-400 text-lg">{endpoint.description}</p>
      </motion.div>

      <div className="space-y-12">
        <section className="api-section">
          <h3 className="text-xl font-semibold text-white mb-4">Request</h3>

          {endpoint.parameters && endpoint.parameters.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-3">Parameters</h4>
              <div className="rounded-xl border border-zinc-800 overflow-hidden">
                <div className="bg-zinc-900/50 backdrop-blur-sm">
                  <table className="w-full text-left">
                    <thead className="bg-zinc-800/50">
                      <tr>
                        <th className="px-4 py-3 text-sm font-medium text-zinc-300">Name</th>
                        <th className="px-4 py-3 text-sm font-medium text-zinc-300">Location</th>
                        <th className="px-4 py-3 text-sm font-medium text-zinc-300">Type</th>
                        <th className="px-4 py-3 text-sm font-medium text-zinc-300">Required</th>
                        <th className="px-4 py-3 text-sm font-medium text-zinc-300">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {endpoint.parameters.map((param, index) => (
                        <tr key={index} className="bg-zinc-900/30">
                          <td className="px-4 py-3 font-mono text-sm text-white">{param.name}</td>
                          <td className="px-4 py-3 text-sm text-zinc-400">{param.in}</td>
                          <td className="px-4 py-3 text-sm text-zinc-400">{param.schema.type}</td>
                          <td className="px-4 py-3 text-sm">
                            {param.required ? (
                              <span className="text-emerald-400">Yes</span>
                            ) : (
                              <span className="text-zinc-500">No</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-zinc-400">{param.description || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {endpoint.requestBody && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-3">Request Body</h4>

              {Object.entries(endpoint.requestBody.content).map(([contentType, { schema }]) => (
                <div key={contentType} className="mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-zinc-400 mr-2">Content Type:</span>
                    <code className="px-2 py-1 bg-zinc-800 rounded text-sm text-zinc-300">{contentType}</code>
                    {endpoint.requestBody.required && <span className="ml-2 text-xs text-red-400">required</span>}
                  </div>

                  {schema && (
                    <div className="mt-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/30">
                      <SchemaViewer schema={schema} initiallyExpanded={true} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mb-6">
            <h4 className="text-lg font-medium text-white mb-3">Example Request</h4>
            <CodeBlock code={codeExamples} defaultLanguage="curl" />
          </div>
        </section>

        <section className="api-section">
          <h3 className="text-xl font-semibold text-white mb-4">Response</h3>

          <div className="space-y-6">
            {Object.entries(endpoint.responses).map(([statusCode, response]) => (
              <div key={statusCode} className="rounded-xl border border-zinc-800 overflow-hidden">
                <div className="bg-zinc-800/50 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <span
                      className={`inline-block w-16 text-center py-1 rounded-full text-xs font-medium ${
                        statusCode.startsWith("2")
                          ? "bg-emerald-950/70 text-emerald-400"
                          : statusCode.startsWith("4")
                            ? "bg-amber-950/70 text-amber-400"
                            : "bg-red-950/70 text-red-400"
                      }`}
                    >
                      {statusCode}
                    </span>
                    <span className="ml-3 text-zinc-300">{response.description}</span>
                  </div>
                </div>

                {response.content &&
                  Object.entries(response.content).map(([contentType, { schema }]) => (
                    <div key={contentType} className="p-4 bg-zinc-900/30">
                      <div className="flex items-center mb-3">
                        <span className="text-sm text-zinc-400 mr-2">Content Type:</span>
                        <code className="px-2 py-1 bg-zinc-800 rounded text-sm text-zinc-300">{contentType}</code>
                      </div>

                      {schema && (
                        <div className="mt-4">
                          <SchemaViewer schema={schema} initiallyExpanded={true} />
                        </div>
                      )}

                      {contentType === "application/json" && codeExamples.json && (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-white mb-2">Example Response</h5>
                          <CodeBlock
                            code={{
                              curl: codeExamples.curl,
                              javascript: codeExamples.javascript,
                              python: codeExamples.python,
                              go: codeExamples.go,
                              java: codeExamples.java,
                              json: codeExamples.json,
                              yaml: codeExamples.yaml || "",
                            }}
                            defaultLanguage="json"
                          />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </section>

        <section className="api-section">
          <h3 className="text-xl font-semibold text-white mb-4">Try It</h3>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6 text-center">
            <div className="text-zinc-400 mb-4">
              This feature is coming soon. You'll be able to test this endpoint directly from the documentation.
            </div>
            <div className="inline-block px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 cursor-not-allowed">
              Try Endpoint
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
