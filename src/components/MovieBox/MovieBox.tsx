import { ReactNode, useState } from 'react'

interface PropsType {
  children: ReactNode
}

export default function MovieBox(props: PropsType) {
  const { children } = props

  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  )
}
