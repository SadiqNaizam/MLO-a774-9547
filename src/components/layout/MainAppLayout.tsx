import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  // Effect to automatically close the mobile sidebar when the window is resized to desktop dimensions.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Tailwind's 'md' breakpoint is 768px
        closeMobileSidebar();
      }
    };

    window.addEventListener('resize', handleResize);
    // Perform an initial check in case the app loads on a desktop-sized screen.
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [closeMobileSidebar]);

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={closeMobileSidebar}
      />
      
      {/* This div wraps the Header and the main content (children). */}
      {/* It handles the left padding adjustment for the fixed sidebar on desktop. */}
      <div
        className={cn(
          'flex flex-col min-h-screen transition-all duration-300 ease-in-out',
          // On medium screens and up (desktop), add left padding equal to the sidebar's width (w-64).
          'md:pl-64'
        )}
      >
        <Header onToggleSidebar={toggleMobileSidebar} />
        
        {/* Main content area where page-specific content will be rendered. */}
        {/* Adheres to layout requirements: "p-6 mt-[70px]", "min-w-0 overflow-y-auto". */}
        <main
          className={cn(
            'flex-grow p-6 min-w-0 overflow-y-auto',
            'mt-[70px]' // Margin top to account for the fixed header's height (h-[70px]).
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
