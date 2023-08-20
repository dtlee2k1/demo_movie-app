import { ReactNode } from 'react'

interface PropsType {
  children: ReactNode
}

export default function Main(props: PropsType) {
  const { children } = props

  return <main className='main'>{children}</main>
}
