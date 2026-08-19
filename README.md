# 공공API 서비스

국세청 사업자등록정보 조회 API를 활용한 Next.js 웹서비스

## 제공 서비스

- **사업자 휴폐업 조회**: 사업자등록번호로 운영 상태(계속사업자/휴업/폐업), 과세유형, 폐업일자 조회
- **자격증 진위확인**: 준비 중

## 기술 스택

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- next-themes (다크/라이트 모드)

## 로컬 개발

```bash
# 패키지 설치
yarn install

# 환경변수 설정
cp .env.example .env.local
# .env.local 파일에 NTS_API_KEY 값 입력

# 개발 서버 실행
yarn dev
```

## Vercel 배포

1. GitHub에 저장소 생성 후 push
2. [Vercel](https://vercel.com) 대시보드에서 GitHub 저장소 연결
3. Environment Variables에 `NTS_API_KEY` 추가
4. 자동 배포 완료

## 환경변수

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `NTS_API_KEY` | 공공데이터포털 국세청 사업자등록정보 API 서비스키 | ✓ |

## API 출처

- [국세청_사업자등록정보 진위확인 및 상태조회 서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15081808)
