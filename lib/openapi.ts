import openApiSpec from "@/data/openapi.json"

export type OpenAPISpec = typeof openApiSpec

export interface Endpoint {
  path: string
  method: string
  summary: string
  description: string
  parameters?: Parameter[]
  requestBody?: RequestBody
  responses: Record<string, Response>
  tags?: string[]
}

export interface Parameter {
  name: string
  in: string
  required: boolean
  schema: Schema
  description?: string
}

export interface RequestBody {
  required?: boolean
  content: Record<string, { schema: Schema }>
  description?: string
}

export interface Response {
  description: string
  content?: Record<string, { schema: Schema }>
}

export interface Schema {
  type: string
  properties?: Record<string, Schema>
  items?: Schema
  required?: string[]
  format?: string
  example?: any
  description?: string
  $ref?: string
}

export function getEndpoints(): Endpoint[] {
  const endpoints: Endpoint[] = []

  for (const [path, methods] of Object.entries(openApiSpec.paths)) {
    for (const [method, data] of Object.entries(methods)) {
      if (method === "parameters") continue

      endpoints.push({
        path,
        method: method.toUpperCase(),
        summary: data.summary || "",
        description: data.description || "",
        parameters: data.parameters,
        requestBody: data.requestBody,
        responses: data.responses,
        tags: data.tags,
      })
    }
  }

  return endpoints
}

export function getEndpointBySlug(slug: string): Endpoint | undefined {
  const endpoints = getEndpoints()
  return endpoints.find((endpoint) => {
    const endpointSlug = getEndpointSlug(endpoint)
    return endpointSlug === slug
  })
}

export function getEndpointSlug(endpoint: Endpoint): string {
  return `${endpoint.method.toLowerCase()}-${endpoint.path.replace(/\//g, "-").replace(/^-/, "")}`
}

export function resolveSchema(schema: Schema | undefined): Schema | undefined {
  if (!schema) return undefined

  if (schema.$ref) {
    const refPath = schema.$ref.replace("#/components/schemas/", "")
    return openApiSpec.components.schemas[refPath] as Schema
  }

  return schema
}

export function getSchemaExample(schema: Schema | undefined): any {
  if (!schema) return undefined

  const resolvedSchema = resolveSchema(schema)
  if (!resolvedSchema) return undefined

  if (resolvedSchema.example !== undefined) {
    return resolvedSchema.example
  }

  if (resolvedSchema.type === "object" && resolvedSchema.properties) {
    const example: Record<string, any> = {}
    for (const [key, prop] of Object.entries(resolvedSchema.properties)) {
      example[key] = getSchemaExample(prop)
    }
    return example
  }

  if (resolvedSchema.type === "array" && resolvedSchema.items) {
    return [getSchemaExample(resolvedSchema.items)]
  }

  // Default examples based on type
  switch (resolvedSchema.type) {
    case "string":
      return resolvedSchema.format === "binary" ? "[Binary data]" : "example"
    case "number":
      return 0
    case "integer":
      return 1
    case "boolean":
      return true
    default:
      return null
  }
}

export function getEndpointsByTag(): Record<string, Endpoint[]> {
  const endpoints = getEndpoints()
  const result: Record<string, Endpoint[]> = {}

  for (const endpoint of endpoints) {
    const tags = endpoint.tags || ["default"]

    for (const tag of tags) {
      if (!result[tag]) {
        result[tag] = []
      }
      result[tag].push(endpoint)
    }
  }

  return result
}

export function getAllTags(): string[] {
  const endpointsByTag = getEndpointsByTag()
  return Object.keys(endpointsByTag)
}

export default openApiSpec
