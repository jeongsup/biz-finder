import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, FileCheck, ArrowRight } from 'lucide-react';

const services = [
  {
    href: '/business',
    icon: Building2,
    title: '사업자 휴폐업 조회',
    description: '사업자등록번호로 사업자의 현재 운영 상태(계속사업자, 휴업, 폐업)와 과세유형을 조회합니다.',
    badge: null,
    available: true,
  },
  {
    href: '/certificate',
    icon: FileCheck,
    title: '자격증 진위확인',
    description: '자격증 번호와 개인정보를 입력하여 자격증의 진위여부를 확인합니다.',
    badge: '준비 중',
    available: false,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-12 py-8">
      {/* 히어로 섹션 */}
      <section className="text-center space-y-4 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          공공API 서비스
        </h1>
        <p className="text-muted-foreground text-lg">
          국가에서 제공하는 공공 데이터를 활용하여 필요한 정보를 쉽고 빠르게 조회하세요.
        </p>
      </section>

      {/* 서비스 카드 */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {services.map(({ href, icon: Icon, title, description, badge, available }) => (
          <Card
            key={href}
            className={`flex flex-col transition-shadow hover:shadow-md ${!available ? 'opacity-60' : ''}`}
          >
            <CardHeader className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="p-2 rounded-md bg-primary/10 w-fit">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                {badge && <Badge variant="secondary">{badge}</Badge>}
              </div>
              <CardTitle className="mt-4">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={href} className="w-full">
                <Button
                  className="w-full gap-2"
                  variant={available ? 'default' : 'secondary'}
                  disabled={!available}
                >
                  {available ? '조회하기' : '준비 중'}
                  {available && <ArrowRight className="h-4 w-4" />}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
