"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, LayoutTemplate } from "lucide-react";
import { TaskFormDialog } from '@/components/tasks/TaskFormDialog';
import { Waves } from 'lucide-react';
import { TemplateManagerDialog } from '@/components/templates/TemplateManagerDialog';

export function Header() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTemplateManagerOpen, setTemplateManagerOpen] = useState(false);

  return (
    <>
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Waves className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground font-headline">
                TrackWise
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setTemplateManagerOpen(true)}>
                <LayoutTemplate className="mr-2 h-4 w-4" />
                Manage Templates
              </Button>
              <Button onClick={() => setIsFormOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </div>
          </div>
        </div>
      </header>
      <TaskFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} />
      <TemplateManagerDialog open={isTemplateManagerOpen} onOpenChange={setTemplateManagerOpen} />
    </>
  );
}
