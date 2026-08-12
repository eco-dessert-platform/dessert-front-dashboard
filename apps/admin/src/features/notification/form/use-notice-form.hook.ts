import { useCallback, useEffect, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { noticeFormSchema } from './notice-form.schema'

import type { NoticeFormValues } from './notice-form.schema'

interface UseNoticeFormArgs {
  defaultValues: NoticeFormValues
  onSubmit: (values: NoticeFormValues) => Promise<void> | void
}

const getUsedEditorImageFiles = (
  content: string,
  editorImageFiles: Map<string, File>,
) => {
  const usedBlobUrls = Array.from(content.matchAll(/src="(blob:[^"]+)"/g)).map(
    ([, blobUrl]) => blobUrl,
  )

  return usedBlobUrls
    .map((blobUrl) => editorImageFiles.get(blobUrl))
    .filter((file): file is File => !!file)
}

export const useNoticeForm = ({
  defaultValues,
  onSubmit,
}: UseNoticeFormArgs) => {
  const submitLockRef = useRef(false)
  const editorImageFilesRef = useRef<Map<string, File>>(new Map())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<NoticeFormValues>({
    resolver: zodResolver(noticeFormSchema),
    mode: 'onChange',
    defaultValues,
  })

  const handleImageUpload = useCallback(async (file: File) => {
    const blobUrl = URL.createObjectURL(file)
    editorImageFilesRef.current.set(blobUrl, file)
    return blobUrl
  }, [])

  const handleSubmit = form.handleSubmit(async (values) => {
    if (submitLockRef.current) return

    submitLockRef.current = true
    setIsSubmitting(true)

    try {
      await onSubmit({
        ...values,
        profileImage: getUsedEditorImageFiles(
          values.content,
          editorImageFilesRef.current,
        ),
      })
    } finally {
      submitLockRef.current = false
      setIsSubmitting(false)
    }
  })

  useEffect(() => {
    const editorImageFiles = editorImageFilesRef.current

    return () => {
      editorImageFiles.forEach((_, blobUrl) => {
        URL.revokeObjectURL(blobUrl)
      })
      editorImageFiles.clear()
    }
  }, [])

  return {
    control: form.control,
    errors: form.formState.errors,
    handleImageUpload,
    handleSubmit,
    isSubmitting,
    register: form.register,
  }
}
