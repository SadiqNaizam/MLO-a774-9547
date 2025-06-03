import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input'; // For potential add task input

interface Task {
  id: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

const initialTasksData: Task[] = [
  {
    id: '1',
    description: 'Review and make sure nothing slips through cracks',
    completed: false,
    dueDate: '15 Sep, 2021',
  },
  {
    id: '2',
    description: 'Send meeting invites for sales upcampaign',
    completed: true,
    dueDate: '20 Sep, 2021',
  },
  {
    id: '3',
    description: 'Weekly closed sales won checking with sales team',
    completed: false,
    dueDate: '24 Sep, 2021',
  },
  {
    id: '4',
    description: 'Add notes that can be viewed from the individual view',
    completed: false,
    dueDate: '27 Sep, 2021',
  },
  {
    id: '5',
    description: 'Move stuff to another page',
    completed: true,
    dueDate: '27 Sep, 2021',
  },
  {
    id: '6',
    description: 'Prepare for Q4 planning session',
    completed: false,
    dueDate: '01 Oct, 2021',
  },
  {
    id: '7',
    description: 'Follow up with new leads from conference',
    completed: false,
    dueDate: '05 Oct, 2021',
  },
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasksData);
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');
  const [showAddTaskInput, setShowAddTaskInput] = useState<boolean>(false);

  const handleToggleComplete = useCallback((taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleAddTask = useCallback(() => {
    if (newTaskDescription.trim() === '') return;
    const newTask: Task = {
      id: String(Date.now()),
      description: newTaskDescription.trim(),
      completed: false,
      dueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}),
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setNewTaskDescription('');
    setShowAddTaskInput(false);
  }, [newTaskDescription]);

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const remainingTasksCount = tasks.length - completedTasksCount;

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b">
        <CardTitle className="text-lg font-semibold">My Tasks</CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="default" size="sm" className="h-8 bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700" onClick={() => setShowAddTaskInput(prev => !prev)}>
            <PlusCircle className="h-4 w-4 mr-1.5" /> Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow flex flex-col">
        <div className="p-4 text-sm text-muted-foreground">
          <span>{remainingTasksCount}</span> of <span>{tasks.length}</span> remaining
        </div>
        {showAddTaskInput && (
          <div className="px-4 pb-3 flex items-center space-x-2 border-b">
            <Input 
              placeholder="New task description..."
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              className="h-9 focus-visible:ring-primary"
            />
            <Button size="sm" onClick={handleAddTask} className="h-9">Add</Button>
          </div>
        )}
        <ScrollArea className="flex-grow p-4 pt-0">
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-3 py-2 border-b border-dashed last:border-none">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleToggleComplete(task.id)}
                  className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    'flex-grow text-sm font-medium leading-none',
                    task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                  )}
                >
                  {task.description}
                </label>
                <span className={cn('text-xs', task.completed ? 'text-muted-foreground' : 'text-foreground/80')}>{task.dueDate}</span>
              </div>
            ))}
            {tasks.length === 0 && !showAddTaskInput && (
                <p className="text-sm text-muted-foreground text-center py-4">No tasks yet. Add one!</p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TaskList;
