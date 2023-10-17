'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../public/images/alzhaimer-logo.png'
import { signIn, signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export const Navbar = () => {

  const { data: session } = useSession()
  
  const [dropdown, setDropdown] = useState(false)
  
  const redirectFunction = () => {
    
    signOut()
    
    setTimeout(() => {
      redirect('/')
    }, 3000)
    
  }

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
        {
          session ? 
            <div className='btn-navbar text-center'>
              <p 
                onClick={() => setDropdown(!dropdown)} 
                className='flex gap-2 items-center cursor-pointer text-[14px] sm:text-[16px]'
              >
                <span>Cuenta</span>
                <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z">
                  </path>
                </svg>
              </p>
              <div className={`dropdown-content ${dropdown ? 'flex' : 'hidden'}`}>
                <Link href='/registrar' className='text-[14px] sm:text-[16px] py-4 pl-8 w-full text-left hover:bg-[#d7d7df17]'>Registrar</Link>
                <Link href='/datos' className='text-[14px] sm:text-[16px] hover:bg-[#d7d7df17] py-4 pl-8 w-full border-t border-b text-left'>Datos</Link>
                <button className='text-[14px] sm:text-[16px] hover:bg-[#d7d7df17] py-4 pl-8 w-full text-left cursor-pointer' onClick={redirectFunction}>Salir</button>
              </div>
            </div>
           :
          <>
            <button onClick={() => signIn()} className='btn-navbar text-[14px] sm:text-[16px]'>Ingresar</button>   
          </>
        }
      </div>
      
    </div>
  )
}
