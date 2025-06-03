import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import StatsRow from '@/components/Dashboard/StatsRow';
import ChartsRow from '@/components/Dashboard/ChartsRow';
import SalesTable from '@/components/Dashboard/SalesTable';
import TaskList from '@/components/Dashboard/TaskList';
import { Slash } from 'lucide-react';

// Per Component Hierarchy, CRMPage assembles organisms within AdminLayout (MainAppLayout).
// This page represents the "CRM Dashboard Overview" target.

const CRMPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* 
        MainAppLayout handles overall page structure including sidebar, header, 
        and the main content area's padding (p-6) and top margin (mt-[70px]).
        The div below structures the content within that main area.
        "space-y-6" provides vertical spacing between the direct children: 
        Page Header, StatsRow, ChartsRow, and the SalesTable/TaskList grid.
      */}
      <div className="space-y-6">
        {/* Page Header: Title and Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
            CRM Dashboard
          </h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">
              Dashboards
            </a>
            <Slash className="h-3 w-3 mx-1.5 text-muted-foreground/70" />
            <span className="font-medium text-foreground">CRM</span>
          </div>
        </div>

        {/* First row of dashboard content: Statistic Cards */}
        <StatsRow />

        {/* Second row of dashboard content: Charts */}
        <ChartsRow />

        {/* Third row of dashboard content: SalesTable and TaskList */}
        {/* This uses a grid for layout: SalesTable takes 2/3 width, TaskList 1/3 on larger screens */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <SalesTable />
          </div>
          <div className="xl:col-span-1">
            {/* TaskList component is designed to be h-full, so it should adapt to grid cell height */}
            <TaskList />
          </div>
        </div>
      </div>
    </MainAppLayout>
  );
};

export default CRMPage;
