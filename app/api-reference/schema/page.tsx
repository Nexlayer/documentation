import { ScrollReveal } from "@/components/api/scroll-reveal"
import { SchemaViewer } from "@/components/api/schema-viewer"
import openApiSpec from "@/data/openapi.json"

export const metadata = {
  title: "API Schema - Nexlayer",
  description: "Complete schema documentation for the Nexlayer API",
}

export default function SchemaPage() {
  const schemas = openApiSpec.components.schemas

  return (
    <div>
      <ScrollReveal animation="fade">
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            API Schema
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            Explore the complete schema definitions used throughout the Nexlayer API.
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-8">
        {Object.entries(schemas).map(([name, schema], index) => (
          <ScrollReveal key={name} animation="slide-up" delay={index * 0.05}>
            <div className="rounded-xl border border-zinc-800 overflow-hidden">
              <div className="bg-zinc-800/50 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">{name}</h2>
              </div>
              <div className="p-6 bg-zinc-900/30">
                <SchemaViewer schema={schema as any} initiallyExpanded={true} />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
