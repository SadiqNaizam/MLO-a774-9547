import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from 'recharts';
import { ChevronDown } from 'lucide-react';

// Sales Forecast Chart
const salesForecastData = [
  { name: 'Goal', value: 37, fill: 'hsl(var(--primary))' }, // Blue
  { name: 'Pending', value: 12, fill: 'hsl(var(--accent))' }, // Green
  { name: 'Revenue', value: 18, fill: 'hsl(var(--destructive))' }, // Orange/Reddish
];

const SalesForecastChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={salesForecastData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
      <XAxis type="number" />
      <YAxis type="category" dataKey="name" hide />
      <Tooltip cursor={{fill: 'hsl(var(--muted))'}}/>
      <Legend iconType="circle" align="center" verticalAlign="bottom" wrapperStyle={{paddingTop: 20}}/>
      <Bar dataKey="value" barSize={30} radius={[0, 5, 5, 0]}>
        {salesForecastData.map((entry, index) => (
          <Bar key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

// Deal Type Chart
const dealTypeData = [
  { subject: '2016', Pending: 80, Loss: 30, Won: 70, fullMark: 100 },
  { subject: '2017', Pending: 60, Loss: 70, Won: 90, fullMark: 100 },
  { subject: '2018', Pending: 50, Loss: 85, Won: 40, fullMark: 100 },
  { subject: '2019', Pending: 75, Loss: 40, Won: 60, fullMark: 100 },
  { subject: '2020', Pending: 90, Loss: 55, Won: 80, fullMark: 100 },
  { subject: '2021', Pending: 65, Loss: 65, Won: 50, fullMark: 100 },
];

const DealTypeChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={300}>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dealTypeData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 100]} />
      <Tooltip />
      <Legend iconType="circle" align="center" verticalAlign="bottom" wrapperStyle={{paddingTop: 20}} />
      <Radar name="Pending" dataKey="Pending" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
      <Radar name="Loss" dataKey="Loss" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.6} />
      <Radar name="Won" dataKey="Won" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.5} />
    </RadarChart>
  </ResponsiveContainer>
);

// Balance Overview Chart
const balanceOverviewData = [
  { name: 'Jan', Revenue: 20, Expenses: 10 },
  { name: 'Feb', Revenue: 25, Expenses: 15 },
  { name: 'Mar', Revenue: 40, Expenses: 20 },
  { name: 'Apr', Revenue: 30, Expenses: 25 },
  { name: 'May', Revenue: 35, Expenses: 18 },
  { name: 'Jun', Revenue: 50, Expenses: 30 },
  { name: 'Jul', Revenue: 60, Expenses: 35 },
  { name: 'Aug', Revenue: 70, Expenses: 40 },
  { name: 'Sep', Revenue: 85, Expenses: 50 },
  { name: 'Oct', Revenue: 75, Expenses: 45 },
  { name: 'Nov', Revenue: 90, Expenses: 60 },
  { name: 'Dec', Revenue: 100, Expenses: 70 },
];

const BalanceOverviewChart: React.FC = () => (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={balanceOverviewData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis unit="k" />
        <Tooltip />
        <Legend iconType="circle" align="center" verticalAlign="bottom" wrapperStyle={{paddingTop: 20}} />
        <Area type="monotone" dataKey="Revenue" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.3} />
        <Area type="monotone" dataKey="Expenses" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
);

const ChartsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Sales Forecast</CardTitle>
          <Select defaultValue="nov-2021">
            <SelectTrigger className="w-[140px] h-8 text-xs focus:ring-primary">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nov-2021">Nov 2021</SelectItem>
              <SelectItem value="oct-2021">Oct 2021</SelectItem>
              <SelectItem value="year-2021">Year 2021</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="pt-4">
          <SalesForecastChart />
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Deal Type</CardTitle>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[120px] h-8 text-xs focus:ring-primary">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="pt-4">
          <DealTypeChart />
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
            <div className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base font-medium">Balance Overview</CardTitle>
                <Select defaultValue="current-year">
                    <SelectTrigger className="w-[140px] h-8 text-xs focus:ring-primary">
                    <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="current-year">Current Year</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-baseline space-x-4 pt-2">
                <p><span className="text-2xl font-bold text-accent">$584k</span> <span className="text-xs text-muted-foreground">Revenue</span></p>
                <p><span className="text-lg font-semibold text-destructive">$497k</span> <span className="text-xs text-muted-foreground">Expenses</span></p>
                <p><span className="text-sm font-medium text-foreground">3.6%</span> <span className="text-xs text-muted-foreground">Profit Ratio</span></p>
            </div>
        </CardHeader>
        <CardContent className="pt-0 pl-0 pr-2 pb-2">
          <BalanceOverviewChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsRow;
