import { FormContext } from '@/context/FormProvider'
import { inputProps } from '@/interfaces/app_interfaces'
import React, { useContext, useEffect, useState } from 'react'
import { InputComponent } from './InputComponent'
import { useRouter } from 'next/navigation'
import { UploadImage } from './UploadImage'
import { jsPDF } from 'jspdf'
import QRcode from 'qrcode.react'
import { GenreCheckboxes } from './GenreCheckboxes'
import { useSession } from 'next-auth/react'
import { AlzheimerCheckbox } from './AlzheimerCheckbox'

type formComponentTypes = {
  onSubmit: any,
  profileId: number,
  isDataCorrect: boolean,
}

export const FormComponent = ({onSubmit, profileId, isDataCorrect}: formComponentTypes) => {

  const downloadQRCode = () => {
    const canvas = document.querySelector("#qrcode-canvas") as HTMLCanvasElement
    if (!canvas) throw new Error("<canvas> not found in the DOM")

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream")
    const downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = "QR code.png"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
  
  const generatePDF = () => {

    // Defines the pdf
    let pdf = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: [300, 300],
      putOnlyUsedFonts:true
    })
    
    //let width = pdf.internal.pageSize.getWidth();
    //let height = pdf.internal.pageSize.getHeight();

    // Transforms the canvas into a base64 image
    const image64 = document.querySelector("#qrcode-canvas") as HTMLCanvasElement
    image64.toDataURL()

    // Adds the image to the pdf
    pdf.addImage(image64, 'png', 100, 50, 100, 100)

    // Downloads the pdf
    pdf.save('QR.pdf')

  }

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
  
  const router = useRouter();
  
  if (!session?.user?.email) {
    return <div>Si no haz iniciado sesión, no puedes registrar adultos mayores...</div>
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
      
      <div className={`${isDataCorrect ? 'block' : 'hidden'} mt-8 flex flex-col gap-4`}>
        <button 
          onClick={() => router.push(`/profile/${profileId}`)} 
          className={`rounded-[15px] bg-blue-400 text-white hover:opacity-90 py-[6px] px-[10px] font-bold`}
        >
          Ir a la página de perfil del usuario
        </button>
        <p className='text-center'>o</p>
        <div className="bg-[#e4e4e4] p-4 my-4">
          <QRcode id="qrcode-canvas" level="H" size={300} value={`https://web-app-alzheimer.vercel.app/profile/${profileId}`} />
        </div>
        <div className="flex flex-col gap-4">
          <a 
            onClick={generatePDF} 
            className='text-center cursor-pointer rounded-[15px] border border-blue-400 bg-white text-blue-400 hover:opacity-90 p-[6px] font-bold'
          >
            Descargar el QR en PDF
          </a>
          <a 
            onClick={downloadQRCode} 
            className='text-center cursor-pointer rounded-[15px] bg-blue-400 text-white hover:opacity-90 p-[6px] font-bold'
          >
            Descargar el QR en PNG
          </a>
        </div>
      </div>
      
    </main>
  )
}
