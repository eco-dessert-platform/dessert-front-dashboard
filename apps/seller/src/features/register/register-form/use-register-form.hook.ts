import { zodResolver } from '@hookform/resolvers/zod'
import { Resolver, useForm } from 'react-hook-form'

import { RegisterForm, registerSchema } from '@/entity/register'

export const useRegisterForm = () => {
  return useForm<RegisterForm>({
    resolver: zodResolver(registerSchema) as Resolver<RegisterForm>,
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
