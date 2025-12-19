"use client";

import React, { useState, useMemo } from 'react';
import { useTasks } from '@/contexts/TasksContext';
import { TaskList } from '@/components/tasks/TaskList';
import { QuickChecklist } from '@/components/tasks/QuickChecklist';
import { AssistantSuggestions } from '@/components/tasks/AssistantSuggestions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { isToday } from 'date-fns';
import type { Category, Priority } from '@/lib/types';

export function TaskDashboard() {
  const { state } = useTasks();
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');

  const todayTasks = useMemo(() => {
    return state.tasks.filter(task => isToday(task.dueDate));
  }, [state.tasks]);

  const filteredTasks = useMemo(() => {
    return todayTasks.filter(task => {
      const categoryMatch = categoryFilter === 'all' || task.category === categoryFilter;
      const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
      return categoryMatch && priorityMatch;
    });
  }, [todayTasks, categoryFilter, priorityFilter]);

  const pendingCount = useMemo(() => filteredTasks.filter(t => !t.completed).length, [filteredTasks]);
  const completedCount = useMemo(() => filteredTasks.filter(t => t.completed).length, [filteredTasks]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Today's Tasks</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Pending: <span className="font-semibold text-foreground">{pendingCount}</span></span>
            <Separator orientation="vertical" className="h-4" />
            <span>Completed: <span className="font-semibold text-foreground">{completedCount}</span></span>
          </div>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as any)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="School">School</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as any)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <TaskList tasks={filteredTasks} />
      </div>
      <div className="space-y-6 lg:mt-16">
        <AssistantSuggestions tasks={todayTasks} />
        <QuickChecklist />
      </div>
    </div>
  );
}
