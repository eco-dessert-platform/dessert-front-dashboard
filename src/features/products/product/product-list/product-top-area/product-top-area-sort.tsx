import { useState } from 'react'
import Dropdown from '@/shared/components/ui/dropdown/dropdown'

const sortOptions = [
  { label: '최신순', value: 'created_desc' },
  { label: '오래된순', value: 'created_asc' },
  { label: '상품명순', value: 'name_asc' },
]

const ProductTopAreaSort = () => {
  const [sort, setSort] = useState('created_desc')
  return (
    <Dropdown
      options={sortOptions}
      value={sort}
      placeholder="최신순"
      onSelect={setSort}
      className="w-0 min-w-[150px] shrink-0"
    />
  )
}

export default ProductTopAreaSort
