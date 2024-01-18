'use client'

import { Navbar } from '@/components/navbar/Navbar'
import './globals.css'
import { FormProvider } from '@/context/FormProvider'
import { SessionProvider } from "next-auth/react"
import { metadata } from '@/helpers/metadata'
import { PropChildren } from '@/interfaces/app_interfaces'
import {NextUIProvider} from "@nextui-org/react";

export default function RootLayout({children}: PropChildren) {

  return (
      <html lang="en">
        <head>
          <title>Alzheimer Web App</title>
        </head>
        <body>
          <SessionProvider>
            <NextUIProvider>
              <Navbar/>
              <FormProvider>
                {children}
              </FormProvider>
            </NextUIProvider>
          </SessionProvider>
        </body>
      </html>
  )
}
