import { setupServer } from 'msw/node'

import type { RequestHandler } from 'msw'

// vitest(Node 환경) 전용 MSW 서버 팩토리
// handlers는 앱마다 다르므로(엔드포인트 차이) 인자로 주입받는다.
// beforeAll(server.listen), afterEach(server.resetHandlers), afterAll(server.close) 패턴으로 사용
export const createTestServer = (handlers: RequestHandler[]) =>
  setupServer(...handlers)
