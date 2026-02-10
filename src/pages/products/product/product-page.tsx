import FilterTabs from './components/filter-tabs'
import FilterCategory from './components/filter-category'
import ResultTable from './components/result/result-table'

import { cn } from '@/shared/lib/utils'

function ProductsPage() {
  const ContainerStyle = 'rounded-10 border border-gray-300 bg-white'
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
