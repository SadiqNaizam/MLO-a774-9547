import React from 'react';
import TopHeader from '../Dashboard/TopHeader'; // Assuming TopHeader.tsx is in src/components/Dashboard/
import { cn } from '@/lib/utils';

interface HeaderProps {
  onToggleSidebar: () => void;
  className?: string; // Allows additional classes to be passed to TopHeader's root element
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, className }) => {
  // The TopHeader component is expected to manage its own styling, including:
  // - Fixed positioning (top-0, right-0).
  // - Dynamic left offset (left-0 on mobile, left-64 on desktop).
  // - Height (h-[70px]), background color, z-index, and internal layout.
  // This Header component primarily acts as a wrapper to integrate TopHeader into the MainAppLayout,
  // passing necessary props like `onToggleSidebar` and `className`.

  return (
    <TopHeader
      onToggleSidebar={onToggleSidebar}
      className={cn(className) // Pass through className for potential overrides or additions}
    />
  );
};

export default Header;
