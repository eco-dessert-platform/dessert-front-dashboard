import {
  type Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    getRowSpan?: (cell: Cell<TData, TValue>) => number
    getColSpan?: (cell: Cell<TData, TValue>) => number
  }
}

interface TableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  topArea?: React.ReactNode
  maxHeight?: string | number
}

function Table<T>({
  data,
  columns,
  topArea,
  maxHeight = '600px',
}: TableProps<T>) {
  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const { getHeaderGroups, getRowModel } = table

  return (
    <div className="overflow-hidden rounded-md border border-gray-300 bg-white">
      {topArea && (
        <div className="flex items-center justify-between border-b border-gray-200 px-24 py-16">
          {topArea}
        </div>
      )}
      <div className="overflow-auto" style={{ maxHeight: maxHeight }}>
        <table className="min-w-max border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-200">
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="h-40">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-center align-middle typo-body-12-m text-gray-800"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        ) || '\u00A0'}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-300 last:border-b-0"
              >
                {row.getVisibleCells().map((cell) => {
                  const rowSpan =
                    cell.column.columnDef.meta?.getRowSpan?.(cell) ?? 1
                  const colSpan =
                    cell.column.columnDef.meta?.getColSpan?.(cell) ?? 1

                  if (rowSpan === 0 || colSpan === 0) {
                    return null
                  }

                  return (
                    <td
                      key={cell.id}
                      rowSpan={rowSpan}
                      colSpan={colSpan}
                      className="text-center align-middle"
                      style={{ width: cell.column.getSize() }}
                    >
                      <div className="p-10">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
