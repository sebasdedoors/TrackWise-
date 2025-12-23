"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface FocusModeTimerProps {
  activeTask: Task;
  onEnd: () => void;
}

export function FocusModeTimer({ activeTask, onEnd }: FocusModeTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isPaused || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0) {
      onEnd();
    }
  }, [timeRemaining, onEnd]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl">{t('focusMode')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <p className="text-lg font-medium text-center">{activeTask.title}</p>
        <div className="text-6xl font-bold">{formatTime(timeRemaining)}</div>
        <div className="flex gap-4">
          <Button onClick={togglePause} variant="outline">
            {isPaused ? t('resume') : t('pause')}
          </Button>
          <Button onClick={onEnd} variant="destructive">
            {t('endSession')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
