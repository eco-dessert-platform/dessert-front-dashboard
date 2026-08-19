import { useCallback, useEffect, useMemo, useState } from 'react'

import { Input, Table, getRowSpanForGroup, toast } from '@dessert/ui'
import { keepPreviousData } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import {
  AdminSellerApplication,
  StoreApplicationApprove,
  useSellerApplicationListQuery,
} from '@/entity/store/member-approval'

import { MemberApprovalColumns } from './member-approval-columns.util'
import { useMemberApproval } from './member-approval.hook'
import { TableTopArea } from './table-top-area.ui'

import type { TableRow } from './member-approval-table.type'

const BANK_LABEL_BY_CODE: Record<string, string> = {
  '02': '한국산업은행',
  '03': 'IBK기업은행',
  '06': 'KB국민은행',
  '07': 'Sh수협은행',
  '11': 'NH농협은행',
  '12': '단위농협(지역농축협)',
  '20': '우리은행',
  '23': 'SC제일은행',
  '27': '씨티은행',
  '30': '수협중앙회',
  '31': 'iM뱅크(대구)',
  '32': '부산은행',
  '34': '광주은행',
  '35': '제주은행',
  '37': '전북은행',
  '39': '경남은행',
  '45': '새마을금고',
  '48': '신협',
  '50': '저축은행중앙회',
  '64': '산림조합',
  '71': '우체국예금보험',
  '81': '하나은행',
  '88': '신한은행',
  '89': '케이뱅크',
  '90': '카카오뱅크',
  '92': '토스뱅크',
}

const getBankLabel = (bankCode: string | null | undefined) => {
  if (!bankCode) return ''

  const normalizedCode = bankCode.replace(/^0+/, '')
  const twoDigitCode = normalizedCode.padStart(2, '0')

  return BANK_LABEL_BY_CODE[twoDigitCode] ?? bankCode
}

const formatCreatedAt = (createdAt: string | null | undefined) => {
  if (!createdAt) return ''

  return createdAt.split('T')[0]?.replace(/-/g, '.') ?? ''
}

const getPageFromSearchParams = (searchParams: URLSearchParams) => {
  const page = Number(searchParams.get('page'))

  return Number.isInteger(page) && page > 0 ? page : 1
}

const handleInvalidApproval = () => {
  toast.error('항목을 입력하세요', '사업자 번호, 대표자명 입력하세요')
}

interface ApprovalFormValues {
  approvals: Record<
    string,
    {
      ownerName: string
      businessNumber: string
    }
  >
}

const toTableRow = (application: AdminSellerApplication): TableRow => {
  const { sellerDTO, sellerStoreDTO, storeApplicationId } = application
  const address = [
    sellerStoreDTO.originAddressLine ?? '',
    sellerStoreDTO.originAddressDetail ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return {
    id: String(storeApplicationId),
    sellerId: sellerDTO.sellerId,
    storeName: sellerStoreDTO.storeName ?? '',
    phoneNumber: sellerStoreDTO.phone ?? '',
    additionalPhoneNumber: sellerStoreDTO.subPhone ?? '',
    emailAddress: sellerStoreDTO.email ?? '',
    address,
    depositor: sellerDTO.accountHolder ?? sellerDTO.sellerName ?? '',
    bankName: getBankLabel(sellerDTO.bankCode),
    accountNumber: sellerDTO.accountNumber ?? '',
    joinDate: formatCreatedAt(sellerDTO.createdAt),
    isNewMember: sellerDTO.sellerStatus
      ? sellerDTO.sellerStatus === 'NEW'
      : true,
  }
}

export const MemberApprovalTable = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = getPageFromSearchParams(searchParams)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const { getValues, handleSubmit, register, reset, unregister } =
    useForm<ApprovalFormValues>({
      defaultValues: { approvals: {} },
    })

  const {
    submitApproval,
    handleDownloadFile,
    isApproving,
    isDownloadingDocuments,
  } = useMemberApproval({
    onApprovalSuccess: (result) => {
      const successIds = new Set(
        result.successDetails.map((detail) =>
          String(detail.storeApplicationId),
        ),
      )

      setSelectedIds((prev) => prev.filter((id) => !successIds.has(id)))
      successIds.forEach((id) => unregister(`approvals.${id}`))

      if (result.failDetails.length === 0) {
        reset({ approvals: {} })
      }
    },
  })

  const { data, isPlaceholderData } = useSellerApplicationListQuery({
    variables: { page: currentPage },
    placeholderData: keepPreviousData,
  })

  const tableData = useMemo(
    () => data?.adminSellerApplicationList.map(toTableRow) ?? [],
    [data?.adminSellerApplicationList],
  )
  const totalPages = data?.totalPages ?? 0

  const setCurrentPage = useCallback(
    (page: number) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          next.set('page', String(page))
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  useEffect(() => {
    const maxPage = Math.max(totalPages, 1)

    if (currentPage > maxPage) {
      setCurrentPage(maxPage)
    }
  }, [currentPage, totalPages, setCurrentPage])

  useEffect(() => {
    setSelectedIds([])
    reset({ approvals: {} })
  }, [currentPage, reset])

  const allSelected =
    tableData.length > 0 && selectedIds.length === tableData.length
  const isTableActionDisabled =
    isApproving || isDownloadingDocuments || isPlaceholderData
  const isDownloadDisabled = isTableActionDisabled || selectedIds.length === 0

  const toggleAll = (checked: boolean | 'indeterminate') => {
    if (isTableActionDisabled) return

    const isChecked = checked === true
    setSelectedIds(isChecked ? tableData.map((row) => row.id) : [])

    if (!isChecked) {
      tableData.forEach((row) => unregister(`approvals.${row.id}`))
    }
  }

  const totalCount = data?.totalElements ?? 0
  const selectedCount = selectedIds.length

  const toggleRow = (rowId: string, checked: boolean | 'indeterminate') => {
    if (isTableActionDisabled) return

    const isChecked = checked === true
    setSelectedIds((prev) =>
      isChecked
        ? prev.includes(rowId)
          ? prev
          : [...prev, rowId]
        : prev.filter((id) => id !== rowId),
    )

    if (!isChecked) {
      unregister(`approvals.${rowId}`)
    }
  }

  const handlePageChange = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        next.set('page', String(page))
        return next
      })
      setSelectedIds([])
      reset({ approvals: {} })
    },
    [reset, setSearchParams],
  )

  const handleApprove = handleSubmit(() => {
    if (isTableActionDisabled) return

    const approvals = getValues('approvals')
    const isInvalid = selectedIds.some((id) => {
      const approval = approvals?.[id]

      return !approval?.ownerName?.trim() || !approval?.businessNumber?.trim()
    })

    if (isInvalid) {
      handleInvalidApproval()
      return
    }

    const payload: StoreApplicationApprove[] = selectedIds.map((id) => ({
      applicationId: Number(id),
      sellerName: approvals[id].ownerName.trim(),
      identifier: approvals[id].businessNumber.trim(),
    }))

    submitApproval(payload)
  }, handleInvalidApproval)

  const handleDownloadSelectedFiles = () => {
    if (isDownloadDisabled) return

    const sellerIds = tableData
      .filter((row) => selectedIds.includes(row.id))
      .map((row) => row.sellerId)

    handleDownloadFile(sellerIds)
  }

  const getRowSpanForAdmin = useCallback(
    (rowIndex: number) => {
      return getRowSpanForGroup({
        rows: tableData,
        rowIndex,
        getKey: (row) => row.storeName,
      })
    },
    [tableData],
  )

  const getRowClassName = (row: TableRow) => {
    return row.isNewMember ? '' : 'bg-[#FFE8E3]'
  }

  const renderSubRow = (row: TableRow) => {
    if (!selectedIds.includes(row.id)) return null

    const labelClassName = 'typo-title-14-b text-center'

    return (
      <tr className="bg-gray-50" key={`${row.id}-additional`}>
        <td colSpan={2} className="border-r border-r-gray-300">
          <Input
            label="대표자명"
            labelClassName={labelClassName}
            className="items-center gap-2 border-r border-r-gray-300 p-10"
            {...register(`approvals.${row.id}.ownerName`, {
              required: true,
            })}
          />
        </td>
        <td colSpan={6}>
          <Input
            label="사업자 번호"
            labelClassName={labelClassName}
            className="w-[274px] items-center gap-2 border-r border-r-gray-300 p-10"
            {...register(`approvals.${row.id}.businessNumber`, {
              required: true,
            })}
          />
        </td>
      </tr>
    )
  }

  const columns = MemberApprovalColumns({
    allSelected,
    selectedIds,
    isTableActionDisabled,
    getRowSpanForAdmin,
    toggleAll,
    toggleRow,
  })

  return (
    <Table
      data={tableData}
      columns={columns}
      topArea={
        <TableTopArea
          totalCount={totalCount}
          selectedCount={selectedCount}
          currentPage={currentPage}
          totalPages={Math.max(totalPages, 1)}
          isTableActionDisabled={isTableActionDisabled}
          isDownloadDisabled={isDownloadDisabled}
          onPageChange={handlePageChange}
          onSubmitApproval={handleApprove}
          handleDownloadFile={handleDownloadSelectedFiles}
        />
      }
      getRowClassName={getRowClassName}
      renderSubRow={renderSubRow}
    />
  )
}
