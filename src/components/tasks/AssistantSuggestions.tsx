
"use client";

import React, { useState, useMemo } from 'react';
import {
  suggestTaskOrder,
  type SuggestTaskOrderOutput,
} from '@/ai/flows/suggestTaskOrderFlow';
import { useTasks } from '@/contexts/TasksContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2 } from 'lucide-react';
import type { Task } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AssistantSuggestions({ tasks }: { tasks: Task[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<SuggestTaskOrderOutput | null>(
    null
  );
  const { dispatch } = useTasks();

  const handleGetSuggestion = async () => {
    setLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const result = await suggestTaskOrder({ tasks });
      setSuggestion(result);
    } catch (e) {
      setError('Hubo un error al obtener la sugerencia. Por favor, inténtalo de nuevo.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const applyOrder = () => {
    if (!suggestion) return;
    dispatch({ type: 'REORDER_TASKS', payload: suggestion.orderedTaskIds });
    setSuggestion(null);
  }

  const suggestedTasks = useMemo(() => {
    if (!suggestion) return [];
    const taskMap = new Map(tasks.map((task) => [task.id, task]));
    return suggestion.orderedTaskIds
      .map((id) => taskMap.get(id))
      .filter((t): t is Task => !!t);
  }, [suggestion, tasks]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            Sugerencias del Asistente
        </CardTitle>
        <CardDescription>
            Deja que la IA te ayude a priorizar tus tareas del día.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Analizando tus tareas...</p>
          </div>
        )}
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {suggestion && suggestedTasks.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground italic">"{suggestion.reasoning}"</p>
            <div className="space-y-2 rounded-lg border p-3">
                <h4 className="font-semibold">Orden Sugerido:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    {suggestedTasks.map(task => (
                        <li key={task.id}>{task.title}</li>
                    ))}
                </ol>
            </div>
          </div>
        )}
        {!loading && !suggestion && (
             <p className="text-sm text-center text-muted-foreground py-4">
                {tasks.length > 1 ? "Haz clic en el botón para obtener un plan de acción." : "Agrega al menos dos tareas para obtener una sugerencia."}
            </p>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleGetSuggestion} disabled={loading || tasks.length < 2} className="w-full">
          {loading ? 'Pensando...' : 'Obtener Sugerencia'}
        </Button>
        {suggestion && (
             <Button onClick={applyOrder} variant="secondary" className="w-full">
                Aplicar Orden
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
