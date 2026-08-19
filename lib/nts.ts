// lib/nts.ts

/** 국세청 API 상태조회 요청 바디 */
export interface NTSStatusRequest {
  b_no: string[]; // 사업자번호 배열 (최대 100개)
}

/** 국세청 API 상태조회 응답 - 개별 사업자 항목 */
export interface NTSBusinessItem {
  b_no: string;         // 사업자번호
  b_stt: string;        // 납세자 상태 (계속사업자, 휴업자, 폐업자)
  b_stt_cd: string;     // 납세자 상태 코드 (01: 계속, 02: 휴업, 03: 폐업)
  tax_type: string;     // 과세유형
  tax_type_cd: string;  // 과세유형 코드
  end_dt: string;       // 폐업일자 (YYYYMMDD)
  utcc_yn: string;      // 단위과세전환 폐업여부 (Y/N)
  tax_type_change_dt: string;
  invoice_apply_dt: string;
  rbf_tax_type: string;
  rbf_tax_type_cd: string;
}

/** 국세청 API 상태조회 전체 응답 */
export interface NTSStatusResponse {
  status_code: string;
  request_cnt: number;
  valid_cnt: number;
  invalid_cnt: number;
  match_cnt: number;
  data: NTSBusinessItem[];
}

/** 사업자번호에서 숫자만 추출 (하이픈 제거) */
export function sanitizeBusinessNumber(raw: string): string {
  return raw.replace(/[^0-9]/g, '');
}

/** 사업자번호 형식 검증 (10자리 + 국세청 체크섬) */
export function validateBusinessNumber(bno: string): boolean {
  const digits = sanitizeBusinessNumber(bno);
  if (digits.length !== 10) return false;
  const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5];
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]) * weights[i];
  }
  sum += Math.floor((parseInt(digits[8]) * 5) / 10);
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(digits[9]);
}

/** 사업자번호 포맷팅 (000-00-00000) */
export function formatBusinessNumber(bno: string): string {
  const digits = sanitizeBusinessNumber(bno);
  if (digits.length !== 10) return bno;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}

/** 상태 코드를 한국어 레이블로 변환 */
export function getStatusLabel(code: string): { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' } {
  switch (code) {
    case '01': return { label: '계속사업자', variant: 'default' };
    case '02': return { label: '휴업자', variant: 'secondary' };
    case '03': return { label: '폐업자', variant: 'destructive' };
    default: return { label: '알 수 없음', variant: 'outline' };
  }
}

/** 날짜 포맷팅 YYYYMMDD → YYYY.MM.DD */
export function formatDate(dateStr: string): string {
  if (!dateStr || dateStr.length !== 8) return '-';
  return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`;
}
