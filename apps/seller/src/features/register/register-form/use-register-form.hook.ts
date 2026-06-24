import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { RegisterForm, registerSchema } from '@/entity/register'

export const useRegisterForm = () => {
  return useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      bank: '',
      accountNumber: '',
      accountVerificationId: null,
      storeName: '',
      storeId: null,
      introduce: '',
      phoneNumber: '',
      subPhoneNumber: '',
      emailLocal: '',
      emailDomain: '',
      postalCode: '',
      originAddress: '',
      originAddressDetail: '',
      profileImage: null,
      agreeToServiceTerms: false,
      agreeToPrivacyPolicy: false,
    },
    mode: 'onChange',
  })
}
