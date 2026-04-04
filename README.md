# Dessert Front Dashboard 온보딩 가이드

> 이 문서는 새로운 팀원이 프로젝트에 빠르게 적응할 수 있도록 안내하는 허브 문서입니다.
> 각 섹션의 링크를 통해 더 자세한 내용을 확인하세요.

## 🌐 배포 URL

| 서비스            | URL                                                  | 설명                           |
| ----------------- | ---------------------------------------------------- | ------------------------------ |
| Seller            | [seller.bbanggree.com](https://seller.bbanggree.com) | 판매자 대시보드                |
| Admin             | [admin.bbanggree.com](https://admin.bbanggree.com)   | 관리자 대시보드                |
| Storybook (UI)    | `<!-- TODO: Storybook UI 배포 URL 입력 -->`          | `@dessert/ui` 컴포넌트 탐색기  |
| Storybook (Icons) | `<!-- TODO: Storybook Icons 배포 URL 입력 -->`       | `@dessert/icons` 아이콘 탐색기 |

<br/>

## 🚀 빠른 시작 (Quick Start)

### Step 1. 개발 환경 도구 설치 (mise)

이 프로젝트는 **mise**를 사용해 Node.js(22.18.0)와 Yarn(4.11.0) 버전을 자동으로 관리합니다.
mise가 없다면 먼저 설치해야 합니다.

→ **[mise 프로젝트 초기 설정 가이드 자세히 보기](/docs/setup/install-mise.md)**

### Step 2. 저장소 클론

```bash
git clone <repository-url>
cd dessert-front-seller
```

### Step 3. 런타임 및 패키지 매니저 버전 자동 설치

```bash
# 프로젝트 루트에서 실행 — Node.js 22.18.0 + Yarn 4.11.0 자동 설치
mise install
```

> `mise trust` 명령어를 먼저 실행해야 할 수도 있습니다. 자세한 내용은 [mise 프로젝트 초기 설정 가이드](/docs/setup/install-mise.md)를 참고하세요.

### Step 4. 의존성 설치

```bash
yarn install
```

### Step 5. 개발 서버 실행

```bash
# 판매자 대시보드
yarn dev:seller

# 관리자 대시보드
yarn dev:admin
```

### Step 6. Storybook 실행

```bash
# @dessert/ui 컴포넌트 탐색기 (포트 6076)
yarn storybook:ui

# @dessert/icons 아이콘 탐색기 (포트 6077)
yarn storybook:icons
```

<br/>

## 📦 의존성 관리 (Yarn Workspaces)

이 프로젝트는 **Yarn Workspaces** 기반의 모노레포입니다.
패키지를 설치할 때는 반드시 **어떤 워크스페이스에** 설치할지 명시해야 합니다.

```bash
# 특정 앱에 패키지 설치
yarn workspace @dessert/seller add axios
yarn workspace @dessert/admin add axios
yarn workspace @dessert/ui add some-component

# 루트에 개발 도구 설치 (ESLint, Prettier 등)
yarn add -D some-dev-tool
```

> **왜 워크스페이스를 명시해야 하나요?**
> 의존성을 각 앱/패키지에 명시적으로 관리하면, 어떤 앱이 어떤 라이브러리에 의존하는지
> 명확해지고 불필요한 의존성 전파를 방지할 수 있습니다.

→ **[모노레포 의존성 관리 자세히 보기](/docs/monorepo/monorepo-package-json-guide.md)**

<br/>

## 🗂️ 프로젝트 구조

```
dessert-front-dashboard/
├── apps/
│   ├── seller/    # @dessert/seller — 판매자 대시보드 (Vite + React 19)
│   └── admin/     # @dessert/admin  — 관리자 대시보드 (Vite + React 19)
├── packages/
│   ├── ui/        # @dessert/ui     — seller + admin이 공유하는 디자인 시스템
│   └── icons/     # @dessert/icons  — SVGR 기반 SVG 아이콘 라이브러리
└── docs/          # 프로젝트 문서 모음
```

각 앱과 패키지는 독립된 `package.json`을 가지며, Turborepo가 빌드 순서와 캐시를 관리합니다.

→ **[모노레포 아키텍처 자세히 보기](/docs/monorepo/monorepo-packages-architecture-guide.md)**

<br/>

## 🏗️ FSD (Feature-Sliced Design) 아키텍처

각 앱(`seller`, `admin`) 내부는 **FSD(Feature-Sliced Design)** 방법론을 따릅니다.
레이어 간 단방향 의존성 규칙을 지키며, 기능 단위로 코드를 구성합니다.

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

→ **[FSD 아키텍처 가이드 자세히 보기](/docs/fsd/fsd-guide.md)**

<br/>

## 🎨 컨벤션

| 도구     | 핵심 규칙                                               |
| -------- | ------------------------------------------------------- |
| Prettier | 싱글쿼트, 세미콜론 없음, 탭 2칸, trailing comma         |
| ESLint   | import 정렬, React Hooks 규칙, Tailwind 클래스 순서     |
| Commit   | `[seller] feat(123):` 등 scope + type + issue number    |
| Branch   | `feat/order-infinite-scroll` 등 type/kebab-case         |
| Env      | `VITE_` 접두사 필수, `.env.example` 업데이트 및 PR 명시 |

→ **[코드 컨벤션 가이드 자세히 보기](/docs/convention/code-convention.md)**<br/>
→ **[커밋 컨벤션 가이드 자세히 보기](/docs/convention/commit-convention.md)**<br/>
→ **[브랜치 컨벤션 가이드 자세히 보기](/docs/convention/branch-convention.md)**<br/>
→ **[환경변수 관리 가이드 자세히 보기](/docs/convention/env-convention.md)**<br/>

<br/>

## 🖼️ @dessert/icons 사용법

`@dessert/icons`는 SVGR로 구현된 SVG 아이콘 라이브러리입니다.
Tailwind 유틸리티 클래스로 크기와 색상을 제어하며, 접근성을 위한 `aria-hidden` 규칙이 있습니다.

```tsx
import { SearchIcon, HeartRedIcon } from '@dessert/icons'

// 장식용 아이콘 (버튼 내부 등 — 부모가 의미를 설명)
<button aria-label="검색">
  <SearchIcon aria-hidden="true" className="w-5 h-5" />
</button>

// 단독 의미 아이콘 (아이콘 자체가 정보 전달)
<SearchIcon aria-label="검색" className="w-5 h-5 text-gray-500" />
```

→ **[아이콘 사용 가이드 자세히 보기](/docs/packages/icons-usage-guide.md)**

<br/>

## 🔄 작업 파이프라인

Notion 개발 일정 → GitHub Issue → Milestone 연동 → 구현 → PR 순서로 작업을 추적합니다.

```
Notion 작업 보드 작성
    ↓
GitHub Issue 생성 (Issue 템플릿 사용)
    ↓
Milestone에 연동
    ↓
브랜치 생성 및 작업 (feat/작업명)
    ↓
PR 생성 (PR 템플릿 사용)
    ↓
코드 리뷰 & Merge → develop
    ↓
Milestone으로 주간 데드라인 관리
```

> Notion 작업 보드 템플릿과 Issue 템플릿을 동일하게 만들어서 불필요한 작업을 최소화했습니다.

→ **[작업 파이프라인 가이드 자세히 보기](/docs/convention/work-pipeline.md)**
