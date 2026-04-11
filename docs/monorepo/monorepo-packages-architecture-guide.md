# FSD + 모노레포 패키지 아키텍처 가이드

## 핵심 원칙: FSD `shared/`와 `packages/`는 충돌하지 않습니다

두 개념은 **적용 범위(scope)** 가 다릅니다.

| 개념                 | 적용 범위   | 역할                                                |
| -------------------- | ----------- | --------------------------------------------------- |
| FSD `shared` 레이어  | **앱 내부** | seller 안에서 features/pages/entity가 공통으로 사용 |
| 모노레포 `packages/` | **앱 전체** | seller ↔ admin 둘 다 사용하는 것                   |

<br/>

## 3-Tier 공유 구조

```
[Tier 1] packages/ui                   ← seller ↔ admin 전반에서 사용하는 공통 UI (디자인 시스템)
[Tier 2] apps/seller/src/shared/ui     ← seller 전용 UI (FSD shared 레이어)
[Tier 3] apps/seller/src/shared/block  ← seller 전용 복합 컴포넌트 (비즈니스 로직 포함)
```

<br/>

## packages/ 구조

```
packages/
├── ui/                          # @dessert/ui — 제네릭 디자인 시스템 + 공유 스타일
│   └── src/
│       ├── button/, input/ ...  # 원자 UI 컴포넌트
│       ├── styles/              # 디자인 토큰, 폰트, reset (Figma Single Source of Truth)
│       └── index.ts
├── utils/                       # @dessert/utils — 공통 인프라 유틸
│   └── src/
│       ├── createApiClient.ts   # axios factory function
│       ├── debounce.ts
│       ├── format/              # dateFormat, numberFormat 등
│       └── index.ts
└── config/                      # @dessert/config — 공통 툴링 설정
    └── tsconfig/
        └── base.json
```

> ⚠️ **ESLint는 `packages/config`에 넣지 않습니다.** 루트 단일 `eslint.config.js`로 관리합니다. (아래 ESLint 섹션 참고)

<br/>

## apps/seller/src/shared/ 구조

```
shared/
├── ui/                  # seller 전용 UI (@dessert/ui를 래핑·확장)
│   ├── tab/             # StageTab, ProcessTab (seller 주문 단계 상태값 참조)
│   ├── header/          # LogoHeader (seller 브랜딩)
│   └── ...
├── block/               # seller 전용 복합 컴포넌트
│   ├── lnb/             # seller 좌측 내비
│   ├── bottom-nav-bar/  # seller 하단 내비
│   ├── date-picker/
│   ├── address-input/   # 외부 주소 API 연동
│   └── ...
├── utils/
│   ├── axios.ts         # @dessert/utils의 createApiClient를 seller 설정으로 조립
│   ├── cookieUtils.ts
│   └── ...
├── constant/
│   ├── routes.ts        # seller 라우트 경로
│   └── ...
└── libs/
    └── utils.ts         # cn() — 추후 @dessert/ui로 이동 가능
```

<br/>

## 어디에 둘까? — 판단 기준

```
이 코드를 admin에서도 쓸 것인가?
  ├── YES
  │   ├── 앱마다 설정값이 달라지는가? (baseURL, 토큰 출처 등)
  │   │   ├── YES → packages/에 "factory function"으로 추출
  │   │   │         각 앱이 설정을 주입해서 인스턴스를 생성
  │   │   └── NO  → packages/에 직접 이동 (완전 제네릭)
  │   └── seller 도메인 규칙이 코드에 직접 포함되어 있는가?
  │         (주문 상태값, 정산 규칙, seller 내비게이션 구조 등)
  │         └── YES → 앱 내부에 유지
  └── NO → apps/seller/src/shared/ 에 그대로 유지 (FSD shared 레이어)
```

### "비즈니스 도메인 로직" vs "앱 고유 설정" 구분

| 유형                     | 예시                                             | 판단                           |
| ------------------------ | ------------------------------------------------ | ------------------------------ |
| **비즈니스 도메인 로직** | 주문 단계 상태값(StageTab), 정산 계산, 상품 규칙 | 앱 내부 유지                   |
| **앱 고유 설정**         | seller Bearer token 출처, seller baseURL         | factory function으로 추출 가능 |
| **완전 제네릭**          | cn(), debounce(), 날짜 포맷터                    | packages/로 직접 이동          |

> **원칙**: 미리 package 폴더에 포함시키지 않습니다. **중복이 생기는 시점에 이동합니다.**

<br/>

## 스타일 공유 방법

디자인 토큰(`tokens.pcss`), 폰트, reset 등은 `packages/ui/styles`에서 관리합니다.
각 앱의 `index.css`는 공유 스타일을 import하는 얇은 진입점만 남깁니다.

```css
/* apps/seller/src/styles/index.css */
@import '@dessert/ui/styles'; /* 공유 디자인 시스템 (토큰, 폰트, reset) */

/* seller 전용 스타일 오버라이드가 있다면 여기에 */
```

```css
/* apps/admin/src/styles/index.css */
@import '@dessert/ui/styles'; /* 동일한 공유 스타일 */
```

<br/>

## Factory Function 패턴 — 인프라 코드 공유 방법

axios처럼 **공통 패턴이지만 앱별 설정이 필요한 인프라 코드**는 factory function으로 추출합니다.

### packages/utils/src/createApiClient.ts

```typescript
import axios from 'axios'

export function createApiClient(options: {
  baseURL: string
  getToken: () => string | undefined
}) {
  const client = axios.create({
    baseURL: options.baseURL,
    headers: { 'Content-Type': 'application/json' },
  })

  client.interceptors.request.use((config) => {
    const token = options.getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  return client
}
```

### apps/seller/src/shared/utils/axios.ts — seller 설정으로 조립

```typescript
import { createApiClient } from '@dessert/utils'
import { getCookie } from '@/shared/utils/cookieUtils'

export const client = createApiClient({
  baseURL: import.meta.env.VITE_PUBLIC_SERVER_URL,
  getToken: () => getCookie('accessToken'), // seller 쿠키 전략
})
```

### apps/admin/src/shared/utils/axios.ts — admin 설정으로 조립

```typescript
import { createApiClient } from '@dessert/utils'

export const client = createApiClient({
  baseURL: import.meta.env.VITE_ADMIN_SERVER_URL,
  getToken: () => localStorage.getItem('adminToken'), // admin 토큰 전략
})
```

> **핵심**: `createApiClient`는 공통 인터셉터 로직을 담은 팩토리 함수입니다.
> 각 앱의 `axios.ts`는 앱별 `baseURL`과 토큰 전략을 주입해 실제 axios 인스턴스를 생성합니다.

<br/>

## ESLint 설정

ESLint는 **루트 단일 `eslint.config.js`** 로 관리합니다. `packages/config`에 넣지 않습니다.

앱별로 다른 설정(tsconfig 경로, CSS entryPoint 등)은 ESLint flat config의 `files` 패턴으로 분기합니다.
자세한 설정은 루트의 `eslint.config.js`를 참고하세요.

<br/>

## 레이어 간 의존성 흐름

```
packages/utils          createApiClient()
        ↓
apps/seller/src/shared/utils/axios.ts   client = createApiClient({ seller 설정 })
        ↓
apps/seller/src/entity/order/order.api.ts   import { client } from '@/shared/utils/axios'
```

```
packages/ui/styles      tokens.pcss, fonts.pcss, reset.css
        ↓
apps/seller/src/styles/index.css        @import '@dessert/ui/styles'
```

```
packages/ui             Button, Input, Badge 등 원자 컴포넌트
        ↓
apps/seller/src/shared/ui/tab/StageTab  import { Button } from '@dessert/ui'
        ↓
apps/seller/src/features/order/         import { StageTab } from '@/shared/ui/tab'
        ↓
apps/seller/src/pages/orders/           import { OrderTable } from '@/features/order'
```

- `packages/`는 외부 라이브러리처럼 취급합니다. FSD 레이어 규칙 적용 대상이 아닙니다.
- FSD 레이어 규칙은 `apps/` 내부에서만 적용됩니다.

<br/>

## FAQ

**Q. `packages/ui`에 FSD 레이어 구조를 적용해야 하나요?**

아니요. `packages/ui`는 외부 라이브러리(shadcn/ui, radix-ui)처럼 취급합니다. 내부 구조는 컴포넌트 단위로 나누면 충분하고, FSD 레이어(entity/features/pages) 개념은 `apps/` 내부에만 적용합니다.

**Q. `shared/block/`도 `packages/ui`로 옮겨야 하나요?**

아니요. `block/` 컴포넌트들은 seller 비즈니스 로직(주소 API, seller 인증 플로우, seller 내비게이션 구조)을 내포하고 있어 제네릭하지 않습니다. admin이 동일한 패턴이 필요해지더라도, admin용 block을 별도로 만드는 것이 더 적합합니다. (`shared/block`을 `widgets`로 마이그레이션 할 가능성이 있습니다.)

**Q. `axios.ts`는 왜 `packages/`에 직접 넣지 않고 factory 패턴을 쓰나요?**

인터셉터 코드 자체는 비즈니스 로직이 아닙니다. 그러나 seller와 admin은 **토큰을 꺼내는 방법**(쿠키 vs localStorage)과 **baseURL**이 다릅니다. factory function으로 설정을 분리해야 두 앱이 독립적으로 자신의 strategy을 주입할 수 있습니다.

**Q. `packages/config`에는 결국 무엇이 들어가나요?**

`tsconfig/base.json`만 들어갑니다. ESLint는 루트에서 단일 관리하므로, `packages/config`가 담당하는 것은 각 앱이 `extends`할 수 있는 **공통 TypeScript 설정**뿐입니다.
