// app/api/business/status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { NTSStatusRequest, NTSStatusResponse } from '@/lib/nts';

const NTS_API_BASE = 'https://api.odcloud.kr/api/nts-businessman/v1';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessNumbers } = body as { businessNumbers: string[] };

    if (!businessNumbers || !Array.isArray(businessNumbers) || businessNumbers.length === 0) {
      return NextResponse.json(
        { error: '사업자번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    if (businessNumbers.length > 100) {
      return NextResponse.json(
        { error: '한 번에 최대 100개까지 조회 가능합니다.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.NTS_API_KEY;
    if (!apiKey) {
      console.error('NTS_API_KEY is not set');
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    const requestBody: NTSStatusRequest = { b_no: businessNumbers };

    const response = await fetch(
      `${NTS_API_BASE}/status?serviceKey=${encodeURIComponent(apiKey)}&returnType=JSON`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      console.error('NTS API error:', response.status, await response.text());
      return NextResponse.json(
        { error: '국세청 API 호출에 실패했습니다. 잠시 후 다시 시도해주세요.' },
        { status: 502 }
      );
    }

    const data: NTSStatusResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error in business status API:', error);
    return NextResponse.json(
      { error: '예상치 못한 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
