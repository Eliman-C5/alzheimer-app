import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export const BackToHome = () => {
  return (
    <div className='flex flex-col gap-4'>
      <p style={{margin: '2rem 2rem 0 2rem', textAlign: 'center'}}>Tienes que ingresar con tu <button onClick={() => signIn()} className='text-sky-300'>cuenta gmail</button> para poder acceder o puedes volver a la <Link href='/' className='text-sky-300'>home</Link></p>
    </div>
  )
}
