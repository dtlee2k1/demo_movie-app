import React from 'react'

interface PropTypes {
  message: string
}

export default function ErrorMessage(props: PropTypes) {
  const { message } = props
  return (
    <p className='error'>
      <span>⛔️</span> {message}
    </p>
  )
}
