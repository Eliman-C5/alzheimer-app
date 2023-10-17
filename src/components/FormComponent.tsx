import { FormContext } from '@/context/FormProvider'
import { formComponentTypes, inputProps } from '@/interfaces/app_interfaces'
import React, { useContext } from 'react'
import { InputComponent } from './InputComponent'
import { UploadImage } from './UploadImage'
import { GenreCheckboxes } from './GenreCheckboxes'
import { useSession } from 'next-auth/react'
import { AlzheimerCheckbox } from './AlzheimerCheckbox'
import { BackToHome } from './BackToHome'
import { QRfromProfile } from './QRfromProfile'

export const FormComponent = ({onSubmit, profileId, isDataCorrect}: formComponentTypes) => {

  const { data: session } = useSession();

  const {datosFormulario, setDatosFormulario} = useContext(FormContext)

  const inputsInfo: inputProps[] = [
    {
      id: 1,
      placeholder: 'Nombre del responsable (Solo texto)',
      type: 'string',
      pattern: '^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$',
      maxLength: 30,
      onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => setDatosFormulario({...datosFormulario, username: e.target.value})
    },
    {
      id: 2,
      placeholder: 'Nombre del adulto mayor (Solo texto)',
      type: 'string',
      pattern: '^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$',
      maxLength: 30,
      onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => setDatosFormulario({...datosFormulario, adultname: e.target.value})
    },
    {
      id: 3,
      placeholder: 'Edad del adulto mayor',
      type: 'number',
      max: 3,
      onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => {
        setDatosFormulario({...datosFormulario, adultage: e.target.valueAsNumber})
      },
    },
    {
      id: 4,
      placeholder: 'Número de contacto de el responsable',
      type: 'number',
      max: 15,
      onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => {
        setDatosFormulario({...datosFormulario, userphone: e.target.valueAsNumber})
      },
    },
    {
      id: 5,
      placeholder: 'Ingresar dirección',
      type: 'string',
      pattern: `[A-Za-z0-9#.?_-'"[]{}()*&^%$@!/,:;+= ]+`,
      maxLength: 100,
      onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => setDatosFormulario({...datosFormulario, adultAddress: e.target.value})
    },
  ]
  
  if (!session?.user?.email) {
    return <BackToHome />
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-[24px]" onSubmit={onSubmit}>
      
      <form className='shadow-lg gap-4'>
      
        <h2 className="text-[22px] sm:text-[24px] font-bold my-4">Formulario para creación de perfil público de adulto mayor</h2>
        <p className='mb-4'>Hola, {session?.user?.name}. Aquí puedes registrar a los adultos mayores que estén bajo tu cuidado</p>
        
        {
          inputsInfo.map(input => input.type === 'string' ? <InputComponent 
            type={input.type} 
            placeholder={input.placeholder}
            key={input.id}
            onChange={input.onChangeFn}
            pattern={input.pattern}
            maxLength={input.maxLength}
          /> :
          <InputComponent 
            type={input.type} 
            placeholder={input.placeholder}
            key={input.id}
            onChange={input.onChangeFn}
          />
          )
        }
        
        <AlzheimerCheckbox datosFormulario={datosFormulario} setDatosFormulario={setDatosFormulario} />
        
        <UploadImage />
        
        <GenreCheckboxes datosFormulario={datosFormulario} setDatosFormulario={setDatosFormulario} />
                
        <button 
          className="w-full rounded-[15px] bg-blue-400 text-white hover:opacity-90 py-[6px] font-bold"
        >
          Enviar
        </button>
        
      </form>
      
      <QRfromProfile isDataCorrect={isDataCorrect} profileId={profileId} />
      
    </main>
  )
}
