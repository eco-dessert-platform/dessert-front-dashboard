import { toast } from '@dessert/ui'
import { useQueryClient } from '@tanstack/react-query'
import { createMutation } from 'react-query-kit'

import {
  AdminSellerDocumentDownloadRequest,
  AdminSellerDocumentDownloadResult,
  StoreApplicationApprove,
  approveAdminSellerApplications,
  downloadAdminSellerDocuments,
  memberApprovalQueries,
} from '@/entity/store/member-approval'

const useApproveMemberApplicationsMutationBase = createMutation({
  mutationKey: [...memberApprovalQueries._def, 'approve'],
  mutationFn: (body: StoreApplicationApprove[]) =>
    approveAdminSellerApplications(body),
})

const useDownloadMemberApplicationDocumentsMutationBase = createMutation<
  AdminSellerDocumentDownloadResult,
  AdminSellerDocumentDownloadRequest
>({
  mutationKey: [...memberApprovalQueries._def, 'download-documents'],
  mutationFn: downloadAdminSellerDocuments,
})

const downloadBlob = ({
  blob,
  filename,
}: AdminSellerDocumentDownloadResult) => {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export const useApproveMemberApplicationsMutation = () => {
  const queryClient = useQueryClient()

  return useApproveMemberApplicationsMutationBase({
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: memberApprovalQueries.sellerApplicationList.queryKey,
      })

      const successCount = result.successDetails.length
      const failCount = result.failDetails.length

      if (failCount > 0) {
        toast.error(
          '일부 회원가입 승인이 실패했습니다.',
          `성공 ${successCount}건, 실패 ${failCount}건`,
        )
        return
      }

      toast.success(`${successCount}건의 회원가입을 승인했습니다.`)
    },
    onError: () => {
      toast.error('회원가입 승인에 실패했습니다.', '다시 시도해주세요.')
    },
  })
}

export const useDownloadMemberApplicationDocumentsMutation = () => {
  return useDownloadMemberApplicationDocumentsMutationBase({
    onSuccess: (result) => {
      downloadBlob(result)
      toast.success('셀러 제출 서류를 다운로드했습니다.', result.filename)
    },
    onError: (error) => {
      toast.error(
        '셀러 제출 서류 다운로드에 실패했습니다.',
        error.message || '다시 시도해주세요.',
      )
    },
  })
}
