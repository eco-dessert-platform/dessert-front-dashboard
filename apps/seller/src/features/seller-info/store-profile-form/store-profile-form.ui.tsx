import { useState } from 'react'

import { Textarea } from '@dessert/ui'

import { StoreProfileImagePreview } from '../store-profile-image-preview'

const IMG_NOTICE_SIZE = '권장 크기 1000x1000, 최소 160 이상 (1:1 비율)'
const IMG_NOTICE_FORMAT = 'jpg,jpeg,png 형식 10MB 이하 파일만 업로드 가능해요'

export function StoreProfileForm() {
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)

  return (
    <section>
      <h2 className="text-[14px] text-gray-800">스토어 프로필</h2>
      <StoreProfileImagePreview
        className="mt-4"
        file={profileImageFile}
        onChange={setProfileImageFile}
      />
      <div className="text-[10px] font-normal text-gray-500">
        <p>{IMG_NOTICE_SIZE}</p>
        <p>{IMG_NOTICE_FORMAT}</p>
      </div>

      <Textarea
        label="한줄소개"
        placeholder="빵그리입니다!"
        maxLength={100}
        showCount={true}
        className="mt-8"
      />
    </section>
  )
}
