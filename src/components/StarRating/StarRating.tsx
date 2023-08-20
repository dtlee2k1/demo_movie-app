import React, { useState } from 'react'
import Star from '../Star/Star'

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
}

const starContainerStyle = {
  display: 'flex'
}

interface PropsType {
  defaultRating?: number
  maxRating?: number
  color?: string
  size?: number
  className?: string
  messages?: string[]
  onSetRating?: (rating: number) => void
}

export default function StarRating(props: PropsType) {
  const {
    defaultRating = 0,
    maxRating = 5,
    color = '#fcc419',
    size = 48,
    className = '',
    messages = [],
    onSetRating
  } = props

  const textStyle = {
    lineHeight: '1',
    margin: '0',
    color,
    fontSize: `${size / 1.5}px`
  }

  const [rating, setRating] = useState<number>(defaultRating)
  const [tempRating, setTempRating] = useState<number>(0)

  const handleRating = (rating: number) => {
    setRating(rating)
    onSetRating && onSetRating(rating)
  }

  const handleTempRating = (tempRating: number) => {
    setTempRating(tempRating)
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            color={color}
            size={size}
            rating={i + 1}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            handleRating={handleRating}
            handleTempRating={handleTempRating}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ''}
      </p>
    </div>
  )
}
