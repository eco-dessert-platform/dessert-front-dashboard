import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export const AuthPageContainer = ({ children }: ContainerProps) => {
  return <div className="flex min-h-screen flex-col bg-gray-50">{children}</div>
}
