# 코드 컨벤션 가이드

## Prettier

- 코드 포맷팅은 **Prettier**가 자동으로 처리합니다.
- 저장 시 자동 포맷팅이 적용되도록 에디터에 `"editor.formatOnSave": true` 설정을 진행해주세요.

| 설정             | 값         | 의미                            |
| ---------------- | ---------- | ------------------------------- |
| `singleQuote`    | `true`     | 문자열은 싱글쿼트 사용          |
| `semi`           | `false`    | 세미콜론 없음                   |
| `tabWidth`       | `2`        | 들여쓰기 2칸                    |
| `trailingComma`  | `"all"`    | 마지막 항목 뒤에도 쉼표         |
| `arrowParens`    | `"always"` | 화살표 함수 매개변수 항상 괄호  |
| `bracketSpacing` | `true`     | 객체 괄호 내부 공백 (`{ foo }`) |

```bash
# 전체 포맷팅 실행
yarn run format
```

<br/>

## ESLint

**ESLint flat config** 방식을 사용합니다. 루트의 `eslint.config.js` 하나로 모든 앱과 패키지를 관리합니다.

```bash
# 린트 실행
yarn run lint
```

### Import 정렬 규칙

import는 다음 순서로 정렬해야 합니다. 저장 시 자동 정렬됩니다.

```typescript
// 1. builtin (Node.js 내장)
import path from 'path'

// 2. external (npm 패키지)
import React from 'react'
import { useQuery } from '@tanstack/react-query'

// 3. internal (@ 경로 alias — 프로젝트 내부)
import { Button } from '@dessert/ui'
import { SearchIcon } from '@dessert/icons'

// 4. parent (상위 폴더)
import { useOrderList } from '../features/order'

// 5. sibling (같은 폴더)
import { OrderCard } from './OrderCard'

// 6. type imports
import type { Order } from '@/entities/order'
```

### 주요 ESLint 규칙

| 규칙                                | 레벨 | 설명                    |
| ----------------------------------- | ---- | ----------------------- |
| `no-console`                        | warn | `console.error`만 허용  |
| `@typescript-eslint/no-unused-vars` | warn | 사용하지 않는 변수 경고 |
| `import/no-cycle`                   | warn | 순환 의존성 경고        |
| `import/no-duplicates`              | warn | 중복 import 경고        |

<br/>

## TypeScript

- **strict 모드** 활성화 — 암묵적 `any` 금지
- 컴포넌트 props는 `interface` 또는 `type`으로 명시적 정의
- `as` 타입 단언은 최소화, 불가피한 경우 주석으로 이유 설명

<br/>

## React 컴포넌트 작성 패턴

### Named Export — `export default` 금지

- FSD의 `index.ts` Public API에서 re-export할 때 named export만 의미 있는 이름으로 노출됩니다.
- `export default`는 import 시 임의 이름을 붙일 수 있어 코드 추적이 어려워집니다.

```typescript
// ❌ Bad
export default function OrderCard() { ... }

// ✅ Good
export function OrderCard() { ... }
```

### Props 타입 — `interface` 사용 (Utility Type 미사용 시)

- Utility Type(`Record`, `Partial`, `Omit` 등)을 사용하지 않는 단순 Props는 `interface`로 통일합니다.
- Utility Type 조합이 필요한 경우에만 `type`을 사용합니다. (interface 강제 ESLint 규칙 추가 예정)

```typescript
// ❌ Bad — 단순 Props에 type alias 사용
type ButtonProps = {
  label: string
  disabled?: boolean
}

// ✅ Good — 단순 Props는 interface
interface ButtonProps {
  label: string
  disabled?: boolean
}

// ✅ Good — Utility Type 조합이 필요한 경우는 type
type PartialButtonProps = Partial<ButtonProps>
type OrderRowProps = Omit<OrderItem, 'products'> & { isSelected: boolean }
```

### Props 타입 네이밍 — `${ComponentName}Props`

- `Props`, `IButton`처럼 범용적인 이름은 타입 충돌 위험이 있고 출처 파악이 어렵습니다.
- 컴포넌트명 네이밍을 포함하면 어떤 컴포넌트의 Props인지 즉시 파악할 수 있습니다.

```typescript
// ❌ Bad
interface Props { ... }
interface IButton { ... }

// ✅ Good
interface ButtonProps { ... }
interface OrderCardProps { ... }
```

### 파일·폴더 네이밍 — kebab-case

- 대소문자를 구분하지 않는 파일 시스템(macOS 기본 설정)에서 발생하는 파일명 충돌을 방지합니다.
- FSD segment 파일 네이밍(`order-table.ui.tsx`, `order-filters.hook.ts`)과도 일관성을 유지합니다.

```
❌ Bad
OrderCard.tsx
useOrderList.ts
OrderFilters/

✅ Good
order-card.tsx
order-list.hook.ts
order-filters/
```

> 단, React 컴포넌트 함수명과 TypeScript 타입명은 PascalCase를 유지합니다.
> **파일·폴더 이름만** kebab-case를 적용합니다.

<br/>

## TanStack Query 사용 패턴

### Query Factory 패턴 — `queryOptions` 사용

- 쿼리 옵션 객체를 일반 상수로 관리하면, TypeScript의 구조적 타입 시스템으로 인해 `stallTime`처럼 오타가 있는 프로퍼티를 작성해도 타입 에러가 발생하지 않습니다.
- `queryOptions()`를 사용하면 상수로 분리해도 오타를 포함한 타입 안전성이 유지되고 `queryClient.getQueryData()`의 반환 타입도 올바르게 추론됩니다.

```typescript
// ❌ Bad — 일반 상수로 관리 시 오타를 잡을 수 없음
const ordersQuery = {
  queryKey: ['order', 'list', filters],
  queryFn: () => getOrders(filters),
  stallTime: 5000, // staleTime의 오타 — 타입 에러가 발생하지 않음
}

useQuery(ordersQuery) // 에러 없이 통과, staleTime 미적용
queryClient.prefetchQuery(ordersQuery)

// ✅ Good — queryOptions로 감싸면 변수로 분리해도 오타 감지
const ordersQuery = queryOptions({
  queryKey: ['order', 'list', filters],
  queryFn: () => getOrders(filters),
  stallTime: 5000, // ❗ Type error: Object literal may only specify known properties
})

useQuery(ordersQuery)
queryClient.prefetchQuery(ordersQuery)
```

### 계층적 queryKey 구조

- 쿼리 키는 계층 구조로 정의합니다. 상위 키를 기준으로 관련 쿼리를 한 번에 무효화할 수 있습니다.
- 계층 구조가 없으면 무효화 범위를 정확히 지정하기 어렵습니다.

```typescript
// ❌ Bad — 평면적인 키 정의
export const orderQueries = {
  list: (filters: OrderFilters) =>
    queryOptions({
      queryKey: ['order', 'list', filters],
      queryFn: () => getOrders(filters),
    }),
}

// 주문 관련 쿼리 전체 무효화 불가
queryClient.invalidateQueries({ queryKey: ['order'] }) // 동작하지 않음

// ✅ Good — 계층적 키 구조 (실제 order.query.ts)
export const orderQueries = {
  all: () => ['order'], // ['order']
  lists: () => [...orderQueries.all(), 'list'], // ['order', 'list']
  list: (filters: OrderFilters) =>
    queryOptions({
      queryKey: [...orderQueries.lists(), filters], // ['order', 'list', filters]
      queryFn: () => getOrders(filters),
    }),
}

// 주문 관련 쿼리 전체 무효화
queryClient.invalidateQueries({ queryKey: orderQueries.all() })

// 목록 쿼리만 무효화
queryClient.invalidateQueries({ queryKey: orderQueries.lists() })
```

### 네이밍 규칙

| 항목        | 규칙                 | 예시                                 |
| ----------- | -------------------- | ------------------------------------ |
| 파일명      | `${domain}.query.ts` | `order.query.ts`, `product.query.ts` |
| export 이름 | `${domain}Queries`   | `orderQueries`, `productQueries`     |

```typescript
// ❌ Bad
export const orderQueryKeys = { ... }
export const queryKeys = { ... }
export const ORDER_QUERY_KEY = { ... }

// ✅ Good
export const orderQueries = { ... }
export const productQueries = { ... }
```

### 정의 위치 — `entity` 레이어

`queryOptions` 정의는 항상 `entity` 레이어에 위치시킵니다.

```typescript
// ✅ entity/order/order.query.ts — queryOptions 정의
export const orderQueries = {
  all: () => ['order'],
  lists: () => [...orderQueries.all(), 'list'],
  list: (filters: OrderFilters) =>
    queryOptions({
      queryKey: [...orderQueries.lists(), filters],
      queryFn: () => getOrders(filters),
    }),
}

// ✅ pages/orders/orders-page.tsx — useQuery 호출
import { orderQueries } from '@/entity/order/order.query'

function OrdersPage() {
  const { appliedFilters } = useOrderFilter()
  const { data } = useQuery(orderQueries.list(appliedFilters))
  // ...
}
```

<br/>

## VSCode 권장 설정

프로젝트 루트의 `.vscode/settings.json` (추후 추가 예정):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

<br/>

## TODO (추후 추가 예정)

- [ ] Tailwind CSS 클래스 작성 순서 가이드
- [ ] CVA 도입 시점
