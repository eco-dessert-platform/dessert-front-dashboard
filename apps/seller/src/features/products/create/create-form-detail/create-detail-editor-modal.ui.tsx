import { useState } from 'react'

import { BbanggreuiOvenLogo } from '@dessert/icons'
import { Button, Editor } from '@dessert/ui'

import { useProductCreationStore } from '../create-form/product-creation.store'

interface ProductEditorModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ProductEditorModal = ({
  isOpen,
  onClose,
}: ProductEditorModalProps) => {
  const { productDetail, setProductDetail } = useProductCreationStore()

  // 편집 시 로컬 상태를 사용하고 등록 시에만 스토어에 반영합니다 (CodeRabbit 피드백 반영)
  const [localDetail, setLocalDetail] = useState(productDetail)
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center bg-gray-100"
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="h-header w-screen border-b border-gray-200 bg-white px-24 py-20"
        onClick={(e) => e.stopPropagation()}
      >
        <BbanggreuiOvenLogo />
      </div>

      {/* Content Body */}
      <div
        className="w-full flex-1 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Editor wrapper */}
        <div className="flex h-full justify-center">
          <Editor
            value={localDetail}
            onChange={setLocalDetail}
            image={true}
            placeholder="자유롭게 상세페이지를 작성해보세요 (권장크기 : 가로 860px)"
            className="block! size-full rounded-none! border-none!"
          />
        </div>
      </div>

      {/* Footer Nav */}
      <footer
        className="flex w-screen justify-end gap-12 border-t border-gray-200 bg-white p-24"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          type="button"
          title="취소"
          variant="primary-outlined"
          size="lg"
          onClick={onClose}
        />
        <Button
          type="button"
          title="등록하기"
          variant="primary-filled"
          size="lg"
          onClick={() => {
            setProductDetail(localDetail)
            onClose()
          }}
        />
      </footer>
    </div>
  )
}
