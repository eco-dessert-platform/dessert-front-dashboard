import { Button } from '@dessert/ui'

import { StoreContactAddressForm } from '../store-contact-address-form'
import { StoreProfileForm } from '../store-profile-form'

export function StoreInfoForm() {
  return (
    <section className="rounded-20 bg-white p-24">
      <h2 className="mb-4 text-[20px] font-semibold">스토어 정보 변경</h2>

      <div className="flex flex-col gap-20 2xl:flex-row">
        <div className="w-full xl:w-[220px] 2xl:shrink-0">
          <StoreProfileForm />
        </div>

        <div className="w-full min-w-0 2xl:flex-1">
          <StoreContactAddressForm />
        </div>
      </div>

      <div className="mt-16 flex justify-end">
        <Button title="수정하기" className="min-w-[160px]" />
      </div>
    </section>
  )
}
