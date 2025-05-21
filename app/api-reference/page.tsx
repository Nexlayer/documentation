import type { Metadata } from "next"
import ApiReferenceClientPage from "./ApiReferenceClientPage"

export const metadata: Metadata = {
  title: "API Reference - Nexlayer",
  description: "Comprehensive API documentation for the Nexlayer platform",
}

export default function ApiReferencePage() {
  return <ApiReferenceClientPage />
}
