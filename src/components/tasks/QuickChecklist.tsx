"use client";

import React, { useState } from 'react';
import { useTasks } from '@/contexts/TasksContext';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export function QuickChecklist() {
  const { state, dispatch } = useTasks();
  const [newItemText, setNewItemText] = useState('');
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim() === '') return;

    if (state.checklistItems.length >= 5) {
        toast({
            title: t('quickChecklistFull'),
            description: t('quickChecklistFullDescription'),
            variant: "destructive",
        })
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      text: newItemText,
      completed: false,
    };
    dispatch({ type: 'ADD_CHECKLIST_ITEM', payload: newItem });
    setNewItemText('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">{t('quickChecklist')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddItem} className="flex gap-2 mb-4">
          <Input
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder={t('addQuickItem')}
            disabled={state.checklistItems.length >= 5}
          />
          <Button type="submit" size="icon" disabled={state.checklistItems.length >= 5}>
            <Plus className="h-4 w-4" />
          </Button>
        </form>
        <div className="space-y-2">
          {state.checklistItems.map(item => (
            <div key={item.id} className="flex items-center gap-2 group">
              <Checkbox
                id={`checklist-${item.id}`}
                checked={item.completed}
                onCheckedChange={() => dispatch({ type: 'TOGGLE_CHECKLIST_ITEM', payload: item.id })}
              />
              <label
                htmlFor={`checklist-${item.id}`}
                className={cn(
                  "flex-grow transition-colors",
                  item.completed ? "line-through text-muted-foreground" : ""
                )}
              >
                {item.text}
              </label>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100"
                onClick={() => dispatch({ type: 'DELETE_CHECKLIST_ITEM', payload: item.id })}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
           {state.checklistItems.length === 0 && (
            <p className="text-sm text-center text-muted-foreground py-4">{t('addUpTo5')}</p>
           )}
        </div>
      </CardContent>
    </Card>
  );
}
