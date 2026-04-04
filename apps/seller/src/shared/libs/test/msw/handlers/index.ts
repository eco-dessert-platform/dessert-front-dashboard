import { authHandlers } from './auth'

// 앱에서 사용하는 모든 핸들러를 여기에 통합
// 새 도메인 핸들러 추가 시 이 파일에만 import하면 됨
export const handlers = [...authHandlers]
