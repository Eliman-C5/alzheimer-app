"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { userProps } from '@/interfaces/app_interfaces';
import { client } from '@/sanity/schemas';
import { getIdPath } from '@/helpers/getIdPath';
import {Spinner} from "@nextui-org/react";
import {Image} from "@nextui-org/react";

export default function Page ({}) {

  const pathname = usePathname();
  
  const [user, setUser] = useState<userProps | null>(null)
  
  useEffect(() => {
  
    const getUser = async () => {
        
      const data = await client.fetch('*[_type == "users"]')
      
      console.log(data)
            
      const currentUser = data.find((user: userProps) => user.id === Number(getIdPath(pathname)))
      
      console.log(currentUser)
      
      return setUser(currentUser)
        
    }
    
    getUser()
  
  }, [])
  
  return (
    <>
    {
      user ? 
      <div className="w-4/5 mx-auto py-8 flex flex-col gap-4" key={user.id}>
        <h2 className='font-bold text-[35px] md:text-[52px]'>{user.adultname}</h2>
        <Image 
          src={user.image}
          width={500}
          height={500}
          className='w-full'
          alt='Imagen de perfil de usuario'
        />
        <p>De género {user.genre}. Tiene {user.adultage} años de edad y vive en {user.adultAddress}</p>
        <p>Sufre de las siguientes patologías:</p>
        <ul>
          <li className='list-disc ml-6'>{user.illnes}</li>
        </ul>
        <p>Su responsable es {user.username} y puedes contactarlo al {user.userphone}</p>
      </div>:
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    }
    </>
  )
}