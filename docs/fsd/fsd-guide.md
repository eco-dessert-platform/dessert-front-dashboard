# FSD (Feature-Sliced Design) 아키텍처 가이드

> FSD 공식 문서: https://feature-sliced.design/kr

## 이 프로젝트의 레이어 구조

이 프로젝트는 FSD를 기반으로 하되, **Widgets 레이어 없이** 프로젝트 규모에 맞게 단순화한 구조를 사용합니다.
(Widgets의 역할은 `shared/block`이 담당합니다.

```
apps/seller/src/
├── app/         # 앱 진입점 — 라우터, 전역 Provider, 전역 ErrorBoundary
├── pages/       # 라우트 단위 페이지 컴포넌트
├── features/    # 사용자 시나리오 단위 기능 (폼 제출, 필터, 정렬 등)
├── entity/      # 도메인 모델 — 타입, API Queries, 기본 UI
├── shared/      # 앱 전체 공유 리소스
│   ├── ui/      # 비즈니스 로직 없는 순수 UI 컴포넌트
│   ├── block/   # 비즈니스 로직이 포함된 복합 컴포넌트 (LNB, BottomNavBar 등)
│   ├── utils/   # 순수 함수 유틸리티
│   ├── libs/    # 외부 라이브러리 설정 (axios 인스턴스 등)
│   └── constant/ # 전역 상수
└── assets/      # 이미지, 폰트
```

### 레이어별 역할 요약

| 레이어         | 역할           | 비즈니스 로직 | 예시                               |
| -------------- | -------------- | :-----------: | ---------------------------------- |
| `app`          | 앱 전체 초기화 |      ✅       | Router, QueryClientProvider        |
| `pages`        | 라우트 조합    |    최소화     | OrdersPage, ProductsPage           |
| `features`     | 단일 기능 단위 |      ✅       | useCreateOrder, ProductFilterForm  |
| `entity`       | 도메인 데이터  |   ✅ (읽기)   | useOrderList, ProductCard          |
| `shared/ui`    | 순수 UI 원자   |      ❌       | Spinner, EmptyState                |
| `shared/block` | 복합 UI 블록   |      ✅       | LNB, BottomNavBar, DateRangePicker |
| `shared/utils` | 유틸 함수      |      ❌       | formatPrice, parseDate             |

<br/>

## 핵심 규칙 3가지

### 규칙 1: 단방향 의존성 — 상위 레이어는 하위 레이어만 참조

```
app → pages → features → entity → shared
```

각 레이어는 **자신보다 하위에 있는 레이어만 import할 수 있습니다.**
상위 레이어를 향하는 import는 **절대 금지**입니다.

```typescript
// ✅ 허용 — features가 entity를 참조
// features/order/model/useCreateOrder.ts
import { orderApi } from '@/entity/order'

// ✅ 허용 — entity가 shared를 참조
// entity/order/ui/OrderCard.tsx
import { Badge } from '@/shared/ui'

// ❌ 금지 — entity가 features를 참조 (상위 레이어 참조)
// entity/order/api/hooks.ts
import { useOrderFilter } from '@/features/order' // ← 위반!

// ❌ 금지 — features/order가 features/product를 참조 (같은 레이어 간 cross-import)
// features/order/ui/OrderForm.tsx
import { ProductSelector } from '@/features/product' // ← 위반!
```

> **`app`과 `shared`는 예외**: `shared`는 모든 레이어에서 자유롭게 import 가능하고,
> `app`은 모든 레이어를 참조할 수 있습니다.

**의존성 규칙을 어기면 발생하는 문제:**

- 한 모듈 수정 시 다른 모듈이 예측 불가능하게 깨짐
- 순환 참조(Circular Dependency) → 빌드 실패
- 독립적 테스트 불가능

### 규칙 2: Public API — 각 슬라이스는 `index.ts`로만 노출

각 슬라이스(레이어 안의 폴더)는 반드시 **`index.ts`를 통해서만** 외부에 기능을 공개합니다.
내부 파일 경로로 직접 접근하는 것은 금지합니다.

```typescript
// entity/order/index.ts  ← Public API 정의
export { useOrderList, useOrderDetail } from './api/hooks'
export { orderKeys } from './api/query-keys'
export type { Order, OrderStatus } from './model/types'
export { OrderCard } from './ui/OrderCard'
export { OrderStatusBadge } from './ui/OrderStatusBadge'
```

```typescript
// ✅ 올바른 사용 — index.ts를 통해 접근
import { useOrderList, OrderCard } from '@/entity/order'

// ❌ 잘못된 사용 — 내부 구현 파일에 직접 접근
import { useOrderList } from '@/entity/order/api/hooks' // ← 위반!
import { OrderCard } from '@/entity/order/ui/OrderCard' // ← 위반!
```

**왜 Public API가 중요한가:**

- 내부 구현을 바꿔도 외부에 영향을 주지 않음 (캡슐화)
- `index.ts`만 보면 해당 슬라이스가 무엇을 제공하는지 한눈에 파악 가능
- 의도치 않은 의존성 생성 방지

### 규칙 3: Cross-import 금지 — 같은 레이어 내 슬라이스 간 참조 금지

**같은 레이어에 있는 다른 슬라이스**는 서로 참조할 수 없습니다.

```typescript
// ❌ features/order가 features/product를 참조 — Cross-import!
// features/order/ui/OrderForm.tsx
import { ProductSelector } from '@/features/product'

// ✅ 해결 방법 1: 공통 로직을 하위 레이어로 이동
// entity/product에 ProductSelector를 두고 양쪽에서 참조

// ✅ 해결 방법 2: shared로 이동
// 정말 공통적인 순수 UI라면 shared/ui로
```

**Cross-import 발생 패턴과 해결책:**

| 상황                           | 잘못된 방법                                     | 올바른 방법                           |
| ------------------------------ | ----------------------------------------------- | ------------------------------------- |
| 두 features가 같은 데이터 필요 | `features/a`에서 `features/b` import            | `entity/x`에 데이터 Query 정의        |
| 두 features가 같은 UI 필요     | `features/a`에서 `features/b`의 컴포넌트 import | `shared/ui` 또는 `entity/x/ui`로 이동 |
| 두 pages가 같은 로직 필요      | `pages/a`에서 `pages/b` import                  | `features/x`로 로직 추출              |

<br/>

## 실전 패턴

### React Query 배치 기준

React Query를 FSD와 함께 사용할 때 **어디에 훅을 두어야 할지**는 다음 기준으로 판단합니다.

```
entity/   ← useQuery (읽기 전용)
features/ ← useMutation (데이터 변경)
```

**entity 레이어에 useQuery 배치:**

```typescript
// entity/order/api/hooks.ts
import { useQuery } from '@tanstack/react-query'
import { orderKeys } from './query-keys'
import { fetchOrderList } from './order.api'

// 여러 features에서 재사용되는 조회 훅 → entity에 배치
export const useOrderList = (params: OrderListParams) => {
  return useQuery({
    queryKey: orderKeys.list(params),
    queryFn: () => fetchOrderList(params),
  })
}
```

**features 레이어에 useMutation 배치:**

```typescript
// features/order/model/mutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderKeys } from '@/entity/order'
import { createOrder } from '../api/order.api'

// 특정 기능(주문 생성)에 귀속된 변경 훅 → features에 배치
export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all })
    },
  })
}
```

> **왜 이렇게 나누나요?** > `useOrderList`는 주문 목록 페이지, 주문 통계 features 등 **여러 곳**에서 재사용됩니다.
> entity에 두면 중복 없이 공유할 수 있습니다.
> `useCreateOrder`는 **주문 생성 기능에만** 사용되므로 해당 features에 두는 것이 응집도를 높입니다.

### Segments — 슬라이스 내부 구조

슬라이스(레이어 내 폴더) 내부는 **segments(세그먼트)** 로 역할을 나눕니다.
이 프로젝트는 서브디렉토리 대신 **파일 접미사**로 세그먼트를 구분합니다.

**entity 세그먼트 구조 — `entity/order/` 예시:**

```
entity/order/
├── order.api.ts       # API 호출 함수 (axios)
├── order.type.ts      # 도메인 타입 · 인터페이스
├── order.constant.ts  # UI 설정 상수 (라벨, 뱃지 색상, 액션 버튼 설정)
├── order.query.ts     # React Query 옵션 (queryKey 팩토리 + queryFn)
└── order.mock.ts      # 목 데이터 · 필터 함수 (개발/테스트용)
```

| 세그먼트 | 파일 접미사    | 역할                                                            |
| -------- | -------------- | --------------------------------------------------------------- |
| api      | `.api.ts`      | axios 호출 함수. `features`는 이 함수를 직접 호출하지 않음      |
| type     | `.type.ts`     | 도메인 타입. `features`에서 import만 함                         |
| constant | `.constant.ts` | 상태-라벨, 상태-색상, 탭별 버튼 설정 등 UI 상수                 |
| query    | `.query.ts`    | `queryKey` 팩토리 + `queryOptions`. `useQuery`는 pages에서 호출 |
| mock     | `.mock.ts`     | 개발용 목 데이터 및 필터 함수                                   |

**features 세그먼트 구조 — `features/order/` 예시:**

```
features/order/
├── order-filters/
│   ├── order-filters.hook.ts  # 필터 UI 상태 관리 (draft/applied 패턴)
│   └── order-filters.ui.tsx   # 필터 입력 컴포넌트
├── order-table/
│   ├── order-selection.hook.ts  # 행 선택 상태 관리
│   └── order-table.ui.tsx       # 테이블 컴포넌트
├── order-status-tabs/
│   └── order-status-tabs.ui.tsx
└── order-action-bar/
    └── order-action-bar.ui.tsx
```

| 세그먼트 | 파일 접미사 | 역할                                                        |
| -------- | ----------- | ----------------------------------------------------------- |
| ui       | `.ui.tsx`   | 순수 프레젠테이션. entity의 타입·상수를 props로 받아 렌더링 |
| hook     | `.hook.ts`  | UI 상태 관리. 비즈니스 로직은 entity에 위임                 |

> **핵심 원칙**: `features`에는 `.api.ts`가 없습니다.
> API 호출은 항상 `entity`의 `query.ts`를 통해 `useQuery`로만 이루어집니다.

### `shared/block` vs `shared/ui` — 언제 어디에 둘까?

이 프로젝트는 표준 FSD의 `widgets` 레이어 대신 `shared/block`을 사용합니다.

**판단 기준: "상위 레이어(entity/features)에 의존하는가?"**

```
shared/ui    ← 상위 레이어 의존 ❌ — 순수 props 기반 UI만
shared/block ← 상위 레이어 의존 ✅ — entity/features 데이터 사용 가능
```

**shared/ui 예시 — 비즈니스 로직 없는 순수 UI:**

```typescript
// shared/ui/EmptyState.tsx
interface EmptyStateProps {
  title: string
  description?: string
}
export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-lg font-semibold">{title}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  )
}
```

**shared/block 예시 — entity/features 데이터를 사용하는 복합 컴포넌트:**

```typescript
// shared/block/LNB/LNB.tsx
import { useAuthStore } from '@/entity/auth'        // entity 참조 ← shared/block이라 가능
import { LNBNavItem } from '../LNBNavItem'

export function LNB() {
  const { user } = useAuthStore()
  return (
    <nav>
      <LNBNavItem href="/products">상품 관리</LNBNavItem>
      <LNBNavItem href="/orders">주문 관리</LNBNavItem>
      {user?.isAdmin && <LNBNavItem href="/settings">설정</LNBNavItem>}
    </nav>
  )
}
```

**빠른 판단 체크리스트:**

```
컴포넌트가 entity나 features를 import하는가?
├─ No  → shared/ui (순수 props 기반으로 작성)
└─ Yes → shared/block (복합 컴포넌트)
         └─ 두 앱(seller + admin) 모두 필요한가?
            ├─ Yes → packages/ui나 packages/icons로 이동 검토
            └─ No  → 해당 앱의 shared/block에 유지
```

<br/>

## 모노레포 3-Tier 공유 구조

FSD는 앱 **내부** 구조를 담당하고, 모노레포의 `packages/`는 앱 **간** 공유를 담당합니다.
이 두 구조를 결합하면 다음과 같은 3단계 공유 계층이 만들어집니다.

```
[Tier 1] packages/ui (@dessert/ui)
  └─ seller + admin 모두 사용 — 디자인 시스템 원자 (Button, Input, Badge...)

[Tier 2] apps/seller/src/shared/ui
  └─ seller 전용 순수 UI — @dessert/ui에 올리기엔 seller 특화적인 컴포넌트

[Tier 3] apps/seller/src/shared/block
  └─ seller 전용 복합 컴포넌트 — entity/features 참조, 비즈니스 로직 포함
```

**"어디에 둘까?" 의사결정 흐름:**

```
새 컴포넌트를 만들었다
    │
    ▼
seller와 admin 둘 다 쓰는가?
    ├─ Yes → 비즈니스 로직이 없는가?
    │            ├─ Yes → packages/ui (@dessert/ui)
    │            └─ No  → 각 앱의 shared/block에서 packages/ui를 조합
    │
    └─ No (seller 전용)
             │
             ▼
         entity/features를 참조하는가?
             ├─ Yes → apps/seller/src/shared/block
             └─ No  → apps/seller/src/shared/ui
```

→ [모노레포 패키지 아키텍처 가이드](../monorepo/monorepo%20architecture/monorepo-packages-architecture-guide.md)

<br/>

## 팀 논의 필요 사항

현재 프로젝트에서 개선이 필요하다고 판단되는 부분입니다. 팀원들의 의견을 듣고 방향을 결정하고자 합니다.

### 1. Public API (`index.ts`) 도입

**현재 상태**: 각 슬라이스에 `index.ts`가 없어 내부 파일 경로로 직접 import함

```typescript
// 현재 방식 (내부 파일 직접 접근)
import { OrderItem } from '@/entity/order/order.type'
import { orderQueries } from '@/entity/order/order.query'
```

**제안**: 각 슬라이스에 `index.ts`를 두어 Public API를 통해서만 접근

```typescript
// entity/order/index.ts
export type { OrderItem, OrderStatus, OrderFilters } from './order.type'
export { orderQueries } from './order.query'
export { ORDER_STATUS_LABELS, ORDER_ACTION_BAR_CONFIG } from './order.constant'

// 사용하는 곳
import { OrderItem, orderQueries } from '@/entity/order'
```

**기대 효과**:

- 내부 파일을 리팩토링해도 외부 import 경로가 바뀌지 않음 (캡슐화)
- `index.ts`만 보면 해당 슬라이스가 무엇을 외부에 제공하는지 한눈에 파악 가능
- 의도치 않은 내부 구현 의존 방지

**논의 포인트**: 기존 import 경로를 일괄 변경하는 비용 vs 장기적 유지보수 이점

### 2. `shared/block` → `widgets` 레이어 마이그레이션

**현재 상태**: `shared/block`이 Widgets 역할을 대신하고 있으나, 내부에서 `entity`를 직접 import함

```typescript
// shared/block/LNB/LNB.tsx
import { useAuthStore } from '@/entity/auth' // ← shared가 entity(상위 레이어)를 참조!
```

**문제점**: FSD 원칙상 `shared`는 어떤 상위 레이어도 import할 수 없습니다.
현재 `shared/block`은 이 규칙의 **예외**로 운영되고 있어 구조적 일관성이 깨진 상태입니다.

**제안**: `shared/block`을 별도 `widgets` 레이어로 분리

```
현재                          변경 후
apps/seller/src/              apps/seller/src/
├── shared/                   ├── widgets/     ← 신규 레이어 추가
│   ├── ui/       (유지)      │   └── LNB, BottomNavBar, DateRangePicker 등
│   ├── block/    (제거)      ├── shared/
│   └── ...                   │   ├── ui/      (유지 — 순수 UI만)
                              │   └── ...
```

변경 후 의존성 방향:

```
app → pages → widgets → features → entity → shared
```

**기대 효과**:

- FSD 표준 레이어 구조와 일치
- `shared`의 순수성 회복 (어떤 상위 레이어도 import하지 않음)
- 의존성 방향이 문서와 코드 모두에서 일관되게 적용됨

**논의 포인트**: 마이그레이션 비용 vs 구조적 일관성 / 현재 프로젝트 규모에서 `widgets` 레이어 도입이 적절한지
