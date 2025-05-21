import { getEndpoints, getEndpointBySlug, getEndpointSlug } from "@/lib/openapi"
import { EndpointPage } from "@/components/api/endpoint-page"
import { notFound } from "next/navigation"

export function generateMetadata({ params }: { params: { slug: string } }) {
  const endpoint = getEndpointBySlug(params.slug)

  if (!endpoint) {
    return {
      title: "Endpoint Not Found - Nexlayer API",
    }
  }

  return {
    title: `${endpoint.summary} - Nexlayer API`,
    description: endpoint.description,
  }
}

export function generateStaticParams() {
  const endpoints = getEndpoints()

  return endpoints.map((endpoint) => ({
    slug: getEndpointSlug(endpoint),
  }))
}

export default function EndpointDetailPage({ params }: { params: { slug: string } }) {
  const endpoint = getEndpointBySlug(params.slug)

  if (!endpoint) {
    notFound()
  }

  return <EndpointPage endpoint={endpoint} />
}
