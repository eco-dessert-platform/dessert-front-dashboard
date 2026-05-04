interface ProductFinalPriceProps {
  title: string
  price: number | null
  finalPrice: number
}

export const ProductFinalPrice = ({
  title,
  price,
  finalPrice,
}: ProductFinalPriceProps) => {
  return (
    <div className="mt-32 flex w-full items-center justify-between rounded-10 bg-primary-50 px-24 py-10">
      <p className="typo-heading-18-b">{title}</p>

      <div className="flex items-center gap-8">
        {price !== null && (
          <p className="typo-heading-18-r text-gray-600 line-through">
            {price?.toLocaleString('ko-KR')}
          </p>
        )}
        <p className="flex items-center gap-4 typo-heading-18-r text-primary-500">
          <span className="typo-heading-24-sb">
            {finalPrice.toLocaleString('ko-KR')}
          </span>
          원
        </p>
      </div>
    </div>
  )
}
