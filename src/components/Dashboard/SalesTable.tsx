import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Deal {
  id: string;
  name: string;
  lastContacted: string;
  salesRepresentative: {
    name: string;
    avatarUrl?: string;
    avatarFallback: string;
  };
  status: 'Deal Won' | 'Intro Call' | 'Stuck' | 'New Lead';
  dealValue: string;
}

const dealsData: Deal[] = [
  {
    id: '1',
    name: 'Absternet LLC',
    lastContacted: 'Sep 20, 2021',
    salesRepresentative: { name: 'Donald Risher', avatarUrl: 'https://i.pravatar.cc/32?u=donald', avatarFallback: 'DR' },
    status: 'Deal Won' as const,
    dealValue: '$100.1K',
  },
  {
    id: '2',
    name: 'Raitech Soft',
    lastContacted: 'Sep 23, 2021',
    salesRepresentative: { name: 'Sofia Cunha', avatarUrl: 'https://i.pravatar.cc/32?u=sofia', avatarFallback: 'SC' },
    status: 'Intro Call' as const,
    dealValue: '$150K',
  },
  {
    id: '3',
    name: 'William PVT',
    lastContacted: 'Sep 27, 2021',
    salesRepresentative: { name: 'Luis Rocha', avatarUrl: 'https://i.pravatar.cc/32?u=luis', avatarFallback: 'LR' },
    status: 'Stuck' as const,
    dealValue: '$78.18K',
  },
  {
    id: '4',
    name: 'Loiusee LLP',
    lastContacted: 'Sep 30, 2021',
    salesRepresentative: { name: 'Vitoria Rodrigues', avatarUrl: 'https://i.pravatar.cc/32?u=vitoria', avatarFallback: 'VR' },
    status: 'Deal Won' as const,
    dealValue: '$180K',
  },
  {
    id: '5',
    name: 'Futurize Inc.',
    lastContacted: 'Oct 02, 2021',
    salesRepresentative: { name: 'Marco Geller', avatarUrl: 'https://i.pravatar.cc/32?u=marco', avatarFallback: 'MG' },
    status: 'New Lead' as const,
    dealValue: '$95K',
  },
];

const getStatusBadgeClass = (status: Deal['status']) => {
  switch (status) {
    case 'Deal Won':
      return 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30';
    case 'Intro Call':
      return 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30';
    case 'Stuck':
      return 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30';
    case 'New Lead':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
  }
};

const SalesTable: React.FC = () => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Deals Status</CardTitle>
        <Select defaultValue="nov-2021-dec-2021">
          <SelectTrigger className="w-auto h-8 text-xs focus:ring-primary">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nov-2021-dec-2021">02 Nov 2021 to 31 Dec 2021</SelectItem>
            <SelectItem value="oct-2021">Oct 2021</SelectItem>
            <SelectItem value="last-quarter">Last Quarter</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="px-4 py-3">Name</TableHead>
              <TableHead className="px-4 py-3">Last Contacted</TableHead>
              <TableHead className="px-4 py-3">Sales Representative</TableHead>
              <TableHead className="px-4 py-3">Status</TableHead>
              <TableHead className="px-4 py-3 text-right">Deal Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealsData.map((deal) => (
              <TableRow key={deal.id} className="hover:bg-muted/30">
                <TableCell className="font-medium px-4 py-3">{deal.name}</TableCell>
                <TableCell className="text-muted-foreground px-4 py-3">{deal.lastContacted}</TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center">
                    <Avatar className="h-7 w-7 mr-2">
                      <AvatarImage src={deal.salesRepresentative.avatarUrl} alt={deal.salesRepresentative.name} />
                      <AvatarFallback>{deal.salesRepresentative.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{deal.salesRepresentative.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Badge variant="outline" className={cn('capitalize py-1 px-2 text-xs font-normal', getStatusBadgeClass(deal.status))}>
                    {deal.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium px-4 py-3">{deal.dealValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SalesTable;
