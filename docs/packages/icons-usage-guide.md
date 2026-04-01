# @dessert/icons 사용 가이드

<br/>

## 개요

`@dessert/icons`는 **SVGR** 기반의 SVG 아이콘 패키지입니다.
각 아이콘은 React 컴포넌트로 제공되며, Tailwind CSS 유틸리티 클래스로 크기와 색상을 제어합니다.

실제 아이콘 목록은 Storybook에서 확인할 수 있습니다.

```bash
yarn storybook:icons  # 포트 6077에서 실행
```

<br/>

## 기본 사용법

### Import

```tsx
import { SearchIcon, ChevronLeftIcon, HeartRedIcon } from '@dessert/icons'
```

### Size — Tailwind `w-*` / `h-*` 클래스로 제어

아이콘은 기본적으로 부모 컨텍스트의 크기를 따릅니다.
`className`으로 Tailwind 크기 유틸리티를 지정하세요.

```tsx
<SearchIcon className="w-4 h-4" />
<SearchIcon className="w-5 h-5" />
<SearchIcon className="w-6 h-6" />
<SearchIcon className="w-8 h-8" />
```

가로·세로가 동일한 경우 `size-*`로 축약할 수 있습니다.

```tsx
<SearchIcon className="size-4" />  {/* w-4 h-4 와 동일 */}
<SearchIcon className="size-5" />  {/* w-5 h-5 와 동일 */}
```

> **왜 className으로 제어하나요?**
> SVG 내부에 `viewBox="0 0 24 24"`가 고정되어 있고, `width`/`height`는 렌더링될 픽셀 크기를 결정합니다.
> Tailwind 유틸리티를 사용하면 디자인 시스템의 spacing scale과 일관성을 유지할 수 있습니다.

### Color — Tailwind 텍스트 색상 클래스로 제어

아이콘은 `stroke="currentColor"` 또는 `fill="currentColor"`로 구현되어 있어,
부모 또는 자신의 `color`(CSS `color` 속성)를 상속합니다.

```tsx
<SearchIcon className="w-5 h-5 text-gray-500" />   /* 그레이 컬러 */
<SearchIcon className="w-5 h-5 text-primary" />    /* 브랜드 컬러 */
<SearchIcon className="w-5 h-5 text-red-500" />    /* 레드 컬러 */
```

<br/>

## 접근성 (aria-hidden)

아이콘을 사용할 때 반드시 **"이 아이콘이 정보를 전달하는가?"** 를 판단해야 합니다.

### Case 1. 장식용 아이콘 — `aria-hidden="true"`

버튼, 링크 등 **부모 요소가 의미를 설명**하는 경우, 아이콘은 장식에 불과합니다.
스크린 리더가 아이콘을 중복해서 읽지 않도록 `aria-hidden="true"`를 사용합니다.

```tsx
// ✅ 올바른 예시 — 버튼이 "검색" 역할을 설명
<button aria-label="검색">
  <SearchIcon aria-hidden="true" className="w-5 h-5" />
</button>

// ✅ 텍스트와 함께 사용 — 아이콘은 장식
<button>
  <SearchIcon aria-hidden="true" className="w-4 h-4 mr-1" />
  검색
</button>
```

### Case 2. 단독 의미 아이콘 — `aria-label` 제공

아이콘 **자체가 정보를 전달**하는 경우 (텍스트 없이 아이콘만 있을 때),
스크린 리더가 읽을 수 있도록 `aria-label`을 제공합니다.

```tsx
// ✅ 올바른 예시 — 아이콘이 "찜하기" 상태를 표현
<HeartRedIcon aria-label="찜하기" className="w-6 h-6" />

// ✅ 경고 상태 표시
<CircleAlertIcon aria-label="주의 필요" className="w-5 h-5 text-yellow-500" />
```

### 판단 기준

```
아이콘 옆에 텍스트가 있나요?
    ├─ Yes → aria-hidden="true" (부모/텍스트가 의미 설명)
    └─ No → 아이콘이 단독으로 의미를 전달하나요?
                ├─ Yes → aria-label="설명" 제공
                └─ No (순수 장식) → aria-hidden="true"
```

<br/>

## 아이콘 목록 (카테고리별)

- 전체 목록은 Storybook(`yarn storybook:icons`)에서 확인하세요.

### Lined (선형 아이콘)

| 카테고리 | 아이콘                                                                                                                                                                                                               |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arrow    | ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ChevronDoubleLeft, ChevronDoubleRight, ArrowUp                                                                                                                    |
| System   | Check, EllipsisVertical, LogOut, Minus, Plus, RotateCw, Search, Trash, X                                                                                                                                             |
| Optional | Bell, Bold, Calendar, Camera, CircleAlert, CircleCheck, CircleQuestionMark, Copy, Download, FileText, Image, Italic, Link, Lock, Settings, Share2, SquarePen, Strikethrough, TextAlign\*, ThumbUp, Underline, Upload |

### Filled (채움 아이콘)

| 카테고리 | 아이콘                                                                                                               |
| -------- | -------------------------------------------------------------------------------------------------------------------- |
| Meaning  | BellFilled, BellOff, CircleAlertFilled, CircleCheckFilled, Excel                                                     |
| Heart    | HeartGray, HeartRed, HeartRedShadow, HeartWhiteShadow                                                                |
| Star     | Star, StarFilled, StarHalf                                                                                           |
| Checkbox | CheckboxChecked, CheckboxCheckedGray, CheckboxCheckedLight, CheckboxDefault, CheckboxDisabled, CheckboxIndeterminate |
| Radio    | RadioChecked, RadioDefault                                                                                           |
