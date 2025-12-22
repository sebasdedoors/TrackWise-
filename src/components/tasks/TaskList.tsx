"use client";

import React from 'react';
import type { Task } from '@/lib/types';
import { TaskCard } from './TaskCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface TaskListProps {
  tasks: Task[];
  onStartFocus: (task: Task) => void;
  isFocusModeActive?: boolean;
}

export function TaskList({ tasks, onStartFocus, isFocusModeActive = false }: TaskListProps) {
  const { t } = useLanguage();

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold text-muted-foreground">{t('noTasksToday')}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t('noTasksHint')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onStartFocus={onStartFocus} 
          isFocusModeActive={isFocusModeActive}
        />
      ))}
    </div>
  );
}
