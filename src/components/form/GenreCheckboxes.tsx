import React, { useState } from 'react'
import {Checkbox} from "@nextui-org/react";

type GenreProps = {
  datosFormulario: any,
  setDatosFormulario: any
}

export const GenreCheckboxes = ({datosFormulario, setDatosFormulario}: GenreProps) => {

  const [genre, setGenre] = useState({
    type: '',
    active: false
  })

  return (
    <fieldset>
          <legend className='text-[15px] mb-4'>Seleccionar género de el adulto</legend>
          
          <div className="flex gap-4 items-center">
            <Checkbox
              id="masculino" 
              name="masculino"
              isDisabled={genre.type === 'Femenino' && genre.active ? true : false}
              onClick={() => {
                setGenre({type: 'Masculino', active: !genre.active})
                setDatosFormulario({...datosFormulario, genre: 'Masculino'})
              }}
            >
              Másculino
            </Checkbox>
            <Checkbox
              id="femenino" 
              name="femenino"
              isDisabled={genre.type === 'Masculino' && genre.active ? true : false}
              onClick={() => {
                setGenre({type: 'Femenino', active: !genre.active})
                setDatosFormulario({...datosFormulario, genre: 'Femenino'})
              }}
            >
              Femenino
            </Checkbox>

          </div>
          
    </fieldset>
  )
}
