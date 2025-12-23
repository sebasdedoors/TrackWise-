'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export function LanguageSelector() {
  const { setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm" onClick={() => setLanguage('en')}>{t('english')}</Button>
      <Button variant="outline" size="sm" onClick={() => setLanguage('es')}>{t('spanish')}</Button>
      <Button variant="outline" size="sm" onClick={() => setLanguage('ja')}>{t('japanese')}</Button>
    </div>
  );
}
