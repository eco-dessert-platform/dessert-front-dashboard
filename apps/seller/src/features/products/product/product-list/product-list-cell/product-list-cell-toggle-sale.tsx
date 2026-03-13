import { Checkbox } from '@dessert/ui'

type Props = {
  checked: boolean
  onChange: () => void
}

const ProductListCellToggleSale = ({ checked, onChange }: Props) => {
  return (
    <div className="flex items-center gap-1">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      <span className="typo-body-12-r text-gray-700">판매중지</span>
    </div>
  )
}

export default ProductListCellToggleSale
