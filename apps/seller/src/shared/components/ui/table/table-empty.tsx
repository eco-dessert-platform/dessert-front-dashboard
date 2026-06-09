import characterLogo from '@/assets/images/character-logo.png'

interface TableEmptyProps {
  description: string
}

const TableEmpty = ({ description }: TableEmptyProps) => {
  return (
    <div className="absolute inset-0 z-9 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-2">
        <img src={characterLogo} alt="" className="size-28" />
        <p className="typo-body-14-r text-gray-500">{description}</p>
      </div>
    </div>
  )
}

export default TableEmpty
