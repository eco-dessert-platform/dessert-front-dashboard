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

interface BgrTableProps<T> {
    data: T[]
    columns: ColumnDef<T>[]
}

function BgrTable<T>({ data, columns }: BgrTableProps<T>) {
    const table = useReactTable<T>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    const { getHeaderGroups, getRowModel } = table

    return (
            <table className="min-w-max border-collapse overflow-x-auto">
                <thead>
                    {getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            className="h-[40px] border-b border-gray-400 bg-gray-200"
                        >
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="text-body-12-m text-center text-gray-800 align-middle"
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
                        <tr key={row.id} className="border-b border-gray-300">
                            {row.getVisibleCells().map((cell) => {
                                const rowSpan =
                                    cell.column.columnDef.meta?.getRowSpan?.(
                                        cell,
                                    ) ?? 1
                                const colSpan =
                                    cell.column.columnDef.meta?.getColSpan?.(
                                        cell,
                                    ) ?? 1

                                if (rowSpan === 0 || colSpan === 0) {
                                    return null
                                }

                                return (
                                    <td
                                        key={cell.id}
                                        rowSpan={rowSpan}
                                        colSpan={colSpan}
                                        className="align-middle border-r border-gray-200 text-center last:border-r-0"
                                        style={{ width: cell.column.getSize() }}
                                    >
                                        <div className="p-[10px]">
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
    )
}

export default BgrTable