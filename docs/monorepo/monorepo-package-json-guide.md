# 모노레포 package.json 가이드

---

## 1. 전체 구조

```
dessert-front-dashboard/
├── package.json                ← (A) Root: 모노레포 전체 관리자
├── apps/
│   ├── seller/
│   │   └── package.json        ← (B) Seller 앱: seller 전용 의존성
│   └── admin/
│       └── package.json        ← (C) Admin 앱: admin 전용 의존성
└── packages/
    ├── ui/
    │   └── package.json        ← (D) @dessert/ui: 공유 UI + 스타일
    ├── utils/
    │   └── package.json        ← (E) @dessert/utils: 공유 인프라 유틸
    └── config/
        └── package.json        ← (F) @dessert/config: 공통 툴 설정
```

| 파일                       | 역할                                          |
| -------------------------- | --------------------------------------------- |
| Root `package.json`        | workspace 선언, 공통 개발도구, turbo 스크립트 |
| `apps/seller/package.json` | seller 앱 실행에 필요한 모든 것               |
| `apps/admin/package.json`  | admin 앱 실행에 필요한 모든 것                |
| `packages/*/package.json`  | 각 패키지를 독립 npm 패키지로 등록            |

> **핵심**: `packages/` 안의 각 폴더는 반드시 자체 `package.json`이 있어야 합니다.
> `package.json`이 있어야 `@dessert/ui`, `@dessert/utils`라는 이름으로 import할 수 있습니다.

---

## 2. Root package.json

루트 `package.json`은 **앱을 직접 실행하지 않습니다.**
workspace를 선언하고, turbo 스크립트를 통해 하위 앱들을 관리하는 역할만 합니다.

```json
{
  "name": "dessert-front-dashboard",
  "private": true,
  "packageManager": "yarn@4.11.0",

  "workspaces": ["apps/*", "packages/*"],

  "scripts": {
    "dev:seller": "turbo run dev   --filter=@dessert/seller",
    "dev:admin": "turbo run dev   --filter=@dessert/admin",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "format": "prettier --write ."
  },

  "devDependencies": {
    "turbo": "^2.5.0",
    "prettier": "3.5.3"
  }
}
```

루트에 넣는 것 (공통 개발 도구):

- `turbo` — 빌드 오케스트레이터
- `prettier` — 전체 코드 포맷터 (루트에서 한 번만 실행)

루트에 넣지 않는 것:

- `react`, `vite`, `typescript` 등 앱 실행에 필요한 것 → 각 앱 `package.json`에 포함

> ⚠️ `"private": true`로 package.json 설정을 해야 합니다.
> 이 설정이 없으면 루트 패키지가 npm에 실수로 publish될 수 있습니다.

---

## 3. apps/\*/package.json

각 앱은 실행에 필요한 모든 의존성을 자체 `package.json`에 선언합니다.

```json
{
  "name": "@dessert/seller",
  "private": true,
  "version": "0.0.0",
  "type": "module",

  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest"
  },

  "dependencies": {
    "@dessert/ui": "*",
    "@dessert/utils": "*",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
    // ... 앱에 필요한 나머지 패키지들
  },

  "devDependencies": {
    "vite": "6.2.2",
    "typescript": "~5.7.2"
    // ... 빌드/테스트 도구들
  }
}
```

`"@dessert/ui": "*"`, `"@dessert/utils": "*"` — `*`는 "같은 workspace 안의 최신 버전"을 의미합니다.

> `apps/admin/package.json`도 동일한 방식으로 관리합니다.

---

## 4. packages/\*/package.json — 공유 패키지

`packages/` 안의 각 폴더는 **독립적인 npm 패키지**처럼 동작합니다.

### packages/ui/package.json

디자인 시스템 컴포넌트(Button, Input 등)와 공유 스타일을 포함합니다.

```json
{
  "name": "@dessert/ui",
  "version": "0.0.1",
  "private": true,
  "exports": {
    ".": "./src/index.ts",
    "./styles": "./src/styles/index.css"
  },
  "peerDependencies": {
    "react": "^19.0.0"
  }
}
```

- `"."` → `import { Button } from '@dessert/ui'`
- `"./styles"` → `@import '@dessert/ui/styles'` (CSS 진입점)

```css
/* apps/seller/src/styles/index.css */
@import '@dessert/ui/styles'; /* 공유 디자인 토큰, 폰트, reset */
```

### packages/utils/package.json

axios factory function, debounce, 날짜/숫자 포맷터 등 순수 인프라 유틸을 포함합니다.

```json
{
  "name": "@dessert/utils",
  "version": "0.0.1",
  "private": true,
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "axios": "^1.0.0"
  }
}
```

### packages/config/package.json

`tsconfig/base.json`을 공유합니다.

```json
{
  "name": "@dessert/config",
  "version": "0.0.1",
  "private": true,
  "exports": {
    "./tsconfig": "./tsconfig/base.json"
  }
}
```

---

## 5. 의존성은 어디에 넣을까?

모노레포에서 가장 헷갈리는 부분입니다. 기준은 하나입니다.

> **패키지를 직접 import해서 사용하는 앱/패키지의 `package.json`에 넣습니다.**

### 케이스별 판단

**`react`는 어디에?**

```
seller에서 import → apps/seller/package.json ✅
admin에서 import  → apps/admin/package.json  ✅
→ 넣지 않지 않습니다. ❌
```

**`prettier`는 어디에?**

```
루트에서 prettier --write .로 전체 포맷
→ root package.json devDependencies ✅
```

**`axios`는 어디에?**

```
packages/utils 내부에서만 사용
→ packages/utils/package.json dependencies ✅

apps/seller는 @dessert/utils를 통해 간접 사용하므로 별도 선언 불필요.
단, seller 코드에서 axios를 직접 import하면 seller에도 선언 필요.
```

**`@dessert/ui`, `@dessert/utils`는 어디에?**

```json
{
  "dependencies": {
    "@dessert/ui": "*",
    "@dessert/utils": "*"
  }
}
```

사용하는 각 앱의 `dependencies`에 추가합니다.

### 피해야 할 패턴

```
❌ 잘못된 패턴
root/package.json에 react, vite, zustand 전부 넣기
→ Yarn Workspaces 호이스팅(hoisting)으로 동작은 하지만
  어느 앱이 어떤 패키지를 쓰는지 추적이 불가능합니다.

✅ 올바른 패턴
실제로 사용하는 앱/패키지의 package.json에 각각 선언합니다.
```
