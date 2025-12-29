"use client";

import React, { useState, useMemo } from 'react';
import { useTasks } from '@/contexts/TasksContext';
import { TaskList } from '@/components/tasks/TaskList';
import { QuickChecklist } from '@/components/tasks/QuickChecklist';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { isToday } from 'date-fns';
import type { Task, Category, Priority } from '@/lib/types';
import { ProductivityHub } from './ProductivityHub';
import { FocusModeTimer } from './FocusModeTimer';
import { useLanguage } from '@/contexts/LanguageContext';

export function TaskDashboard() {
  const { state, dispatch } = useTasks();
  const { t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [view, setView] = useState<'today' | 'all'>('today');
  const [focusModeTask, setFocusModeTask] = useState<Task | null>(null);

  const tasksToDisplay = useMemo(() => {
    if (view === 'today') {
      return state.tasks.filter(task => isToday(task.dueDate));
    }
    return state.tasks;
  }, [state.tasks, view]);

  const filteredTasks = useMemo(() => {
    return tasksToDisplay.filter(task => {
      const categoryMatch = categoryFilter === 'all' || task.category === categoryFilter;
      const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
      return categoryMatch && priorityMatch;
    });
  }, [tasksToDisplay, categoryFilter, priorityFilter]);

  const pendingCount = useMemo(() => filteredTasks.filter(t => !t.completed).length, [filteredTasks]);
  const completedCount = useMemo(() => filteredTasks.filter(t => t.completed).length, [filteredTasks]);

  const handleStartFocus = (task: Task) => {
    setFocusModeTask(task);
  };

  const handleEndFocus = () => {
    if (focusModeTask) {
      // Here you might want to log the focused time to the task
      // For now, we'll just end the focus mode
      setFocusModeTask(null);
    }
  };
  
  const isFocusModeActive = focusModeTask !== null;

  if (focusModeTask) {
    return <FocusModeTimer activeTask={focusModeTask} onEnd={handleEndFocus} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight font-headline">{view === 'today' ? t('todaysTasks') : t('allTasks')}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{t('pending')}: <span className="font-semibold text-foreground">{pendingCount}</span></span>
            <Separator orientation="vertical" className="h-4" />
            <span>{t('completed')}: <span className="font-semibold text-foreground">{completedCount}</span></span>
          </div>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
               <Select value={view} onValueChange={(value) => setView(value as any)} disabled={isFocusModeActive}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder={t('filterByView')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">{t('todaysTasks')}</SelectItem>
                  <SelectItem value="all">{t('allTasks')}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as any)} disabled={isFocusModeActive}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder={t('filterByCategory')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allCategories')}</SelectItem>
                  <SelectItem value="Work">{t('work')}</SelectItem>
                  <SelectItem value="School">{t('school')}</SelectItem>
                  <SelectItem value="Personal">{t('personal')}</SelectItem>
                  <SelectItem value="Health">{t('health')}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as any)} disabled={isFocusModeActive}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder={t('filterByPriority')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allPriorities')}</SelectItem>
                  <SelectItem value="Low">{t('low')}</SelectItem>
                  <SelectItem value="Medium">{t('medium')}</SelectItem>
                  <SelectItem value="High">{t('high')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <TaskList tasks={filteredTasks} onStartFocus={handleStartFocus} isFocusModeActive={isFocusModeActive} />
      </div>
      <div className={`space-y-6 ${isFocusModeActive ? 'opacity-50 pointer-events-none' : ''}`}>
        <ProductivityHub />
        <QuickChecklist />
      </div>
    </div>
  );
}
