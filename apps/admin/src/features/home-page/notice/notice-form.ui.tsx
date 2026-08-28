import { useEffect, useRef, useState } from 'react'

import { Button, Editor, Input } from '@dessert/ui'

import type { NoticeFormValues } from '@/entity/home-page/notice'

const TITLE_MIN_LENGTH = 3
const TITLE_MAX_LENGTH = 50
const TITLE_HELPER_TEXT = `${TITLE_MIN_LENGTH}~${TITLE_MAX_LENGTH} 글자를 입력 하세요`

/** 빈 에디터도 빈 문단 태그를 넘기므로 태그를 걷어내고 판단한다 */
const isEditorEmpty = (value: string) =>
  value.replace(/<(p|div|br)[^>]*>|<\/(p|div)>|&nbsp;|\s/g, '') === ''

export interface NoticeSubmitValues extends NoticeFormValues {
  /** 본문에 새로 삽입된 이미지 파일. 서버가 파일 파트로 따로 받는다 */
  images: File[]
}

interface NoticeFormProps {
  heading: string
  submitTitle: string
  defaultValues?: NoticeFormValues
  onSubmit: (values: NoticeSubmitValues) => void
  isSubmitting?: boolean
}

export const NoticeForm = ({
  heading,
  submitTitle,
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: NoticeFormProps) => {
  const [title, setTitle] = useState(defaultValues?.title ?? '')
  const [content, setContent] = useState(defaultValues?.content ?? '')
  const insertedImagesRef = useRef<Map<string, File>>(new Map())

  const isTitleValid =
    title.trim().length >= TITLE_MIN_LENGTH &&
    title.trim().length <= TITLE_MAX_LENGTH
  const canSubmit = isTitleValid && !isEditorEmpty(content) && !isSubmitting

  // 미리보기 주소는 화면을 벗어날 때 해제해 파일이 메모리에 남지 않게 한다
  useEffect(() => {
    const insertedImages = insertedImagesRef.current

    return () => {
      insertedImages.forEach((_, previewUrl) => URL.revokeObjectURL(previewUrl))
      insertedImages.clear()
    }
  }, [])

  /** 업로드 API가 따로 없어 미리보기 주소로 삽입하고 파일은 제출까지 들고 있는다 */
  const handleImageUpload = async (file: File) => {
    const previewUrl = URL.createObjectURL(file)
    insertedImagesRef.current.set(previewUrl, file)
    return previewUrl
  }

  const collectUsedImages = (html: string) =>
    [...insertedImagesRef.current.entries()]
      .filter(([previewUrl]) => html.includes(previewUrl))
      .map(([, file]) => file)

  return (
    <form
      className="flex flex-col gap-20 rounded-20 border border-gray-200 bg-white px-40 py-32"
      onSubmit={(event) => {
        event.preventDefault()
        if (!canSubmit) return

        onSubmit({
          title: title.trim(),
          content,
          images: collectUsedImages(content),
        })
      }}
    >
      <h2 className="typo-heading-20-sb text-gray-900">{heading}</h2>

      <Input
        label="공지사항명"
        required
        placeholder="제목을 입력하세요."
        helperText={TITLE_HELPER_TEXT}
        value={title}
        maxLength={TITLE_MAX_LENGTH}
        disabled={isSubmitting}
        onChange={(event) => setTitle(event.target.value)}
      />

      <Editor
        value={content}
        onChange={setContent}
        image
        onImageUpload={handleImageUpload}
        placeholder="내용을 입력하세요. (권장크기 : 가로 860px)"
        height={480}
        disabled={isSubmitting}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          title={submitTitle}
          size="lg"
          disabled={!canSubmit}
        />
      </div>
    </form>
  )
}
