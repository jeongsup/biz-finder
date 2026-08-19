import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FileCheck, Clock } from 'lucide-react';

export default function CertificatePage() {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">자격증 진위확인</h1>
        <Badge variant="secondary" className="text-sm">준비 중</Badge>
      </div>

      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-8 flex flex-col items-center gap-4 text-center">
          <div className="p-4 rounded-full bg-muted">
            <FileCheck className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-lg">서비스 준비 중입니다</p>
            <p className="text-muted-foreground text-sm">
              자격증 진위확인 서비스는 현재 개발 중으로,
              <br />
              빠른 시일 내에 제공할 예정입니다.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
            <Clock className="h-3.5 w-3.5" />
            <span>Coming Soon</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
