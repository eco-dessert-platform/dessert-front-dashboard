import { useRef, useState } from 'react'

import { BbanggreuiOvenLogo } from '@dessert/icons'
import { Button, Editor } from '@dessert/ui'
import { useNavigate } from 'react-router-dom'

import { useProductCreationStore } from '@/features/products/create/create-form/product-creation.store'

export function DetailEditPage() {
  const navigate = useNavigate()
  const { productDetail, setProductDetail } = useProductCreationStore()

  // 편집 시 로컬 상태를 사용하고 등록 시에만 스토어에 반영합니다 (CodeRabbit 피드백 반영)
  const [localDetail, setLocalDetail] = useState(productDetail)

  const editorImageFiles = useRef<Map<string, File>>(new Map())
  // line16: PR220을 위한 test 코드입니다.
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="flex h-header shrink-0 items-center border-b border-gray-300 bg-white px-24 py-10">
        <div className="flex items-center">
          <BbanggreuiOvenLogo className="h-[42px] w-auto" />
        </div>
      </header>

      {/* Content Body */}
      <main className="flex flex-1 flex-col items-center overflow-auto px-[196px] pb-[100px]">
        {/* Editor wrapper */}
        <div className="mt-32 flex min-h-[710px] w-full max-w-[1440px] flex-col bg-white p-32 shadow-sm">
          <Editor
            value={localDetail}
            onChange={setLocalDetail}
            image={true}
            height={600}
            onImageUpload={async (file) => {
              const blobUrl = URL.createObjectURL(file)
              editorImageFiles.current.set(blobUrl, file)
              return blobUrl
            }}
            // line 36~40:PR220을 위한 test 코드입니다.
            placeholder="자유롭게 상세페이지를 작성해보세요 (권장크기 : 가로 860px)"
          />
        </div>
      </main>

      {/* Footer Nav */}
      <footer className="fixed bottom-0 z-10 flex w-full shrink-0 items-center justify-end gap-12 border-t border-gray-200 bg-white p-24">
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
