import { useCallback, useEffect, useMemo, useState } from 'react'

import { Table } from '@dessert/ui'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { storeNameChangeQueries } from '@/entity/store/name-change-approval'

import { NameChangeApprovalActionGroup } from './name-change-approval-action-group.ui'
import { getNameChangeApprovalColumns } from './name-change-approval-columns.util'
import { useApproveStoreNameChangeMutation } from './name-change-approval.mutation'
import { NameChangeRejectDialog } from './name-change-reject-dialog.ui'

const getPageFromSearchParams = (searchParams: URLSearchParams) => {
  const page = Number(searchParams.get('page'))
  return Number.isInteger(page) && page > 0 ? page : 1
}

export const NameChangeApprovalTable = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [rejectRequestId, setRejectRequestId] = useState<number | null>(null)
  const currentPage = getPageFromSearchParams(searchParams)
  const approveMutation = useApproveStoreNameChangeMutation()

  const { data } = useQuery({
    ...storeNameChangeQueries.nameChangeRequestList({
      page: currentPage,
    }),
    placeholderData: keepPreviousData,
  })

  const totalPages = Math.max(data?.totalPages ?? 1, 1)

  const updatePageSearchParam = useCallback(
    (page: number, options?: { replace?: boolean }) => {
      const nextSearchParams = new URLSearchParams(searchParams)
      if (page <= 1) {
        nextSearchParams.delete('page')
      } else {
        nextSearchParams.set('page', String(page))
      }
      setSearchParams(nextSearchParams, options)
    },
    [searchParams, setSearchParams],
  )

  useEffect(() => {
    const responseTotalPages = data?.totalPages

    if (responseTotalPages !== undefined) {
      const maxPage = Math.max(responseTotalPages, 1)

      if (currentPage > maxPage) {
        updatePageSearchParam(maxPage, { replace: true })
      }
    }
  }, [currentPage, data?.totalPages, updatePageSearchParam])

  const handleApprove = useCallback(
    (requestId: number) => {
      approveMutation.mutate(requestId)
    },
    [approveMutation],
  )

  const handleReject = useCallback((requestId: number) => {
    setRejectRequestId(requestId)
  }, [])

  const handleRejectDialogClose = useCallback(() => {
    setRejectRequestId(null)
  }, [])

  const columns = useMemo(
    () =>
      getNameChangeApprovalColumns({
        onApprove: handleApprove,
        onReject: handleReject,
        isApproving: approveMutation.isPending,
      }),
    [approveMutation.isPending, handleApprove, handleReject],
  )

  return (
    <>
      <Table
        data={data?.updateStoreNames ?? []}
        columns={columns}
        tableClassName="w-full table-fixed"
        topArea={
          <NameChangeApprovalActionGroup
            totalCount={data?.totalElements ?? 0}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={updatePageSearchParam}
          />
        }
      />
      <NameChangeRejectDialog
        requestId={rejectRequestId}
        onClose={handleRejectDialogClose}
      />
    </>
  )
}
