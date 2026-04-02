# 작업 파이프라인 가이드

<br/>

## 개요

모든 작업은 **Notion 개발 일정 → GitHub Issue → Milestone 연동 → 구현 → PR** 순서로 진행됩니다.
이 파이프라인을 통해 작업 현황을 투명하게 공유하고, 데드라인을 명확하게 관리합니다.

<br/>

## 전체 플로우

```
1. Notion 개발 일정 페이지에 작업 보드 작성
        ↓
2. 작업 보드를 참조하여 GitHub Issue 생성
        ↓
3. 모든 팀원의 Issue를 Milestone에 연동
        ↓
4. Issue 기반으로 브랜치 생성 및 개발
        ↓
5. GitHub PR 생성 (코드 리뷰 요청)
        ↓
6. 코드 리뷰 완료 → develop 브랜치로 Merge
        ↓
7. 주간 Milestone으로 데드라인 관리
```

<br/>

## Step 1. Notion 작업 보드 작성

작업을 시작하기 전에 Notion 개발 일정 페이지의 **작업 보드**에 항목을 추가합니다.
GitHub Issue 템플릿과 동일한 구조로 작성하여 일관성을 유지합니다.

작성 항목:

- 🚀 제목 (Issue title과 동일하게 작성)
- ✨ 작업 내용 (한 줄 요약)
- ⚙ 상세한 작업 내용 (체크리스트)
- 🛠 예상 소요시간
- 📝 참고 사항 (생략 가능)

<br/>

## Step 2. GitHub Issue 생성

Notion 작업 보드를 참조하여 **GitHub Issue**를 생성합니다.
Issue 템플릿을 사용하면 일관된 형식으로 작성할 수 있습니다.

### Issue 제목 형식

```
<이모지> <타입>: <간략한 설명>

✨ Feat: 주문 목록 무한스크롤 구현
🐛 Fix: 상품 등록 이미지 미리보기 수정
♻️ Refactor: 주문 API 훅 분리
```

| 이모지 | 타입      | 용도               |
| ------ | --------- | ------------------ |
| ✨     | Feat      | 새 기능            |
| 🐛     | Fix       | 버그 수정          |
| 📦     | Chore     | 빌드/패키지 설정   |
| ♻️     | Refactor  | 리팩토링           |
| 💄     | Style     | UI/스타일 변경     |
| 📝     | Doc       | 문서 수정          |
| 🧪     | Test      | 테스트 추가/수정   |
| 🚨     | Hotfix    | 긴급 수정          |
| 📖     | Storybook | 스토리북 추가/수정 |

> PR 제목과 동일한 형식을 사용합니다. Issue와 PR의 제목이 일치하면 작업 추적이 쉬워집니다.

### Issue 템플릿 항목

| 항목              | 설명                                                  |
| ----------------- | ----------------------------------------------------- |
| ✨ 작업 내용      | 이번 Issue에서 무엇을 할 것인지 한 줄 요약            |
| ⚙ 상세 작업 내용 | 체크리스트 형식으로 세부 태스크 나열                  |
| 🛠 예상 소요 시간 | 하루 이상 / 반나절 / 2-3시간 / 1시간 이내 / 30분 이내 |

### Issue 생성 방법

1. GitHub 저장소의 **Issues** 탭으로 이동
2. **New issue** 클릭
3. Issue 템플릿 선택 후 내용 작성
4. 아래 필수 항목 설정 후 제출

### 필수 설정 항목

#### Labels — 작업 영역 라벨 필수 선택

모노레포 구조에서 어떤 앱·패키지에 해당하는 작업인지 라벨로 명시합니다.

| 라벨              | 대상                                                      |
| ----------------- | --------------------------------------------------------- |
| `@dessert/seller` | Seller 서비스 영역                                        |
| `@dessert/admin`  | Admin 서비스 영역                                         |
| `@dessert/ui`     | 공통 컴포넌트 영역                                        |
| `@dessert/icons`  | 공통 아이콘 컴포넌트 영역                                 |
| `@workspace`      | 루트 설정, turbo, CI/CD 등 앱·패키지에 귀속되지 않는 변경 |

> 하나의 Issue가 여러 영역에 걸쳐 있으면 해당하는 라벨을 모두 선택합니다.

#### Assignees — 담당자 본인 지정 필수

Issue를 생성할 때 반드시 **본인을 Assignee로 지정**합니다.
Milestone 진행률과 작업 현황 파악을 위해 필수입니다.

<br/>

## Step 3. Milestone 연동

Issue 생성 후 현재 주차 **Milestone**에 연결합니다.
모든 팀원의 Issue를 한 곳에서 확인하고, 주간 목표 달성 현황을 파악할 수 있습니다.

1. Issue 상세 페이지 우측 **Milestone** 항목 클릭
2. 현재 주차 Milestone 선택 (**팀장이 미리 주차별 Milestone을 미리 생성해야 합니다**)

> Milestone이 없다면 Step 7을 참고해 먼저 생성하세요.

<br/>

## Step 4. 브랜치 생성 및 개발

브랜치 네이밍 규칙에 따라 브랜치를 생성합니다.

```bash
# 브랜치 네이밍 규칙: <type>/<description>
git checkout -b feat/order-infinite-scroll
git checkout -b fix/image-preview-broken
git checkout -b chore/update-dependencies
```

<br/>

## Step 5. PR 생성

개발 완료 후 **Pull Request**를 생성합니다.
PR 템플릿에 따라 작성하고, 관련 Issue를 연결합니다.

### PR 제목 형식

```
<이모지> <타입>: <간략한 설명>

✨ Feat: 주문 목록 무한스크롤 구현
🐛 Fix: 상품 등록 이미지 미리보기 수정
♻️ Refactor: 주문 API 훅 분리
```

| 이모지 | 타입      | 용도               |
| ------ | --------- | ------------------ |
| ✨     | Feat      | 새 기능            |
| 🐛     | Fix       | 버그 수정          |
| 📦     | Chore     | 빌드/패키지 설정   |
| ♻️     | Refactor  | 리팩토링           |
| 💄     | Style     | UI/스타일 변경     |
| 📝     | Doc       | 문서 수정          |
| 🧪     | Test      | 테스트 추가/수정   |
| 🚨     | Hotfix    | 긴급 수정          |
| 📖     | Storybook | 스토리북 추가/수정 |

#### Assignees — 담당자 본인 지정 필수

Issue 생성과 동일하게 PR를 생성할 때 반드시 **본인을 Assignee로 지정**합니다.

### Issue 연결

PR 본문에 `Closes #<Issue번호>`를 작성하면 PR Merge 시 Issue가 자동으로 닫힙니다.

```
Closes #42
```

<br/>

## Step 6. 코드 리뷰 & Merge

- PR을 생성한 후 팀원에게 리뷰를 요청합니다
- 리뷰어는 코드 리뷰 후 **Approve** 또는 **Request Changes**
- 최소 1명의 Approve 후 `develop` 브랜치로 Merge

<br/>

## Step 7. Milestone으로 데드라인 관리

**GitHub Milestone**을 사용해 주간 단위 데드라인을 설정합니다.

### Milestone 운영 방식

1. 매주 초 새로운 Milestone 생성 (예: `2026-W12`)
2. 이번 주 완료 목표 Issue들을 Milestone에 연결
3. 모든 팀원이 Notion 작업 보드 + Issue 작업 완료 시 Milestone 달성
4. Milestone 진행률을 통해 주간 목표 달성 현황 파악

### Milestone 생성 방법

1. GitHub 저장소 **Issues** → **Milestones** → **New milestone**
2. 제목: `YYYY-WXX` (예: `2026-W12` — 연도-주차, W12 = 해당 연도의 12번째 주)
3. 마감일(Due date) 설정
4. 관련 Issue들을 해당 Milestone에 연결
