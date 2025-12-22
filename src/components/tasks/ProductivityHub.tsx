"use client";

import React, { useMemo } from 'react';
import { useTasks } from '@/contexts/TasksContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Flame, Target, TrendingUp, CheckCircle, CalendarDays } from 'lucide-react';
import { startOfDay, differenceInCalendarDays, isSameDay } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getDay, startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductivityStat = ({ icon: Icon, value, label, color }: { icon: React.ElementType, value: string | number, label: string, color?: string }) => (
  <div className="flex items-center gap-4">
    <div className={`p-2 rounded-full bg-primary/10 ${color || 'text-primary'}`}>
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </div>
);

const WeeklyView = () => {
    const { state } = useTasks();
    const { t } = useLanguage();
    const today = startOfDay(new Date());
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const tasksByDay = useMemo(() => {
        const map = new Map<string, number>();
        state.tasks.forEach(task => {
            const dayKey = format(task.dueDate, 'yyyy-MM-dd');
            map.set(dayKey, (map.get(dayKey) || 0) + 1);
        });
        return map;
    }, [state.tasks]);

    return (
        <div>
            <h4 className="font-semibold text-sm mb-2">{t('weeklyOverview')}</h4>
            <div className="flex justify-between text-center text-xs">
                {weekDays.map(day => {
                    const dayKey = format(day, 'yyyy-MM-dd');
                    const taskCount = tasksByDay.get(dayKey) || 0;
                    const isCurrentDay = isSameDay(day, today);

                    return (
                        <div key={day.toString()} className="flex flex-col items-center gap-1">
                            <span className="text-muted-foreground">{format(day, 'E')[0]}</span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold relative ${isCurrentDay ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                {format(day, 'd')}
                                {taskCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
                                        {taskCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export function ProductivityHub() {
  const { state } = useTasks();
  const { t } = useLanguage();

  const { streak, onTimePercentage, totalCompleted } = useMemo(() => {
    const completedTasks = state.tasks.filter(t => t.completed && t.completionDate);
    if (completedTasks.length === 0) {
      return { streak: 0, onTimePercentage: 0, totalCompleted: 0 };
    }

    // Calculate Streak
    completedTasks.sort((a, b) => b.completionDate!.getTime() - a.completionDate!.getTime());
    
    const uniqueCompletionDays = Array.from(new Set(completedTasks.map(t => startOfDay(t.completionDate!).getTime())));

    let currentStreak = 0;
    if (uniqueCompletionDays.length > 0) {
        const today = startOfDay(new Date());
        const lastCompletionDay = new Date(uniqueCompletionDays[0]);

        if (isSameDay(lastCompletionDay, today) || differenceInCalendarDays(today, lastCompletionDay) === 1) {
            currentStreak = 1;
            for (let i = 1; i < uniqueCompletionDays.length; i++) {
                const day = new Date(uniqueCompletionDays[i-1]);
                const prevDay = new Date(uniqueCompletionDays[i]);
                if (differenceInCalendarDays(day, prevDay) === 1) {
                    currentStreak++;
                } else {
                    break;
                }
            }
        }
    }

    // Calculate on-time percentage
    const onTimeTasks = completedTasks.filter(t => 
        t.completionDate! <= startOfDay(t.dueDate) || isSameDay(t.completionDate!, t.dueDate)
    ).length;

    const percentage = Math.round((onTimeTasks / completedTasks.length) * 100);

    return {
      streak: currentStreak,
      onTimePercentage: percentage,
      totalCompleted: completedTasks.length
    };
  }, [state.tasks]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {t('productivityHub')}
        </CardTitle>
        <CardDescription>{t('productivityHubDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProductivityStat icon={Flame} value={streak} label={t('dayStreak')} color="text-orange-500" />
            <ProductivityStat icon={Target} value={`${onTimePercentage}%`} label={t('onTimeRate')} color="text-green-500" />
            <ProductivityStat icon={CheckCircle} value={totalCompleted} label={t('totalCompleted')} color="text-blue-500" />
            <ProductivityStat icon={CalendarDays} value={7} label={t('tasksThisWeek')} />
        </div>
        <WeeklyView />
      </CardContent>
    </Card>
  );
}
