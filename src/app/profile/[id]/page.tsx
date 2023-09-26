"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { userProps } from '@/interfaces/app_interfaces';
import { client } from '@/sanity/schemas';
import Image from 'next/image';
import { getIdPath } from '@/helpers/getIdPath';

export default function Page ({}) {

  const pathname = usePathname();
  
  const [users, setUsers] = useState<userProps[]>([])
  const [profileID, setProfileID] = useState<number>(404)
  
  useEffect(() => {
  
    client.fetch('*[_type == "users"]')
    .then(res => {
      
      console.log(res, pathname)
      
      setUsers(res)
      
      setProfileID(Number(getIdPath(pathname)))
      
      console.log(profileID)
      
    })
  
  }, [profileID])
  
  return (
    <>
    {
      users.map((user) => (
      
      user.id === profileID && (
        <div className="w-4/5 mx-auto py-8" key={user.id}>
        
          <div className="">
            <p>1. Este es el perfil de {user.adultname}</p>
            <Image 
              src={user.image}
              width={500}
              height={500}
              priority
              className='w-full max-w-[250px] max-h-[250px] sm:max-w-[500px] sm:max-h-[500px]'
              alt='Imagen de perfil de usuario'
            />           
            {/* Si no carga rapido con el componente image cargar con tag img a ver */}
            <p>2. De {user.adultage} años de edad</p>
            <p>3. De género {user.genre}</p>
            <ul>
            4. Con las siguientes patologías: 
            <li className='list-disc ml-6'>{user.illnes}</li>
            </ul>
            <p>5. Su responsable es {user.username}.</p>
            <p>6. Número de contacto: {user.userphone}</p>
            <p>7. Dirección: {user.adultAddress}</p>
          </div>  

        </div>)
      
      ))
    }
    </>
  )
}