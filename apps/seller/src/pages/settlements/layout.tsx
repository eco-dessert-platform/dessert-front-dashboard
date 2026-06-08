const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="-mx-[90px] -my-40 flex min-h-[calc(100vh-80px)] flex-col gap-10 p-40">
      {children}
    </div>
  )
}

export default Layout
