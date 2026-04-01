# Git 컨벤션 가이드

<br/>

## 커밋 메시지 (Conventional Commits)

```
<type>(<scope>): <subject>

<body> (선택)
```

### type

| 타입       | 용도                                           |
| ---------- | ---------------------------------------------- |
| `feat`     | 새로운 기능 추가                               |
| `fix`      | 버그 수정                                      |
| `docs`     | 문서 변경                                      |
| `style`    | 코드 포맷팅, 세미콜론 누락 등 (로직 변경 없음) |
| `refactor` | 리팩토링 (기능 변경 없음)                      |
| `perf`     | 성능 개선                                      |
| `test`     | 테스트 추가 또는 수정                          |
| `chore`    | 빌드 설정, 패키지 업데이트 등                  |

### scope

- 변경이 영향을 미치는 앱 또는 패키지를 명시합니다.
- `@dessert/` 접두사를 제거한 짧은 이름을 사용합니다.

| scope       | 대상                                                           |
| ----------- | -------------------------------------------------------------- |
| `seller`    | `apps/seller`                                                  |
| `admin`     | `apps/admin`                                                   |
| `ui`        | `packages/ui` (`@dessert/ui`)                                  |
| `utils`     | `packages/utils` (`@dessert/utils`)                            |
| `config`    | `packages/config` (`@dessert/config`)                          |
| `workspace` | 루트 설정, turbo, CI/CD 등 특정 앱·패키지에 귀속되지 않는 변경 |

### 예시

```
feat(seller): 주문 목록 무한스크롤 구현

fix(seller): 상품 등록 시 이미지 미리보기 깨짐 수정

feat(ui): DateRangePicker 컴포넌트 추가

chore(workspace): @tanstack/react-query 5.90.20으로 업데이트

docs(workspace): FSD 온보딩 가이드 작성
```
