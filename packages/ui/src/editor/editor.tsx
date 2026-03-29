/**
 * @component Editor
 * @description Quill 기반 리치 텍스트 에디터 공통 컴포넌트
 *
 * @example 기본 사용
 * ```tsx
 * const [value, setValue] = useState('')
 *
 * <Editor value={value} onChange={setValue} />
 * ```
 *
 * @example 전체 옵션
 * ```tsx
 * <Editor
 *   value={value}
 *   onChange={setValue}
 *   placeholder="내용을 입력하세요."
 *   toolbar={true}   // false: 최소 툴바(Bold, List, Link만). false일 때는 image prop이 무시됩니다.
 *   image={true}     // 이미지 버튼 활성화 (기본값: false, toolbar=true일 때만 동작)
 *                    // 이미지 업로드는 사용하는 쪽에서 직접 처리해야 합니다
 *   height={400}     // 에디터 높이(px), 기본값 300
 *   disabled={false}
 *   className=""     // 외부 wrapper 클래스 추가 가능
 * />
 * ```
 *
 * @example react-hook-form 연동
 * ```tsx
 * const { watch, setValue } = useFormContext()
 * const description = watch('description')
 *
 * <Editor
 *   value={description}
 *   onChange={(val) => setValue('description', val)}
 * />
 * ```
 */

import { useCallback, useMemo, useRef } from 'react'

import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

import { cn } from '../lib/utils'
import './editor.css'

export interface EditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  toolbar?: boolean
  /**
   * 이미지 버튼 활성화 여부. 기본값: false
   * - `toolbar={false}`일 때는 이 prop이 무시됩니다.
   */
  image?: boolean
  /**
   * 이미지 업로드 핸들러
   * - image={true}일 때 필수적으로 제공해야 실제 업로드가 동작합니다.
   * - 업로드된 이미지의 URL을 반환해야 합니다.
   */
  onImageUpload?: (file: File) => Promise<string>
  className?: string
  height?: number
}

const BASE_TOOLBAR = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ color: [] }, { background: [] }],
  ['link'],
  ['clean'],
]

const MINIMAL_TOOLBAR = [
  ['bold'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link'],
]

const BASE_FORMATS = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'color',
  'background',
  'link',
]

const Editor = ({
  value = '',
  onChange,
  placeholder = '내용을 입력하세요.',
  disabled = false,
  toolbar = true,
  image = false,
  onImageUpload,
  className = '',
  height = 300,
}: EditorProps) => {
  const isReadOnly = disabled || !onChange
  const quillRef = useRef<ReactQuill>(null)

  const imageHandler = useCallback(() => {
    if (!onImageUpload) {
      alert('이미지 업로드 기능이 설정되지 않았습니다.')
      return
    }

    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null
      if (!file) return

      try {
        const url = await onImageUpload(file)
        const quill = quillRef.current?.getEditor()
        if (quill) {
          const range = quill.getSelection(true) || { index: quill.getLength() }
          quill.insertEmbed(range.index, 'image', url)
          quill.setSelection(range.index + 1, 0)
        }
      } catch (error) {
        console.error('Image upload failed:', error)
      }
    }
  }, [onImageUpload])

  const modules = useMemo(() => {
    if (!toolbar) return { toolbar: MINIMAL_TOOLBAR }

    const toolbarConfig = image
      ? BASE_TOOLBAR.map((group) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((group as any[]).includes('link')) {
            return [...group, 'image']
          }
          return group
        })
      : BASE_TOOLBAR

    return {
      toolbar: {
        container: toolbarConfig,
        handlers: image ? { image: imageHandler } : undefined,
      },
    }
  }, [toolbar, image, imageHandler])

  const formats = useMemo(
    () => (image ? [...BASE_FORMATS, 'image'] : BASE_FORMATS),
    [image],
  )

  return (
    <div
      className={cn(
        // eslint-disable-next-line better-tailwindcss/no-unknown-classes
        'quill-wrapper w-full overflow-hidden rounded-10 border border-gray-300 bg-white transition-all duration-200',
        disabled && 'cursor-not-allowed bg-gray-100 opacity-60',
        className,
      )}
    >
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange ?? (() => {})}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={isReadOnly}
        style={{ height }}
      />
    </div>
  )
}

export { Editor }
