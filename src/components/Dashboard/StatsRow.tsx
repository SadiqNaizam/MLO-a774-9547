import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, CircleDollarSign, Activity, Trophy, Heart, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  subtext?: string;
  indicatorColor?: 'green' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, iconBgColor, iconColor, trend, subtext, indicatorColor }) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex items-center justify-between">
        <div className="flex-grow">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
          {trend && (
            <div className="flex items-center text-xs">
              {trend.direction === 'up' ? (
                <TrendingUp className="h-3.5 w-3.5 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 mr-1 text-red-500" />
              )}
              <span className={cn(trend.direction === 'up' ? 'text-green-500' : 'text-red-500')}>{trend.value}</span>
              {subtext && <span className="ml-1 text-muted-foreground">{subtext}</span>}
            </div>
          )}
          {!trend && subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
        </div>
        <div className="flex items-center ml-4">
          {indicatorColor && (
            <span className={cn('h-2.5 w-2.5 rounded-full mr-3', 
                                indicatorColor === 'green' ? 'bg-green-500' : 'bg-red-500')}>
            </span>
          )}
          <div className={cn('p-3 rounded-full', iconBgColor)}>
            <Icon className={cn('h-6 w-6', iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const statsData: StatCardProps[] = [
  {
    title: 'Campaign Sent',
    value: '197',
    icon: Bell,
    iconBgColor: 'bg-sky-100 dark:bg-sky-500/20',
    iconColor: 'text-sky-500 dark:text-sky-400',
    subtext: 'This Month',
  },
  {
    title: 'Annual Profit',
    value: '$489.4k',
    icon: CircleDollarSign,
    iconBgColor: 'bg-green-100 dark:bg-green-500/20',
    iconColor: 'text-green-500 dark:text-green-400',
    trend: { value: '+18.30 %', direction: 'up' as const },
    indicatorColor: 'green' as const,
  },
  {
    title: 'Lead Conversation',
    value: '32.89%',
    icon: Activity,
    iconBgColor: 'bg-yellow-100 dark:bg-yellow-500/20',
    iconColor: 'text-yellow-500 dark:text-yellow-400',
    trend: { value: '-2.7 %', direction: 'down' as const },
    indicatorColor: 'red' as const,
  },
  {
    title: 'Daily Average Income',
    value: '$1,596.5',
    icon: Trophy,
    iconBgColor: 'bg-purple-100 dark:bg-purple-500/20',
    iconColor: 'text-purple-500 dark:text-purple-400',
    trend: { value: '+0.6 %', direction: 'up' as const },
    indicatorColor: 'green' as const,
  },
  {
    title: 'Annual Deals',
    value: '2,659',
    icon: Heart,
    iconBgColor: 'bg-pink-100 dark:bg-pink-500/20',
    iconColor: 'text-pink-500 dark:text-pink-400',
    trend: { value: '-3.8 %', direction: 'down' as const }, 
    indicatorColor: 'red' as const,
  },
];

const StatsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {statsData.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default StatsRow;
