import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export const AuthPageContainer = ({ children }: ContainerProps) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      {children}
    </div>
  )
}
