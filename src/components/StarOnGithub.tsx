import Image from 'next/image'
import React from 'react'

export const StarOnGithub = () => {
  return (
    <a 
      className='flex gap-2 rounded-full shadow-lg px-6 py-2 justify-center items-center w-[200px] lg:mx-auto border border-[#00000021]'
      href="https://github.com/Eliman-C5/alzheimer-app" 
      target='_blank'
    >
      <Image 
        src='/images/github-mark.svg' 
        alt='Github Logo' 
        width={20}
        height={20}
      />
      <span className='text-[16px]'>Star on Github</span>
    </a>
  )
}
