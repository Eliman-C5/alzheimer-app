import React, { useState } from 'react'
import {Checkbox} from "@nextui-org/react";

type AlzheimerCheckbox = {
  datosFormulario: any,
  setDatosFormulario: any
}

export const AlzheimerCheckbox = ({datosFormulario, setDatosFormulario}: AlzheimerCheckbox) => {
  const [illnes, setIllnes] = useState({
    type: '',
    active: false
  })
  
  return (
    <fieldset className='mt-4'>
          <legend className='text-[15px] mb-4'>Seleccionar condición de el adulto mayor</legend>
          
          <div className="flex gap-4 items-center">
          
            <Checkbox
              id="alzheimer" 
              name="alzheimer"
              isDisabled={illnes.type === 'Demencia senil' && illnes.active ? true : false}
              onClick={() => {
                setIllnes({type: 'Alzheimer', active: !illnes.active})
                setDatosFormulario({...datosFormulario, illnes: 'Alzheimer'})
              }}
            >
              Alzheimer
            </Checkbox>
            <Checkbox
              id="demencia senil" 
              name="demencia senil"
              isDisabled={illnes.type === 'Alzheimer' && illnes.active ? true : false}
              onClick={() => {
                setIllnes({type: 'Demencia senil', active: !illnes.active})
                setDatosFormulario({...datosFormulario, illnes: 'Demencia senil'})
              }}
            >
              Demencia senil
            </Checkbox>
            
          </div>
          
    </fieldset>
  )
}
