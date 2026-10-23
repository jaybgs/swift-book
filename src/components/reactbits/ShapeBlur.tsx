import React from 'react';
import { motion } from 'framer-motion';

interface ShapeBlurProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left' | 'right' | 'top' | 'bottom';
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'pill' | 'blob';
  className?: string;
  opacity?: number;
}

export const ShapeBlur: React.FC<ShapeBlurProps> = ({
  position = 'top-right',
  color = '#f35921',
  size = 'md',
  shape = 'blob',
  className = '',
  opacity = 0.45,
}) => {
  // Determine positioning classes
  const positionClasses = {
    'top-left': '-top-8 -left-8',
    'top-right': '-top-8 -right-8',
    'bottom-left': '-bottom-8 -left-8',
    'bottom-right': '-bottom-8 -right-8',
    'left': 'top-1/2 -left-10 -translate-y-1/2',
    'right': 'top-1/2 -right-10 -translate-y-1/2',
    'top': '-top-10 left-1/2 -translate-x-1/2',
    'bottom': '-bottom-10 left-1/2 -translate-x-1/2',
  }[position];

  // Determine size classes
  const sizeClasses = {
    sm: 'w-24 h-24 blur-xl',
    md: 'w-36 h-36 sm:w-44 sm:h-44 blur-2xl',
    lg: 'w-48 h-48 sm:w-64 sm:h-64 blur-3xl',
  }[size];

  // Determine shape geometry
  const shapeRadius = {
    circle: 'rounded-full',
    pill: 'rounded-[40px]',
    blob: 'rounded-[60%_40%_70%_30%_/_50%_60%_40%_50%]',
  }[shape];

  return (
    <div
      aria-hidden="true"
      className={`absolute ${positionClasses} pointer-events-none select-none -z-0 overflow-visible ${className}`}
    >
      <motion.div
        animate={{
          scale: [1, 1.12, 0.98, 1],
          rotate: [0, 8, -6, 0],
          opacity: [opacity, opacity * 1.3, opacity * 0.9, opacity],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: `radial-gradient(circle at center, ${color} 0%, color-mix(in srgb, ${color} 40%, transparent) 50%, transparent 75%)`,
        }}
        className={`${sizeClasses} ${shapeRadius}`}
      />
    </div>
  );
};
