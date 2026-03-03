import { OrderItem } from '@/entity/order/order.type'
import { useCallback, useState } from 'react'

export function useOrderSelection(orders: OrderItem[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [productSelectedIds, setProductSelectedIds] = useState<string[]>([])

  const allSelected = orders.length > 0 && selectedIds.length === orders.length
  const indeterminate =
    (selectedIds.length > 0 || productSelectedIds.length > 0) &&
    selectedIds.length < orders.length

  const getProductKeys = useCallback(
    (orderNumber: string) => {
      const order = orders.find((order) => order.orderNumber === orderNumber)
      return order?.products.map((_, index) => `${orderNumber}_${index}`) ?? []
    },
    [orders],
  )

  const toggleAll = useCallback(() => {
    if (allSelected) {
      setSelectedIds([])
      setProductSelectedIds([])
    } else {
      setSelectedIds(orders.map((order) => order.orderNumber))
    }
  }, [allSelected, orders])

  const toggleOne = useCallback(
    (orderNumber: string) => {
      if (selectedIds.includes(orderNumber)) {
        const productKeys = getProductKeys(orderNumber)
        setProductSelectedIds((prev) =>
          prev.filter((id) => !productKeys.includes(id)),
        )
        setSelectedIds((prev) => prev.filter((id) => id !== orderNumber))
      } else {
        setSelectedIds((prev) => [...prev, orderNumber])
      }
    },
    [getProductKeys, selectedIds],
  )

  const toggleProduct = useCallback(
    (productKey: string, orderNumber: string) => {
      const isOrderSelected = selectedIds.includes(orderNumber)
      const allProductKeys = getProductKeys(orderNumber)

      if (isOrderSelected) {
        const remainingSelected = allProductKeys.filter(
          (key) => key !== productKey,
        )

        setSelectedIds((prev) => prev.filter((id) => id !== orderNumber))
        setProductSelectedIds((prev) => {
          const withoutThisOrder = prev.filter(
            (id) => !allProductKeys.includes(id),
          )
          return [...withoutThisOrder, ...remainingSelected]
        })
      } else {
        // 1. 토글 후 상태를 먼저 계산
        const isCurrentlyChecked = productSelectedIds.includes(productKey)
        const nextProductSelectedIds = isCurrentlyChecked
          ? productSelectedIds.filter((id) => id !== productKey)
          : [...productSelectedIds, productKey]

        // 2. 해당 주문의 모든 상품이 선택됐는지 확인
        const allProductsSelected = allProductKeys.every((key) =>
          nextProductSelectedIds.includes(key),
        )

        if (allProductsSelected) {
          setSelectedIds((prev) => [...prev, orderNumber])
          setProductSelectedIds(
            nextProductSelectedIds.filter((id) => !allProductKeys.includes(id)),
          )
        } else {
          setProductSelectedIds(nextProductSelectedIds)
        }
      }
    },
    [getProductKeys, productSelectedIds, selectedIds],
  )

  const reset = () => {
    setSelectedIds([])
    setProductSelectedIds([])
  }

  return {
    selectedIds,
    productSelectedIds,
    allSelected,
    indeterminate,
    toggleAll,
    toggleOne,
    toggleProduct,
    reset,
  }
}
