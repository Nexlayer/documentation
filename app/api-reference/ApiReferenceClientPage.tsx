"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getEndpoints } from "@/lib/openapi";
import { EndpointCard } from "@/components/api/endpoint-card";
import { ScrollReveal } from "@/components/api/scroll-reveal";
import GithubIcon from "@/components/assets/svgs/github.svg";

interface Endpoint {
  path: string;
  method: string;
  summary: string;
  description: string;
  requestBody?: {
    contentType: string;
    schema: any;
  };
  responses: {
    [key: string]: {
      description: string;
      schema?: any;
    };
  };
  parameters?: any[];
}

interface Schema {
  type: string;
  properties?: Record<string, any>;
  required?: string[];
  items?: any;
  example?: any;
  description?: string;
}

export default function ApiReferenceClientPage() {
  const endpoints = getEndpoints();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-[#22B4C8] mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <ScrollReveal animation="fade">
          <div className="mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              API Reference
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl">
              Explore the Nexlayer API to programmatically deploy and manage
              your applications with our simple, powerful interface.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6">
          {endpoints.map((endpoint, index) => (
            <ScrollReveal
              key={`${endpoint.method}-${endpoint.path}`}
              animation="slide-up"
              delay={index * 0.05}
            >
              <EndpointCard endpoint={endpoint} index={index} />
            </ScrollReveal>
          ))}
        </div>
        <section className="mt-10 text-sm font-normal mb-6">
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
      </div>
    </div>
  );
}
