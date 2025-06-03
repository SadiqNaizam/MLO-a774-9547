import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  LayoutDashboard,
  BarChart3,
  Target,
  ShoppingCart,
  Bitcoin,
  FolderKanban,
  GalleryThumbnails,
  Briefcase,
  FileText as BlogIcon,
  AppWindow,
  LayoutGrid,
  Copy as PagesIcon,
  Lock,
  Rocket,
  Component as ComponentIcon,
  Layers,
  ToyBrick,
  ClipboardEdit,
  ChevronDown,
  Settings2 as SettingsIcon, // Used for consistency, though image might imply different settings icon for bottom
} from 'lucide-react';

interface NavItemProps {
  item: NavItemData;
  isChild?: boolean;
}

interface NavItemData {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  badge?: { text: string; color: string; bgColor: string; borderColor?: string };
  children?: NavItemData[];
  isActive?: boolean;
  isExpanded?: boolean; 
}

const NavLink: React.FC<NavItemProps> = ({ item, isChild = false }) => {
  const linkClasses = cn(
    'flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-md',
    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus:ring-1 focus:ring-sidebar-ring',
    item.isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground',
    isChild && 'pl-10 pr-4'
  );

  return (
    <a href={item.href || '#!'} className={linkClasses}>
      <div className="flex items-center">
        <item.icon className={cn('h-4 w-4 mr-3', item.isActive ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground/80')} />
        <span>{item.label}</span>
      </div>
      {item.badge && (
        <Badge variant="secondary" className={cn('ml-auto', item.badge.bgColor, item.badge.color, item.badge.borderColor ? `border ${item.badge.borderColor}`: '')}>
          {item.badge.text}
        </Badge>
      )}
    </a>
  );
};

const SidebarNav: React.FC = () => {
  const menuItems: NavItemData[] = [
    {
      id: 'dashboards',
      label: 'Dashboards',
      icon: LayoutDashboard,
      isExpanded: true,
      children: [
        { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '#/analytics' },
        { id: 'crm', label: 'CRM', icon: Target, href: '#/crm', isActive: true },
        { id: 'ecommerce', label: 'Ecommerce', icon: ShoppingCart, href: '#/ecommerce' },
      ],
    },
    { id: 'crypto', label: 'Crypto', icon: Bitcoin, href: '#/crypto' },
    { id: 'projects', label: 'Projects', icon: FolderKanban, href: '#/projects' },
    { id: 'nft', label: 'NFT', icon: GalleryThumbnails, href: '#/nft' },
    { id: 'job', label: 'Job', icon: Briefcase, href: '#/job' },
    {
      id: 'blog',
      label: 'Blog',
      icon: BlogIcon,
      href: '#/blog',
      badge: { text: 'New', bgColor: 'bg-green-500/20', color: 'text-green-400', borderColor: 'border-green-500/30' },
    },
    {
      id: 'apps',
      label: 'Apps',
      icon: AppWindow,
      children: [
        { id: 'app-calendar', label: 'Calendar', icon: ChevronDown /* Placeholder */, href: '#/apps/calendar' },
      ]
    },
    {
      id: 'layouts',
      label: 'Layouts',
      icon: LayoutGrid,
      href: '#/layouts',
      badge: { text: 'Hot', bgColor: 'bg-red-500/20', color: 'text-red-400', borderColor: 'border-red-500/30' },
    },
  ];

  const pagesItems: NavItemData[] = [
    {
      id: 'authentication',
      label: 'Authentication',
      icon: Lock,
      children: [
        { id: 'auth-signin', label: 'Sign In', icon: ChevronDown /* Placeholder */, href: '#/auth/signin' },
      ]
    },
    {
      id: 'pages',
      label: 'Pages',
      icon: PagesIcon,
      children: [
        { id: 'page-profile', label: 'Profile', icon: ChevronDown /* Placeholder */, href: '#/pages/profile' },
      ]
    },
    {
      id: 'landing',
      label: 'Landing',
      icon: Rocket,
      children: [
        { id: 'landing-onepage', label: 'One Page', icon: ChevronDown /* Placeholder */, href: '#/landing/onepage' },
      ]
    },
  ];

  const componentsItems: NavItemData[] = [
    { id: 'base-ui', label: 'Base UI', icon: ComponentIcon, children: [] },
    { id: 'advance-ui', label: 'Advance UI', icon: Layers, children: [] },
    { id: 'widgets', label: 'Widgets', icon: ToyBrick, href: '#/widgets' },
    { id: 'forms', label: 'Forms', icon: ClipboardEdit, children: [] },
  ];

  const renderNavItems = (items: NavItemData[], defaultOpenValue?: string) => (
    <Accordion type="multiple" defaultValue={defaultOpenValue ? [defaultOpenValue] : items.filter(item => item.isExpanded && item.children && item.children.length > 0).map(item => item.id)} className="w-full space-y-1">
      {items.map((item) =>
        item.children && item.children.length > 0 ? (
          <AccordionItem value={item.id} key={item.id} className="border-none">
            <AccordionTrigger
              className={cn(
                'flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-md',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus:ring-1 focus:ring-sidebar-ring',
                item.isActive || item.children.some(c => c.isActive) ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground',
                ' [&[data-state=open]>svg:last-child]:rotate-180'
              )}
            >
              <div className="flex items-center">
                <item.icon className={cn('h-4 w-4 mr-3', item.isActive || item.children.some(c => c.isActive) ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground/80')} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                 <Badge variant="secondary" className={cn('ml-auto mr-2', item.badge.bgColor, item.badge.color, item.badge.borderColor ? `border ${item.badge.borderColor}`: '')}>
                  {item.badge.text}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4 shrink-0 text-sidebar-foreground/70 transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent className="pb-0 space-y-1">
              {item.children.map((child) => (
                <NavLink item={child} key={child.id} isChild />
              ))}
            </AccordionContent>
          </AccordionItem>
        ) : (
          <NavLink item={item} key={item.id} />
        )
      )}
    </Accordion>
  );

  return (
    <nav className="bg-sidebar text-sidebar-foreground w-64 h-screen flex flex-col fixed top-0 left-0 shadow-lg z-20">
      <div className="px-6 py-5 border-b border-sidebar-border">
        <a href="#/">
          <h1 className="text-2xl font-bold text-sidebar-foreground">VELZON</h1>
        </a>
      </div>

      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src="https://i.pravatar.cc/40?u=annaadame" alt="Anna Adame" />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground">Anna Adame</p>
            <div className="flex items-center">
              <span className="h-2 w-2 bg-green-400 rounded-full mr-1.5"></span>
              <p className="text-xs text-sidebar-foreground/80">Online</p>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-grow">
        <div className="p-3 space-y-4">
          <div>
            <h2 className="px-4 py-2 text-xs font-semibold uppercase text-sidebar-foreground/60">Menu</h2>
            {renderNavItems(menuItems, 'dashboards')}
          </div>
          <div>
            <h2 className="px-4 py-2 text-xs font-semibold uppercase text-sidebar-foreground/60">Pages</h2>
            {renderNavItems(pagesItems)}
          </div>
          <div>
            <h2 className="px-4 py-2 text-xs font-semibold uppercase text-sidebar-foreground/60">Components</h2>
            {renderNavItems(componentsItems)}
          </div>
        </div>
      </ScrollArea>
      
      {/* Optional: Fixed bottom actions if needed in future based on original Velzon */}
      {/* <div className="p-4 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <SettingsIcon className="h-4 w-4 mr-2" /> Settings
        </Button>
      </div> */}
    </nav>
  );
};

export default SidebarNav;
