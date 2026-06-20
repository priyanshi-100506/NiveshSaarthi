import React from 'react';
import { cn } from '../lib/utils';

type BrandWordmarkProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
  sm: 'text-[20px]',
  md: 'text-[24px]',
  lg: 'text-[30px]',
};

const BrandWordmark = ({ className, size = 'md' }: BrandWordmarkProps) => {
  return (
    <span
      className={cn(
        'brand-wordmark inline-flex items-baseline leading-none text-foreground',
        sizeClasses[size],
        className
      )}
      aria-label="NiveshSaarthi"
    >
      <span>Nivesh</span>
      <span className="text-cyan">Saarthi</span>
    </span>
  );
};

export default BrandWordmark;
