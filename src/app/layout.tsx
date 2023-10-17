'use client'

import { Navbar } from '@/components/Navbar'
import './globals.css'
import { FormProvider } from '@/context/FormProvider'
import { SessionProvider } from "next-auth/react"
import { metadata } from '@/helpers/metadata'
import { PropChildren } from '@/interfaces/app_interfaces'

export default async function RootLayout({
  children 
}: PropChildren) {

  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <Navbar/>
          <FormProvider>
          {children}
          </FormProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
