'use client'

import { AlzheimerCheckbox } from "@/components/form/AlzheimerCheckbox";
import { BackToHome } from "@/components/BackToHome";
import { GenreCheckboxes } from "@/components/form/GenreCheckboxes";
import { QRfromProfile } from "@/components/form/QRfromProfile";
import { UploadImage } from "@/components/form/UploadImage";
import { FormContext } from "@/context/FormProvider";
import { formData } from "@/helpers/formData";
import { useData } from "@/hooks/useData"
import { useSession } from "next-auth/react";
import { useContext } from "react";
import {Input} from "@nextui-org/react";

export default function Page() {

  const {onSubmit, isDataCorrect, profileId} = useData();
  
  const {datosFormulario, setDatosFormulario} = useContext(FormContext);
  
  const { data: session } = useSession();
    
  if (!session?.user?.email) {
    return <BackToHome />
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-[24px]">
    
      <form className='shadow-lg gap-4' onSubmit={onSubmit}>
      
        <h2 className="text-[22px] sm:text-[24px] font-bold my-4">
          Formulario para creación de perfil público de adulto mayor
        </h2>
        <p className='mb-4'>
          Hola, {session?.user?.name}. Aquí puedes registrar a los adultos mayores que estén bajo tu cuidado
        </p>
        
        {formData.map(data => (
          <Input 
            //className='border' 
            isRequired 
            key={data.id}
            name={data.name}
            variant="bordered"
            placeholder={data.placeholder}
            label={data.placeholder}
            labelPlacement="outside"
            type={data.type}
            onChange={(e) => setDatosFormulario({...datosFormulario, [data.name]: e.target.value}) }
          />
        ))}
        
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