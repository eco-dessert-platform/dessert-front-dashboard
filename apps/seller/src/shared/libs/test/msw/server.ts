import { setupServer } from 'msw/node'

import { handlers } from './handlers'

// vitest(Node 환경) 전용 MSW 서버
// beforeAll(server.listen), afterEach(server.resetHandlers), afterAll(server.close) 패턴으로 사용
export const server = setupServer(...handlers)
