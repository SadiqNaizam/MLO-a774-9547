import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav'; // Assuming SidebarNav.tsx is in src/components/Dashboard/
import { cn } from '@/lib/utils';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  className?: string; // Allows additional classes to be passed to SidebarNav's root element
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile, className }) => {
  // It is assumed that the SidebarNav component (from ../Dashboard/SidebarNav) is structured
  // to accept a `className` prop and merge it with its root element's classes.
  // This allows for controlling its presentation, like the transforms used here for mobile responsiveness.
  // SidebarNav is expected to handle its own base styling (e.g., fixed positioning, width, height, background, z-index).

  return (
    <>
      {/* Overlay for mobile, shown when sidebar is open. Covers content other than the sidebar. */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-[19] bg-black/50 md:hidden" // z-index below SidebarNav (z-20), above Header (z-10)
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      <SidebarNav
        className={cn(
          'transition-transform duration-300 ease-in-out',
          // Base state for mobile: hidden off-screen to the left.
          // SidebarNav's own styling should make it `fixed left-0 top-0 ...`.
          '-translate-x-full',
          // If mobile sidebar is open, bring it on-screen.
          isMobileOpen && 'translate-x-0',
          // On medium screens and up (desktop), ensure it's always on-screen (overrides mobile transforms).
          'md:translate-x-0',
          className // Merge any additional classes passed via props for further customization.
        )}
      />
    </>
  );
};

export default Sidebar;
