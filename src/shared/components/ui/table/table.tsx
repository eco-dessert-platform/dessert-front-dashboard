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
}

function Table<T>({ data, columns, topArea }: TableProps<T>) {
  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const { getHeaderGroups, getRowModel } = table

  return (
    <div className="overflow-hidden rounded-md border border-gray-300">
      {topArea && (
        <div className="flex items-center justify-between border-b border-gray-200 px-6 pt-4 pb-3">
          {topArea}
        </div>
      )}
      <table className="min-w-max border-collapse overflow-x-auto">
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="h-40 border-b border-gray-400 bg-gray-200"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="typo-body-12-m text-center align-middle text-gray-800"
                  style={{ width: header.getSize() }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
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
                    className="border-r border-gray-200 text-center align-middle last:border-r-0"
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
  )
}

export default Table
