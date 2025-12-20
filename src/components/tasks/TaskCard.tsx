"use client";

import React, { useState } from 'react';
import { format, isPast } from 'date-fns';
import type { Task } from '@/lib/types';
import { useTasks } from '@/contexts/TasksContext';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, MoreVertical, Trash2, CalendarIcon, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { categoryIcons, priorityStyles } from '@/components/icons';
import { TaskFormDialog } from './TaskFormDialog';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';

interface TaskCardProps {
  task: Task;
  onStartFocus: (task: Task) => void;
  isFocusModeActive: boolean;
}

export function TaskCard({ task, onStartFocus, isFocusModeActive }: TaskCardProps) {
  const { dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const CategoryIcon = categoryIcons[task.category];
  const PriorityIcon = priorityStyles[task.priority].icon;

  const handleToggle = () => {
    if (isFocusModeActive) return;
    dispatch({ type: 'TOGGLE_TASK_COMPLETION', payload: task.id });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id });
    setIsDeleting(false);
  };
  
  const isOverdue = !task.completed && isPast(task.dueDate);

  return (
    <>
      <Card className={cn(
        "transition-all duration-300",
        task.completed ? "bg-muted/50" : "bg-card",
        isFocusModeActive && "opacity-50 pointer-events-none"
      )}>
        <CardContent className="p-4 flex items-start gap-4">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={handleToggle}
            className="mt-1"
            aria-label={`Mark task ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
            disabled={isFocusModeActive}
          />
          <div className="flex-grow grid gap-2">
            <label
              htmlFor={`task-${task.id}`}
              className={cn(
                "font-medium cursor-pointer transition-all",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </label>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CategoryIcon className="h-3 w-3" />
                <span>{task.category}</span>
              </div>
              <div className={cn("flex items-center gap-1", priorityStyles[task.priority].color)}>
                <PriorityIcon className="h-3 w-3" />
                <span>{task.priority}</span>
              </div>
              <div className={cn(
                "flex items-center gap-1",
                isOverdue && "text-destructive font-medium"
              )}>
                <CalendarIcon className="h-3 w-3" />
                <span>{format(task.dueDate, 'MMM d')}</span>
              </div>
            </div>
          </div>
          {!isFocusModeActive && (
            <Button variant="outline" size="sm" onClick={() => onStartFocus(task)}>
              <Star className="mr-2 h-4 w-4" />
              Focus
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" disabled={isFocusModeActive}>
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleting(true)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
      {isEditing && (
        <TaskFormDialog
          open={isEditing}
          onOpenChange={setIsEditing}
          taskToEdit={task}
        />
      )}
      {isDeleting && (
        <DeleteConfirmationDialog
          open={isDeleting}
          onOpenChange={setIsDeleting}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
