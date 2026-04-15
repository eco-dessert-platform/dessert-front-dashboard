# 환경변수 관리 가이드

## 개요

- `.env`는 Git에 커밋하지 않습니다. (`.gitignore` 적용)
- `.env.example`은 보안 문제가 발생하지 않게 하기 위해서 실제 값이 아닌 키와 예시값만 커밋합니다.
- 새로운 환경변수 추가 시 아래 절차를 반드시 지켜주세요.

<br/>

## .env.example 위치

| 앱     | 경로                     |
| ------ | ------------------------ |
| seller | apps/seller/.env.example |
| admin  | apps/admin/.env.example  |

<br/>

## 네이밍 규칙

- Vite 앱은 `VITE_` 접두사가 필수입니다. (브라우저에서 접근 가능한 변수)
- 대문자 snake_case를 사용합니다. (`UPPER_SNAKE_CASE`)

```
VITE_API_BASE_URL=https://api.example.com
VITE_USE_MOCK=false
```

<br/>

## 환경변수 추가 절차

### Step 1. 로컬 `.env`에 실제 값 추가

```
VITE_KAKAO_MAP_API_KEY=실제_API_키
```

### Step 2. `.env.example`에 키와 예시값 추가

민감한 정보를 노출하지 않기 위해서 **실제 값을 절대 포함하지 않습니다.**

```
VITE_KAKAO_MAP_API_KEY=your_kakao_map_api_key
```

### Step 3. PR의 `## 환경변수 변경사항` 섹션에 명시

팀원이 로컬 환경을 업데이트할 수 있도록 추가된 환경변수를 작성하고 간단한 설명을 진행합니다.

```
## 환경변수 변경사항

- `VITE_KAKAO_MAP_API_KEY`: 카카오맵 API 키
```

<br/>

## 현재 환경변수 현황

| 변수명              | 앱            | 설명                      |
| ------------------- | ------------- | ------------------------- |
| `VITE_API_BASE_URL` | seller, admin | API 서버 기본 URL         |
| `VITE_USE_MOCK`     | seller        | MSW Mock 모드 활성화 여부 |
