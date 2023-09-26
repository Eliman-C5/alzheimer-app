import React, { useState } from 'react'

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
          <legend>Seleccionar condición de el adulto mayor</legend>
          
          <div className="flex gap-4 items-center">
            <input 
              type="checkbox" 
              id="alzheimer" 
              name="alzheimer"
              disabled={illnes.type === 'Demencia senil' && illnes.active ? true : false}
              onClick={() => {
                setIllnes({type: 'Alzheimer', active: !illnes.active})
                setDatosFormulario({...datosFormulario, illnes: 'Alzheimer'})
              }}
            />
            <label>Alzheimer</label>
          </div>
          
          <div className="flex gap-4 items-center">
            <input 
              type="checkbox" 
              id="demencia senil" 
              name="demencia senil" 
              disabled={illnes.type === 'Alzheimer' && illnes.active ? true : false}
              onClick={() => {
                setIllnes({type: 'Demencia senil', active: !illnes.active})
                setDatosFormulario({...datosFormulario, illnes: 'Demencia senil'})
              }}
            />
            <label>Demencia senil</label>
          </div>
          
    </fieldset>
  )
}
