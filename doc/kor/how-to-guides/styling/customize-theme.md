# 테마 커스터마이징

프로젝트의 테마를 커스터마이징하는 방법을 단계별로 안내합니다.

## 🎯 목표

이 가이드를 완료하면:

- ✅ 브랜드 색상을 적용할 수 있습니다
- ✅ 다크/라이트 모드 색상을 변경할 수 있습니다
- ✅ 커스텀 CSS 변수를 추가할 수 있습니다

## 1단계: shadcn 테마 생성기 사용

### 온라인 도구로 색상 생성

1. [shadcn-ui-theme-generator](https://zippystarter.com/tools/shadcn-ui-theme-generator)에 접속

2. 원하는 Primary 색상 선택

3. 생성된 CSS 복사

### 테마 파일에 붙여넣기

`src/shared/lib/shadcn/styles/shadcn.pcss` 파일을 수정합니다:

```css
/* 라이트 모드 */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);

  /* 여기에 생성된 Primary 색상 붙여넣기 */
  --primary: oklch(0.54 0.22 13.45); /* 예: 오렌지색 */
  --primary-foreground: oklch(0.985 0 0);
}

/* 다크 모드 */
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);

  /* 다크 모드용 Primary 색상 */
  --primary: oklch(0.7 0.19 13.45); /* 밝기 조정 */
  --primary-foreground: oklch(0.11 0 0);
}
```

## 2단계: 커스텀 브랜드 색상 추가

### 색상 변수 정의

`src/styles/typography.pcss` 파일에 추가합니다:

```css
@theme {
  /* 브랜드 메인 컬러 */
  --color-brand-primary: #f04c28;
  --color-brand-secondary: #ff6b6b;

  /* 그레이스케일 */
  --color-gray-50: #fafafa;
  --color-gray-100: #f5f5f5;
  --color-gray-900: #1a1a1a;

  /* 기능별 컬러 */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
}
```

### 컴포넌트에서 사용

```typescript
<div className="bg-brand-primary text-white">
    <h1>브랜드 컬러 적용</h1>
</div>

<button className="bg-success text-white">
    성공 버튼
</button>

<div className="text-danger">
    경고 메시지
</div>
```

## 3단계: 다크 모드 색상 미세 조정

### 밝기 조절

다크 모드에서는 색상의 밝기를 조절해야 눈의 피로를 줄일 수 있습니다:

```css
.dark {
  /* 배경은 완전한 검정이 아닌 약간 밝은 검정 */
  --background: oklch(0.15 0 0); /* 0.145 → 0.15 */

  /* 텍스트도 완전한 흰색이 아닌 약간 어두운 흰색 */
  --foreground: oklch(0.92 0 0); /* 0.985 → 0.92 */

  /* Primary는 더 밝게 */
  --primary: oklch(0.75 0.19 13.45); /* 0.7 → 0.75 */
}
```

### 색상 대비 확인

웹 접근성을 위해 색상 대비를 확인하세요:

- **최소 대비**: 4.5:1 (일반 텍스트)
- **권장 대비**: 7:1 (큰 텍스트)

도구: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## 4단계: 런타임 테마 변경

### Redux로 테마 관리

이미 프로젝트에 테마 관리 기능이 구현되어 있습니다:

```typescript
import { useAppDispatch } from 'src/global/store/redux/reduxHooks'
import { themeAction } from 'src/shared/components/theme/themeReducer'

function ThemeToggle() {
    const dispatch = useAppDispatch()

    const handleChange = (newTheme: 'light' | 'dark' | 'system') => {
        dispatch(themeAction.setTheme(newTheme))
    }

    return (
        <select onChange={(e) => handleChange(e.target.value)}>
            <option value="light">라이트</option>
            <option value="dark">다크</option>
            <option value="system">시스템</option>
        </select>
    )
}
```

### 동적 색상 변경

CSS 변수를 직접 변경하여 실시간으로 테마를 조정할 수 있습니다:

```typescript
function ColorPicker() {
    const changePrimaryColor = (color: string) => {
        // OKLCH로 변환 (실제로는 변환 함수 필요)
        const oklch = convertToOKLCH(color)

        // CSS 변수 업데이트
        document.documentElement.style.setProperty(
            '--primary',
            oklch
        )

        // localStorage에 저장
        localStorage.setItem('custom-primary', oklch)
    }

    return (
        <input
            type="color"
            onChange={(e) => changePrimaryColor(e.target.value)}
        />
    )
}
```

## 5단계: 글꼴 커스터마이징

### 다른 글꼴 추가

1. 폰트 파일을 `src/assets/fonts/` 폴더에 추가

2. `fonts.pcss`에 정의:

```css
@font-face {
  font-family: 'MyCustomFont';
  src: url('/src/assets/fonts/MyCustomFont.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```

3. 사용:

```css
@theme {
  --font-heading: 'MyCustomFont', sans-serif;
  --font-body: 'Pretendard', sans-serif;
}

/* 적용 */
h1,
h2,
h3 {
  font-family: var(--font-heading);
}

body {
  font-family: var(--font-body);
}
```

## 6단계: 애니메이션 커스터마이징

### 커스텀 애니메이션 추가

`typography.pcss`에 정의:

```css
@theme {
  /* 애니메이션 타이밍 */
  --animate-bounce-slow: bounce 2s infinite;
  --animate-pulse-fast: pulse 1s infinite;

  /* 트랜지션 속도 */
  --transition-fast: 150ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;
}

/* 커스텀 키프레임 */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@theme {
  --animate-slide-in: slideIn 0.3s ease-out;
}
```

### 사용:

```typescript
<div className="animate-[slideIn_0.3s_ease-out]">
    슬라이드 인 효과
</div>
```

## 🎨 완성된 테마 예시

### 브랜드 색상 시스템

```css
@theme {
  /* Primary */
  --color-primary-50: #fff5f0;
  --color-primary-100: #ffe6d9;
  --color-primary-500: #f04c28;
  --color-primary-900: #7a1f0f;

  /* Secondary */
  --color-secondary-500: #6366f1;

  /* Neutral */
  --color-gray-50: #fafafa;
  --color-gray-500: #737373;
  --color-gray-900: #171717;
}
```

### 다크 모드 조정

```css
.dark {
  --background: oklch(0.15 0 0);
  --foreground: oklch(0.92 0 0);
  --primary: oklch(0.75 0.22 13.45);
  --border: oklch(0.25 0 0);
}
```

## ✅ 체크리스트

테마 커스터마이징을 완료했다면:

- [ ] shadcn 테마 색상 적용
- [ ] 브랜드 색상 추가
- [ ] 다크 모드 색상 조정
- [ ] 색상 대비 확인
- [ ] 모든 페이지에서 테스트

## 🚀 다음 단계

테마를 커스터마이징했다면:

- **[테마 시스템 개념](../../concepts/theming.md)**: 테마 시스템 이해하기
- **[TailwindCSS 문서](https://tailwindcss.com/)**: 더 많은 유틸리티 클래스 알아보기
- **[shadcn/ui 컴포넌트](https://ui.shadcn.com/)**: 컴포넌트 활용하기

---

[← How-to 가이드 목차로 돌아가기](../README.md)
