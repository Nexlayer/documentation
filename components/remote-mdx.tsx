"use client";
import React, { useEffect, useState } from 'react';
import { MdxErrorBoundary } from './mdx-error-boundary';

interface RemoteMdxProps {
  url: string;
  components?: Record<string, React.ComponentType<any>>;
}

export function RemoteMdx({ url, components }: RemoteMdxProps) {
  const [mdxSource, setMdxSource] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [MDXContent, setMDXContent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setMdxSource(null);
    setMDXContent(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch MDX: ${res.statusText}`);
        return res.text();
      })
      .then(async (source) => {
        if (!isMounted) return;
        setMdxSource(source);
        // Dynamically import @mdx-js/mdx and @mdx-js/react
        const [{ compile }] = await Promise.all([
          import('@mdx-js/mdx'),
          import('@mdx-js/react'),
        ]);
        const compiled = String(await compile(source, { outputFormat: 'function-body' }));
        // eslint-disable-next-line no-new-func
        const fn = new Function('React', ...Object.keys(components || {}), `${compiled}; return MDXContent;`);
        const Content = fn(React, ...(components ? Object.values(components) : []));
        setMDXContent(() => Content);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [url, components]);

  if (loading) return <div>Loading remote MDX...</div>;
  if (error) return <div className="text-red-600">Error loading MDX: {error}</div>;
  if (!MDXContent) return null;

  return (
    <MdxErrorBoundary>
      <MDXContent />
    </MdxErrorBoundary>
  );
} 