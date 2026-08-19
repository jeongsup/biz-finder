import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle2, XCircle, PauseCircle } from 'lucide-react';
import {
  NTSStatusResponse,
  NTSBusinessItem,
  getStatusLabel,
  formatBusinessNumber,
  formatDate,
} from '@/lib/nts';

interface BusinessResultProps {
  data: NTSStatusResponse | null;
  error: string | null;
}

function StatusIcon({ code }: { code: string }) {
  if (code === '01') return <CheckCircle2 className="h-5 w-5 text-green-500" />;
  if (code === '02') return <PauseCircle className="h-5 w-5 text-yellow-500" />;
  if (code === '03') return <XCircle className="h-5 w-5 text-destructive" />;
  return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
}

function BusinessItemCard({ item }: { item: NTSBusinessItem }) {
  const { label, variant } = getStatusLabel(item.b_stt_cd);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="text-base font-semibold">
            {formatBusinessNumber(item.b_no)}
          </CardTitle>
          <div className="flex items-center gap-2">
            <StatusIcon code={item.b_stt_cd} />
            <Badge variant={variant}>{label}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <dt className="text-muted-foreground">과세유형</dt>
            <dd className="font-medium mt-0.5">{item.tax_type || '-'}</dd>
          </div>
          {item.b_stt_cd === '03' && (
            <div>
              <dt className="text-muted-foreground">폐업일자</dt>
              <dd className="font-medium mt-0.5">{formatDate(item.end_dt)}</dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
}

export function BusinessResult({ data, error }: BusinessResultProps) {
  if (error) {
    return (
      <Card className="w-full max-w-lg border-destructive">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 text-destructive">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full max-w-lg flex flex-col gap-4">
      {/* 요약 */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>총 {data.request_cnt}건 조회</span>
        <Separator orientation="vertical" className="h-4" />
        <span>유효 {data.valid_cnt}건</span>
        {data.invalid_cnt > 0 && (
          <>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-destructive">유효하지 않음 {data.invalid_cnt}건</span>
          </>
        )}
      </div>

      {/* 결과 카드 목록 */}
      {data.data.map((item) => (
        <BusinessItemCard key={item.b_no} item={item} />
      ))}

      {data.data.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground text-sm">
            조회 결과가 없습니다. 사업자등록번호를 확인해주세요.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
