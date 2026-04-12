import { useCallback, useState } from 'react'

import { Button, Checkbox, Table } from '@dessert/ui'

import type { ColumnDef } from '@tanstack/react-table'

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

type TableRow = {
  id: string
  storeName: string
  phoneNumber: string
  emailAddress: string
  address: string
  depositor: string
  accountNumber: string
  joinDate: string
}

type ExampleColumnArgs = {
  allSelected: boolean
  selectedIds: string[]
  getRowSpanForSeller: (rowIndex: number) => number
  toggleAll: (checked: boolean | 'indeterminate') => void
  toggleRow: (rowId: string, checked: boolean | 'indeterminate') => void
}

const exampleColumns = ({
  allSelected,
  selectedIds,
  getRowSpanForSeller,
  toggleAll,
  toggleRow,
}: ExampleColumnArgs): ColumnDef<TableRow>[] => [
  {
    id: 'select',
    header: () => (
      <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedIds.includes(row.original.id)}
        onCheckedChange={(checked) => toggleRow(row.original.id, checked)}
      />
    ),
    size: 40,
  },
  {
    header: '스토어명',
    accessorKey: 'storeName',
    // meta: {
    //   getRowSpan: (cell) => getRowSpanForSeller(cell.row.index),
    // },
    cell: ({ row }) => (
      <div className="text-center typo-title-14-r text-gray-900">
        {row.original.storeName}
      </div>
    ),
    size: 120,
  },
  {
    header: '연락처/추가연락처',
    accessorKey: 'phoneNumber',
    cell: ({ row }) => (
      <div>
        <p className="text-center typo-title-14-r text-gray-900">
          {row.original.phoneNumber}
        </p>
        <p className="text-center typo-title-14-r text-gray-900">
          {row.original.phoneNumber}
        </p>
      </div>
    ),
    size: 150,
  },
  {
    header: '이메일',
    accessorKey: 'emailAddress',
    cell: ({ row }) => (
      <div>
        <p className="text-center typo-title-14-r text-gray-900">
          {row.original.emailAddress}
        </p>
      </div>
    ),
    size: 150,
  },
  {
    header: '출고지주소',
    accessorKey: 'address',
    cell: ({ row }) => (
      <p className="text-center typo-title-14-r text-gray-900">
        {row.original.address}
      </p>
    ),
    size: 250,
  },
  {
    header: '예금주/은행명',
    accessorKey: 'depositor',
    cell: ({ row }) => (
      <div>
        <p className="text-center typo-body-12-r text-gray-900">
          {row.original.depositor}
        </p>
        <div className="text-center typo-body-12-r text-gray-900">
          {row.original.depositor}
        </div>
      </div>
    ),
    size: 80,
  },
  {
    header: '계좌번호',
    accessorKey: 'accountNumber',
    cell: ({ row }) => (
      <p className="text-center typo-body-12-r text-gray-900">
        {row.original.accountNumber}
      </p>
    ),
    size: 130,
  },
  {
    header: '가입일',
    accessorKey: 'joinDate',
    cell: ({ row }) => (
      <p className="text-center typo-body-12-r text-gray-900">
        {row.original.joinDate}
      </p>
    ),
    size: 100,
  },
]

const tableData: TableRow[] = [
  {
    id: '1',
    storeName: '빵그리 빵집',
    phoneNumber: '010-1234-1234',
    emailAddress: 'bbang@naver.com',
    address: '(우편번호)인천 계양구 xxx xxxxxx, 102호',
    depositor: '빵그리',
    accountNumber: '123-88542-45522',
    joinDate: '2025.11.12',
  },
  {
    id: '2',
    storeName: '빵그리 빵집2',
    phoneNumber: '010-1234-1234',
    emailAddress: 'bbang@naver.com',
    address: '(우편번호)인천 계양구 xxx xxxxxx, 102호',
    depositor: '빵그리',
    accountNumber: '123-88542-45522',
    joinDate: '2025.11.12',
  },
]

export const DefaultTable = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const allSelected =
    tableData.length > 0 && selectedIds.length === tableData.length

  const toggleAll = (checked: boolean | 'indeterminate') => {
    const isChecked = checked === true
    setSelectedIds(isChecked ? tableData.map((row) => row.id) : [])
  }

  const toggleRow = (rowId: string, checked: boolean | 'indeterminate') => {
    const isChecked = checked === true
    setSelectedIds((prev) =>
      isChecked
        ? prev.includes(rowId)
          ? prev
          : [...prev, rowId]
        : prev.filter((id) => id !== rowId),
    )
  }

  const getRowSpanForSeller = useCallback((rowIndex: number) => {
    return getRowSpanForGroup({
      rows: tableData,
      rowIndex,
      getKey: (row) => row.storeName,
    })
  }, [])

  const columns = exampleColumns({
    allSelected,
    selectedIds,
    getRowSpanForSeller,
    toggleAll,
    toggleRow,
  })

  return <Table data={tableData} columns={columns} topArea={<TopArea />} />
}

function TopArea() {
  return <Button title="top area button" />
}
