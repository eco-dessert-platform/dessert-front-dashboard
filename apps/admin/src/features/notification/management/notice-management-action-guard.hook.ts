import { useCallback, useRef, useState } from 'react'

type NoticeManagementAction = 'create' | 'update' | 'delete'

export const useNoticeManagementActionGuard = () => {
  const actionLockRef = useRef(false)
  const [pendingAction, setPendingAction] =
    useState<NoticeManagementAction | null>(null)

  const runWithActionGuard = useCallback(
    async (action: NoticeManagementAction, handler: () => Promise<void>) => {
      if (actionLockRef.current) return

      actionLockRef.current = true
      setPendingAction(action)

      try {
        await handler()
      } finally {
        actionLockRef.current = false
        setPendingAction(null)
      }
    },
    [],
  )

  return {
    pendingAction,
    isActionPending: pendingAction !== null,
    runWithActionGuard,
  }
}
