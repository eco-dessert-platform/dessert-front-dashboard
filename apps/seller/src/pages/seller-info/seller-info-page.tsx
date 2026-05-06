import {
  StoreAccountInfoForm,
  StoreInfoForm,
  StoreNameForm,
} from '@/features/seller-info'

export function SellerInfoPage() {
  return (
    <div className="mx-auto flex max-w-[1100px] min-w-0 flex-col gap-40 overflow-hidden">
      <StoreNameForm />
      <StoreInfoForm />
      <StoreAccountInfoForm />
    </div>
  )
}
