'use client'

import { formTypes, propChildren, userProps } from '@/interfaces/app_interfaces';
import React, { createContext, useState } from 'react'


export const FormContext = createContext<formTypes>({} as formTypes);

export const FormProvider = ({children}: propChildren) => {

  const [images, setImages]= useState('')
  const [datosFormulario, setDatosFormulario] = useState<userProps>({
    username: '',
    adultname: '',
    adultage: null,
    userphone: null,
    image: '',
    genre: '',
    illnes: '',
    adultAddress: '',
    email: '',
    id: Math.round(Math.random() * 10000000)
  })

  return (
    <FormContext.Provider value={{
      datosFormulario,
      setDatosFormulario,
      images,
      setImages
    }}>
    {children}
    </FormContext.Provider>
  )
}
