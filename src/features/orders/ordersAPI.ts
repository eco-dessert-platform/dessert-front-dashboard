import { AxiosResponse } from 'axios'
import { createMockResponse } from 'src/shared/utils/mockResponse'
import { MOCK_ORDER_COMPLETED, MOCK_ORDER_LIST } from './data/ordersMockData'

// 주문 목록 조회 API
export const getOrderList = (
): Promise<AxiosResponse<typeof MOCK_ORDER_LIST>> => {
    // TODO: 실제 API 연동 시 아래 주석 해제
    // return client.get('/orders', { params: payload })

    // 더미데이터 반환 (실제 API 연동 전까지 사용)
    return createMockResponse(MOCK_ORDER_LIST)
}

// 완료된 주문 목록 조회 API
export const getOrderCompletedList = (
): Promise<AxiosResponse<typeof MOCK_ORDER_COMPLETED>> => {
    // TODO: 실제 API 연동 시 아래 주석 해제
    // return client.get('/orders/completed', { params: payload })

    // 더미데이터 반환 (실제 API 연동 전까지 사용)
    return createMockResponse(MOCK_ORDER_COMPLETED)
}
