import { useCallback, useEffect, useRef, useState } from 'react'

import { Product } from '@/entity/product/product.type'

export function useProductSelection(products: Product[]) {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([])
  const [selectedOptionIds, setSelectedOptionIds] = useState<number[]>([])

  // products의 최신 상태를 stale closure 문제 없이 참조하기 위해 ref 사용
  const productsRef = useRef(products)
  useEffect(() => {
    productsRef.current = products
  }, [products])

  const handleProductToggle = useCallback((productId: number) => {
    const currentProducts = productsRef.current
    setSelectedProductIds((prev) => {
      const isSelected = prev.includes(productId)
      const product = currentProducts.find((p) => p.productId === productId)

      if (isSelected) {
        // 상품 선택 해제 시 해당 상품의 모든 옵션도 선택 해제
        if (product) {
          const optionIds = product.productOptions.map((o) => o.optionId)
          setSelectedOptionIds((prevOptions) =>
            prevOptions.filter((id) => !optionIds.includes(id)),
          )
        }
        return prev.filter((id) => id !== productId)
      } else {
        // 상품 선택 시 해당 상품의 모든 옵션도 함께 선택
        if (product) {
          const optionIds = product.productOptions.map((o) => o.optionId)
          setSelectedOptionIds((prevOptions) => {
            const nextOptions = [...prevOptions]
            optionIds.forEach((id) => {
              if (!nextOptions.includes(id)) nextOptions.push(id)
            })
            return nextOptions
          })
        }
        return [...prev, productId]
      }
    })
  }, [])

  const handleOptionToggle = useCallback(
    (optionId: number, productId: number) => {
      const currentProducts = productsRef.current
      setSelectedOptionIds((prev) => {
        const isSelected = prev.includes(optionId)
        const nextOptions = isSelected
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]

        // 해당 상품의 모든 옵션이 선택되었는지 체크하여 상품 체크박스 상태 동기화
        const product = currentProducts.find((p) => p.productId === productId)
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
    [],
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
