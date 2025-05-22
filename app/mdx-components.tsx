import * as React from 'react';
import { components as customComponents } from '@/components/mdx-components';

export function useMDXComponents(components) {
  return { ...customComponents, ...components };
} 