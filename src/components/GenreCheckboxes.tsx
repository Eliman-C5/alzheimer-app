import React, { useState } from 'react'

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
          <legend>Seleccionar género de el adulto</legend>
          
          <div className="flex gap-4 items-center">
            <input 
              type="checkbox" 
              id="masculino" 
              name="masculino"
              disabled={genre.type === 'Femenino' && genre.active ? true : false}
              onClick={() => {
                setGenre({type: 'Masculino', active: !genre.active})
                setDatosFormulario({...datosFormulario, genre: 'Masculino'})
              }}
            />
            <label>Másculino</label>
          </div>
          
          <div className="flex gap-4 items-center">
            <input 
              type="checkbox" 
              id="femenino" 
              name="femenino" 
              disabled={genre.type === 'Masculino' && genre.active ? true : false}
              onClick={() => {
                setGenre({type: 'Femenino', active: !genre.active})
                setDatosFormulario({...datosFormulario, genre: 'Femenino'})
              }}
            />
            <label>Femenino</label>
          </div>
          
    </fieldset>
  )
}
