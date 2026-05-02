import { useState } from 'react'

import { BbanggreuiOvenLogo } from '@dessert/icons'
import { Button, Editor } from '@dessert/ui'
import { useNavigate } from 'react-router-dom'

import { useProductCreationStore } from '@/features/products/create/create-form/product-creation.store'
import '../../../styles/create-detail-editor.css'

export function DetailEditPage() {
  const navigate = useNavigate()
  const { productDetail, setProductDetail } = useProductCreationStore()

  // 편집 시 로컬 상태를 사용하고 등록 시에만 스토어에 반영합니다 (CodeRabbit 피드백 반영)
  const [localDetail, setLocalDetail] = useState(productDetail)

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      {/* Header */}
      <header className="flex h-header shrink-0 items-center border-b border-gray-300 bg-white px-24 py-10">
        <div className="flex items-center">
          <BbanggreuiOvenLogo className="h-[42px] w-auto" />
        </div>
      </header>

      {/* Content Body */}
      <main className="flex flex-1 flex-col items-center overflow-auto">
        {/* Editor wrapper */}
        <div className="flex size-full flex-col bg-white">
          <Editor
            value={localDetail}
            onChange={setLocalDetail}
            image={true}
            height={600}
            placeholder="자유롭게 상세페이지를 작성해보세요 (권장크기 : 가로 860px)"
            className="block! size-full rounded-none! border-none!"
          />
        </div>
      </main>
      {/* Footer Nav */}
      <footer className="flex w-full shrink-0 items-center justify-end gap-12 border-t border-gray-200 p-24">
        <Button
          type="button"
          title="취소"
          variant="primary-outlined"
          size="lg"
          onClick={() => navigate(-1)}
        />
        <Button
          type="button"
          title="등록하기"
          variant="primary-filled"
          size="lg"
          onClick={() => {
            setProductDetail(localDetail)
            navigate(-1)
          }}
        />
      </footer>
    </div>
  )
}
