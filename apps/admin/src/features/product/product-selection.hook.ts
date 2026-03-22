import { useCallback, useState } from 'react'

import { Product } from '@/entity/product/product.type'

export function useProductSelection(products: Product[]) {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([])
  const [selectedOptionIds, setSelectedOptionIds] = useState<number[]>([])

  const handleProductToggle = useCallback(
    (productId: number) => {
      setSelectedProductIds((prev) => {
        const isSelected = prev.includes(productId)
        if (isSelected) {
          // 상품 선택 해제 시 해당 상품의 모든 옵션 선택 해제
          const product = products.find((p) => p.productId === productId)
          if (product) {
            const optionIds = product.productOptions.map((o) => o.optionId)
            setSelectedOptionIds((prevOptions) =>
              prevOptions.filter((id) => !optionIds.includes(id)),
            )
          }
          return prev.filter((id) => id !== productId)
        } else {
          // 상품 선택 시 해당 상품의 모든 옵션 선택 (필요에 따라 정책 변경 가능)
          // 현재는 주문 관리 패턴에 맞춰 상품만 선택하거나, 원하시면 옵션까지 자동 선택되게 할 수 있습니다.
          return [...prev, productId]
        }
      })
    },
    [products],
  )

  const handleOptionToggle = useCallback(
    (optionId: number, productId: number) => {
      setSelectedOptionIds((prev) => {
        const isSelected = prev.includes(optionId)
        const nextOptions = isSelected
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]

        // 해당 상품의 모든 옵션이 선택되었는지 체크하여 상품 체크박스 상태 동기화
        const product = products.find((p) => p.productId === productId)
        if (product) {
          const allOptionIds = product.productOptions.map((o) => o.optionId)
          const allSelected = allOptionIds.every((id) =>
            nextOptions.includes(id),
          )

          if (allSelected) {
            setSelectedProductIds((prevIds) =>
              prevIds.includes(productId) ? prevIds : [...prevIds, productId],
            )
          } else {
            setSelectedProductIds((prevIds) =>
              prevIds.filter((id) => id !== productId),
            )
          }
        }

        return nextOptions
      })
    },
    [products],
  )

  const resetSelection = useCallback(() => {
    setSelectedProductIds([])
    setSelectedOptionIds([])
  }, [])

  return {
    selectedProductIds,
    selectedOptionIds,
    handleProductToggle,
    handleOptionToggle,
    resetSelection,
  }
}
