"use client";

import type { Task, ChecklistItem, TaskTemplate, TemplateTask } from '@/lib/types';
import React, { createContext, useReducer, useContext, useEffect, ReactNode, useState } from 'react';

// STATE
interface TasksState {
  tasks: Task[];
  checklistItems: ChecklistItem[];
  templates: TaskTemplate[];
}

const initialState: TasksState = {
  tasks: [
    { id: '1', title: 'Design new dashboard layout', category: 'Work', priority: 'High', dueDate: new Date(), completed: false },
    { id: '2', title: 'Read chapter 3 of chemistry book', category: 'School', priority: 'Medium', dueDate: new Date(), completed: false },
    { id: '3', title: 'Go for a 30-minute run', category: 'Health', priority: 'Low', dueDate: new Date(), completed: true, completionDate: new Date() },
    { id: '4', title: 'Schedule dentist appointment', category: 'Personal', priority: 'Medium', dueDate: new Date(), completed: false },
  ],
  checklistItems: [
    { id: 'c1', text: 'Drink water', completed: true },
    { id: 'c2', text: 'Quick stand-up meeting', completed: false },
  ],
  templates: [
      {
        id: 't1',
        name: 'Morning Routine',
        tasks: [
            { id: 'tt1', title: 'Review daily priorities', category: 'Work', priority: 'High' },
            { id: 'tt2', title: 'Check and respond to urgent emails', category: 'Work', priority: 'Medium' },
            { id: 'tt3', title: '15-minute meditation', category: 'Health', priority: 'Low' },
        ]
      }
  ],
};

// ACTIONS
type Action =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK_COMPLETION'; payload: string }
  | { type: 'ADD_CHECKLIST_ITEM'; payload: ChecklistItem }
  | { type: 'TOGGLE_CHECKLIST_ITEM'; payload: string }
  | { type: 'DELETE_CHECKLIST_ITEM'; payload: string }
  | { type: 'SET_INITIAL_STATE'; payload: TasksState }
  | { type: 'REORDER_TASKS'; payload: string[] }
  | { type: 'ADD_TEMPLATE'; payload: TaskTemplate }
  | { type: 'DELETE_TEMPLATE'; payload: string }
  | { type: 'APPLY_TEMPLATE'; payload: string };

// REDUCER
const tasksReducer = (state: TasksState, action: Action): TasksState => {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
        return action.payload;
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
    case 'TOGGLE_TASK_COMPLETION':
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            const isCompleted = !task.completed;
            return { 
              ...task, 
              completed: isCompleted,
              completionDate: isCompleted ? new Date() : undefined,
            };
          }
          return task;
        }),
      };
    case 'REORDER_TASKS': {
      const taskMap = new Map(state.tasks.map(task => [task.id, task]));
      const orderedTasks = action.payload.map(id => taskMap.get(id)).filter((t): t is Task => !!t);
      const remainingTasks = state.tasks.filter(task => !action.payload.includes(task.id));
      return { ...state, tasks: [...orderedTasks, ...remainingTasks] };
    }
    case 'ADD_CHECKLIST_ITEM':
        if (state.checklistItems.length >= 5) return state;
        return { ...state, checklistItems: [...state.checklistItems, action.payload] };
    case 'TOGGLE_CHECKLIST_ITEM':
        return {
            ...state,
            checklistItems: state.checklistItems.map((item) =>
                item.id === action.payload ? { ...item, completed: !item.completed } : item
            ),
        };
    case 'DELETE_CHECKLIST_ITEM':
        return { ...state, checklistItems: state.checklistItems.filter((item) => item.id !== action.payload) };
    case 'ADD_TEMPLATE':
        return { ...state, templates: [...state.templates, action.payload] };
    case 'DELETE_TEMPLATE':
        return { ...state, templates: state.templates.filter(t => t.id !== action.payload) };
    case 'APPLY_TEMPLATE': {
        const template = state.templates.find(t => t.id === action.payload);
        if (!template) return state;
        
        const newTasks = template.tasks.map(templateTask => ({
            ...templateTask,
            id: crypto.randomUUID(),
            dueDate: new Date(),
            completed: false,
        }));
        
        return { ...state, tasks: [...state.tasks, ...newTasks] };
    }
    default:
      return state;
  }
};

// CONTEXT
interface TasksContextType {
  state: TasksState;
  dispatch: React.Dispatch<Action>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

// PROVIDER
export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [hydrated, setHydrated] = useState(false);
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  useEffect(() => {
    try {
      const storedState = localStorage.getItem('trackwise_state');
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        
        // Ensure dates are correctly parsed
        if (parsedState.tasks) {
          parsedState.tasks = parsedState.tasks.map((task: any) => ({
              ...task,
              dueDate: new Date(task.dueDate),
              completionDate: task.completionDate ? new Date(task.completionDate) : undefined,
          }));
        }

        // Initialize templates if not present in stored state
        if (!parsedState.templates) {
            parsedState.templates = initialState.templates;
        }

        dispatch({ type: 'SET_INITIAL_STATE', payload: parsedState });
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if(hydrated) {
        try {
            localStorage.setItem('trackwise_state', JSON.stringify(state));
        } catch (error) {
            console.error("Failed to save state to localStorage", error);
        }
    }
  }, [state, hydrated]);

  if (!hydrated) {
      return null;
  }

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

// HOOK
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};
