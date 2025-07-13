import NextLink from 'next/link';
import { ComponentProps } from 'react';

interface LinkProps extends ComponentProps<typeof NextLink> {
  className?: string;
}

export default function Link({ className = "", ...props }: LinkProps) {
  return (
    <NextLink
      {...props}
      className={`text-blue-500 hover:underline hover:text-blue-600 transition-colors ${className}`}
    />
  );
}