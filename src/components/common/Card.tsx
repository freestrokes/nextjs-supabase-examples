import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = ({ className, hoverable = false, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-linear-border bg-white/2 p-4 text-linear-text-primary transition-colors',
        hoverable && 'hover:bg-white/4',
        className
      )}
      {...props}
    />
  );
};
