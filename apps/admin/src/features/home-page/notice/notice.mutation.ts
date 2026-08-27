import { toast } from '@dessert/ui'
import { useQueryClient } from '@tanstack/react-query'
import { createMutation } from 'react-query-kit'

import {
  CreateNoticeInput,
  DeleteNoticesResult,
  UpdateNoticeInput,
  createNotice,
  deleteNotices,
  noticeQueries,
  updateNotice,
} from '@/entity/home-page/notice'

const useCreateNoticeMutationBase = createMutation<void, CreateNoticeInput>({
  mutationKey: [...noticeQueries._def, 'create'],
  mutationFn: createNotice,
})

const useUpdateNoticeMutationBase = createMutation<void, UpdateNoticeInput>({
  mutationKey: [...noticeQueries._def, 'update'],
  mutationFn: updateNotice,
})

const useDeleteNoticesMutationBase = createMutation<
  DeleteNoticesResult,
  number[]
>({
  mutationKey: [...noticeQueries._def, 'delete'],
  mutationFn: deleteNotices,
})

export const useCreateNoticeMutation = () => {
  const queryClient = useQueryClient()

  return useCreateNoticeMutationBase({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noticeQueries.list.queryKey })
      toast.success('공지사항을 등록했어요')
    },
    onError: (error) => {
      toast.error(
        '공지사항 등록에 실패했어요',
        error.message || '다시 시도해주세요',
      )
    },
  })
}

export const useUpdateNoticeMutation = () => {
  const queryClient = useQueryClient()

  return useUpdateNoticeMutationBase({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noticeQueries._def })
      toast.success('공지사항을 수정했어요')
    },
    onError: (error) => {
      toast.error(
        '공지사항 수정에 실패했어요',
        error.message || '다시 시도해주세요',
      )
    },
  })
}

export const useDeleteNoticesMutation = () => {
  const queryClient = useQueryClient()

  return useDeleteNoticesMutationBase({
    onSuccess: ({ successCount, failureCount, failedNotices }) => {
      queryClient.invalidateQueries({ queryKey: noticeQueries.list.queryKey })

      if (failureCount === 0) {
        toast.success(`공지사항 ${successCount}건을 삭제했어요`)
        return
      }

      toast.info(
        `공지사항 ${successCount}건을 삭제하고 ${failureCount}건은 실패했어요`,
        failedNotices.map(({ title }) => title).join(', '),
      )
    },
    onError: (error) => {
      toast.error(
        '공지사항 삭제에 실패했어요',
        error.message || '다시 시도해주세요',
      )
    },
  })
}
