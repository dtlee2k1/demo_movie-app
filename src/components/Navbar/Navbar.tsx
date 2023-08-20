import React, { ReactNode, useState } from 'react'
import Logo from '../Logo'

interface PropsType {
  children: ReactNode
}

export default function Navbar(props: PropsType) {
  const { children } = props

  return (
    <nav className='nav-bar'>
      <Logo />
      {children}
    </nav>
  )
}
