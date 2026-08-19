'use client';

import { useState } from 'react';
import { BusinessForm } from '@/components/business/BusinessForm';
import { BusinessResult } from '@/components/business/BusinessResult';
import { NTSStatusResponse } from '@/lib/nts';

export default function BusinessPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<NTSStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(businessNumbers: string[]) {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/business/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessNumbers }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || '조회 중 오류가 발생했습니다.');
        return;
      }

      setResult(data);
    } catch {
      setError('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8">
      {/* 페이지 헤더 */}
      <div className="text-center space-y-2 max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight">사업자 휴폐업 조회</h1>
        <p className="text-muted-foreground">
          사업자등록번호를 입력하여 운영 상태, 과세유형, 폐업일자를 조회합니다.
          <br />
          <span className="text-xs">※ 국세청 정보 기준 30분 주기 업데이트</span>
        </p>
      </div>

      {/* 조회 폼 */}
      <BusinessForm onSubmit={handleSubmit} isLoading={isLoading} />

      {/* 조회 결과 */}
      <BusinessResult data={result} error={error} />
    </div>
  );
}
