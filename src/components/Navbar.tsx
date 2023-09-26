'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../public/images/alzhaimer-logo.png'
import { signIn, signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export const Navbar = () => {

  const { data: session } = useSession()
  
  const redirectFunction = () => {
    
    signOut()
    
    setTimeout(() => {
      redirect('/')
    }, 3000)
    
  }

  return (
    <div className='px-4 border-b shadow-lg flex justify-between items-center'>
    
      <Link href='/'>
        <Image 
          src={Logo}
          alt='Logo de la aplicacion'
          width={100}
          height={100}
          priority
          className='w-10/12 sm:w-full'
        />
      </Link>
      
      <div className='flex gap-2 sm:gap-4'>
        <Link href='/guia' className='hover:text-sky-300 text-center'>Guia del usuario</Link>
        {
          session ? 
            <div className='dropdown relative text-center'>
              Cuenta
              <ul className='dropdown-content'>
                <Link href='/registrar' className='hover:text-sky-300 py-4'>Registrar</Link>
                <Link href='/datos' className='hover:text-sky-300 py-4'>Datos</Link>
                <li className='py-4'>
                  <button className='hover:text-sky-300' onClick={redirectFunction}>Salir</button>
                </li>
              </ul>
            </div>
           :
          <>
            <button onClick={() => signIn()}>Ingresar</button>   
          </>
        }
      </div>
      
    </div>
  )
}
