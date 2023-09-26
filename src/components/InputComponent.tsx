import React from 'react'

type inputProps = {
  type: string,
  placeholder: string,
  pattern?: string,
  maxLength?: number,
  max?: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value?: any
}

export const InputComponent = ({type, placeholder, onChange, pattern, maxLength, max, value}: inputProps) => {
  return (
    <input 
      className='border' 
      required 
      placeholder={placeholder} 
      type={type} 
      onChange={onChange}
      pattern={pattern}
      maxLength={maxLength}
      max={max}
      value={value}
    />
  )
}
