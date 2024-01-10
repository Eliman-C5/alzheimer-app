'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../public/images/alzhaimer-logo.png'
import { signIn, signOut, useSession } from 'next-auth/react'
import {NavbarDropdown} from './NavbarDropdown'
import { redirect } from 'next/navigation'

export const Navbar = () => {
    
  // const redirectFunction = () => {
    
  //   signOut()
    
  //   setTimeout(() => {
  //     redirect('/')
  //   }, 3000)
    
  // }

  return (
    <div className='px-4 py-2 sm:py-0 border-b shadow-lg flex justify-between items-center'>
    
      <Link href='/'>
        <Image 
          src={Logo}
          alt='Logo de la aplicacion'
          width={100}
          height={100}
          priority
          className='w-7/12 sm:w-full'
        />
      </Link>
      
      <div className='flex sm:gap-4 relative'>
        <Link href='/guia' className='text-[14px] sm:text-[16px] text-center btn-navbar'>Guia del usuario</Link>
        <NavbarDropdown />
      </div>
      
    </div>
  )
}
