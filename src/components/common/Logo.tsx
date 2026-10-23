import React from 'react';

export interface LogoProps {
  /**
   * 'full': Bird emblem + 'SwiftBook' text
   * 'icon': Bird emblem only (useful for favicons, badges, mobile marks)
   * 'text': 'SwiftBook' text only with orange 'Swift' and dark/white 'Book'
   */
  variant?: 'full' | 'icon' | 'text';
  /**
   * Pre-set dimensions:
   * 'xs' = 20px icon / 14px text
   * 'sm' = 24px icon / 16px text
   * 'md' = 32px icon / 18px text
   * 'lg' = 40px icon / 22px text
   * 'xl' = 48px icon / 28px text
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  iconOnly?: boolean;
  textOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  iconOnly = false,
  textOnly = false,
}) => {
  const actualVariant = iconOnly ? 'icon' : textOnly ? 'text' : variant;

  const iconSizes = {
    xs: 'w-5 h-5',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  }[size];

  const textSizes = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
  }[size];

  // 1. Icon Only (The circular swift bird emblem)
  if (actualVariant === 'icon') {
    return (
      <span className={`inline-flex items-center justify-center shrink-0 select-none ${iconSizes} ${className}`}>
        {/* Light Mode: Charcoal Bird */}
        <img
          src="/logo/swiftbook-bird.png"
          alt="SwiftBook Emblem"
          className="w-full h-full object-contain block dark:hidden pointer-events-none"
        />
        {/* Dark Mode: Crisp White Bird */}
        <img
          src="/logo/swiftbook-bird-dark.png"
          alt="SwiftBook Emblem"
          className="w-full h-full object-contain hidden dark:block pointer-events-none"
        />
      </span>
    );
  }

  // 2. Text Only ('Swift' in brand orange #f35921, 'Book' in dark/white)
  if (actualVariant === 'text') {
    return (
      <span className={`inline-flex items-center font-bold tracking-tight select-none leading-none ${textSizes} ${className}`}>
        <span className="text-[#f35921]">Swift</span>
        <span className="text-zinc-950 dark:text-white">Book</span>
      </span>
    );
  }

  // 3. Full Logo (Bird Emblem + Brand Text)
  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <span className={`inline-flex items-center justify-center shrink-0 ${iconSizes}`}>
        {/* Light Mode */}
        <img
          src="/logo/swiftbook-bird.png"
          alt="SwiftBook Emblem"
          className="w-full h-full object-contain block dark:hidden pointer-events-none"
        />
        {/* Dark Mode */}
        <img
          src="/logo/swiftbook-bird-dark.png"
          alt="SwiftBook Emblem"
          className="w-full h-full object-contain hidden dark:block pointer-events-none"
        />
      </span>

      <span className={`font-bold tracking-tight leading-none ${textSizes}`}>
        <span className="text-[#f35921]">Swift</span>
        <span className="text-zinc-950 dark:text-white">Book</span>
      </span>
    </span>
  );
};
