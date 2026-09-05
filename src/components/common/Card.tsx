import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = ({ className, hoverable = false, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all',
        hoverable && 'hover:bg-muted/40 hover:border-border/80',
        className
      )}
      {...props}
    />
  );
};
