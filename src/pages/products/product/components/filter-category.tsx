import { useState } from 'react'
import Dropdown from '@/shared/components/ui/dropdown/dropdown'
import Input from '@/shared/components/ui/input/input'
import Button from '@/shared/components/ui/button/button'

const mainOptions = [
  { label: '빵', value: 'bread' },
  { label: '과자/간식', value: 'snack' },
]
const breadOptions = [
  { label: '식빵·모닝빵', value: 'white_bread' },
  { label: '베이글·도넛', value: 'bagel_donut' },
  { label: '케이크', value: 'cake' },
  { label: '기타', value: 'etc' },
]
const snackOptions = [
  { label: '잼·청', value: 'jam' },
  { label: '쿠키·비스킷·크래커', value: 'cookie_biscuit_cracker' },
  { label: '그래놀라', value: 'granola' },
]
const searchOptions = [
  { label: '전체', value: 'all' },
  { label: '상품명', value: 'product_name' },
]

const FilterCategory = () => {
  const [main, setMain] = useState<string>('')
  const [sub, setSub] = useState<string>('')
  const [searchOpt, setSearchOpt] = useState<string>('all')
  const [keyword, setKeyword] = useState<string>('')
  const subOptions =
    main === 'bread' ? breadOptions : main === 'snack' ? snackOptions : []

  return (
    <>
      <Dropdown
        options={mainOptions}
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
        options={searchOptions}
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
      />
      <Button title="조회" size="md" className="min-w-[72px]" />
    </>
  )
}

export default FilterCategory
