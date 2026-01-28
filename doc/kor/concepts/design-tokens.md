# 디자인 토큰 (Design Tokens)

Figma Styles 기반으로 정의된 디자인 토큰 시스템입니다.

## 📋 개요

디자인 토큰은 디자인 시스템의 기본 구성 요소로, 색상, 타이포그래피, 간격, 그림자 등을 일관되게 관리합니다.

## 🎨 Color Token

### Primary Colors

프로젝트의 주요 브랜드 색상입니다.

```css
--color-primary-50   /* 가장 밝은 톤 */
--color-primary-100
--color-primary-200
--color-primary-300
--color-primary-400
--color-primary-500  /* 기본 색상 */
--color-primary-600
--color-primary-700
--color-primary-800
--color-primary-900  /* 가장 어두운 톤 */
```

### Gray Scale

중립적인 회색 톤입니다.

```css
--color-gray-50   /* 가장 밝은 회색 */
--color-gray-100
--color-gray-200
--color-gray-300
--color-gray-400
--color-gray-500
--color-gray-600
--color-gray-700
--color-gray-800
--color-gray-900  /* 가장 어두운 회색 */
```

### Status Colors

상태를 나타내는 색상입니다.

- **Success**: `--color-success-*` (50~900)
- **Warning**: `--color-warning-*` (50~900)
- **Error**: `--color-error-*` (50~900)
- **Info**: `--color-info-*` (50~900)

### 사용 예시

```tsx
// Tailwind CSS 클래스로 사용
<div className="bg-primary-500 text-white">
  Primary Button
</div>

// CSS 변수로 직접 사용
<div style={{ backgroundColor: 'var(--color-primary-500)' }}>
  Primary Button
</div>
```

## 📐 Spacing System

4px 기준 그리드 시스템을 사용합니다.

### Base Spacing Scale

```css
--spacing-0: 0px --spacing-1: 4px /* 0.25rem */ --spacing-2: 8px /* 0.5rem */
  --spacing-3: 12px /* 0.75rem */ --spacing-4: 16px /* 1rem */ --spacing-5: 20px
  /* 1.25rem */ --spacing-6: 24px /* 1.5rem */ --spacing-8: 32px /* 2rem */
  --spacing-10: 40px /* 2.5rem */ --spacing-12: 48px /* 3rem */
  --spacing-16: 64px /* 4rem */ --spacing-20: 80px /* 5rem */ --spacing-24: 96px
  /* 6rem */;
```

### Half Spacing

```css
--spacing-0.5: 2px /* 0.125rem */ --spacing-1.5: 6px /* 0.375rem */
  --spacing-2.5: 10px /* 0.625rem */ --spacing-3.5: 14px /* 0.875rem */;
```

### Component Specific Spacing

```css
/* Button Spacing */
--spacing-button-sm-px: 10px --spacing-button-sm-py: 8px
  --spacing-button-md-px: 16px --spacing-button-md-py: 12px
  --spacing-button-lg-px: 16px --spacing-button-lg-py: 16px /* Input Spacing */
  --spacing-input-px: 12px --spacing-input-py: 8px --spacing-input-gap: 6px
  /* Layout Spacing */ --spacing-container-px: 196px
  --spacing-container-py: 40px --spacing-section-gap: 20px;
```

### 사용 예시

```tsx
// Tailwind CSS 클래스로 사용
<div className="p-4 gap-2">
  {/* padding: 16px, gap: 8px */}
</div>

// CSS 변수로 직접 사용
<div style={{
  padding: 'var(--spacing-4)',
  gap: 'var(--spacing-2)'
}}>
</div>
```

## 🔤 Font Scale

Figma Text Styles 기반 타이포그래피 시스템입니다.

### Font Sizes

```css
--font-size-10: 10px /* Body 10 */ --font-size-11: 11px --font-size-12: 12px
  /* Body 12 */ --font-size-14: 14px /* Title 14 */ --font-size-16: 16px
  /* Title 16 */ --font-size-18: 18px /* Heading 18 */ --font-size-20: 20px
  /* Heading 20 */ --font-size-24: 24px /* Heading 24 */;
```

### Line Heights

```css
--line-height-none: 1 --line-height-tight: 1.2 --line-height-snug: 1.3
  --line-height-normal: 1.4 /* 기본값 */ --line-height-relaxed: 1.5
  --line-height-loose: 1.6;
```

### Letter Spacing

```css
--letter-spacing-tighter: -0.06em --letter-spacing-tight: -0.04em
  --letter-spacing-normal: -0.02em /* 기본값 */ --letter-spacing-wide: 0em
  --letter-spacing-wider: 0.02em;
```

### Font Weights

```css
--font-weight-thin: 100 --font-weight-extralight: 200 --font-weight-light: 300
  --font-weight-normal: 400 /* Regular */ --font-weight-medium: 500 /* Medium */
  --font-weight-semibold: 600 /* SemiBold */ --font-weight-bold: 700 /* Bold */
  --font-weight-extrabold: 800 --font-weight-black: 900;
```

### Typography Utilities

프로젝트에서 사용하는 Typography 유틸리티 클래스:

#### Heading Styles

- `text-heading-24-m` / `text-heading-24-sb`
- `text-heading-20-m` / `text-heading-20-sb`
- `text-heading-18-m` / `text-heading-18-sb` / `text-heading-18-b`

#### Title Styles

- `text-title-16-r` / `text-title-16-m` / `text-title-16-sb` / `text-title-16-b`
- `text-title-14-r` / `text-title-14-m` / `text-title-14-sb` / `text-title-14-b`

#### Body Styles

- `text-body-12-r` / `text-body-12-m` / `text-body-12-sb` / `text-body-12-b` / `text-body-12-r-underline`
- `text-body-10-r` / `text-body-10-sb`

### 사용 예시

```tsx
// Typography 유틸리티 클래스 사용
<h1 className="text-heading-24-sb">Heading</h1>
<p className="text-title-16-r">Title Text</p>
<span className="text-body-12-m">Body Text</span>
```

## 🔲 Border Radius

```css
--radius-none: 0px --radius-sm: 4px --radius-md: 8px --radius-lg: 10px
  --radius-xl: 12px --radius-2xl: 16px --radius-full: 9999px
  /* Component Specific */ --radius-badge: 4px --radius-button-sm: 8px
  --radius-button-md: 10px --radius-button-lg: 12px --radius-input: 10px
  --radius-card: 8px --radius-toast: 10px;
```

## 📏 Height System

```css
--height-button-sm: 30px --height-button-md: 42px --height-button-lg: 56px
  --height-input: 42px --height-header: 57px --height-footer: 68px;
```

## 🌑 Shadow System

```css
--shadow-xs:
  0px 1px 2px 0px rgba(0, 0, 0, 0.05) --shadow-sm: 0px 1px 3px 0px
    rgba(0, 0, 0, 0.1),
  0px 1px 2px 0px rgba(0, 0, 0, 0.06) --shadow-md: 0px 2px 4px 0px
    rgba(0, 0, 0, 0.08),
  0px 3px 10px 0px rgba(0, 0, 0, 0.1) --shadow-lg: 0px 4px 6px -1px
    rgba(0, 0, 0, 0.1),
  0px 2px 4px -1px rgba(0, 0, 0, 0.06) --shadow-xl: 0px 10px 15px -3px
    rgba(0, 0, 0, 0.1),
  0px 4px 6px -2px rgba(0, 0, 0, 0.05) --shadow-2xl: 0px 20px 25px -5px
    rgba(0, 0, 0, 0.1),
  0px 10px 10px -5px rgba(0, 0, 0, 0.04) /* Component Specific */
    --shadow-toast: 0px 2px 4px 0px rgba(0, 0, 0, 0.08),
  0px 3px 10px 0px rgba(0, 0, 0, 0.1) --shadow-card: 0px 1px 3px 0px
    rgba(0, 0, 0, 0.1);
```

## 📚 파일 구조

```
src/styles/
├── tokens.pcss           # 디자인 토큰 정의 (새로 생성)
├── typography.pcss       # 레거시 변수 (하위 호환성)
├── fonts.pcss            # 폰트 정의
├── base.pcss             # 기본 스타일
└── index.css             # 메인 엔트리
```

## 🔄 마이그레이션 가이드

기존 코드에서 하드코딩된 값들을 디자인 토큰으로 교체하세요:

### Before

```tsx
<div className="h-[42px] rounded-[10px] px-4 py-3">Button</div>
```

### After

```tsx
<div className="h-[var(--height-button-md)] rounded-[var(--radius-button-md)] px-[var(--spacing-button-md-px)] py-[var(--spacing-button-md-py)]">
  Button
</div>
```

또는 Tailwind CSS 클래스 사용:

```tsx
<div className="h-[42px] rounded-[10px] px-4 py-3">
  {/* Tailwind가 자동으로 토큰을 사용 */}
</div>
```

## 📖 참고 자료

- [Tailwind CSS v4 문서](https://tailwindcss.com/docs)
- [Figma Design Tokens](https://www.figma.com/community/plugin/888356646278934516/Design-Tokens)
