import { RemoteMdx } from '@/components/remote-mdx';

export default function RemoteMdxDemo() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Remote MDX Demo</h1>
      <RemoteMdx url="https://raw.githubusercontent.com/hashicorp/next-mdx-remote/main/examples/basic/pages/example.mdx" />
      <p className="mt-8 text-sm text-muted-foreground">
        This content is loaded from a remote MDX file on GitHub.
      </p>
    </div>
  );
} 