import { FormContext } from "@/context/FormProvider"
import { client } from "@/sanity/schemas";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react"

export const useData = () => {

  const [profileId, setProfileId] = useState<number>(404);
  
  const [isDataCorrect, setIsDataCorrect] = useState<boolean>(false);

  const {datosFormulario, setDatosFormulario, images} = useContext(FormContext)

  const { data: session } = useSession();
  
  const onSubmit = (e: any) => {
    
    e.preventDefault();
    
    //console.log(datosFormulario.id, images, session)
    
    //Creando el doc
    const doc = {
      _type: 'users',
      id: datosFormulario.id,
      email: session?.user?.email,
      username: datosFormulario.username,
      adultname: datosFormulario.adultname,
      adultage: Number(datosFormulario.adultage),
      adultAddress: datosFormulario.adultAddress,
      image: images,
      genre: datosFormulario.genre,
      illnes: datosFormulario.illnes,
      userphone: Number(datosFormulario.userphone)
    }
    
    // Envía los datos a Sanity
    client.create(doc)
    .catch(error => console.log(error));
    
    //Trae los datos de Sanity
    client.fetch('*[_type == "users"]').then(res => console.log(res))
    
    //Establecer el id de la pagina de perfil
    setProfileId(datosFormulario.id)
    
    //Mostrar boton que redirige a la pagina de perfil
    setIsDataCorrect(true);
  
    //Cambiar id por si quieren volver a registrar a alguien
    setDatosFormulario({...datosFormulario, id: Math.round(Math.random() * 10000000)})
    
    console.log(datosFormulario.id, 'nuevo');
    
    window.alert('El adulto mayor ha sido registrado')
  }

  return {onSubmit, profileId, isDataCorrect}

}