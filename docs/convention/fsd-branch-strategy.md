# FSD 브랜치 전략 가이드

## 개요

Feature-Sliced Design(FSD) 아키텍처는 레이어(layer)별로 책임을 분리합니다.
브랜치와 PR도 이 레이어 경계를 따라 나누어야 리뷰 품질과 작업 퀄리티를 확보할 수 있습니다.

> **핵심 원칙: 브랜치 하나 = 레이어 하나 = PR 하나**

<br/>

## 왜 레이어별로 브랜치를 나누는가

FSD에서 각 레이어는 **방향이 고정된 의존성**을 가집니다.

```
app → pages → widgets → features → entities → shared
```

하나의 브랜치에 여러 레이어가 섞이면:

- 리뷰어가 "이 코드가 어느 레이어의 책임인지" 판단하기 어려워집니다
- 레이어 간 의존성 방향이 올바른지 검증할 수 없습니다
- PR 규모가 커져 리뷰 피로도가 급격히 증가합니다
- 특정 레이어만 롤백해야 할 때 불가능해집니다

<br/>

## 브랜치 분리 기준

### 1단계 — Entity 브랜치

도메인의 **데이터 계약(contract)** 을 확립합니다. 다른 모든 레이어가 이 작업에 의존하므로 가장 먼저 PR을 올립니다.

작업 범위:

- Zod 스키마 정의 (`schema.ts`)
- TypeScript 타입 추론 (`type.ts`)
- API 함수 구현 (`api.ts`)
- TanStack Query 쿼리 키/함수 정의 (`query.ts`)
- 응답 변환 로직 (`transformer.ts`)
- Mock 데이터
- Public API (`index.ts`) 명시적 export

브랜치 네이밍:

```
feat/<domain>-entity
feat/<domain>-<feature-id>-entity

# 예시
feat/product-entity
feat/upload-approval-entity
```

#### API 동작 검증 워크플로우

Entity 브랜치에서는 API가 실제 서버와 올바르게 연결되는지 **PR 단계에서 직접 증명**합니다.
리뷰어가 별도로 브랜치를 체크아웃해 확인하거나, 다음 Feature 브랜치에서 뒤늦게 API 오류를 발견하는 상황을 방지합니다.

**검증 코드 작성 규칙:**

- 기존 페이지 컴포넌트에 임시로 query를 연결합니다
- 파일 상단에 `@temp` JSDoc 태그를 붙여 임시 코드임을 명시합니다
- PR이 머지된 직후 다음 Feature 브랜치 시작 시 반드시 제거합니다

**예시 — 기존 페이지에 임시 query 연결:**

```tsx
// pages/products/ui/ProductsPage.tsx

/** @temp Entity 브랜치 API 동작 검증용 — Feature 브랜치에서 제거 */
import { useQuery } from '@tanstack/react-query'
import { productQueries } from '@/entities/product'

export const ProductsPage = () => {
  // @temp
  const { data, isLoading, isError } = useQuery(
    productQueries.uploadApprovals({ page: 1, size: 10 }),
  )

  // @temp
  if (isLoading) return <p>loading...</p>
  if (isError) return <p>error</p>

  return (
    <div>
      {/* @temp — API 응답 원본 확인용 */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

**다음 Feature 브랜치 시작 시 제거:**

```bash
# Feature 브랜치를 시작하면서 @temp 코드를 가장 먼저 삭제합니다
git checkout -b feat/upload-approval-table

# @temp 주석이 달린 코드 위치 확인
grep -rn "@temp" apps/
```

<br/>

### 2단계 — Feature 브랜치

Entity 브랜치 머지 이후, **독립적으로 분리 가능한 기능 단위**로 브랜치를 생성합니다.

작업 범위:

- Feature 슬라이스 UI 컴포넌트
- Mutation hook 구현
- Feature 레벨 폼 상태 관리
- Widget/Page에서 조립하기 전 단계의 독립 기능

브랜치 네이밍:

```
feat/<domain>-<feature-name>
feat/<domain>-<feature-id>-<feature-name>

# 예시
feat/upload-approval-table
feat/upload-approval-confirm-dialog
feat/upload-approval-reject-dialog
```

<br/>

### 3단계 — Page 브랜치 (필요한 경우)

Feature들을 **페이지에 조립**하는 작업이 별도로 필요할 때 분리합니다.
Feature 브랜치에서 함께 처리해도 될 만큼 작다면 생략해도 됩니다.

브랜치 네이밍:

```
feat/<page-name>-page
feat/<domain>-<feature-id>-page

# 예시
feat/upload-approval-page
feat/products-list-page
```

<br/>

## PR 크기 기준

| 등급 | 변경 줄 수  | 상태                  |
| ---- | ----------- | --------------------- |
| 적정 | ~500줄 이하 | ✅ 권장               |
| 주의 | 500 ~ 800줄 | ⚠️ 분리 가능한지 검토 |
| 위험 | 800줄 초과  | ❌ 반드시 분리        |

> 리뷰어가 집중력을 유지하며 리뷰할 수 있는 한계는 약 400줄입니다.
> PR이 클수록 중요한 버그나 설계 문제를 놓칠 가능성이 높아집니다.

<br/>

## 실제 적용 예시 — 업로드 상품 승인(A03_101)

아래는 하나의 기능을 3개의 브랜치·PR로 분리한 실제 사례입니다.

### PR 1 — Entity 도메인 정의

```
브랜치: feat/upload-approval-entity
변경: +204 -2 (6 files)
```

작업 내용:

- `UploadApprovalSchema`, `UploadApprovalListResultSchema` Zod 스키마
- `z.infer`로 TypeScript 타입 자동 추론
- `getUploadApprovals` API 함수 (페이지네이션 지원)
- `productQueries` 객체로 queryKey/queryFn 계층 관리
- Mock 데이터 50개
- Public API wildcard export → named export로 전환

<br/>

### PR 2 — 테이블 기능 구현

```
브랜치: feat/upload-approval-table
변경: +171 -16 (8 files)
의존: PR 1 머지 이후 작업
```

작업 내용:

- `UploadApprovalTable` (컬럼 4개, 페이지네이션 포함)
- `UploadApprovalActionGroup`
- Mock API → 실제 API 전환
- 공통 `Table` 컴포넌트 `flexible`, `tableClassName` prop 추가 (backward compatible)

<br/>

### PR 3 — 승인/거절 기능 구현

```
브랜치: feat/upload-approval-decision
변경: +351 -23 (10 files)
의존: PR 2 머지 이후 작업
```

작업 내용:

- `decideUploadApproval` API + Mutation hook
- `UploadApprovalConfirmDialog` (승인 확인 모달)
- `UploadApprovalRejectDialog` (react-hook-form + zodResolver)
- `Textarea`, `Dropdown` className props 확장 (optional, backward compatible)
- 성공/실패 toast 피드백

<br/>

## 브랜치 의존성 관리

Entity 브랜치가 머지되기 전에 Feature 작업을 시작해야 한다면, **base 브랜치를 Entity 브랜치로 설정**합니다.

```bash
# Entity 브랜치가 아직 머지되지 않은 상태에서 Feature 작업 시작
git checkout feat/upload-approval-entity
git checkout -b feat/upload-approval-table
```

PR을 올릴 때는 base를 `develop`이 아닌 `feat/upload-approval-entity`로 지정합니다.
Entity PR이 머지되면 Feature PR의 base를 `develop`으로 변경합니다.

> PR 본문의 `## 참고사항`에 "이 PR은 #174 머지 이후 리뷰를 요청드립니다"와 같이 명시합니다.

### ⚠️ 브랜치 동기화 주의사항

base 브랜치로 지정한 Entity 브랜치에 새로운 커밋이 push되면 Feature 브랜치를 반드시 최신화해야 합니다.

**Entity 브랜치가 열려있는 동안** 새 커밋이 push된 경우:

```bash
git checkout feat/<domain>-<feature-name>
git merge feat/<domain>-entity
git push
```

**Entity 브랜치가 `develop`에 머지·삭제된 이후**에는 GitHub이 Feature PR의 base를 자동으로 `develop`으로 변경합니다. 이때는 아래 명령어로 동기화하세요.

```bash
git checkout feat/<domain>-<feature-name>
git merge develop
git push
```

> 동기화하지 않으면 머지 시 충돌이 발생하거나 Entity 변경사항이 누락될 수 있습니다.

<br/>

## 공통 컴포넌트(packages/ui) 변경이 필요한 경우

Feature 구현에 공통 컴포넌트 수정이 필요할 때 별도 PR로 분리하면 머지 순서 의존성이 생겨 복잡해질 수 있습니다.

아래 조건을 **모두** 만족하면 Feature PR에 함께 포함해도 됩니다:

1. 변경이 **optional prop 추가** 수준으로 작다
2. 기존 사용처에 **영향을 주지 않는다** (backward compatible)
3. 해당 Feature 구현에만 필요한 변경이다

함께 포함할 경우 PR 본문의 `## 참고사항`에 이유를 반드시 명시합니다.

<br/>

## 안티패턴

### ❌ 하나의 브랜치에 여러 레이어를 혼재

```
feat/products-create-page
├── entities/product/schema.ts      ← entity 레이어
├── entities/product/api.ts         ← entity 레이어
├── features/product-form/          ← feature 레이어
├── widgets/product-create-widget/  ← widget 레이어
└── pages/products/create/          ← page 레이어
```

문제점:

- 레이어 경계가 올바른지 리뷰 불가
- PR 규모가 수천 줄을 초과해 리뷰 품질 저하
- Entity 수정 시 전체 재리뷰 필요

### ✅ 레이어별로 분리

```
feat/product-entity         → entities/ 만 포함 (PR 1)
feat/product-create-form    → features/ 만 포함 (PR 2)
feat/product-create-page    → pages/ + widgets/ 조립 (PR 3, 필요 시)
```
