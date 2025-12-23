"use client";

import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTasks } from '@/contexts/TasksContext';
import type { Category, Priority, TaskTemplate, TemplateTask } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface TemplateManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const templateTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  category: z.enum(['Work', 'School', 'Personal', 'Health']),
  priority: z.enum(['Low', 'Medium', 'High']),
});

const templateSchema = z.object({
  name: z.string().min(3, "Template name must be at least 3 characters."),
  tasks: z.array(templateTaskSchema).min(1, "A template must have at least one task."),
});

type TemplateFormValues = z.infer<typeof templateSchema>;

export function TemplateManagerDialog({ open, onOpenChange }: TemplateManagerDialogProps) {
  const { state, dispatch } = useTasks();
  const { toast } = useToast();

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: "",
      tasks: [{ title: "", category: "Personal", priority: "Medium" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tasks",
  });

  const onSubmit = (data: TemplateFormValues) => {
    const newTemplate: TaskTemplate = {
      id: crypto.randomUUID(),
      name: data.name,
      tasks: data.tasks.map(task => ({ ...task, id: crypto.randomUUID() })),
    };
    dispatch({ type: 'ADD_TEMPLATE', payload: newTemplate });
    toast({ title: "Template Created", description: `Template "${data.name}" has been saved.` });
    form.reset();
  };

  const handleApplyTemplate = (templateId: string) => {
    dispatch({ type: 'APPLY_TEMPLATE', payload: templateId });
    const template = state.templates.find(t => t.id === templateId);
    toast({ title: "Template Applied", description: `Tasks from "${template?.name}" have been added.` });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Task Templates</DialogTitle>
          <DialogDescription>Create and manage your reusable task templates.</DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Existing Templates */}
          <div className="space-y-4">
            <h3 className="font-semibold">Your Templates</h3>
            <ScrollArea className="h-72 rounded-md border p-4">
              {state.templates.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center">No templates yet. Create one!</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {state.templates.map(template => (
                    <AccordionItem key={template.id} value={template.id}>
                      <AccordionTrigger>{template.name}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside text-sm space-y-1 pl-2 text-muted-foreground">
                            {template.tasks.map(task => <li key={task.id}>{task.title}</li>)}
                        </ul>
                        <div className="flex gap-2 mt-4">
                            <Button size="sm" onClick={() => handleApplyTemplate(template.id)} className="flex-1">Apply</Button>
                            <Button variant="destructive" size="sm" onClick={() => dispatch({ type: 'DELETE_TEMPLATE', payload: template.id })}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </ScrollArea>
          </div>

          {/* Create New Template Form */}
          <div>
            <h3 className="font-semibold mb-4">Create New Template</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Template Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Daily Stand-up Prep" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormLabel>Tasks in Template</FormLabel>
                <ScrollArea className="h-48">
                  <div className="space-y-4 pr-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="p-3 border rounded-md relative space-y-2">
                       <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => remove(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      <FormField
                        control={form.control}
                        name={`tasks.${index}.title`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs">Task Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Task title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-2">
                         <FormField
                            control={form.control}
                            name={`tasks.${index}.category`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value as Category}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Work">Work</SelectItem>
                                        <SelectItem value="School">School</SelectItem>
                                        <SelectItem value="Personal">Personal</SelectItem>
                                        <SelectItem value="Health">Health</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name={`tasks.${index}.priority`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Priority</FormLabel>
                                    <Select onValuecha
                                    nge={field.onChange} defaultValue={field.value as Priority}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                            />
                      </div>
                    </div>
                  ))}
                  </div>
                </ScrollArea>
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ title: "", category: "Personal", priority: "Medium" })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Task to Template
                </Button>
                
                <DialogFooter className="pt-4">
                  <Button type="submit">Save Template</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
