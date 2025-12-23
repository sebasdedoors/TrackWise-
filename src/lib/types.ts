export type Category = 'Work' | 'School' | 'Personal' | 'Health';
export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  category: Category;
  priority: Priority;
  dueDate: Date;
  completed: boolean;
  completionDate?: Date;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TemplateTask {
  id: string;
  title: string;
  category: Category;
  priority: Priority;
}

export interface TaskTemplate {
  id: string;
  name: string;
  tasks: TemplateTask[];
}
