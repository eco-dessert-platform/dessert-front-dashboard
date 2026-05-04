// import { useState } from 'react'

// import { FormStepStatus, FormStepsContext } from './create-form-steps.context'

// export const FormStepsProvider = ({
//   children,
// }: {
//   children: React.ReactNode
// }) => {
//   const [productFields, setProductFields] = useState<FormStepStatus>({
//     productInfo: false,
//     productDelivery: false,
//     productOptions: false,
//   })

//   return (
//     <FormStepsContext.Provider
//       value={{
//         productFields,
//         setProductFields,
//       }}
//     >
//       {children}
//     </FormStepsContext.Provider>
//   )
// }
