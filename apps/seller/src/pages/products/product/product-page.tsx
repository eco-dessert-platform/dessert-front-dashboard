import { useAuthStore } from '@/entity/auth/auth-store'
import { FilterCategory } from '@/features/products/product/filter/filter-category'
import { FilterTabs } from '@/features/products/product/filter/filter-tabs'
import { ResultTable } from '@/features/products/product/product-list/product-list-table'
import { cn } from '@/shared/libs/utils'

const ContainerStyle = 'rounded-10 border border-gray-300 bg-white'
function ProductsPage() {
  const { isLoggedIn, sellerId, sellerStatus } = useAuthStore()
  console.log('사용자 정보:', { isLoggedIn, sellerId, sellerStatus })

  return (
    <div>
      <FilterTabs />
      <div className={cn('flex gap-10 px-24 py-16', ContainerStyle)}>
        <FilterCategory />
      </div>
      <div className={cn('mt-10 overflow-hidden bg-white')}>
        <ResultTable />
      </div>
    </div>
  )
}

export default ProductsPage
