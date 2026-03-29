interface DetailRowProps {
  label: string
  value: string
  labelWidth?: string
}

export function DetailRow({
  label,
  value,
  labelWidth = 'w-[60px]',
}: DetailRowProps) {
  return (
    <div className="flex items-center gap-8 typo-title-14-r">
      <span
        className={`shrink-0 line-clamp-2 typo-title-14-m text-gray-600 ${labelWidth}`}
      >
        {label}
      </span>
      <span className="min-w-0 flex-1 text-right text-gray-800">{value}</span>
    </div>
  )
}
