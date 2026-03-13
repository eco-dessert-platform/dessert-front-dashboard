export type RowSpanOptions<T> = {
  rows: T[]
  rowIndex: number
  getKey: (row: T) => string
}

export function getRowSpanForGroup<T>({
  rows,
  rowIndex,
  getKey,
}: RowSpanOptions<T>): number {
  const current = rows[rowIndex]
  if (!current) {
    return 1
  }

  const currentKey = getKey(current)
  const isFirstOfGroup =
    rowIndex === 0 || getKey(rows[rowIndex - 1]) !== currentKey
  if (!isFirstOfGroup) {
    return 0
  }

  let span = 1
  for (let i = rowIndex + 1; i < rows.length; i += 1) {
    if (getKey(rows[i]) !== currentKey) {
      break
    }
    span += 1
  }

  return span
}
