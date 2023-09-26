'use client'

import { useSession } from 'next-auth/react';
import { client } from '@/sanity/schemas'
import React, { useEffect, useState } from 'react'
import QRcode from 'qrcode.react'
import jsPDF from 'jspdf';

export default function Page() {

  const { data: session } = useSession();
  
  const [info, setInfo] = useState<any>([])
  
  const generatePDF = (id: any) => {

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
    const image64 = document.querySelector(`.qrcode-canvas-datos-${id}`) as HTMLCanvasElement
    image64.toDataURL()

    // Adds the image to the pdf
    pdf.addImage(image64, 'png', 100, 50, 100, 100)

    // Downloads the pdf
    pdf.save('QR.pdf')

  }
  
  useEffect(() => {
    
    client.fetch('*[_type == "users"]').then(res => {
      console.log(res, session)
      setInfo(res)
    })
    
  }, [session])
  
  if (!session?.user?.email || !info) {
    return <div>Tienes que ingresar con tu cuenta gmail. Si ya ingresaste espera unos segundos...</div>
  }
  
  const deleteUser = (id: any) => {
    // Cambia la llamada para actualizar la lista de usuarios después de eliminar
    client
      .delete({ query: `*[_type == "users"][${id}]` })
      .then(() => {
        // Actualiza la lista después de eliminar
        client.fetch('*[_type == "users"]').then(res => {
          setInfo(res);
        });
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };
 
  return (
    <div className='w-11/12 md:w-8/12 mx-auto'>
      
      <div className='my-4'><span className='font-bold'>Usuario:</span> {session?.user?.email}</div>
      
      <h4 className='mb-4 font-bold'>Registros:</h4>
      
      <div className='w-11/12'>
      {
        info && info.length > 0 ?
        info.map((user: any, id: any) => user.email === session?.user?.email && (
            <div className="border flex flex-col gap-0 lg:flex-row lg:gap-8 my-4" key={user.id}>
              <div className="flex flex-col mx-auto lg:m-0 gap-4 w-4/5 p-4">
                <h5>{user.adultname}</h5>
                <p>{user.adultage} años</p>
                <QRcode className={`qrcode-canvas-datos-${user.id}`} level="H" size={150} value={`https://web-app-alzheimer.vercel.app/profile/${user.id}`} />
                <a 
                  onClick={() => generatePDF(user.id)} 
                  className='text-center cursor-pointer w-full sm:w-8/12 lg:w-6/12 rounded-[20px] border border-blue-400 bg-white hover:bg-blue-400 hover:text-white text-blue-400 hover:opacity-90 p-[6px] font-bold'
                >
                  Descargar el QR en PDF
                </a>
              </div>
              <div className="border-t lg:border-t-0 lg:border-l flex items-center mx-auto w-4/5 lg:w-1/5 py-2 lg:py-0 px-4">
                <button 
                  className='lg:m-auto text-white bg-blue-400 rounded-[25px] py-[0.5rem] px-[2.5rem] lg:px-[1.5rem] w-full'
                  onClick={() => deleteUser(id)}
                >
                  Borrar
                </button>
              </div>
            </div>
          )
        ) : <div className=""></div>
      }
      </div>
    </div>
  )
}
