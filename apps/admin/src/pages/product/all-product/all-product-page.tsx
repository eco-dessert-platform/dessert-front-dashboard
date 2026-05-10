/** @temp Entity 브랜치 API 동작 검증용 — Feature 브랜치에서 제거 */
import { useQuery } from '@tanstack/react-query'

import { managementAllQueries } from '@/entity/product/management-all'
import { ProductTable } from '@/features/product'

export function AllProductPage() {
  // @temp
  const { data, isLoading, isError } = useQuery(
    managementAllQueries.productList({ page: 1, size: 5 }),
  )

  return (
    <div className="px-24">
      {/* @temp — API 응답 원본 확인용 */}
      <div className="mb-8 rounded-sm border border-dashed border-yellow-400 bg-yellow-50 p-4">
        <p className="mb-2 text-sm font-semibold text-yellow-700">
          @temp · GET /api/v1/admin/products 응답 확인
        </p>
        {isLoading && <p className="text-sm text-gray-500">불러오는 중...</p>}
        {isError && (
          <p className="text-sm text-red-500">
            API 호출 실패 — 콘솔을 확인해주세요.
          </p>
        )}
        {data && (
          <pre className="max-h-64 overflow-auto text-xs text-gray-700">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>

      <ProductTable />
    </div>
  )
}
