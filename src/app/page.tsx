// import Image fro}m 'next/image'

'use client'

import Image from "next/image"

export default function Home() {

  return (
    <main className="">
      
      <div className="w-11/12 md:w-8/12 mx-auto mt-12">
      
      <p className="text-justify">Esta aplicación web surge con el propósito de brindar una herramienta útil y eficiente para facilitar el cuidado de los adultos mayores en nuestra comunidad. Con nuestro sistema de registro e identificación mediante código QR, podrás fácilmente registrarte con tu nombre y número de teléfono, seguido de los datos del adulto mayor, de esta manera, si en algún momento este se llegase a extraviar, la persona que lo encuentre y desee ayudar pueda escanear el código QR ubicado en la prenda de vestir del portador, re direccionándolo a una página web con todos los datos esenciales del adulto mayor y para contactar con usted.</p>
      
      <Image 
        priority
        src={'/images/nieta-abrazando-abuela-amor.jpg'}
        height={700}
        width={700}
        alt='Imagen de abuela y nieta'
        className="my-8 mx-auto"
      />
      
      <p className="mt-4 text-justify">Nuestro objetivo es mejorar la calidad de vida de los adultos mayores y ofrecer una solución práctica para sus cuidadores y familiares. Por eso, te invitamos a registrarte en nuestra aplicación web y comenzar a gozar de este beneficio de manera totalmente gratuita.</p>
      
      <h4 className="font-bold my-4 mt-8">Beneficios</h4>
      
      <ol className="list-decimal pl-4 flex flex-col gap-4 mb-8">
        <li className="text-justify">Identificación rápida y sencilla: gracias a que el sistema funciona mediante la obtención de información contenida en el código QR, este al ser escaneado de manera automática proporcionará la dirección de enlace que lleva a la página web que contiene todos los datos pertinentes del adulto mayor y su responsable.</li>
        <li className="text-justify">Fácil acceso a la información: Debido a que se trata de una aplicación web, dicha información puede ser visualizada desde cualquier lugar al momento de escanear el código QR, utilizando la cámara de un dispositivo móvil con conexión a internet.</li>
        <li className="text-justify">Mayor seguridad: Al contar con un sistema de identificación con código QR, se reduce el riesgo de extravío o pérdida de los adultos mayores, lo que aumenta su seguridad y tranquilidad.</li>
      </ol>
      
      </div>
      
    </main>
  )
}
