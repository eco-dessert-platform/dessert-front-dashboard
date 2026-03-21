import { useContext } from 'react'

import { FormStepsContext } from './create-form-steps.context'

export const useCreateFormSteps = () => {
  const context = useContext(FormStepsContext)
  if (!context) {
    throw new Error(
      'useFormSteps는 FormStepsProvider 안에서 사용되어야 합니다.',
    )
  }
  return context
}
