# 프로젝트 구조 (FSD)

이 프로젝트는 **Feature-Sliced Design(FSD)** 패턴을 참고하여 폴더 구조를 설계하였습니다.

## 📁 전체 폴더 구조

```
src/
├── app/                    # 애플리케이션 레이어
│   ├── api/                # API 클라이언트 및 글로벌 API 설정
│   │   └── client.tsx
│   ├── router/             # 라우터 및 라우터 관련 유틸, 타입
│   │   ├── router.tsx
│   │   ├── routerReducer.tsx
│   │   ├── routerType/
│   │   └── useRouteListener.tsx
│   └── store/              # 전역 상태관리(Redux)
│       └── redux/
│           ├── reduxStore.tsx      # Store 설정 및 미들웨어
│           ├── reduxHooks.tsx      # 타입 안전한 hooks
│           └── reduxUtils.ts       # reduxMaker 유틸리티
│
├── assets/                 # 정적 자원
│   ├── fonts/              # 폰트 파일 (Pretendard)
│   ├── icons/              # SVG 아이콘
│   ├── images/             # 이미지 파일
│   └── locales/            # 다국어 파일 (i18next)
│
├── features/               # 기능 레이어 (비즈니스 도메인)
│   ├── auth/               # 인증 기능
│   │   ├── components/     # 인증 관련 컴포넌트
│   │   ├── data/           # Mock 데이터
│   │   ├── locales/        # 인증 관련 번역
│   │   └── type/           # 타입 정의
│   ├── orders/             # 주문 기능
│   │   └── Orders.tsx
│   └── sample/             # 샘플 기능
│       ├── Sample.tsx
│       ├── sampleAPI.tsx
│       ├── sampleReducer.ts
│       └── sampleType.ts
│
├── pages/                  # 페이지 레이어 (라우트 단위)
│   ├── extra/              # 특수 페이지
│   │   ├── LazyPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── url/                # 라우트 기반 페이지
│   │   ├── login/
│   │   ├── orders/
│   │   ├── register/
│   │   └── sample/
│   ├── HomePage.tsx
│   └── test/
│
├── shared/                 # 공유 레이어
│   ├── components/         # 공통 UI 컴포넌트
│   │   ├── button/
│   │   ├── checkbox/
│   │   ├── input/
│   │   ├── table/
│   │   └── theme/
│   ├── layout/             # 레이아웃 컴포넌트
│   │   ├── BgrHeader.tsx
│   │   ├── BgrLayout.tsx
│   │   └── WhLayout.tsx
│   ├── lib/                # 외부 라이브러리 래퍼
│   │   └── shadcn/         # shadcn/ui 컴포넌트
│   └── utils/              # 유틸리티 함수
│       ├── colorUtils.tsx
│       ├── debounce.tsx
│       └── navigateUtils.tsx
│
├── stories/                # Storybook 문서
│   ├── Button.stories.ts
│   ├── Header.stories.ts
│   └── Page.stories.ts
│
├── styles/                 # 전역 스타일
│   ├── index.css           # 메인 CSS (TailwindCSS import)
│   ├── base.pcss           # 기본 스타일
│   ├── typography.pcss     # CSS 변수
│   ├── fonts.pcss          # 폰트 정의
│   └── reset.css           # CSS 리셋
│
├── App.tsx                 # 루트 컴포넌트
├── main.tsx                # 앱 진입점
└── vite-env.d.ts           # Vite 타입 정의
```

## 🏗️ 각 레이어 설명

### app/ - 애플리케이션 레이어

앱 전체에 영향을 주는 설정, 스토어, 라우터 등 글로벌 레이어입니다.

**책임**:

- 전역 상태 관리 (Redux Store)
- 라우팅 설정
- API 클라이언트 설정
- 앱 초기화

**규칙**:

- 다른 레이어에 의존하지 않음 (최상위 레이어)
- 앱의 진입점과 설정만 포함

### assets/ - 정적 리소스

폰트, 이미지, 다국어 등 정적 리소스를 관리합니다.

**책임**:

- 폰트 파일 관리
- SVG 아이콘 관리
- 이미지 파일 관리
- 다국어 번역 파일 관리

**규칙**:

- 변경되지 않는 정적 파일만 포함
- 컴포넌트나 로직을 포함하지 않음

### features/ - 기능 레이어

비즈니스 도메인별로 분리된 기능 단위입니다.

**책임**:

- 특정 비즈니스 로직 구현
- 기능별 상태 관리 (Reducer)
- 기능별 API 호출
- 기능별 UI 컴포넌트

**규칙**:

- 각 기능은 독립적으로 동작
- 다른 feature에 직접 의존하지 않음
- shared 레이어만 사용 가능

**예시 구조**:

```
features/
└── myFeature/
    ├── components/          # 기능 전용 컴포넌트
    ├── MyFeature.tsx        # 메인 컴포넌트
    ├── myFeatureReducer.ts  # Redux reducer
    ├── myFeatureAPI.tsx     # API 함수
    └── myFeatureType.ts     # 타입 정의
```

### pages/ - 페이지 레이어

라우트 단위의 페이지 컴포넌트입니다.

**책임**:

- 라우트에 대응하는 페이지 조합
- Feature 컴포넌트 배치 및 구성
- 페이지 레벨 레이아웃 적용

**규칙**:

- `pages/url/` 폴더에는 **공통 페이지만** 추가
- 특정 기능에 종속된 페이지는 추가하지 않음
- features와 shared 레이어 사용 가능

**파일명 규칙**:

- Feature와 구분하기 위해 `Page` 접미사 사용 권장
- 예: `HomePage.tsx`, `LoginPage.tsx`

### shared/ - 공유 레이어

여러 feature/page에서 공통으로 사용하는 요소입니다.

**책임**:

- 재사용 가능한 UI 컴포넌트
- 공통 유틸리티 함수
- 외부 라이브러리 래퍼
- 공통 레이아웃

**규칙**:

- 비즈니스 로직을 포함하지 않음
- 다른 레이어에 의존하지 않음 (최하위 레이어)
- 범용적으로 사용 가능한 것만 포함

**하위 구조**:

- `components/`: 공통 UI 컴포넌트
- `layout/`: 레이아웃 컴포넌트
- `lib/`: 외부 라이브러리 래퍼
- `utils/`: 유틸리티 함수

## 🔄 의존성 규칙

FSD의 핵심 규칙은 **상위 레이어는 하위 레이어만 사용**할 수 있다는 것입니다:

```
app → pages → features → shared
```

### ✅ 허용되는 의존성

```typescript
// ✅ pages → features
import { Sample } from 'src/features/sample/Sample'

// ✅ features → shared
import { Button } from 'src/shared/components/button/Button'

// ✅ pages → shared
import { WhLayout } from 'src/shared/layout/WhLayout'
```

### ❌ 금지되는 의존성

```typescript
// ❌ features → pages (상위 레이어 참조)
import { HomePage } from 'src/pages/HomePage'

// ❌ features → features (다른 feature 직접 참조)
import { Auth } from 'src/features/auth/Auth'

// ❌ shared → features (상위 레이어 참조)
import { Sample } from 'src/features/sample/Sample'
```

## 📂 새 기능 추가 시 폴더 생성

### 1. Feature 생성

```bash
# WSL/Linux/macOS
cd src/features
mkdir myFeature
cd myFeature
touch MyFeature.tsx myFeatureReducer.ts myFeatureAPI.tsx
```

### 2. Reducer 작성

```typescript
// myFeatureReducer.ts
import { reduxMaker } from 'src/global/store/redux/reduxUtils'

const prefix = 'myFeature'
const asyncRequests = [] as const
const localState = {
  /* ... */
}
const localReducers = {
  /* ... */
}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)

export const { slice, actions, saga } = module
```

### 3. Store에 등록

```typescript
// global/store/redux/reduxStore.tsx
import { slice, saga } from 'src/features/myFeature/myFeatureReducer'

const reducers = {
  // ...
  myFeatureReducer: slice.reducer,
}

export function* rootSaga() {
  yield all([
    // ...
    saga(),
  ])
}
```

### 4. 페이지 생성 (필요시)

```bash
# WSL/Linux/macOS
mkdir -p src/pages/url/myFeature
touch src/pages/url/myFeature/MyFeaturePage.tsx
```

## 🎯 Best Practices

### Feature 분리 기준

**✅ 좋은 예**:

- 비즈니스 도메인별로 분리 (auth, orders, products)
- 독립적으로 동작 가능한 단위
- 명확한 책임과 경계

**❌ 나쁜 예**:

- 기술별로 분리 (components, apis, reducers)
- 다른 feature에 강하게 의존
- 너무 크거나 너무 작은 단위

### 파일 명명 규칙

- **컴포넌트**: PascalCase (`MyComponent.tsx`)
- **유틸리티**: camelCase (`myUtils.ts`)
- **상수**: UPPER_SNAKE_CASE (`MY_CONSTANT.ts`)
- **타입**: PascalCase (`MyType.ts`)

### Import 순서

```typescript
// 1. 외부 라이브러리
import { useState } from 'react'
import { useDispatch } from 'react-redux'

// 2. 내부 절대 경로 (src/)
import { reduxMaker } from 'src/global/store/redux/reduxUtils'
import { Button } from 'src/shared/components/button/Button'

// 3. 상대 경로
import { localFunction } from './utils'
import type { MyType } from './types'
```

## 🚀 다음 단계

프로젝트 구조를 이해하셨다면:

- **[상태 관리](./state-management.md)**: Redux 아키텍처 이해하기
- **[라우팅](./routing.md)**: 동적 라우팅 시스템 알아보기
- **[첫 기능 만들기](../quickstarts/your-first-feature.md)**: 실제로 기능 개발해보기

---

[← Concepts 목차로 돌아가기](./README.md)
