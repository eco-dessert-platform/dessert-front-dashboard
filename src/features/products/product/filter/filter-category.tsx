import { useState } from 'react'
import Dropdown from '@/shared/ui/dropdown/dropdown'
import Input from '@/shared/ui/input/input'
import Button from '@/shared/ui/button/button'

import {
  ProductFilterMainOption,
  BreadOptions,
  SnackOptions,
  SearchOptions,
} from '@/entity/products/product/product-filter-options.mock'

export const FilterCategory = () => {
  const [main, setMain] = useState<string>('')
  const [sub, setSub] = useState<string>('')
  const [searchOpt, setSearchOpt] = useState<string>('all')
  const [keyword, setKeyword] = useState<string>('')
  const subOptions =
    main === 'bread' ? BreadOptions : main === 'snack' ? SnackOptions : []

  return (
    <>
      <Dropdown
        options={ProductFilterMainOption}
        value={main}
        placeholder="대분류"
        onSelect={(value) => {
          setMain(value)
          setSub('')
          setKeyword('')
        }}
        className="w-0 min-w-[150px] shrink-0"
      />
      <Dropdown
        options={subOptions}
        value={sub}
        placeholder="중분류"
        disabled={!main}
        onSelect={setSub}
        className="w-0 min-w-[150px] shrink-0"
      />
      <Dropdown
        options={SearchOptions}
        value={searchOpt}
        className="w-0 min-w-[150px] shrink-0"
        onSelect={setSearchOpt}
        placeholder="전체"
      />
      <Input
        placeholder="1~50자로 검색해 주세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        disabled={!main || !sub}
        className="flex-1"
        maxLength={50}
      />
      <Button
        title="조회"
        size="md"
        className="min-w-[72px]"
        onClick={() => {
          console.log('조회 click')
        }}
      />
    </>
  )
}
