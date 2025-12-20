'use server';
/**
 * @fileOverview Un agente de IA que sugiere el orden óptimo para una lista de tareas.
 *
 * - suggestTaskOrder - Una función que maneja el proceso de sugerencia de orden de tareas.
 * - SuggestTaskOrderInput - El tipo de entrada para la función suggestTaskOrder.
 * - SuggestTaskOrderOutput - El tipo de retorno para la función suggestTaskOrder.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  priority: z.string(),
  dueDate: z.string().datetime(), 
});

const SuggestTaskOrderInputSchema = z.object({
  tasks: z.array(TaskSchema),
});
export type SuggestTaskOrderInput = z.infer<typeof SuggestTaskOrderInputSchema>;

const SuggestTaskOrderOutputSchema = z.object({
  orderedTaskIds: z
    .array(z.string())
    .describe('Un array de IDs de tareas en el orden sugerido.'),
  reasoning: z
    .string()
    .describe(
      'Una explicación concisa de por qué se eligió este orden, destacando la estrategia de priorización.'
    ),
});
export type SuggestTaskOrderOutput = z.infer<typeof SuggestTaskOrderOutputSchema>;

export async function suggestTaskOrder(
  input: SuggestTaskOrderInput
): Promise<SuggestTaskOrderOutput> {
  return suggestTaskOrderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskOrderPrompt',
  input: { schema: SuggestTaskOrderInputSchema },
  output: { schema: SuggestTaskOrderOutputSchema },
  prompt: `Eres un asistente de productividad experto. Tu objetivo es ayudar a los usuarios a ordenar sus tareas diarias para una máxima eficiencia.

Analiza la siguiente lista de tareas para el día de hoy. Considera la prioridad, categoría y el título de cada tarea para determinar el mejor orden de ejecución.

Tareas:
{{#each tasks}}
- ID: {{id}}, Título: "{{title}}", Categoría: {{category}}, Prioridad: {{priority}}
{{/each}}

Devuelve un objeto JSON con dos claves:
1.  'orderedTaskIds': Un array de los IDs de las tareas en el orden que sugieres que se completen.
2.  'reasoning': Una breve explicación (1-2 frases) de tu estrategia. Por ejemplo, "Recomiendo empezar con las tareas de alta prioridad para asegurar que se completen, seguido de un trabajo enfocado en una categoría específica."

Prioriza las tareas de alta prioridad primero. Agrupa las tareas por categoría cuando sea posible para minimizar el cambio de contexto. Las tareas de baja prioridad deben ir al final.`,
});

const suggestTaskOrderFlow = ai.defineFlow(
  {
    name: 'suggestTaskOrderFlow',
    inputSchema: SuggestTaskOrderInputSchema,
    outputSchema: SuggestTaskOrderOutputSchema,
  },
  async (input) => {
    if (input.tasks.length === 0) {
      return {
        orderedTaskIds: [],
        reasoning: 'No hay tareas para sugerir un orden.',
      };
    }
    try {
      const { output } = await prompt(input);
      return output!;
    } catch (error) {
      console.error('Error suggesting task order:', error);
      return {
        orderedTaskIds: input.tasks.map((t) => t.id),
        reasoning:
          'Error al generar sugerencias de la IA. Mostrando el orden original de las tareas.',
      };
    }
  }
);
