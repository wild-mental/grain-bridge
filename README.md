# GrainBridge

**남는 곳의 식량을, 모자란 곳으로.** GrainBridge는 전 세계의 잉여 곡물과 식량 부족 지역을 연결하고, 그 사이를 잇는 **운송비**를 기부로 채우는 후원 플랫폼 웹사이트입니다.

- 라이브: https://grain-bridge.vercel.app
- 기본 언어는 한국어이며, 상단 토글로 영어로 바꿀 수 있습니다.

## 해결하려는 문제

한쪽에서는 수확 과잉과 재고 적체로 곡물이 버려지고, 다른 쪽에서는 급성 식량 불안(IPC 3단계 이상)을 겪는 인구가 해마다 늘고 있습니다. 식량은 이미 존재하지만, 둘 사이를 잇는 **운송과 물류**가 빈칸으로 남아 있습니다.

GrainBridge는 이 빈칸에 집중합니다.

- **기부자**는 막연한 모금함 대신 지원할 운송 건을 직접 고르고, 식량 구매비가 아니라 운임과 물류비만 후원합니다. 같은 금액으로 더 많은 식량을 옮길 수 있습니다.
- **식량 제공자**는 남는 곡물을 폐기하는 대신 필요한 곳으로 보냅니다.
- **운송 산업**에는 정기적이고 큰 물량이 생기고, **국가**는 가격을 지키려 생산을 줄이지 않아도 되어 장기적인 식량안보를 지킬 수 있습니다.

## 페이지 구성

| 순서 | 섹션 | 내용 |
|---|---|---|
| 1 | 히어로 + 신뢰 원칙 | 핵심 메시지, "지금 운송 후원하기" CTA, 세 가지 약속(운송·물류비 100%, 출처를 밝힌 데이터, 운송 건 단위 공개) |
| 2 | 왜 GrainBridge인가 | 기부자와 원조자(식량 제공자·운송 산업·국가) 각각이 얻는 가치 |
| 3 | 다섯 단계로 이어지는 운송 후원 | 잉여 확인 → 매칭 → 운송비 후원 → 하역·배급 → 임팩트 보고. 사진 중심 갤러리 카드(휴대폰은 가로 스와이프) |
| 4 | 시급한 필요 | GRFC 기준 IPC 3+ 인구 추이와 필요 곡물량 차트·표, IPC 설명 |
| 5 | 글로벌 대시보드 | 대륙·지역별 잉여/부족 표와 비교 차트 |
| 6 | 매칭 & 기부 | 효과가 큰 운송 건 목록(경로, 품목, 물량, 모금 현황)과 후원 모달 |
| 7 | 임팩트 | 지원 인원·전달 곡물·전달 열량, 필요량 대비 전달량 차트 |
| - | `/principles` | 운영 원칙 페이지 |

### 후원 모달

"기부하기"를 누르면 **후원할 운송 건 확인 → 금액 선택(추천 금액 버튼 또는 직접 입력) → 후원 의향 접수 감사 화면** 순서로 진행됩니다. 카드 정보나 이름·이메일 같은 개인정보 입력란은 없고, 결제도 이루어지지 않으며, 입력한 금액은 화면 안에서만 쓰이고 어디로도 전송되지 않습니다.

### 데이터에 대해

- 위기 인구 수치는 식량위기 글로벌 보고서(GRFC)의 IPC/CH 분석을 따르며, 필요 곡물량은 1인 최소 열량 기준 추정치입니다.
- 대시보드의 잉여/부족 수치는 2020–2024년 언론 보도 사례를 바탕으로 재구성한 추정치이고, 매칭 목록의 운송사·도착 예정·모금 현황과 임팩트 수치는 예시·예측 값입니다. 화면에도 각각 그렇게 표시합니다.
- 데이터는 `src/data/mock-data.ts`에 있습니다.

## 기술 스택

- [Next.js](https://nextjs.org/) 15.5 (App Router), React 18, TypeScript
- Tailwind CSS 3, [shadcn/ui](https://ui.shadcn.com/) (Radix UI), lucide-react 아이콘
- recharts (차트)
- next/font로 자체 호스팅하는 Noto Sans KR / Noto Serif KR
- `src/ai/`에는 Genkit 기반 매칭 추천 플로 초안이 있지만, 현재 화면에서는 쓰지 않습니다.

## 로컬 실행

Node.js 20 이상을 권장합니다.

```bash
npm install
npm run dev        # http://localhost:9002
```

## 빌드와 점검

```bash
npm run typecheck  # tsc --noEmit
npm run build      # 프로덕션 빌드
npm start          # 빌드 결과 실행
```

`next.config.ts`가 빌드 중 타입 오류를 무시하도록 설정되어 있으므로, 커밋 전에 `npm run typecheck`를 따로 돌려 주세요.

## 배포

- Vercel 프로젝트 `grain-bridge`에 연결되어 있습니다.
- `master` 브랜치에 push하면 프로덕션(https://grain-bridge.vercel.app)이 자동으로 다시 배포됩니다.
- 자동 배포가 되지 않을 때는 `npx vercel deploy --prod`로 직접 배포할 수 있습니다.
- 필요한 환경 변수는 없습니다.

## 다국어(i18n) 구조

- 모든 화면 문구는 `src/i18n/dictionary.ts`에 있습니다. `ko`와 `en`은 같은 구조를 가지며, 타입 `Dictionary`는 `en`에서 만들어집니다.
- 컴포넌트에서는 `src/i18n/LanguageProvider.tsx`의 `useLanguage()`로 `t`(현재 언어 사전), `tr`(대륙·지역·품목 같은 데이터 값 번역, `koTerms`), `locale`(숫자·통화 형식)을 가져옵니다.
- 기본 언어는 한국어이고, 사용자가 고른 언어는 브라우저 `localStorage`(`grainbridge-lang`)에 저장됩니다.
- 문구를 컴포넌트에 직접 쓰지 말고, 새 키를 `ko`와 `en` 양쪽에 함께 추가하세요.

## 이미지 사용 원칙

- 사이트에는 **퍼블릭 도메인(미국 연방정부 저작물 등) 또는 CC0** 이미지와 프로젝트에서 직접 만든 이미지만 씁니다. 출처 표기가 필요한 CC BY / CC BY-SA 이미지(퍼블릭 도메인과 CC 라이선스가 함께 붙은 이미지 포함)는 쓰지 않습니다.
- 새 이미지는 Wikimedia Commons 파일 페이지에서 라이선스를 다시 확인한 뒤, 크기를 줄이고 WebP로 바꿔 `public/images/`에 넣습니다.
- 사용하는 모든 이미지의 원본 주소, 작성자, 라이선스, 가공 내용은 내부 기록인 [`public/images/CREDITS.md`](public/images/CREDITS.md)에 남깁니다. 이 기록은 사이트에 표시하지 않습니다.
- 수혜자, 특히 아이의 얼굴을 앞세운 사진은 쓰지 않고, 물류와 일하는 사람의 모습으로 과정을 보여 줍니다.

## 폴더 구조

```
src/
  app/             페이지(/, /principles), 레이아웃, 전역 스타일
  components/      섹션 컴포넌트(Hero, ValueSection, HowItWorks, NeedSection, DashboardTabs, MatchMaker, ImpactBoard, DonationDialog …)
  components/ui/   shadcn/ui 컴포넌트
  data/            대시보드·매칭 데이터
  i18n/            사전(dictionary.ts)과 언어 컨텍스트
public/images/     WebP 이미지와 내부 이미지 기록(CREDITS.md)
```

---

## English summary

**GrainBridge** connects regions with surplus grain to regions facing food shortages, and lets donors fund the one missing piece in between: **freight and logistics**. Donors pick a specific shipment and pay only for moving food that already exists, so the same gift moves more food.

- **Live:** https://grain-bridge.vercel.app (Korean by default, English toggle)
- **Sections:** hero and commitments, value for donors and aid providers, five-step photo gallery (surplus found → matched → freight funded → unloaded & distributed → impact reported), urgent need (GRFC IPC 3+ data), global surplus/shortage dashboard, shipment list with a pledge modal, impact, and a `/principles` page.
- **Pledge modal:** confirm the shipment → choose an amount (presets or your own) → thank-you screen. No card or personal-data fields, no payment, nothing is sent anywhere.
- **Stack:** Next.js 15.5 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui, recharts.
- **Run locally:** `npm install`, then `npm run dev` (http://localhost:9002). Build with `npm run build`; run `npm run typecheck` separately because the build ignores type errors.
- **Deploy:** the Vercel project `grain-bridge` deploys production automatically on every push to `master`.
- **i18n:** all UI strings live in `src/i18n/dictionary.ts` (`ko` and `en` share one shape); read them with `useLanguage()`. Never hard-code UI strings.
- **Images:** public domain or CC0 only (or images made for the project), no attribution-required licences. Every image is recorded in `public/images/CREDITS.md`, which is an internal record and is not shown on the site.
