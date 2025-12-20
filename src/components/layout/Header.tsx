"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, LayoutTemplate, LogOut } from "lucide-react";
import { TaskFormDialog } from '@/components/tasks/TaskFormDialog';
import { Waves } from 'lucide-react';
import { TemplateManagerDialog } from '@/components/templates/TemplateManagerDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export function Header() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTemplateManagerOpen, setTemplateManagerOpen] = useState(false);
  const { user, signOut: firebaseSignOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await firebaseSignOut();
    router.push('/login');
  };

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
            {user && (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setTemplateManagerOpen(true)}>
                  <LayoutTemplate className="mr-2 h-4 w-4" />
                  Manage Templates
                </Button>
                <Button onClick={() => setIsFormOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
                 <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign Out">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      {user && (
        <>
          <TaskFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} />
          <TemplateManagerDialog open={isTemplateManagerOpen} onOpenChange={setTemplateManagerOpen} />
        </>
      )}
    </>
  );
}
