'use client'

import { useSession } from 'next-auth/react';
import { client } from '@/sanity/schemas'
import React, { useEffect, useState } from 'react'
import { BackToHome } from '@/components/BackToHome';
import { UserList } from '@/components/UserList';
import { UserAdmin } from '@/components/UserAdmin';

export default function Page() {

  const { data: session } = useSession();
  
  const [info, setInfo] = useState<any>([])
  
  useEffect(() => {
  
      const fetchData = async () => {
    
        const data = await client.fetch('*[_type == "users"]')
      
        console.log(data, session)
      
        return setInfo(data)
      }
    
      fetchData().catch(console.error)
    
  }, [session])
  
  if (!session?.user?.email || !info) {
    return <BackToHome />
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
    
      <UserAdmin 
        name={session?.user?.name}
        email={session?.user?.email}
        image={session?.user?.image}
      />
            
      <h4 className='mb-4 font-bold'>Registros:</h4>
      
      <div className='w-11/12 flex flex-col gap-5 my-4'>
      { 
        info.map((user: any, id: any) => user.email === session?.user?.email && 
            <UserList 
              id={user.id} 
              key={id}
              adultage={user.adultage} 
              adultname={user.adultname} 
              illnes={user.illnes}
              userphone={user.userphone}
              image={user.image}
              deleteUser={deleteUser} 
            /> 
        )
      }
      </div>
    </div>
  )
}
