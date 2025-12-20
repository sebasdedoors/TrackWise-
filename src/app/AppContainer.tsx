"use client";

import { TasksProvider } from '@/contexts/TasksContext';
import { Header } from '@/components/layout/Header';
import { TaskDashboard } from '@/components/tasks/TaskDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AppContainer() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <TasksProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TaskDashboard />
        </main>
      </div>
    </TasksProvider>
  );
}
