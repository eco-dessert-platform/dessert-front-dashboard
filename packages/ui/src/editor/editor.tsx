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
 *   toolbar={true}   // false: 최소 툴바(Bold, List, Link만)
 *   image={true}     // 이미지 버튼 활성화 (기본값: false)
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

import { useMemo } from 'react'
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
  /** 이미지 버튼 활성화 여부. 업로드 처리는 사용하는 쪽에서 직접 구현해야 합니다. 기본값: false */
  image?: boolean
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
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link'],
  ['clean'],
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
  className = '',
  height = 300,
}: EditorProps) => {
  const modules = useMemo(() => {
    if (!toolbar) return { toolbar: MINIMAL_TOOLBAR }

    const toolbarConfig = image
      ? BASE_TOOLBAR.map((group) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (group as any[]).includes('link') ? [...group, 'image'] : group,
        )
      : BASE_TOOLBAR

    return { toolbar: toolbarConfig }
  }, [toolbar, image])

  const formats = useMemo(
    () => (image ? [...BASE_FORMATS, 'image'] : BASE_FORMATS),
    [image],
  )

  return (
    <div
      className={cn(
        'quill-wrapper w-full overflow-hidden rounded-10 border border-gray-300 bg-white transition-all duration-200',
        disabled && 'cursor-not-allowed bg-gray-100 opacity-60',
        className,
      )}
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={disabled}
        style={{ height }}
      />
    </div>
  )
}

export { Editor }
