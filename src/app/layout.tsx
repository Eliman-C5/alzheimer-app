'use client'

import { Navbar } from '@/components/Navbar'
import './globals.css'
import { FormProvider } from '@/context/FormProvider'
import { SessionProvider } from "next-auth/react"
import { metadata } from '@/helpers/metadata'

export default async function RootLayout({
  children 
}: {
  children: React.ReactNode
}) {

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
