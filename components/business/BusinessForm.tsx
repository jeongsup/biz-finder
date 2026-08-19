'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search, Loader2 } from 'lucide-react';
import { sanitizeBusinessNumber, validateBusinessNumber, formatBusinessNumber } from '@/lib/nts';

interface BusinessFormProps {
  onSubmit: (businessNumbers: string[]) => void;
  isLoading: boolean;
}

export function BusinessForm({ onSubmit, isLoading }: BusinessFormProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const digits = sanitizeBusinessNumber(raw);
    if (digits.length > 10) return;
    setValue(formatBusinessNumber(digits));
    setError('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const digits = sanitizeBusinessNumber(value);
    if (digits.length === 0) {
      setError('사업자등록번호를 입력해주세요.');
      return;
    }
    if (digits.length !== 10) {
      setError('사업자등록번호는 10자리여야 합니다.');
      return;
    }
    if (!validateBusinessNumber(digits)) {
      setError('유효하지 않은 사업자등록번호입니다. 번호를 다시 확인해주세요.');
      return;
    }
    setError('');
    onSubmit([digits]);
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>사업자 상태 조회</CardTitle>
        <CardDescription>
          사업자등록번호 10자리를 입력하면 운영 상태를 조회합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="bno" className="text-sm font-medium">
              사업자등록번호
            </label>
            <Input
              id="bno"
              placeholder="000-00-00000"
              value={value}
              onChange={handleChange}
              disabled={isLoading}
              inputMode="numeric"
              autoComplete="off"
              aria-describedby={error ? 'bno-error' : undefined}
              aria-invalid={!!error}
            />
            {error && (
              <p id="bno-error" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="gap-2">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                조회 중...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                조회하기
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
