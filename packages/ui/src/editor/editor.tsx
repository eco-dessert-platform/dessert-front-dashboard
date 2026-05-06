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

//추가 부분
const Quill = ReactQuill.Quill

// 2. Quill 내부 포맷 객체의 타입을 정의합니다.
interface QuillFormat {
  sanitize: (url: string) => string
}

// 'as QuillFormat'을 사용하여 unknown 타입을 강제로 지정합니다.
const Link = Quill.import('formats/link') as QuillFormat
const Image = Quill.import('formats/image') as QuillFormat

const getProtocol = (rawUrl: string) => {
  const normalized = rawUrl.trim()
  if (!normalized) return ''
  try {
    return new URL(normalized, 'http://localhost').protocol
      .replace(':', '')
      .toLowerCase()
  } catch {
    return ''
  }
}

// 커스텀 함수를 할당
const linkSanitize = (url: string) => {
  const protocol = getProtocol(url)
  return ['http', 'https', 'mailto', 'tel'].includes(protocol) ? url : '//:0'
}

const imageSanitize = (url: string) => {
  const protocol = getProtocol(url)
  return ['http', 'https', 'data', 'blob'].includes(protocol) ? url : '//:0'
}

Link.sanitize = linkSanitize
Image.sanitize = imageSanitize

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

  // 1. imageHandler를 useCallback으로 감싸고 의존성에 quillRef 포함
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
      const file = input.files?.[0]
      if (!file) return

      try {
        const url = await onImageUpload(file)

        const quill = quillRef.current?.getEditor()
        if (quill) {
          const range = quill.getSelection(true)
          // 0번 인덱스일 경우를 위해 length 체크
          const index = range ? range.index : quill.getLength()

          // 이미지 삽입
          quill.insertEmbed(index, 'image', url)
          // 커서를 이미지 뒤로 이동
          quill.setSelection(index + 1, 0)
        }
      } catch (error) {
        console.error('Image upload failed:', error)
      }
    }
  }, [onImageUpload])

  // 2. modules 설정 최적화
  const modules = useMemo(() => {
    if (!toolbar) return { toolbar: MINIMAL_TOOLBAR }

    const toolbarConfig = image
      ? BASE_TOOLBAR.map((group) => {
          if ((group as string[]).includes('link')) {
            return [...group, 'image']
          }
          return group
        })
      : BASE_TOOLBAR

    return {
      toolbar: {
        container: toolbarConfig,
        // 익명함수 호출 대신 imageHandler 직접 연결
        handlers: image ? { image: imageHandler } : undefined,
      },
    }
  }, [toolbar, image, imageHandler]) // imageHandler를 의존성에 반드시 추가

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
