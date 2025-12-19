import type { Category, Priority } from '@/lib/types';
import { Briefcase, BookOpen, User, HeartPulse, ArrowDown, Minus, ArrowUp, type LucideIcon } from 'lucide-react';

export const categoryIcons: Record<Category, LucideIcon> = {
  Work: Briefcase,
  School: BookOpen,
  Personal: User,
  Health: HeartPulse,
};

export const priorityStyles: Record<Priority, { icon: LucideIcon, color: string }> = {
  Low: { icon: ArrowDown, color: 'text-muted-foreground' },
  Medium: { icon: Minus, color: 'text-foreground' },
  High: { icon: ArrowUp, color: 'text-destructive' },
};
