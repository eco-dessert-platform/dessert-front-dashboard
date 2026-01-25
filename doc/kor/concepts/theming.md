# 테마 시스템

이 프로젝트는 **TailwindCSS v4**와 **shadcn/ui**를 기반으로 한 강력한 테마 시스템을 제공합니다.

## 📋 개요

### 핵심 특징

- ✅ **다크/라이트 모드 지원**: OS 설정 감지 및 수동 전환
- ✅ **CSS 변수 기반**: 동적 테마 변경 가능
- ✅ **FOUC 방지**: 새로고침 시 깜빡임 없음
- ✅ **OKLCH 색상 공간**: 더 나은 색상 인식
- ✅ **Pretendard 폰트**: 한글 최적화 폰트

## 🎨 CSS 아키텍처

### 파일 구조

```
src/styles/
├── index.css           # 메인 엔트리
├── fonts.pcss          # 폰트 정의 (Pretendard)
├── base.pcss           # 기본 스타일 및 전환 효과
├── typography.pcss     # 커스텀 디자인 토큰
└── reset.css           # CSS 리셋

src/shared/lib/shadcn/styles/
└── shadcn.pcss         # Shadcn UI 테마 변수
```

### Import 순서

```css
/* src/styles/index.css */
@import 'tailwindcss'; /* 1. TailwindCSS v4 */
@import 'tw-animate-css'; /* 2. 애니메이션 */
@import 'src/styles/fonts.pcss'; /* 3. 폰트 */
@import 'src/shared/lib/shadcn/styles/shadcn.pcss'; /* 4. 테마 변수 */
@import './typography.pcss'; /* 5. 커스텀 변수 */
@import './base.pcss'; /* 6. 기본 스타일 */
```

## 🌗 다크/라이트 모드

### 테마 전환 방식

**3가지 모드**:

1. **light**: 라이트 모드 강제
2. **dark**: 다크 모드 강제
3. **system**: OS 설정 자동 감지

### CSS 변수 구조

```css
/* shadcn.pcss */

/* 라이트 모드 */
:root {
  --background: oklch(1 0 0); /* 흰색 배경 */
  --foreground: oklch(0.145 0 0); /* 검은색 텍스트 */
  --primary: oklch(0.205 0 0);
  /* ... */
}

/* 다크 모드 */
.dark {
  --background: oklch(0.145 0 0); /* 검은색 배경 */
  --foreground: oklch(0.985 0 0); /* 흰색 텍스트 */
  --primary: oklch(0.922 0 0);
  /* ... */
}
```

### 컴포넌트에서 사용

```typescript
// TailwindCSS 클래스로 자동 적용
<div className="bg-background text-foreground">
    <h1 className="text-primary">Title</h1>
    <p className="text-muted-foreground">Description</p>
</div>
```

## ⚡ 새로고침 시 동작 순서

### FOUC(Flash of Unstyled Content) 방지 전략

**전체 프로세스**:

```
1. HTML 파싱 시작
   ↓
2. 인라인 스크립트 실행 (동기, 블로킹)
   - localStorage에서 테마 읽기
   - .dark 또는 .light 클래스 추가
   - 배경색 인라인 스타일 적용
   ↓
3. CSS 파일 로드 (비동기)
   - TailwindCSS 로드
   - 테마 변수 로드
   ↓
4. React 앱 마운트
   - ThemeProvider 초기화
   ↓
5. 전환 효과 활성화
   - .theme-instant 제거
   - transition 활성화
```

### 인라인 스크립트 (index.html)

```html
<html lang="en" class="theme-instant">
  <head>
    <script>
      ;(() => {
        try {
          // 1. localStorage에서 테마 읽기
          const theme = localStorage.getItem('vite-ui-theme') || 'system'

          // 2. 시스템 다크모드 설정 확인
          const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
          ).matches

          // 3. 최종 테마 결정
          const isDark = theme === 'dark' || (theme === 'system' && prefersDark)

          // 4. HTML 클래스 즉시 적용
          document.documentElement.classList.add(isDark ? 'dark' : 'light')

          // 5. 배경색 즉시 적용 (FOUC 방지)
          document.documentElement.style.backgroundColor = isDark
            ? 'oklch(0.145 0 0)'
            : ''
        } catch (e) {
          console.warn('Early theme apply failed', e)
        }
      })()
    </script>
  </head>
  <body class="preload">
    <!-- ... -->
  </body>
</html>
```

**핵심 포인트**:

- ✅ **동기 실행**: CSS보다 먼저 테마 클래스 적용
- ✅ **인라인 배경색**: CSS 로드 전에 배경색 표시
- ✅ **preload 클래스**: 준비될 때까지 콘텐츠 숨김

### 전환 효과 제어

```css
/* base.pcss */

/* 초기 로드 시 전환 효과 차단 */
.theme-instant *,
.theme-instant *::before,
.theme-instant *::after {
  transition: none !important;
}

/* 초기 렌더링 숨김 */
body.preload {
  visibility: hidden;
}

/* 일반 전환 효과 */
@layer base {
  * {
    @apply transition-colors duration-300 ease-in-out;
  }
}
```

## 🎨 커스텀 색상

### 프로젝트 고유 색상 (typography.pcss)

```css
@theme {
  /* 브랜드 컬러 */
  --color-primary-500: #f04c28;
  --color-gray-100: #f5f5f5;

  /* 카카오 브랜드 */
  --color-kakao: #fee500;

  /* 타이포그래피 */
  --text-14: 14px;
  --text-16: 16px;

  /* 커스텀 애니메이션 */
  --animate-heart-pop: heart-pop 0.3s ease-in-out;
}
```

### TailwindCSS 클래스로 사용

```typescript
<div className="bg-primary-500 text-white">
    <p className="text-14">작은 텍스트</p>
    <button className="bg-kakao">카카오 로그인</button>
</div>
```

## 🔧 테마 커스터마이징

### shadcn 테마 생성기 사용

1. [shadcn-ui-theme-generator](https://zippystarter.com/tools/shadcn-ui-theme-generator)에서 색상 선택
2. 생성된 CSS 변수를 `shadcn.pcss`에 붙여넣기
3. 라이트/다크 모드 각각 설정

**예시**:

```css
:root {
  --background: oklch(1 0 0);
  --primary: oklch(0.54 0.22 13.45); /* 새로운 primary 색상 */
}

.dark {
  --background: oklch(0.11 0 0);
  --primary: oklch(0.7 0.19 13.45); /* 다크모드 primary */
}
```

### 동적 테마 변경 (런타임)

```typescript
// Redux에서 테마 변수 관리
import { useAppDispatch } from 'src/global/store/redux/reduxHooks'
import { themeAction } from 'src/features/theme/themeReducer'

function ThemeCustomizer() {
    const dispatch = useAppDispatch()

    const changeThemeColor = (variable: string, value: string) => {
        // CSS 변수 즉시 변경
        document.documentElement.style.setProperty(variable, value)

        // Redux에 저장
        dispatch(themeAction.setThemeVariable({ variable, value }))
    }

    return (
        <button onClick={() => changeThemeColor('--primary', 'oklch(0.6 0.3 15)')}>
            Primary 색상 변경
        </button>
    )
}
```

## 🖼️ 폰트 시스템

### Pretendard 폰트

**특징**:

- 한글 가독성 최적화
- 100~900 폰트 웨이트 지원
- WOFF2 형식으로 빠른 로딩

**정의** (fonts.pcss):

```css
@font-face {
  font-family: 'Pretendard';
  src:
    url('/src/assets/fonts/pretendard/PretendardVariable.woff2')
      format('woff2-variations'),
    url('/src/assets/fonts/pretendard/woff2-subset/Pretendard-Regular.woff2')
      format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```

**사용**:

```css
body {
  font-family:
    'Pretendard',
    -apple-system,
    sans-serif;
}
```

## 🎯 Best Practices

### 1. 테마 변수 사용

```typescript
// ✅ 좋은 방법: 테마 변수 사용
<div className="bg-background text-foreground">

// ❌ 나쁜 방법: 하드코딩
<div className="bg-white text-black dark:bg-black dark:text-white">
```

### 2. 커스텀 색상 정의

```css
/* ✅ 좋은 방법: typography.pcss에 정의 */
@theme {
    --color-brand: #f04c28;
}

/* 사용 */
<div className="bg-brand">
```

### 3. 전환 효과 일관성

```css
/* ✅ 모든 색상 변경에 일관된 transition */
@layer base {
  * {
    @apply transition-colors duration-300;
  }
}
```

## 🔍 디버깅

### 현재 테마 확인

```javascript
// 개발자 도구 콘솔에서
console.log('Theme:', localStorage.getItem('vite-ui-theme'))
console.log('Classes:', document.documentElement.className)
console.log(
  'BG Color:',
  getComputedStyle(document.documentElement).getPropertyValue('--background'),
)
```

### 테마 초기화

```javascript
// localStorage 초기화
localStorage.setItem('vite-ui-theme', 'system')
location.reload()
```

## 📚 관련 기술

### TailwindCSS v4 특징

- **Lightning CSS 기반**: PostCSS 불필요, 더 빠른 빌드
- **Native CSS**: `@import`, `@theme` 등 표준 CSS 구문
- **자동 최적화**: 사용하지 않는 스타일 자동 제거

### shadcn/ui 특징

- **복사 가능한 컴포넌트**: 패키지 의존성 없음
- **Radix UI 기반**: 접근성 우수
- **TailwindCSS 통합**: 테마 시스템과 완벽한 통합

## 🚀 다음 단계

테마 시스템을 이해하셨다면:

- **[How-to: 테마 커스터마이징](../how-to-guides/styling/customize-theme.md)**: 실제로 테마 변경해보기
- **[shadcn/ui 컴포넌트](https://ui.shadcn.com/)**: 사용 가능한 컴포넌트 확인
- **[TailwindCSS 문서](https://tailwindcss.com/)**: TailwindCSS 활용법

---

[← Concepts 목차로 돌아가기](./README.md)
