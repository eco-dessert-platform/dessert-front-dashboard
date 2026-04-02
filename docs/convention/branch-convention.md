# 브랜치 컨벤션 가이드

<br/>

## 브랜치 네이밍 규칙

```
<type>/<description>
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

### description

- 변경 내용을 영문 kebab-case로 작성합니다.

### 예시

```
feat/order-infinite-scroll

fix/image-preview-broken

chore/update-dependencies

docs/fsd-guide

refactor/order-api-hook
```
