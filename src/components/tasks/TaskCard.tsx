"use client";

import React, { useState } from 'react';
import { format } from 'date-fns';
import type { Task } from '@/lib/types';
import { useTasks } from '@/contexts/TasksContext';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { categoryIcons, priorityStyles } from '@/components/icons';
import { TaskFormDialog } from './TaskFormDialog';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const CategoryIcon = categoryIcons[task.category];
  const PriorityIcon = priorityStyles[task.priority].icon;

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TASK_COMPLETION', payload: task.id });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id });
    setIsDeleting(false);
  };

  return (
    <>
      <Card className={cn(
        "transition-all duration-300",
        task.completed ? "bg-muted/50" : "bg-card"
      )}>
        <CardContent className="p-4 flex items-start gap-4">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={handleToggle}
            className="mt-1"
            aria-label={`Mark task ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
          />
          <div className="flex-grow grid gap-1">
            <label
              htmlFor={`task-${task.id}`}
              className={cn(
                "font-medium cursor-pointer transition-all",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </label>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CategoryIcon className="h-3 w-3" />
                <span>{task.category}</span>
              </div>
              <div className={cn("flex items-center gap-1", priorityStyles[task.priority].color)}>
                <PriorityIcon className="h-3 w-3" />
                <span>{task.priority}</span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
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
